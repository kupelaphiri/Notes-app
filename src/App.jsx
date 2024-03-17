import './App.css'
import AppRoutes from './AppRoutes'
import useGlobal from './hooks/useGlobal';
import { useEffect } from 'react';




const ENDPOINT = "http://localhost:5000";



function App() {
  


  
  
  
  
 
  return (
    
 <div className='flex flex-col h-screen w-screen overflow-hidden'>
   
   <AppRoutes />
   
     
 </div>
  )
}

export default App
