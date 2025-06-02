import { StrictMode } from 'react'

import './index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App";



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
     
    
      
 
  </StrictMode>,
)
