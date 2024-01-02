import {socket} from './socket'
import {useState, useEffect} from 'react'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(()=>{
    const onConnect = ()=>{
      setIsConnected(true)
    }
    
    const onDisconnect = ()=>{
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    
    return ()=>{
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }

  },[])

  console.log(isConnected)

  return (
    <>
    <h1>Card Game</h1>
    </>
  )
}

export default App
