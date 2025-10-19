[plugin:vite:css] [postcss] ENOENT: no such file or directory, open 'C:\Layera\packages\layout\src\index.ts\dist\styles.css'
C:/layera/packages/styles/index.css
    at async open (node:internal/fs/promises:639:25)
    at async Object.readFile (node:internal/fs/promises:1242:14)
    at async Object.load (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:38850:30)
    at async Promise.all (index 0)
    at async LazyResult.runAsync (C:\layera\node_modules\.pnpm\postcss@8.5.6\node_modules\postcss\lib\lazy-result.js:293:11)
    at async compileCSS (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:38904:25)
    at async TransformContext.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:38301:56)
    at async Object.transform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:44356:30)
    at async loadAndTransform (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:55088:29)
    at async viteTransformMiddleware (file:///C:/layera/node_modules/.pnpm/vite@4.5.14_@types+node@22.18.11/node_modules/vite/dist/node/chunks/dep-827b23df.js:64699:32
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.