import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "@fontsource/inter"; 
import "@fontsource/inter/400.css"; 
import "@fontsource/inter/400-italic.css";
import UserState from './context/UserContext/UserState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserState>
    <App />
    </UserState>
  </StrictMode>,
)
