import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from '@/store/AppContext'
import { ApiProvider } from '@/store/ApiContext'
import { ThemeProvider } from '@/store/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
