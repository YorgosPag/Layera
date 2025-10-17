PS C:\Layera> npm run dev

> layera@1.0.0 dev
> npm run dev --workspace=@layera/layera-id


> @layera/layera-id@1.0.0 dev
> vite

You are using Node.js 20.17.0. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.

  VITE v7.1.10  ready in 768 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
11:16:09 π.μ. [vite] (client) ✨ new dependencies optimized: react-dom/client, react-router-dom, firebase/app, firebase/auth
, firebase/functions
11:16:09 π.μ. [vite] (client) ✨ optimized dependencies changed. reloading

react-dom_client.js?v=35d0094a:20103 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
chunk-NINVGBBQ.js?v=35d0094a:1851 Uncaught FirebaseError: Firebase: Firebase App named '[DEFAULT]' already exists with different options or config (app/duplicate-app).
    at initializeFirebaseApp (firebase.js:35:19)
    at main.jsx:8:1
initializeFirebaseApp	@	firebase.js:35
(anonymous)	@	main.jsx:8
