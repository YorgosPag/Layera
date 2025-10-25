C:\layera\apps\layera-geoalert\src\components\device-specific\mobile\iphone-14-pro-max\components\FloatingStepper.tsx
  266,46:   // Handle step dot click - Enterprise Auto-Navigation
  284,47:   // Handle previous button - Enterprise Auto-Navigation
  370,13:         {/* Navigation Buttons */}

C:\layera\apps\layera-geoalert\src\components\device-specific\mobile\MobileGeoMap.tsx
  21,42:  * Περιλαμβάνει: πλήκτρα, κάρτες, mobile navigation κλπ

C:\layera\apps\layera-geoalert\src\components\device-specific\DesktopGeoMap.tsx
  14,26:  * Περιλαμβάνει: desktop navigation, larger buttons, desktop-specific features κλπ

C:\layera\apps\layera-geoalert\src\components\device-specific\TabletGeoMap.tsx
  14,25:  * Περιλαμβάνει: tablet navigation, medium-sized buttons, tablet-specific features κλπ

C:\layera\apps\layera-geoalert\src\components\steps\category\CategoryStep.tsx
  6,58:  * ⚠️  TEMPORARY BRIDGE: Προς το παρόν ενημερώνει ΚΑΙ το NavigationService (deprecated)
  8,51:  * Μόλις ολοκληρωθεί η migration, θα αφαιρεθεί το NavigationService dependency.
  15,16: // REMOVED: useNavigation - Replaced με StepOrchestrator για clean enterprise architecture
  41,18:   // REMOVED: useNavigation hook - Clean enterprise architecture με μόνο StepOrchestrator
  84,69:   // TEMPORARY bridge handler - ενημερώνει ΚΑΙ StepOrchestrator ΚΑΙ NavigationService
  91,51:       // 1. TEMPORARY: Ενημερώνουμε το deprecated NavigationService για compatibility
  92,13:       await navigation.selectCategory(category);
  105,40:       // Το DeviceLayoutRenderer καλεί navigationHandlers.onNext() και χρειάζεται valid state
  111,7:   }, [navigation, onStepComplete, onCategorySelected]);

C:\layera\apps\layera-geoalert\src\components\steps\category\types.ts
  25,46:   source: 'user_click' | 'auto_selection' | 'navigation';

C:\layera\apps\layera-geoalert\src\components\steps\complete\CompleteStep.tsx
  114,49:     // Go back logic - μπορεί να χρησιμοποιήσει navigation service

C:\layera\apps\layera-geoalert\src\components\steps\details\types.ts
  49,46:   source: 'user_click' | 'auto_selection' | 'navigation';

C:\layera\apps\layera-geoalert\src\components\steps\intent\IntentStep.tsx
  82,48:     // ΔΙΟΡΘΩΣΗ: Επαναφέρω το auto-advance για navigation

C:\layera\apps\layera-geoalert\src\components\steps\intent\types.ts
  28,46:   source: 'user_click' | 'auto_selection' | 'navigation';

C:\layera\apps\layera-geoalert\src\components\steps\pricing\PricingStep.tsx
  93,16:   // 🎮 Handle navigation
  155,14:       {/* 🎮 Navigation Controls */}

C:\layera\apps\layera-geoalert\src\components\steps\transactionType\types.ts
  30,46:   source: 'user_click' | 'auto_selection' | 'navigation';

C:\layera\apps\layera-geoalert\src\components\steps\index.ts
  11,35: export { StepOrchestrator, useStepNavigation, useStepRegistry } from './StepOrchestrator';

C:\layera\apps\layera-geoalert\src\components\steps\StepOrchestrator.tsx
  42,7:   /** Navigation handlers */
  141,9:   // 🎮 Navigation helpers
  310,18:  * Hook για step navigation state
  312,21: export const useStepNavigation = (

C:\layera\apps\layera-geoalert\src\components\steps\types.ts
  150,7:   /** Navigation callbacks */

C:\layera\apps\layera-geoalert\src\components\GeoMapNew.tsx
  10,13: import { useNavigation } from '../services/navigation/hooks/useNavigation';
  10,44: import { useNavigation } from '../services/navigation/hooks/useNavigation';
  10,64: import { useNavigation } from '../services/navigation/hooks/useNavigation';
  12,13: import { useNavigationHandlers } from '@layera/navigation-handlers';
  12,48: import { useNavigationHandlers } from '@layera/navigation-handlers';
  99,20:   // 🚀 ENTERPRISE NAVIGATION: Rock-solid service που δεν σπάει ποτέ
  100,9:   const navigation = useNavigation();
  100,25:   const navigation = useNavigation();
  105,9:     if (navigation.currentStep &&
  106,257:         !['category', 'intent', 'transactionType', 'employmentType', 'occupation', 'availability', 'upload', 'layout', 'propertyType', 'propertyDetails', 'areaMethod', 'location', 'availabilityDetails', 'complete', 'details', 'pricing', 'review'].includes(navigation.currentStep) &&
  107,9:         navigation.selectedCategory) {
  111,47:           console.log(`🔄 AUTO-RESET: Step '${navigation.currentStep}' not implemented yet, resetting to category`);
  113,9:         navigation.reset();
  116,7:   }, [navigation.currentStep, navigation.selectedCategory, navigation.reset]);
  116,31:   }, [navigation.currentStep, navigation.selectedCategory, navigation.reset]);
  116,60:   }, [navigation.currentStep, navigation.selectedCategory, navigation.reset]);
  119,20:   // 🚀 ENTERPRISE NAVIGATION HANDLERS: @layera/navigation-handlers LEGO package
  119,49:   // 🚀 ENTERPRISE NAVIGATION HANDLERS: @layera/navigation-handlers LEGO package
  125,12:     state: navigationState
  126,10:   } = useNavigationHandlers({
  127,5:     navigation,
  180,9:   const navigationProps = {
  181,18:     currentStep: navigation.currentStep,
  182,17:     totalSteps: navigation.totalSteps,
  183,16:     stepIndex: navigation.stepIndex,
  184,23:     selectedCategory: navigation.selectedCategory,
  185,16:     canGoNext: navigation.canGoNext,
  186,16:     canGoBack: navigation.canGoBack
  193,34:       console.log('🔄 Step click navigation:', { stepIndex, currentStep: navigation.currentStep });
  193,74:       console.log('🔄 Step click navigation:', { stepIndex, currentStep: navigation.currentStep });
  203,9:   const navigationHandlersProps = {
  221,9:         navigation={navigationProps}
  221,21:         navigation={navigationProps}
  222,9:         navigationHandlers={navigationHandlersProps}
  222,29:         navigationHandlers={navigationHandlersProps}

C:\layera\apps\layera-geoalert\src\components\SimpleNavigationRail.tsx
  5,17: interface SimpleNavigationRailProps {
  11,10:  * SimpleNavigationRail - Minimal navigation για map mode
  11,35:  * SimpleNavigationRail - Minimal navigation για map mode
  13,20: export const SimpleNavigationRail: React.FC<SimpleNavigationRailProps> = ({
  13,51: export const SimpleNavigationRail: React.FC<SimpleNavigationRailProps> = ({
  28,47:       {/* Μπορούμε να προσθέσουμε περισσότερα navigation items εδώ */}

C:\layera\apps\layera-geoalert\src\modules\sidebars\NavigationRail.tsx
  29,11: interface NavigationRailProps {
  38,7: const NavigationRail: React.FC<NavigationRailProps> = ({
  38,32: const NavigationRail: React.FC<NavigationRailProps> = ({
  109,16: export default NavigationRail;

C:\layera\apps\layera-geoalert\src\services\navigation\__tests__\NavigationService.test.ts
  2,15:  * Enterprise Navigation Service Tests
  4,38:  * Αυτά τα tests εξασφαλίζουν ότι το navigation system
  8,10: import { NavigationService } from '../NavigationService';
  8,39: import { NavigationService } from '../NavigationService';
  9,10: import { NavigationState, Category } from '../types';
  11,11: describe('NavigationService - Enterprise Safety Tests', () => {
  12,7:   let navigationService: NavigationService;
  12,26:   let navigationService: NavigationService;
  15,5:     navigationService = new NavigationService();
  15,29:     navigationService = new NavigationService();
  18,22:   describe('🛡️ Back Navigation Safety', () => {
  21,14:       expect(navigationService.getCurrentStep()).toBe('category');
  22,14:       expect(navigationService.getStepIndex()).toBe(0);
  25,20:       expect(() => navigationService.goBack()).toThrow('Cannot go back from first step');
  26,14:       expect(navigationService.getCurrentStep()).toBe('category');
  27,14:       expect(navigationService.getStepIndex()).toBe(0);
  32,13:       await navigationService.selectCategory('property');
  33,14:       expect(navigationService.getCurrentStep()).toBe('intent');
  34,14:       expect(navigationService.getStepIndex()).toBe(1);
  37,13:       await navigationService.goBack();
  40,14:       expect(navigationService.getCurrentStep()).toBe('category');
  41,14:       expect(navigationService.getStepIndex()).toBe(0);
  42,14:       expect(navigationService.getSelectedCategory()).toBe(null);
  47,13:       await navigationService.selectCategory('property');
  48,14:       expect(navigationService.getStepIndex()).toBe(1);
  52,9:         navigationService.goBack(),
  53,9:         navigationService.goBack(),
  54,9:         navigationService.goBack(),
  55,9:         navigationService.goBack()
  66,14:       expect(navigationService.getStepIndex()).toBe(0);
  73,13:       await navigationService.selectCategory('property');
  76,21:       const state = navigationService.getState();
  94,9:         navigationService.reset();
  97,15:         await navigationService.selectCategory(scenario.category);
  100,23:         const state = navigationService.getState();
  112,8:       (navigationService as any).state = {
  121,20:       expect(() => navigationService.validateState()).toThrow();
  124,7:       navigationService.recover();
  127,21:       const state = navigationService.getState();
  139,15:         await navigationService.selectCategory('property');
  141,16:         expect(navigationService.getSelectedCategory()).toBe('property');
  152,9:         navigationService.selectCategory('property'),
  153,9:         navigationService.selectCategory('job'),
  154,9:         navigationService.goNext(),
  155,9:         navigationService.reset()
  161,21:       const state = navigationService.getState();

C:\layera\apps\layera-geoalert\src\services\navigation\hooks\useNavigation.ts
  2,15:  * Enterprise Navigation Hook
  5,41:  * που αποκρύπτει την πολυπλοκότητα του NavigationService.
  9,10: import { NavigationService } from '../NavigationService';
  9,39: import { NavigationService } from '../NavigationService';
  10,10: import { NavigationState, Category } from '../types';
  13,5: let navigationServiceInstance: NavigationService | null = null;
  13,32: let navigationServiceInstance: NavigationService | null = null;
  15,13: function getNavigationService(): NavigationService {
  15,34: function getNavigationService(): NavigationService {
  16,8:   if (!navigationServiceInstance) {
  17,5:     navigationServiceInstance = new NavigationService();
  17,37:     navigationServiceInstance = new NavigationService();
  19,10:   return navigationServiceInstance;
  22,21: export interface UseNavigationReturn {
  39,3:   navigationState: NavigationState;
  39,20:   navigationState: NavigationState;
  42,17: export const useNavigation = (): UseNavigationReturn => {
  42,37: export const useNavigation = (): UseNavigationReturn => {
  43,9:   const navigationService = getNavigationService();
  43,32:   const navigationService = getNavigationService();
  46,10:   const [navigationState, setNavigationState] = useState<NavigationState>(
  46,30:   const [navigationState, setNavigationState] = useState<NavigationState>(
  46,58:   const [navigationState, setNavigationState] = useState<NavigationState>(
  47,5:     navigationService.getState()
  50,19:   // Subscribe to navigation state changes
  53,10:       setNavigationState(navigationService.getState());
  53,26:       setNavigationState(navigationService.getState());
  61,7:   }, [navigationService]);
  66,13:       await navigationService.selectCategory(category);
  67,10:       setNavigationState(navigationService.getState());
  67,26:       setNavigationState(navigationService.getState());
  73,7:   }, [navigationService]);
  77,13:       await navigationService.goBack();
  78,10:       setNavigationState(navigationService.getState());
  78,26:       setNavigationState(navigationService.getState());
  83,7:   }, [navigationService]);
  87,13:       await navigationService.goNext();
  88,10:       setNavigationState(navigationService.getState());
  88,26:       setNavigationState(navigationService.getState());
  93,7:   }, [navigationService]);
  96,5:     navigationService.reset();
  97,8:     setNavigationState(navigationService.getState());
  97,24:     setNavigationState(navigationService.getState());
  98,7:   }, [navigationService]);
  102,18:     currentStep: navigationState.currentStepId,
  103,16:     stepIndex: navigationState.stepIndex,
  104,23:     selectedCategory: navigationState.selectedCategory,
  105,17:     totalSteps: navigationState.totalSteps,
  106,16:     canGoBack: navigationState.canGoPrevious,
  107,16:     canGoNext: navigationState.canGoNext,
  108,16:     isLoading: navigationState.isLoading,
  117,5:     navigationState

C:\layera\apps\layera-geoalert\src\services\navigation\NavigationService.ts
  2,15:  * Enterprise Navigation Service
  11,63:  * που διαχειρίζεται τις διαφανείς κάρτες και τη modular step navigation.
  13,47:  * Αυτό το service εξασφαλίζει 100% αξιόπιστο navigation
  17,10: import { NavigationState, Category, NavigationStep } from './types';
  17,37: import { NavigationState, Category, NavigationStep } from './types';
  18,10: import { NavigationError, NavigationValidator } from './validation';
  18,27: import { NavigationError, NavigationValidator } from './validation';
  21,14: export class NavigationService {
  22,18:   private state: NavigationState;
  23,22:   private validator: NavigationValidator;
  25,25:   private stateHistory: NavigationState[] = [];
  28,26:     this.validator = new NavigationValidator();
  29,31:     this.logger = new Logger('NavigationService');
  47,24:   getState(): Readonly<NavigationState> {
  59,14:   // 🎯 SAFE NAVIGATION ACTIONS
  66,19:         throw new NavigationError(`Invalid category: ${category}`);
  70,19:         throw new NavigationError('Can only select category from first step');
  91,19:         throw new NavigationError('Cannot go back from first step');
  95,19:         throw new NavigationError('Already at first step');
  116,19:         throw new NavigationError('Cannot go to next step');
  121,19:         throw new NavigationError('Already at last step');
  137,33:     this.logger.info('Resetting navigation state');
  143,39:   private async updateState(newState: NavigationState): Promise<void> {
  157,69:   private calculateStateAfterCategorySelection(category: Category): NavigationState {
  171,43:   private calculateStateAfterGoingBack(): NavigationState {
  193,43:   private calculateStateAfterGoingNext(): NavigationState {
  208,33:     this.logger.error('Handling navigation error', error);
  240,30:   private getInitialState(): NavigationState {
  252,59:   private getStepsForCategory(category: Category | null): NavigationStep[] {

C:\layera\apps\layera-geoalert\src\services\navigation\types.ts
  2,15:  * Enterprise Navigation Types
  10,18: export interface NavigationStep {
  15,18: export interface NavigationState {
  25,18: export interface NavigationTransition {
  26,9:   from: NavigationState;
  27,7:   to: NavigationState;
  28,11:   action: NavigationAction;
  32,13: export type NavigationAction =
  38,18: export interface NavigationServiceInterface {
  43,24:   getState(): Readonly<NavigationState>;
  47,6:   // Navigation actions

C:\layera\apps\layera-geoalert\src\services\navigation\validation.ts
  2,4:  * Navigation Validation & Error Handling
  4,25:  * Εξασφαλίζει ότι κάθε navigation action είναι valid
  8,10: import { NavigationState, Category } from './types';
  10,14: export class NavigationError extends Error {
  13,18:     this.name = 'NavigationError';
  17,14: export class NavigationValidator {
  22,24:   validateState(state: NavigationState): void {
  25,17:       throw new NavigationError(`Invalid step index: ${state.stepIndex}`);
  30,17:       throw new NavigationError(`Invalid current step ID: ${state.currentStepId}`);
  35,17:       throw new NavigationError(`Invalid selected category: ${state.selectedCategory}`);
  40,17:       throw new NavigationError(`Invalid total steps: ${state.totalSteps}`);
  45,17:       throw new NavigationError(`Step index ${state.stepIndex} exceeds total steps ${state.totalSteps}`);
  51,17:       throw new NavigationError(`Invalid canGoPrevious: expected ${expectedCanGoPrevious}, got ${state.canGoPrevious}`);
  57,17:       throw new NavigationError(`Invalid canGoNext: expected ${expectedCanGoNext}, got ${state.canGoNext}`);
  62,17:       throw new NavigationError('Cannot have selected category on first step');
  66,17:       throw new NavigationError('Cannot advance beyond first step without selecting category');
  70,11:   validateNavigation(action: string, currentState: NavigationState): void {
  70,52:   validateNavigation(action: string, currentState: NavigationState): void {
  74,21:           throw new NavigationError('Cannot go back: canGoPrevious is false');
  80,21:           throw new NavigationError('Cannot go next: canGoNext is false');
  86,21:           throw new NavigationError('Cannot select category: not on first step');
  91,19:         throw new NavigationError(`Unknown navigation action: ${action}`);
  91,44:         throw new NavigationError(`Unknown navigation action: ${action}`);

C:\layera\apps\layera-geoalert\src\App.tsx
  489,77:                   <ShareIcon size="sm" theme="info" /> {t('geoalert.crossAppNavigation')}

C:\layera\apps\layera-id\src\components\Dashboard.jsx
  58,21:                 {t('navigation.logout')}

C:\layera\apps\layera-id\src\components\MfaEnroll.jsx
  89,17:             {t('navigation.logout')}
  201,13:         {/* Navigation */}

C:\layera\apps\layera-id\src\components\NewDashboard.tsx
  44,17:             {t('navigation.logout')}

C:\layera\apps\layera-id\src\components\QuickActions.jsx
  8,58:  * QuickActions - Κοινό component για γρήγορες ενέργειες navigation
  20,17:       title: t('navigation.backToDashboard'),
  26,17:       title: t('navigation.account'),
  32,17:       title: t('navigation.settings'),
  38,17:       title: t('navigation.data'),

C:\layera\apps\layera-id\src\pages\Account.jsx
  44,17:             {t('navigation.logout')}

C:\layera\apps\layera-id\src\pages\AdminRoles.jsx
  67,25:                   ← {t('navigation.backToDashboard')}
  143,17:             {t('navigation.logout')}

C:\layera\apps\layera-id\src\pages\Data.jsx
  47,17:             {t('navigation.logout')}
  291,13:         {/* Navigation */}

C:\layera\apps\layera-id\src\pages\Settings.jsx
  50,17:             {t('navigation.logout')}
  214,13:         {/* Navigation */}

C:\layera\packages\auth-bridge\src\components\UserDisplay.tsx
  210,57:  * Compact version του UserDisplay για χρήση σε headers/navigation

C:\layera\packages\box-shadows\src\index.ts
  58,6:   // Navigation elements
  59,88:   navbarDefault: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Navigation bar
  107,6:   | 'navigation'  // navbar*, sidebar*
  151,6:   // Navigation shadows
  152,3:   navigation: {
  209,38:   | keyof typeof BOX_SHADOW_CSS_VARS.navigation
  290,8:     // Navigation elements
  291,5:     navigation: {

C:\layera\packages\buttons\src\components\LinkButton.tsx
  7,55:  * Χρησιμοποιεί anchor tag αλλά με button styling για navigation actions

C:\layera\packages\cards\src\types\unified-card.types.ts
  73,43:   actionCategory?: 'upload' | 'submit' | 'navigation';

C:\layera\packages\cards\src\utils\cardConfigFactory.ts
  93,22:     actionCategory: 'navigation',

C:\layera\packages\cards\src\utils\cardVariantResolver.ts
  139,13:       case 'navigation':

C:\layera\packages\constants\src\index.ts
  24,4: // Navigation
  25,18: export * from './navigation';

C:\layera\packages\constants\src\navigation.ts
  2,4:  * Navigation and routing constants
  5,14: export const NAVIGATION_TYPES = {
  57,13: export type NavigationType = typeof NAVIGATION_TYPES[keyof typeof NAVIGATION_TYPES];
  57,37: export type NavigationType = typeof NAVIGATION_TYPES[keyof typeof NAVIGATION_TYPES];
  57,67: export type NavigationType = typeof NAVIGATION_TYPES[keyof typeof NAVIGATION_TYPES];

C:\layera\packages\cursors\src\index.ts
  280,8:     // Navigation
  281,5:     navigation: {

C:\layera\packages\device-layouts\src\DeviceLayoutRenderer.tsx
  51,3:   navigation,
  52,3:   navigationHandlers,
  112,62:         {showCategoryElements && iPhoneComponents.stepper && navigation && (
  114,26:             currentStep: navigation.currentStep,
  115,25:             totalSteps: navigation.totalSteps,
  116,24:             stepIndex: navigation.stepIndex,
  117,31:             selectedCategory: navigation.selectedCategory,
  118,21:             onNext: navigationHandlers?.onNext,
  119,25:             onPrevious: navigationHandlers?.onPrevious,
  120,22:             onReset: navigationHandlers?.onReset,
  121,26:             onStepClick: navigationHandlers?.onStepClick,
  122,24:             canGoNext: navigation.canGoNext,
  123,28:             canGoPrevious: navigation.canGoBack
  128,67:         {showCategoryElements && iPhoneComponents.orchestrator && navigation && (
  130,28:             currentStepId: navigation.currentStep!,
  131,31:             selectedCategory: navigation.selectedCategory ?? 'property',
  132,46:             // selectedIntent: TO DO: Add to navigation service
  135,17:             ...(navigationHandlers?.onNext ? { onNext: navigationHandlers.onNext } : {}),
  135,56:             ...(navigationHandlers?.onNext ? { onNext: navigationHandlers.onNext } : {}),
  136,17:             ...(navigationHandlers?.onPrevious ? { onPrevious: navigationHandlers.onPrevious } : {}),
  136,64:             ...(navigationHandlers?.onPrevious ? { onPrevious: navigationHandlers.onPrevious } : {}),
  139,64:               console.log(`🎯 DEVICE LAYOUT: Current step is ${navigation?.currentStep}`);
  141,45:               // ΔΙΟΡΘΩΣΗ: Intelligent step navigation για occupation step
  142,35:               const currentStep = navigation?.currentStep;
  145,71:                 console.log(`🎯 DEVICE LAYOUT: SPECIAL CASE - Forcing navigation to occupation step`);
  148,21:                 if (navigationHandlers?.onNext) {
  149,19:                   navigationHandlers.onNext();
  152,56:                 console.log(`🎯 DEVICE LAYOUT: Default navigation using goNext() for ${stepId}`);
  154,21:                 if (navigationHandlers?.onNext) {
  155,19:                   navigationHandlers.onNext();
  165,50:                 // Εδώ θα χρειαστούμε access στο navigation service

C:\layera\packages\device-layouts\src\ResponsiveMapLayout.tsx
  39,7:   /** Navigation state */
  40,3:   navigation?: {
  49,7:   /** Navigation handlers */
  50,3:   navigationHandlers?: {
  77,3:   navigation,
  78,3:   navigationHandlers,
  131,7:       navigation={navigation}
  131,19:       navigation={navigation}
  132,7:       navigationHandlers={navigationHandlers}
  132,27:       navigationHandlers={navigationHandlers}

C:\layera\packages\device-layouts\src\types.ts
  69,7:   /** Navigation-related props */
  70,3:   navigation?: {
  79,20:   /** Handlers για navigation actions */
  80,3:   navigationHandlers?: {
  175,7:   /** Navigation state και handlers */
  176,3:   navigation?: DeviceLayoutProps['navigation'];
  176,35:   navigation?: DeviceLayoutProps['navigation'];
  177,3:   navigationHandlers?: DeviceLayoutProps['navigationHandlers'];
  177,43:   navigationHandlers?: DeviceLayoutProps['navigationHandlers'];

C:\layera\packages\icons\src\icons\ActionIcons.tsx
  7,30: import { CloseIcon } from './NavigationIcons';

C:\layera\packages\icons\src\icons\MapIcons.tsx
  24,4: // Navigation/Compass - Πυξίδα

C:\layera\packages\icons\src\icons\NavigationIcons.tsx
  1,19: // Layera Icons - Navigation Icons

C:\layera\packages\icons\src\index.ts
  15,4: // Navigation Icons
  26,17: } from './icons/NavigationIcons';

C:\layera\packages\icons\src\types.ts
  46,6:   | 'navigation'   // Πλοήγηση

C:\layera\packages\layout\src\components\AppShell\AppShell.tsx
  48,15:   // Keyboard navigation support

C:\layera\packages\layout\src\components\Header\LayeraHeader.tsx
  12,3:   navigation,
  44,30:         {/* Center section - Navigation (για rich variant) */}
  45,10:         {navigation && variant === 'rich' && (
  46,42:           <nav className="layera-header__navigation" role="navigation">
  46,60:           <nav className="layera-header__navigation" role="navigation">
  47,14:             {navigation}

C:\layera\packages\layout\src\flex\index.ts
  250,8:     // Navigation με items
  251,5:     navigation: {

C:\layera\packages\layout\src\hooks\useFlex.ts
  82,5:     navigation: useFlex({

C:\layera\packages\layout\src\types\component.types.ts
  28,3:   navigation?: ReactNode;

C:\layera\packages\navigation-handlers\src\index.ts
  2,12:  * @layera/navigation-handlers - Enterprise Navigation Handlers LEGO Package
  2,45:  * @layera/navigation-handlers - Enterprise Navigation Handlers LEGO Package
  4,31:  * Single source of truth για navigation behavior στο Layera ecosystem.
  9,18: export * from './NavigationHandlersAdapter';
  10,21: export * from './useNavigationHandlers';
  13,10: export { NavigationHandlersAdapter as NavigationManager } from './NavigationHandlersAdapter';
  13,39: export { NavigationHandlersAdapter as NavigationManager } from './NavigationHandlersAdapter';
  13,67: export { NavigationHandlersAdapter as NavigationManager } from './NavigationHandlersAdapter';
  14,19: export { useSimpleNavigationHandlers as useNavHandlers } from './useNavigationHandlers';
  14,69: export { useSimpleNavigationHandlers as useNavHandlers } from './useNavigationHandlers';

C:\layera\packages\navigation-handlers\src\NavigationHandlersAdapter.ts
  2,4:  * NavigationHandlersAdapter.ts - Enterprise Navigation Handlers Adapter
  2,46:  * NavigationHandlersAdapter.ts - Enterprise Navigation Handlers Adapter
  4,42:  * Εξαγμένη λογική από GeoMapNew.tsx για navigation handlers
  5,31:  * Single source of truth για navigation behavior στο Layera ecosystem
  9,3:   NavigationHandlerResult,
  10,3:   NavigationHandlerOptions,
  11,3:   NavigationHandlerDependencies,
  12,3:   NavigationState
  15,14: export class NavigationHandlersAdapter {
  16,18:   private state: NavigationState;
  17,20:   private options: NavigationHandlerOptions;
  18,25:   private dependencies: NavigationHandlerDependencies;
  21,19:     dependencies: NavigationHandlerDependencies,
  22,14:     options: NavigationHandlerOptions = {}
  39,21:   createHandlers(): NavigationHandlerResult {
  57,33:         await this.dependencies.navigation.goNext();
  59,70:         const navError = error instanceof Error ? error : new Error('Navigation next failed');
  75,33:         await this.dependencies.navigation.goBack();
  77,70:         const navError = error instanceof Error ? error : new Error('Navigation back failed');
  89,27:         this.dependencies.navigation.reset();
  95,72:         const resetError = error instanceof Error ? error : new Error('Navigation reset failed');
  139,23:       console.error(`[NavigationHandlers] ${action} failed:`, error);
  156,44:   updateDependencies(dependencies: Partial<NavigationHandlerDependencies>): void {
  161,15:   getState(): NavigationState {

C:\layera\packages\navigation-handlers\src\types.ts
  2,4:  * Navigation Handlers Types - Enterprise Single Source of Truth
  4,29:  * Καθαροί domain types για navigation behavior χωρίς vendor dependencies
  7,18: export interface NavigationState {
  13,18: export interface NavigationActions {
  25,18: export interface NavigationHandlerOptions {
  29,27:   onStateChange?: (state: NavigationState) => void;
  32,18: export interface NavigationHandlerResult {
  33,6:   // Navigation actions με built-in error handling
  42,10:   state: NavigationState;
  46,18: export interface NavigationHandlerDependencies {
  47,3:   navigation: NavigationActions;
  47,15:   navigation: NavigationActions;

C:\layera\packages\navigation-handlers\src\useNavigationHandlers.ts
  2,7:  * useNavigationHandlers.ts - Enterprise React Hook για Navigation Handlers
  2,57:  * useNavigationHandlers.ts - Enterprise React Hook για Navigation Handlers
  4,40:  * React hook που παρέχει ready-to-use navigation handlers με error handling
  8,10: import { NavigationHandlersAdapter } from './NavigationHandlersAdapter';
  8,46: import { NavigationHandlersAdapter } from './NavigationHandlersAdapter';
  10,3:   NavigationHandlerResult,
  11,3:   NavigationHandlerOptions,
  12,3:   NavigationActions,
  13,3:   NavigationState
  16,21: export interface UseNavigationHandlersConfig {
  17,3:   navigation: NavigationActions;
  17,15:   navigation: NavigationActions;
  21,13:   options?: NavigationHandlerOptions;
  24,21: export interface UseNavigationHandlersResult extends NavigationHandlerResult {
  24,54: export interface UseNavigationHandlersResult extends NavigationHandlerResult {
  30,20: export function useNavigationHandlers(
  31,14:   config: UseNavigationHandlersConfig
  32,7: ): UseNavigationHandlersResult {
  58,7:       navigation: config.navigation,
  58,26:       navigation: config.navigation,
  63,16:     return new NavigationHandlersAdapter(dependencies, config.options);
  64,14:   }, [config.navigation, categoryElementsController, isSpecialDevice, config.options]);
  102,16:   const state: NavigationState = {
  104,66:     isNavigating: false, // This could be enhanced to track real navigation state
  118,26: export function useSimpleNavigationHandlers(
  119,3:   navigation: NavigationActions,
  119,15:   navigation: NavigationActions,
  122,13:   return useNavigationHandlers({
  123,5:     navigation,

C:\layera\packages\pipelines\src\context\PipelineDiscovery.ts
  232,25:    * 🚀 ENTERPRISE AUTO-NAVIGATION: Αυτόματη πλοήγηση στο επόμενο βήμα
  276,26:    * 🚀 ENTERPRISE SMART NAVIGATION: Έξυπνη πλοήγηση με βάση την κατάσταση

C:\layera\packages\pipelines\unified\hooks\useUnifiedPipeline.ts
  98,18:       // Complex navigation logic από το original
  132,15:       // Pure navigation logic

C:\layera\packages\pipelines\unified\state\guards.ts
  5,22:  * Purpose: Reusable navigation guards for state transitions

C:\layera\packages\pipelines\unified\utils\navigation.ts
  2,35:  * @layera/pipelines - Enterprise Navigation Utilities
  3,18:  * Purpose: Pure navigation rules - from→to logic
  21,18: export interface NavigationContext {
  75,51: export function getNextStepAfterLocation(context: NavigationContext): PipelineStep {
  102,33:  * Pure function: Previous step navigation
  103,21:  * Handles all back navigation logic
  107,12:   context: NavigationContext
  128,23:       // Complex back navigation
  157,12:   context: NavigationContext
  182,43: export function getRequiredSteps(context: NavigationContext): PipelineStep[] {
  227,12:   context: NavigationContext

C:\layera\packages\snap-interactions\src\components\SnapSettingsPanel.tsx
  244,26:             {/* Category Navigation για non-compact mode */}

C:\layera\EMERGENCY_RESTORE.bat
  3,29: echo 🚨 EMERGENCY RESTORE - NAVIGATION SYSTEM
  6,36: echo This will restore the WORKING navigation system
  18,46: copy "safety-backups\20251022_115150_working_navigation\GeoMapNew.tsx" "apps\layera-geoalert\src\components\GeoMapNew.tsx"
  19,46: copy "safety-backups\20251022_115150_working_navigation\FloatingStepper.tsx" "apps\layera-geoalert\src\components\device-specific\mobile\iphone-14-pro-max\components\FloatingStepper.tsx"
  22,8: echo ✅ NAVIGATION SYSTEM RESTORED TO WORKING STATE

C:\layera\pnpm-lock.yaml
  90,16:       '@layera/navigation-handlers':
  92,38:         version: link:../../packages/navigation-handlers
  1439,12:   packages/navigation-handlers: