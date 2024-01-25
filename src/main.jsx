import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Signup from './Signup.jsx'
import Loginpage from './Loginpage.jsx'
import { AuthProvider } from './context/AuthProvide'

ReactDOM.createRoot(document.getElementById('root')).render(
 <Router>
 <AuthProvider>
  <App />

 </AuthProvider>
</Router>
)
