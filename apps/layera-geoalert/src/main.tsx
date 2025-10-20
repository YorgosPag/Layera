import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TolgeeProvider } from '@layera/tolgee'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TolgeeProvider>
      <App />
    </TolgeeProvider>
  </React.StrictMode>,
)