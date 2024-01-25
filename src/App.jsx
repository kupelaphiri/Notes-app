import './App.css'
import Archivepage from './Archivepage'
import Mainpage from './Mainpage'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Trashpage from './Trashpage'
import RootLayout from './Layout/RootLayout'
import AppRoutes from './AppRoutes'

function App() {
  // const [isOpen, setIsOpen] = useState(true);
  // const [isOn, setIsOn] = useState(false)
   
  // const HandleClick = () => {
  //   setIsOpen(current => !current);
  // }
  
  // const portraitView = () => {
  //   setIsOn(current => !current);
  //   console.log('functon call');
  
  // }


  return (
    
 <div className='flex flex-col h-screen w-screen overflow-hidden'>
   
   <AppRoutes />
   
     
 </div>
  )
}

export default App
