import { useState, useEffect } from 'react'
import { socket } from './components/socket/socket'
import { ConnectionState } from './components/socket/ConnectionState'
import { ConnectionManager } from './components/socket/ConnectionManager'
import {MyForm} from './components/MyForm'
import { Hand } from './components/Hand'
import { Tile } from './components/Tile'


export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <MyForm />
      <Tile value={1} suit={'Balls'} id={0}/>
      <Hand />
    </div>
  )
}