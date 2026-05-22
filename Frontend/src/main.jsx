import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import Authprovider from './Context/Authprovider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './Context/SocketContext.jsx'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  
   <BrowserRouter>
    <Authprovider>
      <SocketProvider>
        <App />
      </SocketProvider>
      
    </Authprovider>
    </BrowserRouter>
 
)
