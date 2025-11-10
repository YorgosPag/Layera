import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@layera/theme-switcher'
import '@layera/theme-switcher/dist/styles.css'
import '../../../packages/tokens/dist/css/tokens.css'
import '../../../packages/tokens/dist/css/utilities.css'
import './theme.css'
import '../../../packages/viewport/src/styles/responsive.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)