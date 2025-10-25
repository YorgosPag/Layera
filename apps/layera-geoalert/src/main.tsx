import React from 'react'
import ReactDOM from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import '../../../packages/layout/dist/styles.css'
import App from './App.tsx'
import { TolgeeProvider } from '@layera/tolgee'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TolgeeProvider>
      <App />
    </TolgeeProvider>
  </React.StrictMode>,
)