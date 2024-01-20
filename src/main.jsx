import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Signup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
  <Route index path='/signup' element={<Signup />} />
  <Route path='/*' element={ <App />}/>
   
   
</Routes>
</BrowserRouter>
)
