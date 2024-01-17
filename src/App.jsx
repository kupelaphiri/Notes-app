import './App.css'
import Archivepage from './Archivepage'
import Mainpage from './Mainpage'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Trashpage from './Trashpage'

function App() {
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
    
 <div className='flex flex-col h-screen w-screen overflow-hidden'>
     <Navbar HandleClick={HandleClick} portraitView={portraitView} />
    <div className='flex flex-row flex-1 w-full h-full'>
     <div className='flex flex-row h-full'>
      <Sidebar isOpen={isOpen} />
     </div>
     <Routes>
       <Route index path='/' element={<Mainpage isOn={isOn} isOpen={isOpen} />} />
       <Route path='/archivepage' element={<Archivepage isOn={isOn} />} />
       <Route path='/trashpage' element={<Trashpage isOn={isOn}/>} />
      
     </Routes>
    {/* <Mainpage  /> */}
    </div>
     
 </div>
  )
}

export default App
