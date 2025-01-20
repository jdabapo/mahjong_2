import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { ClientToServerEvents, EventTypes, GameState, PlayerMessage, ServerToClientEvents, ServerToServerEvents, SocketData } from '../common/events'
import GameMaster from './game_logic/GameMaster'

const app = express()
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/server.html');
});
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
let readyCheck = 0
let playerCount = 0
io.on('connection', (socket) => {

  // add player to gameMaster
  if(gameMaster.GetPlayers().length < 4) {
    console.log('adding player to gameMaster:', socket.id)
    gameMaster.AddPlayer(socket.id)
    playerCount++
  }
  else {
    console.log('game is full', gameMaster.GetPlayers())
    // Get GameState from GameMaster
    if(gameMaster.GetCurrentState() === GameState.WAITING) {
      gameMaster.InitGame()
      // Emit message clients to say they are ready
      socket.emit(EventTypes.gameStateMessage, {
        gameState: GameState.WAITING,
      })
    }
  }
  console.log('a user connected:', {
    id: socket.id,
    playerCount: playerCount,
    readyCheck: readyCheck
  })
  // just give hand when player connects
  socket.on(EventTypes.mahjongMessage, ({ interactedTile})=> {
    console.log('Received clientEvent:',  interactedTile )
    // so when a player discards, gamemaster needs to:
    // update the player's hand
    gameMaster.DeterminePlayersWithAction(interactedTile, 0)
  })

  socket.on(EventTypes.playerMessage, ({ playerId, message }) => {
    console.log('Received playerEvent:', playerId, message)
    // gameMaster needs to know when to start, etc.
    switch (message) {
      case PlayerMessage.PLAYER_READY:
        if (gameMaster.GetPlayers().length === 4 && gameMaster.GetPlayer(playerId)) {
          readyCheck++
          console.log('Ready check incremented. Ready check:', readyCheck)
        }
        if (readyCheck === 4) {
          gameMaster.InitGame()
        }
        break
      case PlayerMessage.PLAYER_NOT_READY:
        readyCheck--
        break
      case PlayerMessage.PLAYER_MESSAGE:
        console.log('Player message:', playerId)
        break
      default:
        break
    }
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
    // remove player from gameMaster
    const player = gameMaster.GetPlayer(socket.id)
    gameMaster.RemovePlayer(player)
    playerCount--
    readyCheck--
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})