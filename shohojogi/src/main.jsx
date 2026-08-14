import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Collections from './pages/Collections/Collections.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Collections />
  </StrictMode>,
)
