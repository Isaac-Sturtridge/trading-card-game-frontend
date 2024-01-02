import {socket} from './socket'
import {useState, useEffect} from 'react'
import GameStart from './components/GameStart'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(()=>{

    const onDisconnect = ()=>{
      setIsConnected(false)
    }

    const onConnect = ()=>{
      setIsConnected(true)
      console.log(socket.id)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    
    return ()=>{
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }

  },[])

  console.log(isConnected)
  console.log(socket)
  console.log(hasStarted)

  return (
    <>
    <h1>Card Game</h1>
    <GameStart hasStarted={hasStarted} setHasStarted={setHasStarted}/>
    {hasStarted? <h1>Game Started!</h1>: null}
    </>
  )
}

export default App
