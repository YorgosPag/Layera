[plugin:vite:import-analysis] Failed to resolve import "../i18n/src/locales/el/common.json" from "..\..\packages\tolgee\src\provider-minimal.tsx". Does the file exist?
C:/layera/packages/tolgee/src/provider-minimal.tsx:9:27
17 |  var _s = $RefreshSig$(), _s2 = $RefreshSig$();
18 |  import React, { createContext, useContext } from "react";
19 |  import elTranslations from "../i18n/src/locales/el/common.json";
   |                              ^
20 |  import enTranslations from "../i18n/src/locales/en/common.json";
21 |  const MinimalTolgeeContext = createContext(null);
    at formatError (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44066:46)
    at TransformContext.error (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44062:19)
    at normalizeUrl (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41845:33)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41999:47
    at async Promise.all (index 4)
    at async TransformContext.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41915:13)
    at async Object.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44356:30)
    at async loadAndTransform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:55088:29)
    at async viteTransformMiddleware (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:64699:32
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.