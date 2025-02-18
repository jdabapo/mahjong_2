import { Player } from "../server/game_logic/Player"
import { Tile } from "./types"

export enum EventTypes {
  mahjongMessage = "mahjongMessage",
  playerMessage = "playerMessage",
  chatMessage = "chatMessage",
  gameStateMessage = "gameStateMessage",
}

export interface BaseEvent {
  channel: (channel: Channel) => void
}

export interface ClientToServerEvents extends BaseEvent {
  [EventTypes.chatMessage]: (message: string) => void
  [EventTypes.mahjongMessage]: (payload: MahjongMessagePayload) => void
  
  [EventTypes.playerMessage]: (payload: PlayerMessagePayload) => void

}

export interface ServerToClientEvents extends BaseEvent {
  [EventTypes.gameStateMessage]: (payload: GameMessagePayload) => void
  [EventTypes.mahjongMessage]: (payload: MahjongMessagePayload) => void
}

export interface ServerToServerEvents extends BaseEvent {

}

export interface SocketData {
  id: string
  name: string
  age: number
}


export interface MahjongMessagePayload {
  interactedTile: Tile
  pickuper?: Player
}

export interface PlayerMessagePayload {
  playerId: string
  message: PlayerMessage
}

export interface GameMessagePayload {
  playerId?: string
  gameState?: GameState
  hand?: Tile[]
}

export enum Channel {CHAT = "CHAT", MAHJONG = "MAHJONG", GAME = "GAME"}

export enum MahjongMessage {
  PUNG = "PUNG",
  KONG = "KONG",
  MAHJONG = "MAHJONG",
  DISCARD = "DISCARD",
  PASS = "PASS",
  CHOW = "CHOW"
}
export enum GameMessage {
  INIT_DEAL = "INIT_DEAL",
  DEAL_ONE = "DEAL_ONE",
  GAME_START = "GAME_START",
  GAME_END = "GAME_END",
  USER_JOIN = "USER_JOIN",
  USER_LEAVE = "USER_LEAVE"
}

export enum PlayerMessage {
  PLAYER_READY = "PLAYER_READY",
  PLAYER_NOT_READY = "PLAYER_NOT_READY",
  PLAYER_MESSAGE = "PLAYER_MESSAGE"
}

export enum GameState {
  READY = "READY",
  WAITING = "WAITING",
  STARTED = "STARTED",
  DEAL = "DEAL",
  DISCARD = "DISCARD",
  PAUSE = "PAUSE",
  PICKUP = "PICKUP"
}