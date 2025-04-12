import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contextshare from './Context/Contextshare.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contextshare>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Contextshare>
  </StrictMode>,
)
