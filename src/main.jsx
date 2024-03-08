import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvide'
import { GlobalProvider } from './context/GlobalProvide.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <Router>
 <AuthProvider>
    <GlobalProvider>
      <App />
    </GlobalProvider>

 </AuthProvider>
</Router>
)
