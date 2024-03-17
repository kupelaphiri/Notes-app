import './App.css'
import AppRoutes from './AppRoutes'
import useGlobal from './hooks/useGlobal';
import { useEffect } from 'react';
import { Socket } from './socket';
import socketIOClient from "socket.io-client";


const ENDPOINT = "http://localhost:5000";



function App() {
  const {socket, setSocket} = useGlobal()


  
  useEffect(()=>{
    socket?.on('connect', ()=>{
      console.log('socket has connected')
    })
  }, [socket])
  
  
  useEffect(()=> {
  const Socket = socketIOClient(ENDPOINT);

    setSocket(Socket)
  }, [])

  return (
    
 <div className='flex flex-col h-screen w-screen overflow-hidden'>
   
   <AppRoutes />
   
     
 </div>
  )
}

export default App
