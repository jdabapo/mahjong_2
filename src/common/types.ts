/// <reference lib="dom" />
export interface Tile {
  suit : Suit | Honor | Bonus
  value : number | null
}
export type Suit = "Bamboo" | "Character" | "Balls"
export type Honor = "Green_Dragon" | "Red_Dragon" | "White_Dragon" | "East" | "South" | "West" | "North"
export type Bonus = "Flower" | "Season"