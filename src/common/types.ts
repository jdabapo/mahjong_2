/// <reference lib="dom" />
export interface Tile {
  suit : Suit | Honor | Bonus;
  value? : number;
}
export type Suit = "Bamboo" | "Character" | "Balls";
export type Honor = "Green_Dragon" | "Red_Dragon" | "White_Dragon" | "East" | "South" | "West" | "North";
export type Bonus = "Flower" | "Season";
export type Hand = Tile[];

export interface action {
  action: MahjongMessage;
  interactedTiles: Array<Array<Tile>>;
}

export enum Channel {CHAT = "CHAT", MAHJONG = "MAHJONG", GAME = "GAME"}

export type MessageType = MahjongMessage | GameMessage | PlayerMessage;

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