import React from 'react';
import { ThemeProvider } from '../../../packages/theme-switcher/src';
import { TolgeeProvider } from '@layera/tolgee';
import { AppContent } from './components/AppContent';

function App(): React.ReactElement {
  return (
    <TolgeeProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </TolgeeProvider>
  );
}

export default App;