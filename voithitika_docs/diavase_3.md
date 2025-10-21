[plugin:vite:import-analysis] Failed to resolve import "./components/DeviceSimulator" from "..\..\packages\viewport\src\index.ts". Does the file exist?
C:/layera/packages/viewport/src/index.ts:40:32
20 |    useViewportWithOverride
21 |  } from "./components/DeviceSwitcher";
22 |  export { DeviceSimulator } from "./components/DeviceSimulator";
   |                                   ^
23 |
    at formatError (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44066:46)
    at TransformContext.error (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44062:19)
    at normalizeUrl (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41845:33)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41999:47
    at async Promise.all (index 4)
    at async TransformContext.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41915:13)
    at async Object.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44356:30)
    at async loadAndTransform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:55088:29
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.

App.tsx:20  GET http://localhost:3005/@fs/C:/layera/packages/viewport/src/index.ts net::ERR_ABORTED 500 (Internal Server Error)Understand this error
15:46:07.876 vite.svg:1  GET http://localhost:3005/vite.svg 404 (Not Found)
