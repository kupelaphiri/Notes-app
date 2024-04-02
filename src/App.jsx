import './App.css'
import AppRoutes from './AppRoutes'
import useGlobal from './hooks/useGlobal';
import { useEffect } from 'react';








function App() {
  const {isDark} = useGlobal()


  
  
  
  
 
  return (
    
 <div className={`flex flex-col h-screen ${isDark? 'bg-dim': 'bg-white'} w-screen overflow-hidden`}>
   
   <AppRoutes />
   
     
 </div>
  )
}

export default App
