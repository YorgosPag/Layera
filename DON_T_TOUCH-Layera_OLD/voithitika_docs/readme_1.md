[plugin:vite:import-analysis] Failed to resolve import "@layera/domain/unified/types" from "..\..\packages\pipelines\unified\index.ts". Does the file exist?
C:/layera/packages/pipelines/unified/index.ts:14:14
2  |  export * from "./steps";
3  |  export { useUnifiedPipeline } from "./hooks/useUnifiedPipeline";
4  |  export * from "@layera/domain/unified/types";
   |                 ^
5  |  export * from "@layera/domain/unified/schemas";
6  |  export { unifiedPipelineMachine } from "./state/machine";
    at formatError (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44066:46)
    at TransformContext.error (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44062:19)
    at normalizeUrl (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41845:33)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41999:47
    at async Promise.all (index 3)
    at async TransformContext.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:41915:13)
    at async Object.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44356:30)
    at async loadAndTransform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:55088:29)
    at async viteTransformMiddleware (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:64699:32
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.