PS C:\layera> npm run typecheck

> layera@1.0.0 typecheck
> npm run typecheck --workspaces --if-present


> @layera/layera-id@1.0.0 typecheck
> tsc --noEmit

tsconfig.json:49:5 - error TS6306: Referenced project 'C:/layera/packages/auth-bridge' must have setting "composite": true.

49     {
       ~
50       "path": "../../packages/auth-bridge"
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
51     }
   ~~~~~


Found 1 error in tsconfig.json:49

npm error Lifecycle script `typecheck` failed with error:
npm error code 2
npm error path C:\layera\apps\layera-id
npm error workspace @layera/layera-id@1.0.0
npm error location C:\layera\apps\layera-id
npm error command failed
npm error command C:\WINDOWS\system32\cmd.exe /d /s /c tsc --noEmit


> @layera/address-breakdown@1.0.0 typecheck
> tsc --noEmit

src/components/AddressBreakdownCard.tsx:13:26 - error TS2307: Cannot find module '@layera/cards' or its corresponding type 
declarations.

13 import { BaseCard } from '@layera/cards';
                            ~~~~~~~~~~~~~~~

src/components/AddressBreakdownCard.tsx:14:24 - error TS2307: Cannot find module '@layera/buttons' or its corresponding type declarations.

14 import { Button } from '@layera/buttons';
                          ~~~~~~~~~~~~~~~~~

src/components/AddressBreakdownCard.tsx:15:21 - error TS7016: Could not find a declaration file for module '@layera/layout'. 'C:/layera/node_modules/.pnpm/@layera+layout@file+package_6ded3d1564251031b5b2c73d4738bdbc/node_modules/@layera/layout/dist/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/layera__layout` if it exists or add a new declaration (.d.ts) file containing `declare module '@layera/layout';`

15 import { Box } from '@layera/layout';
                       ~~~~~~~~~~~~~~~~

src/components/AddressBreakdownCard.tsx:18:25 - error TS2307: Cannot find module '@layera/loading' or its corresponding type declarations.

18 import { Spinner } from '@layera/loading';
                           ~~~~~~~~~~~~~~~~~

src/components/AddressBreakdownCard.tsx:160:14 - error TS2322: Type '{ children: (string | number)[]; as: string; marginLeft: string; fontSize: string; color: string; }' is not assignable to type 'IntrinsicAttributes'.
  Property 'children' does not exist on type 'IntrinsicAttributes'.

160             <Text
                 ~~~~

src/components/AddressBreakdownCard.tsx:241:13 - error TS2322: Type '"var(--la-text-align-left, left)"' is not assignable to type 'TextAlign | undefined'.

241             textAlign: 'var(--la-text-align-left, left)', // Ευθυγράμμιση κειμένου προς τα αριστερά
                ~~~~~~~~~

src/components/AddressBreakdownCard.tsx:259:14 - error TS2322: Type '{ children: (string | number)[]; as: string; fontWeight: string; color: string; minWidth: string; }' is not assignable to type 'IntrinsicAttributes'.
  Property 'children' does not exist on type 'IntrinsicAttributes'.

259             <Text
                 ~~~~

../geo-mapping/src/services/fallbackBoundaries.ts:8:47 - error TS2307: Cannot find module '@layera/geo-core' or its corresponding type declarations.

8 import type { GeoJSONFeatureCollection } from '@layera/geo-core';
                                                ~~~~~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:167:41 - error TS2322: Type 'number' is not assignable to type 'void'.

167 export const getCacheSize = (): void => 0;
                                            ~

../geo-mapping/src/services/osmService.ts:168:43 - error TS2322: Type 'boolean' is not assignable to type 'void'.

168 export const isBoundsCached = (): void => false;
                                              ~~~~~

../geo-mapping/src/services/osmService.ts:174:10 - error TS6133: 'convertOSMGeometry' is declared but its value is never read.

174 function convertOSMGeometry(element: unknown): unknown {
             ~~~~~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:175:8 - error TS18046: 'element' is of type 'unknown'.

175   if (!element.geometry) return null;
           ~~~~~~~

../geo-mapping/src/services/osmService.ts:177:7 - error TS18046: 'element' is of type 'unknown'.

177   if (element.type === 'relation') {
          ~~~~~~~

../geo-mapping/src/services/osmService.ts:181:9 - error TS18046: 'element' is of type 'unknown'.

181     if (element.geometry && element.geometry.length > 0) {
            ~~~~~~~

../geo-mapping/src/services/osmService.ts:181:29 - error TS18046: 'element' is of type 'unknown'.

181     if (element.geometry && element.geometry.length > 0) {
                                ~~~~~~~

../geo-mapping/src/services/osmService.ts:184:7 - error TS18046: 'element' is of type 'unknown'.

184       element.geometry.forEach((geom: unknown) => {
          ~~~~~~~

../geo-mapping/src/services/osmService.ts:185:13 - error TS18046: 'geom' is of type 'unknown'.

185         if (geom.lat && geom.lon) {
                ~~~~

../geo-mapping/src/services/osmService.ts:185:25 - error TS18046: 'geom' is of type 'unknown'.

185         if (geom.lat && geom.lon) {
                            ~~~~

../geo-mapping/src/services/osmService.ts:186:27 - error TS18046: 'geom' is of type 'unknown'.

186           outerRing.push([geom.lon, geom.lat]);
                              ~~~~

../geo-mapping/src/services/osmService.ts:186:37 - error TS18046: 'geom' is of type 'unknown'.

186           outerRing.push([geom.lon, geom.lat]);
                                        ~~~~

../geo-mapping/src/services/osmService.ts:192:13 - error TS2532: Object is possibly 'undefined'.

192         if (outerRing[0][0] !== outerRing[outerRing.length - 1][0] ||
                ~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:192:33 - error TS2532: Object is possibly 'undefined'.

192         if (outerRing[0][0] !== outerRing[outerRing.length - 1][0] ||
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:193:13 - error TS2532: Object is possibly 'undefined'.

193             outerRing[0][1] !== outerRing[outerRing.length - 1][1]) {
                ~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:193:33 - error TS2532: Object is possibly 'undefined'.

193             outerRing[0][1] !== outerRing[outerRing.length - 1][1]) {
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:194:30 - error TS2488: Type 'number[] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator.

194           outerRing.push([...outerRing[0]]);
                                 ~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:208:7 - error TS18046: 'element' is of type 'unknown'.

208   if (element.type === 'way') {
          ~~~~~~~

../geo-mapping/src/services/osmService.ts:211:9 - error TS18046: 'element' is of type 'unknown'.

211     if (element.geometry) {
            ~~~~~~~

../geo-mapping/src/services/osmService.ts:212:7 - error TS18046: 'element' is of type 'unknown'.

212       element.geometry.forEach((geom: unknown) => {
          ~~~~~~~

../geo-mapping/src/services/osmService.ts:213:13 - error TS18046: 'geom' is of type 'unknown'.

213         if (geom.lat && geom.lon) {
                ~~~~

../geo-mapping/src/services/osmService.ts:213:25 - error TS18046: 'geom' is of type 'unknown'.

213         if (geom.lat && geom.lon) {
                            ~~~~

../geo-mapping/src/services/osmService.ts:214:29 - error TS18046: 'geom' is of type 'unknown'.

214           coordinates.push([geom.lon, geom.lat]);
                                ~~~~

../geo-mapping/src/services/osmService.ts:214:39 - error TS18046: 'geom' is of type 'unknown'.

214           coordinates.push([geom.lon, geom.lat]);
                                          ~~~~

../geo-mapping/src/services/osmService.ts:221:11 - error TS2532: Object is possibly 'undefined'.

221       if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
              ~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:221:33 - error TS2532: Object is possibly 'undefined'.

221       if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:222:11 - error TS2532: Object is possibly 'undefined'.

222           coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
              ~~~~~~~~~~~~~~

../geo-mapping/src/services/osmService.ts:222:33 - error TS2532: Object is possibly 'undefined'.

222           coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:169:42 - error TS2532: Object is possibly 'undefined'.

169   for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
                                             ~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:170:42 - error TS2532: Object is possibly 'undefined'.

170   for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
                                             ~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:175:7 - error TS2532: Object is possibly 'undefined'.

175       matrix[j][i] = Math.min(
          ~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:176:9 - error TS2532: Object is possibly 'undefined'.

176         matrix[j][i - 1] + 1,     // deletion
            ~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:177:9 - error TS2532: Object is possibly 'undefined'.

177         matrix[j - 1][i] + 1,     // insertion
            ~~~~~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:178:9 - error TS2532: Object is possibly 'undefined'.

178         matrix[j - 1][i - 1] + cost // substitution
            ~~~~~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:183:10 - error TS2532: Object is possibly 'undefined'.

183   return matrix[str2.length][str1.length];
             ~~~~~~~~~~~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:205:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

205     postalCode = parts[postalIndex];
        ~~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:211:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

211     streetWithNumberAndPostal = postalCode
        ~~~~~~~~~~~~~~~~~~~~~~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:221:35 - error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

221     if (/^\d{3,5}(-\d{4})?$/.test(part)) continue;
                                      ~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:223:22 - error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

223     if (/^\d+$/.test(part)) continue;
                         ~~~~

../geo-mapping/src/utils/administrativeHierarchy.ts:227:25 - error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

227     nonStreetParts.push(part);
                            ~~~~


Found 48 errors in 4 files.

Errors  Files
     7  src/components/AddressBreakdownCard.tsx:13
     1  ../geo-mapping/src/services/fallbackBoundaries.ts:8
    28  ../geo-mapping/src/services/osmService.ts:167
    12  ../geo-mapping/src/utils/administrativeHierarchy.ts:169
npm error Lifecycle script `typecheck` failed with error:
npm error code 2
npm error path C:\layera\packages\address-breakdown
npm error workspace @layera/address-breakdown@1.0.0
npm error location C:\layera\packages\address-breakdown
npm error command failed
npm error command C:\WINDOWS\system32\cmd.exe /d /s /c tsc --noEmit


> @layera/auth-bridge@1.0.0 typecheck
> tsc --noEmit

src/components/TotpSetup.tsx:163:40 - error TS2322: Type 'Promise<void>' is not assignable to type 'void'.

163                   onClick={(): void => copyToClipboard(setupData.secret)}
                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/TotpSetup.tsx:184:17 - error TS2322: Type '(e: React.FormEvent<HTMLFormElement>) => void' is not assignable 
to type 'ChangeEventHandler<HTMLInputElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLInputElement>' is not assignable to type 'FormEvent<HTMLFormElement>'.
      Types of property 'currentTarget' are incompatible.
        Type 'EventTarget & HTMLInputElement' is not assignable to type 'EventTarget & HTMLFormElement'.
          Type 'EventTarget & HTMLInputElement' is missing the following properties from type 'HTMLFormElement': acceptCharset, action, elements, encoding, and 11 more.

184                 onChange={(e: React.FormEvent<HTMLFormElement>) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    ~~~~~~~~

  ../../node_modules/.pnpm/@types+react@19.2.2/node_modules/@types/react/index.d.ts:3254:9
    3254         onChange?: ChangeEventHandler<T> | undefined;
                 ~~~~~~~~
    The expected type comes from property 'onChange' which is declared here on type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'

src/components/TotpSetup.tsx:184:97 - error TS2339: Property 'value' does not exist on type 'EventTarget'.

184                 onChange={(e: React.FormEvent<HTMLFormElement>) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                                                                    ~~~~~

src/components/TotpSetup.tsx:214:36 - error TS2322: Type 'Promise<void>' is not assignable to type 'void'.

214               onClick={(): void => copyToClipboard(setupData.backupCodes.join('\n'))}
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/components/TotpSetup.tsx:310:15 - error TS2322: Type '(e: React.FormEvent<HTMLFormElement>) => void' is not assignable 
to type 'ChangeEventHandler<HTMLInputElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLInputElement>' is not assignable to type 'FormEvent<HTMLFormElement>'.
      Types of property 'currentTarget' are incompatible.
        Type 'EventTarget & HTMLInputElement' is not assignable to type 'EventTarget & HTMLFormElement'.
          Type 'EventTarget & HTMLInputElement' is missing the following properties from type 'HTMLFormElement': acceptCharset, action, elements, encoding, and 11 more.

310               onChange={(e: React.FormEvent<HTMLFormElement>) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  ~~~~~~~~

  ../../node_modules/.pnpm/@types+react@19.2.2/node_modules/@types/react/index.d.ts:3254:9
    3254         onChange?: ChangeEventHandler<T> | undefined;
                 ~~~~~~~~
    The expected type comes from property 'onChange' which is declared here on type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'

src/components/TotpSetup.tsx:310:83 - error TS2339: Property 'value' does not exist on type 'EventTarget'.

310               onChange={(e: React.FormEvent<HTMLFormElement>) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                                                      ~~~~~

src/components/TotpSetup.tsx:351:15 - error TS2322: Type '(e: React.FormEvent<HTMLFormElement>) => void' is not assignable 
to type 'ChangeEventHandler<HTMLInputElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLInputElement>' is not assignable to type 'FormEvent<HTMLFormElement>'.
      Types of property 'currentTarget' are incompatible.
        Type 'EventTarget & HTMLInputElement' is not assignable to type 'EventTarget & HTMLFormElement'.
          Type 'EventTarget & HTMLInputElement' is missing the following properties from type 'HTMLFormElement': acceptCharset, action, elements, encoding, and 11 more.

351               onChange={(e: React.FormEvent<HTMLFormElement>) => setBackupCode(e.target.value)}
                  ~~~~~~~~

  ../../node_modules/.pnpm/@types+react@19.2.2/node_modules/@types/react/index.d.ts:3254:9
    3254         onChange?: ChangeEventHandler<T> | undefined;
                 ~~~~~~~~
    The expected type comes from property 'onChange' which is declared here on type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'

src/components/TotpSetup.tsx:351:89 - error TS2339: Property 'value' does not exist on type 'EventTarget'.

351               onChange={(e: React.FormEvent<HTMLFormElement>) => setBackupCode(e.target.value)}
                                                                                            ~~~~~

src/components/UserDisplay.tsx:106:9 - error TS2322: Type 'Element' is not assignable to type 'void'.

106         return (
            ~~~~~~

src/components/UserDisplay.tsx:115:9 - error TS2322: Type 'Element' is not assignable to type 'void'.

115         return <span className="font-medium">{label}</span>;
            ~~~~~~

src/components/UserDisplay.tsx:118:9 - error TS2322: Type 'Element' is not assignable to type 'void'.

118         return (
            ~~~~~~

src/utils/firebase.ts:56:20 - error TS2339: Property 'messagingSenderId' does not exist on type '{ projectId: string; apiKey: string; authDomain: string; storageBucket: string; }'.

56     firebaseConfig.messagingSenderId = config.messagingSenderId;
                      ~~~~~~~~~~~~~~~~~

src/utils/firebase.ts:60:20 - error TS2339: Property 'appId' does not exist on type '{ projectId: string; apiKey: string; authDomain: string; storageBucket: string; }'.

60     firebaseConfig.appId = config.appId;
                      ~~~~~


Found 13 errors in 3 files.

Errors  Files
     8  src/components/TotpSetup.tsx:163
     3  src/components/UserDisplay.tsx:106
     2  src/utils/firebase.ts:56
npm error Lifecycle script `typecheck` failed with error:
npm error code 2
npm error path C:\layera\packages\auth-bridge
npm error workspace @layera/auth-bridge@1.0.0
npm error location C:\layera\packages\auth-bridge
npm error command failed
npm error command C:\WINDOWS\system32\cmd.exe /d /s /c tsc --noEmit


> @layera/boundary-service@1.0.0 typecheck
> tsc --noEmit

src/factory.ts:7:41 - error TS6059: File 'C:/layera/packages/database-core/src/index.ts' is not under 'rootDir' 'C:/layera/packages/boundary-service/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Imported via '@layera/database-core' from file 'C:/layera/packages/boundary-service/src/factory.ts'
    Imported via '@layera/database-core' from file 'C:/layera/packages/boundary-service/src/service.ts'

7 import { createDatabaseNamespace } from '@layera/database-core';
                                          ~~~~~~~~~~~~~~~~~~~~~~~

  src/service.ts:8:51
    8 import { DatabaseNamespace, FirestoreCache } from '@layera/database-core';
                                                        ~~~~~~~~~~~~~~~~~~~~~~~
    File is included via import here.

src/factory.ts:72:30 - error TS2345: Argument of type '{ providers: ProviderConfig[]; cache: { ttl?: number; maxSize?: number; cleanupInterval?: number; }; queue: { maxSize?: number; processingInterval?: number; retry?: RetryConfig; }; defaults: 
{ ...; }; }' is not assignable to parameter of type 'BoundaryServiceConfig'.
  Types of property 'cache' are incompatible.
    Type '{ ttl?: number; maxSize?: number; cleanupInterval?: number; }' is not assignable to type 'CacheConfig' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
      Property 'ttl' is optional in type '{ ttl?: number; maxSize?: number; cleanupInterval?: number; }' but required in type 'CacheConfig'.

72   return new BoundaryService(finalConfig, namespace);
                                ~~~~~~~~~~~

src/service.ts:9:47 - error TS6059: File 'C:/layera/packages/geo-core/src/index.ts' is not under 'rootDir' 'C:/layera/packages/boundary-service/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Imported via '@layera/geo-core' from file 'C:/layera/packages/boundary-service/src/service.ts'
    Imported via '@layera/geo-core' from file 'C:/layera/packages/boundary-service/src/types/index.ts'

9 import type { GeoJSONFeatureCollection } from '@layera/geo-core';
                                                ~~~~~~~~~~~~~~~~~~

  src/types/index.ts:8:47
    8 import type { GeoJSONFeatureCollection } from '@layera/geo-core';
                                                    ~~~~~~~~~~~~~~~~~~
    File is included via import here.

src/service.ts:380:35 - error TS2677: A type predicate's type must be assignable to its parameter's type.
  Type 'PromiseFulfilledResult<{ name: string; health: unknown; }>' is not assignable to type 'PromiseSettledResult<{ name: string; health: ProviderHealth; }>'.
    Type 'PromiseFulfilledResult<{ name: string; health: unknown; }>' is not assignable to type 'PromiseFulfilledResult<{ name: string; health: ProviderHealth; }>'.
      Type '{ name: string; health: unknown; }' is not assignable to type '{ name: string; health: ProviderHealth; }'.     
        Types of property 'health' are incompatible.
          Type 'unknown' is not assignable to type 'ProviderHealth'.

380       .filter((result): result is PromiseFulfilledResult<{ name: string; health: unknown }> =>
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/service.ts:383:29 - error TS2339: Property 'value' does not exist on type 'PromiseSettledResult<{ name: string; health: ProviderHealth; }>'.
  Property 'value' does not exist on type 'PromiseRejectedResult'.

383       .map(result => result.value);
                                ~~~~~

../database-core/src/index.ts:9:35 - error TS6059: File 'C:/layera/packages/database-core/src/namespaces/namespace.ts' is not under 'rootDir' 'C:/layera/packages/boundary-service/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Imported via './namespaces/namespace' from file 'C:/layera/packages/database-core/src/index.ts'
    Imported via '../namespaces/namespace' from file 'C:/layera/packages/database-core/src/cache/firestore-cache.ts'       
    Imported via '../namespaces/namespace' from file 'C:/layera/packages/database-core/src/utils/factory.ts'

9 export { DatabaseNamespace } from './namespaces/namespace';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~

  ../database-core/src/cache/firestore-cache.ts:20:40
    20 import type { DatabaseNamespace } from '../namespaces/namespace';
                                              ~~~~~~~~~~~~~~~~~~~~~~~~~
    File is included via import here.
  ../database-core/src/utils/factory.ts:9:35
    9 import { DatabaseNamespace } from '../namespaces/namespace';
                                        ~~~~~~~~~~~~~~~~~~~~~~~~~
    File is included via import here.

../database-core/src/index.ts:10:32 - error TS6059: File 'C:/layera/packages/database-core/src/cache/firestore-cache.ts' is not under 'rootDir' 'C:/layera/packages/boundary-service/src'. 'rootDir' is expected to contain all source files.

10 export { FirestoreCache } from './cache/firestore-cache';
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~

../database-core/src/index.ts:47:62 - error TS6059: File 'C:/layera/packages/database-core/src/utils/factory.ts' is not under 'rootDir' 'C:/layera/packages/boundary-service/src'. 'rootDir' is expected to contain all source files.

47 export { createDatabaseNamespace, initializeFirestore } from './utils/factory';
                                                                ~~~~~~~~~~~~~~~~~

../database-core/src/namespaces/namespace.ts:27:8 - error TS6059: File 'C:/layera/packages/database-core/src/types/index.ts' is not under 'rootDir' 'C:/layera/packages/boundary-service/src'. 'rootDir' is expected to contain all source files.     
  The file is in the program because:
    Imported via '../types' from file 'C:/layera/packages/database-core/src/namespaces/namespace.ts'
    Imported via '../types' from file 'C:/layera/packages/database-core/src/cache/firestore-cache.ts'
    Imported via './types' from file 'C:/layera/packages/database-core/src/index.ts'

27 } from '../types';
          ~~~~~~~~~~

  ../database-core/src/cache/firestore-cache.ts:19:48
    19 import type { CacheStrategy, CacheStats } from '../types';
                                                      ~~~~~~~~~~
    File is included via import here.
  ../database-core/src/index.ts:44:8
    44 } from './types';
              ~~~~~~~~~
    File is included via import here.
