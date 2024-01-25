import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Mainpage from './Mainpage'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Trashpage from './Trashpage'
import Archivepage from './Archivepage'
import App from './App'
import Signup from './Signup'
import RootLayout from './Layout/RootLayout'
import { useState } from 'react';
import Loginpage from './Loginpage'

function AppRoutes () {
  const [isOpen, setIsOpen] = useState(true);
  const [isOn, setIsOn] = useState(false)
   
  const HandleClick = () => {
    setIsOpen(current => !current);
  }
  
  const portraitView = () => {
    setIsOn(current => !current);
    console.log('functon call');
  
  }
  return (
    
  <Routes>
    <Route>
      <Route path='/login' element={<Loginpage />} />
      <Route path='/signup' element={<Signup />} />
    </Route>
    <Route path='/' element={<RootLayout />}>
      
      <Route index element={<Mainpage isOn={isOn} isOpen={isOpen} />} />
      <Route path='/archivepage' element={<Archivepage isOn={isOn} />} />
      <Route path='/trashpage' element={<Trashpage isOn={isOn}/>} />
   
    </Route>
  </Routes>
  
  )
}

export default AppRoutes
