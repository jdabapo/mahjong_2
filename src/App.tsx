import { useState, useEffect } from 'react'
import { socket } from './components/socket/socket'
import { ConnectionState } from './components/socket/ConnectionState'
import { ConnectionManager } from './components/socket/ConnectionManager'
import { Hand } from './components/Hand'
import { Tile } from './components/Tile'
import { ReadyButton } from './components/ReadyButton'


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
      <ReadyButton />
      <Tile value={1} suit={'Balls'}/>
      <Hand/>
    </div>
  )
}