import express from 'express'
const app = express()
import http from 'http'
import { Server } from 'socket.io'
import { ClientToServerEvents, EventTypes, MahjongMessage, ServerToClientEvents, ServerToServerEvents, SocketData } from '../common/events'
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

const gameMaster = new GameMaster(true)
gameMaster.InitGame()
const a = gameMaster.GetPlayerHand('test')
console.log('initial hand:', a)

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id)
  // store ID into gameMaster
  // now give the deck to the user 
  socket.emit(EventTypes.gameStateMessage, {
    playerId: 'test',
    hand: a,
    message: MahjongMessage.PUNG
  })
  // get deck
  // just give hand when player connects
  socket.on(EventTypes.mahjongMessage, ({message, interactedTile})=> {
    console.log('Received clientEvent:', message, interactedTile )
    // so when a player discards, gamemaster needs to:
    // update the player's hand
    gameMaster.DeterminePlayersWithAction(interactedTile, 0)
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