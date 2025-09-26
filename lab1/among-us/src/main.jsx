import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AboutUs from './AboutUs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutUs />
  </StrictMode>,
)
