import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  //  </StrictMode>
)

// export const backendApiUrl="https://argon-backend-k5jg.onrender.com"
export const backendApiUrl="http://localhost:9000"