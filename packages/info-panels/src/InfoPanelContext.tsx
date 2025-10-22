/**
 * InfoPanelContext - React Context για το LEGO Info Panels System
 *
 * Παρέχει centralized state management για info panels σε όλο το app tree.
 * Αποσπώμενο και επαναχρησιμοποιήσιμο σε οποιοδήποτε React project.
 */

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import type {
  InfoPanelState,
  InfoPanelProviderProps,
  UseInfoPanelReturn,
  InfoPanelId,
  InfoPanelConfig,
  InfoPanelContent
} from './types';
import { StaticContentProvider } from './providers/StaticContentProvider';

// Action Types
type InfoPanelAction =
  | { type: 'SHOW_PANEL'; payload: InfoPanelId }
  | { type: 'HIDE_PANEL'; payload: InfoPanelId }
  | { type: 'REGISTER_PANEL'; payload: InfoPanelConfig }
  | { type: 'UNREGISTER_PANEL'; payload: InfoPanelId }
  | { type: 'SET_PROVIDER'; payload: InfoPanelState['contentProvider'] };

// Reducer
function infoPanelReducer(state: InfoPanelState, action: InfoPanelAction): InfoPanelState {
  switch (action.type) {
    case 'SHOW_PANEL': {
      const newVisiblePanels = new Set(state.visiblePanels);
      newVisiblePanels.add(action.payload);
      return { ...state, visiblePanels: newVisiblePanels };
    }

    case 'HIDE_PANEL': {
      const newVisiblePanels = new Set(state.visiblePanels);
      newVisiblePanels.delete(action.payload);
      return { ...state, visiblePanels: newVisiblePanels };
    }

    case 'REGISTER_PANEL': {
      return {
        ...state,
        registry: {
          ...state.registry,
          [action.payload.id]: action.payload
        }
      };
    }

    case 'UNREGISTER_PANEL': {
      const newRegistry = { ...state.registry };
      delete newRegistry[action.payload];
      const newVisiblePanels = new Set(state.visiblePanels);
      newVisiblePanels.delete(action.payload);
      return {
        ...state,
        registry: newRegistry,
        visiblePanels: newVisiblePanels
      };
    }

    case 'SET_PROVIDER': {
      return { ...state, contentProvider: action.payload };
    }

    default:
      return state;
  }
}

// Context
const InfoPanelContext = createContext<{
  state: InfoPanelState;
  dispatch: React.Dispatch<InfoPanelAction>;
} | null>(null);

// Provider Component
export const InfoPanelProvider: React.FC<InfoPanelProviderProps> = ({
  children,
  registry = {},
  contentProvider,
  defaultStyle,
  eventHandlers
}) => {
  const initialState: InfoPanelState = {
    visiblePanels: new Set(),
    registry,
    contentProvider: contentProvider || new StaticContentProvider()
  };

  if (defaultStyle) {
    initialState.defaultStyle = defaultStyle;
  }
  if (eventHandlers) {
    initialState.eventHandlers = eventHandlers;
  }

  const [state, dispatch] = useReducer(infoPanelReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <InfoPanelContext.Provider value={contextValue}>
      {children}
    </InfoPanelContext.Provider>
  );
};

// Hook για χρήση του context
export const useInfoPanel = (): UseInfoPanelReturn => {
  const context = useContext(InfoPanelContext);

  if (!context) {
    throw new Error('useInfoPanel must be used within an InfoPanelProvider');
  }

  const { state, dispatch } = context;

  const showPanel = useCallback((id: InfoPanelId) => {
    dispatch({ type: 'SHOW_PANEL', payload: id });
    state.eventHandlers?.onShow?.(id);
  }, [state.eventHandlers, dispatch]);

  const hidePanel = useCallback((id: InfoPanelId) => {
    dispatch({ type: 'HIDE_PANEL', payload: id });
    state.eventHandlers?.onHide?.(id);
  }, [state.eventHandlers, dispatch]);

  const togglePanel = useCallback((id: InfoPanelId) => {
    if (state.visiblePanels.has(id)) {
      hidePanel(id);
    } else {
      showPanel(id);
    }
  }, [state.visiblePanels, showPanel, hidePanel]);

  const isVisible = useCallback((id: InfoPanelId) => {
    return state.visiblePanels.has(id);
  }, [state.visiblePanels]);

  const getContent = useCallback(async (id: InfoPanelId): Promise<InfoPanelContent> => {
    return await state.contentProvider.getContent(id);
  }, [state.contentProvider]);

  const registerPanel = useCallback((config: InfoPanelConfig) => {
    dispatch({ type: 'REGISTER_PANEL', payload: config });
  }, [dispatch]);

  const unregisterPanel = useCallback((id: InfoPanelId) => {
    dispatch({ type: 'UNREGISTER_PANEL', payload: id });
  }, [dispatch]);

  return {
    showPanel,
    hidePanel,
    togglePanel,
    isVisible,
    getContent,
    registerPanel,
    unregisterPanel
  };
};