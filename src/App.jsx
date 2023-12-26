import './App.css'
import Mainpage from './Mainpage'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function App() {
 

  return (
    
    <div className='flex flex-col h-screen w-screen '>
     <Navbar />
    
    <div className='flex flex-row flex-1 w-full'>
     <Sidebar />
     <Mainpage  />
    </div>
     
    </div>
  )
}

export default App
