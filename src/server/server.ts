import express from 'express'
const app = express()
import http from 'http'
import { Server } from 'socket.io'
import { ClientToServerEvents, EventTypes, ServerToClientEvents, ServerToServerEvents, SocketData } from '../common/events'
import GameMaster from './game_logic/GameMaster'

const server = http.createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  ServerToServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

const gameMaster = new GameMaster(false)

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id)
  // do something with incoming players

  socket.on(EventTypes.mahjongMessage, ({message, interactedTile})=> {
    console.log('Received clientEvent:', message, interactedTile )
  })

  socket.on(EventTypes.playerMessage, () => {
    // gameMaster needs to know when to start, etc.

  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})