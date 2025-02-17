
//imports del Router Dom para que funcione NavBar
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'

import { DarkmodeProvider } from './context/DarkmodeProvider'

createRoot(document.getElementById('root')).render(
  <DarkmodeProvider>
    <BrowserRouter>
        <StrictMode>
          <App></App>
        </StrictMode>
    </BrowserRouter>
  </DarkmodeProvider>
)
