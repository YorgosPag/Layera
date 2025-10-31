PS C:\layera> npm run typecheck

> layera@1.0.0 typecheck
> npm run typecheck --workspaces --if-present


> @layera/layera-id@1.0.0 typecheck
> tsc --noEmit

src/components/__tests__/PrivateRoute.test.tsx:4:26 - error TS7016: Could not find a declaration file for module '../PrivateRoute'. 'C:/layera/apps/layera-id/src/components/PrivateRoute.jsx' implicitly has an 'any' type.

4 import PrivateRoute from '../PrivateRoute';
                           ~~~~~~~~~~~~~~~~~

src/components/__tests__/PrivateRoute.test.tsx:6:21 - error TS7016: Could not find a declaration file for module '@layera/layout'. 'C:/layera/packages/layout/dist/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/layera__layout` if it exists or add a new declaration (.d.ts) file containing `declare module '@layera/layout';`

6 import { Box } from '@layera/layout';
                      ~~~~~~~~~~~~~~~~

src/components/DeviceFrameWrapper.tsx:2:41 - error TS2307: Cannot find module '@layera/viewport' or its corresponding type 
declarations.

2 import { useViewportWithOverride } from '@layera/viewport';
                                          ~~~~~~~~~~~~~~~~~~

src/components/DeviceFrameWrapper.tsx:3:66 - error TS2307: Cannot find module '@layera/viewport' or its corresponding type 
declarations.

3 import { DeviceModelSelector, DeviceModel, getDeviceSpecs } from '@layera/viewport';
                                                                   ~~~~~~~~~~~~~~~~~~

src/components/DeviceFrameWrapper.tsx:6:21 - error TS7016: Could not find a declaration file for module '@layera/layout'. 'C:/layera/packages/layout/dist/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/layera__layout` if it exists or add a new declaration (.d.ts) file containing `declare module '@layera/layout';`

6 import { Box } from '@layera/layout';
                      ~~~~~~~~~~~~~~~~

src/components/DeviceFrameWrapper.tsx:17:9 - error TS6198: All destructured elements are unused.

17   const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/DeviceFrameWrapper.tsx:110:8 - error TS2304: Cannot find name 'Flex'.

110       <Flex
           ~~~~

src/components/DeviceFrameWrapper.tsx:125:9 - error TS2304: Cannot find name 'Flex'.

125       </Flex>
            ~~~~

src/components/NewDashboard.tsx:3:23 - error TS6133: 'Link' is declared but its value is never read.

3 import { useNavigate, Link } from 'react-router-dom';
                        ~~~~

src/components/NewDashboard.tsx:5:16 - error TS6133: 'Heading' is declared but its value is never read.

5 import { Text, Heading } from '@layera/typography';
                 ~~~~~~~

src/components/NewDashboard.tsx:6:24 - error TS2307: Cannot find module '@layera/buttons' or its corresponding type declarations.

6 import { Button } from '@layera/buttons';
                         ~~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:7:31 - error TS7016: Could not find a declaration file for module '@layera/theme-switcher'. 'C:/layera/packages/theme-switcher/dist/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/layera__theme-switcher` if it exists or add a new declaration (.d.ts) file containing `declare module '@layera/theme-switcher';`

7 import { ThemeSwitcher } from '@layera/theme-switcher';
                                ~~~~~~~~~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:8:104 - error TS7016: Could not find a declaration file for module '@layera/layout'. 'C:/layera/packages/layout/dist/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/layera__layout` if it exists or add a new declaration (.d.ts) file containing `declare module '@layera/layout';`

8 import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, FlexColumn, Box } from '@layera/layout'; 
                                                                                                         ~~~~~~~~~~~~~~~~  

src/components/NewDashboard.tsx:9:64 - error TS2307: Cannot find module '@layera/cards' or its corresponding type declarations.

9 import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
                                                                 ~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:10:35 - error TS6133: 'SaveIcon' is declared but its value is never read.

10 import { CheckIcon, SettingsIcon, SaveIcon, GlobeIcon, CloseIcon, BriefcaseIcon } from '@layera/icons';
                                     ~~~~~~~~

src/components/NewDashboard.tsx:10:45 - error TS6133: 'GlobeIcon' is declared but its value is never read.

10 import { CheckIcon, SettingsIcon, SaveIcon, GlobeIcon, CloseIcon, BriefcaseIcon } from '@layera/icons';
                                               ~~~~~~~~~

src/components/NewDashboard.tsx:10:67 - error TS6133: 'BriefcaseIcon' is declared but its value is never read.

10 import { CheckIcon, SettingsIcon, SaveIcon, GlobeIcon, CloseIcon, BriefcaseIcon } from '@layera/icons';
                                                                     ~~~~~~~~~~~~~

src/components/NewDashboard.tsx:11:1 - error TS6133: 'SPACING_SCALE' is declared but its value is never read.

11 import { SPACING_SCALE } from '@layera/constants';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:12:26 - error TS7016: Could not find a declaration file for module './QuickActions'. 'C:/layera/apps/layera-id/src/components/QuickActions.jsx' implicitly has an 'any' type.

12 import QuickActions from './QuickActions';
                            ~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:34:25 - error TS2322: Type '{ variant: string; showFlags: boolean; }' is not assignable to 
type 'IntrinsicAttributes & LanguageSwitcherProps'.
  Property 'variant' does not exist on type 'IntrinsicAttributes & LanguageSwitcherProps'.

34       <LanguageSwitcher variant="toggle" showFlags={true} />
                           ~~~~~~~

src/components/NewDashboard.tsx:41:34 - error TS2322: Type 'void | Promise<void>' is not assignable to type 'void'.        
  Type 'Promise<void>' is not assignable to type 'void'.

41             onClick={(): void => navigate('/account')}
                                    ~~~~~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:101:47 - error TS2551: Property 'mfa_verified' does not exist on type 'LayeraCustomClaims'. Did you mean 'mfaVerified'?

101                     value: user.layeraClaims?.mfa_verified ? t('status.enabled') : t('status.disabled'),
                                                  ~~~~~~~~~~~~

  ../../packages/auth-bridge/dist/types/auth.d.ts:29:14
    29     readonly mfaVerified: boolean;
                    ~~~~~~~~~~~
    'mfaVerified' is declared here.

src/components/NewDashboard.tsx:106:41 - error TS2551: Property 'mfa_verified' does not exist on type 'LayeraCustomClaims'. Did you mean 'mfaVerified'?

106                     {user.layeraClaims?.mfa_verified ? (
                                            ~~~~~~~~~~~~

  ../../packages/auth-bridge/dist/types/auth.d.ts:29:14
    29     readonly mfaVerified: boolean;
                    ~~~~~~~~~~~
    'mfaVerified' is declared here.

src/components/NewDashboard.tsx:157:24 - error TS2322: Type '{ children: string; size: string; color: string; fontFamily: string; }' is not assignable to type 'IntrinsicAttributes'.
  Property 'children' does not exist on type 'IntrinsicAttributes'.

157                       <Text size="sm" color="secondary" fontFamily="monospace">
                           ~~~~

src/components/NewDashboard.tsx:174:35 - error TS2551: Property 'mfa_verified' does not exist on type 'LayeraCustomClaims'. Did you mean 'mfaVerified'?

174             {!user?.layeraClaims?.mfa_verified && (
                                      ~~~~~~~~~~~~

  ../../packages/auth-bridge/dist/types/auth.d.ts:29:14
    29     readonly mfaVerified: boolean;
                    ~~~~~~~~~~~
    'mfaVerified' is declared here.

src/components/NewDashboard.tsx:182:42 - error TS2322: Type 'void | Promise<void>' is not assignable to type 'void'.       
  Type 'Promise<void>' is not assignable to type 'void'.

182                     onClick={(): void => navigate('/mfa-enroll')}
                                             ~~~~~~~~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:185:22 - error TS2559: Type '{ children: string; }' has no properties in common with type 'IntrinsicAttributes'.

185                     <Text>{t('dashboard.actionDescriptions.enableMfa')}</Text>
                         ~~~~

src/components/NewDashboard.tsx:201:42 - error TS2322: Type 'void | Promise<void>' is not assignable to type 'void'.       
  Type 'Promise<void>' is not assignable to type 'void'.

201                     onClick={(): void => navigate('/admin/roles')}
                                             ~~~~~~~~~~~~~~~~~~~~~~~~

src/components/NewDashboard.tsx:204:22 - error TS2559: Type '{ children: string; }' has no properties in common with type 'IntrinsicAttributes'.

204                     <Text>Manage user roles and permissions</Text>
                         ~~~~

src/test-setup.ts:6:23 - error TS2304: Cannot find name 'vi'.

6   onAuthStateChanged: vi.fn(),
                        ~~

src/test-setup.ts:7:12 - error TS2304: Cannot find name 'vi'.

7   signOut: vi.fn(),
             ~~

src/test-setup.ts:8:31 - error TS2304: Cannot find name 'vi'.

8   signInWithEmailAndPassword: vi.fn(),
                                ~~

src/test-setup.ts:9:35 - error TS2304: Cannot find name 'vi'.

9   createUserWithEmailAndPassword: vi.fn(),
                                    ~~

src/test-setup.ts:10:26 - error TS2304: Cannot find name 'vi'.

10   sendEmailVerification: vi.fn(),
                            ~~

src/test-setup.ts:14:1 - error TS2304: Cannot find name 'vi'.

14 vi.mock('firebase/auth', () => ({
   ~~

src/test-setup.ts:15:12 - error TS2304: Cannot find name 'vi'.

15   getAuth: vi.fn(() => mockAuth),
              ~~

src/test-setup.ts:16:23 - error TS2304: Cannot find name 'vi'.

16   onAuthStateChanged: vi.fn(),
                         ~~

src/test-setup.ts:17:12 - error TS2304: Cannot find name 'vi'.

17   signOut: vi.fn(),
              ~~

src/test-setup.ts:18:31 - error TS2304: Cannot find name 'vi'.

18   signInWithEmailAndPassword: vi.fn(),
                                 ~~

src/test-setup.ts:19:35 - error TS2304: Cannot find name 'vi'.

19   createUserWithEmailAndPassword: vi.fn(),
                                     ~~

src/test-setup.ts:20:26 - error TS2304: Cannot find name 'vi'.

20   sendEmailVerification: vi.fn(),
                            ~~

src/test-setup.ts:21:23 - error TS2304: Cannot find name 'vi'.

21   GoogleAuthProvider: vi.fn(),
                         ~~

src/test-setup.ts:22:20 - error TS2304: Cannot find name 'vi'.

22   signInWithPopup: vi.fn(),
                      ~~

src/test-setup.ts:25:1 - error TS2304: Cannot find name 'vi'.

25 vi.mock('firebase/app', () => ({
   ~~

src/test-setup.ts:26:18 - error TS2304: Cannot find name 'vi'.

26   initializeApp: vi.fn(),
                    ~~

src/test-setup.ts:27:12 - error TS2304: Cannot find name 'vi'.

27   getApps: vi.fn(() => []),
              ~~

src/test-setup.ts:44:8 - error TS7017: Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.

44 global.renderWithProviders = (ui: React.ReactElement, options = {}) => {
          ~~~~~~~~~~~~~~~~~~~

src/test-setup.ts:46:10 - error TS2304: Cannot find name 'render'.

46   return render(ui, options);
            ~~~~~~


Found 48 errors in 4 files.

Errors  Files
     2  src/components/__tests__/PrivateRoute.test.tsx:4
     6  src/components/DeviceFrameWrapper.tsx:2
    21  src/components/NewDashboard.tsx:3
    19  src/test-setup.ts:6
npm error Lifecycle script `typecheck` failed with error:
npm error code 2
npm error path C:\layera\apps\layera-id
npm error workspace @layera/layera-id@1.0.0
npm error location C:\layera\apps\layera-id
npm error command failed
npm error command C:\WINDOWS\system32\cmd.exe /d /s /c tsc --noEmit


> @layera/address-breakdown@1.0.0 typecheck
> tsc --noEmit

Terminate batch job (Y/N)? 