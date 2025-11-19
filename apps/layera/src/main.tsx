import React from 'react'
import ReactDOM from 'react-dom/client'
import '@layera/tokens/css'
import 'leaflet/dist/leaflet.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)