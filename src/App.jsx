import './App.css'
import Mainpage from './Mainpage'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(true);
   
  const HandleClick = () => {
   
    setIsOpen(current => !current);
  }


  return (
    
    <div className='flex flex-col h-screen w-screen overflow-hidden'>
     <Navbar HandleClick={HandleClick} />
    
    <div className='flex flex-row flex-1 w-full h-full'>
      <Sidebar isOpen={isOpen} />
     <Mainpage  />
    </div>
     
    </div>
  )
}

export default App
