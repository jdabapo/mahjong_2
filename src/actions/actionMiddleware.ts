import { Socket } from "socket.io-client"
import { socket } from "../components/socket/socket"

export const socketMiddleware = (socket: Socket) => (params) => (next) => (action) => {
    const { dispatch, getState } = params
    const { type } = action
  
    switch (type) {
      case 'socket/connect':
        socket.connect('https://localhost:3000')
  
        socket.on('open', () => {})
        socket.on('message', (data) => {})
        socket.on('close', () => {})
        break
  
      case 'socket/disconnect':
        socket.disconnect()
        break
  
      default:
        break
    }
  
    return next(action)
  }
  