import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { LayeraI18nProvider } from '@layera/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LayeraI18nProvider>
      <App />
    </LayeraI18nProvider>
  </React.StrictMode>,
)