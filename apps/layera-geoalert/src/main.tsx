import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../../packages/buttons/src/styles/index.css'
// TODO: Fix cards CSS import - temporarily disabled due to @import issues
// import '../../../packages/cards/src/styles/index.css'
// TODO: Re-enable when @layera/tokens CSS is properly set up
// import '@layera/tokens/dist/tokens.css'
import App from './App.tsx'
import { TolgeeProvider } from '@layera/tolgee'

// Load Leaflet CSS manually to ensure it's loaded
const loadLeafletCSS = (): void => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  link.crossOrigin = '';
  document.head.appendChild(link);

  if (import.meta.env.MODE === 'development') {
    link.onload = () => console.info('✅ Leaflet CSS loaded successfully');
    link.onerror = () => console.error('❌ Failed to load Leaflet CSS');
  }
};

// Load CSS immediately
loadLeafletCSS();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TolgeeProvider>
      <App />
    </TolgeeProvider>
  </React.StrictMode>,
)