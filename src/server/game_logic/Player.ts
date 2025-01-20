import { MahjongMessagePayload } from "../../common/events"
import { Tile } from "../../common/types"

// have to end game with 17
export const MAX_HAND_SIZE = 17

export class Player {
    // TODO: NEEDS CONSTRUCTOR
    constructor(playerId: string)
    {
      this.playerId = playerId
      this.turnOrder = 0
    }

    private tiles: Tile[] = []
    turnOrder: number
    playerId: string | null
    GetHand(): Tile[] {return this.tiles}

    UpdateHand(pickupTile?: Tile, discardTile?: Tile): void {
        // push to the tiles hand
        if(pickupTile === discardTile){
            return
        }
        if(pickupTile) {
          this.tiles.push(pickupTile)
        }
        else if(discardTile){
          const index: number = this.tiles.indexOf(discardTile)
          if (index > -1) { this.tiles.splice(index, 1) }
        }

        // can discard either picked up tile or existing tile
        // sort the tiles here always
    }

    AddToHand(pickupTile: Tile): void {
        this.tiles.push(pickupTile)
    }
    /* TODO: Should run HasKong, HasPung, HasChow, and then return which actions it can do
    * Maybe return a JS Object
    *   { Pung: [[1,1,1]],
    *     Chow: [],
    *     Kong: [1,1,1,1]
    *   }
    */

    // Method describes if the player has an available action
    // Returns an object with the possible actions}
    HasAction(discardedTile: Tile, discardingPlayerTurn: number) {
      return {
        Pung: this.HasPung(discardedTile),
        Chow: this.HasChow(discardedTile, discardingPlayerTurn),
        Kong: this.HasKong(discardedTile)
      }
    }
    // Has quadruple [1,1,1,1]
    // First check if player has a Pung with current discarded tile, will work
    // But still need to check everything
    HasKong(discardedTile: Tile): Tile[]{
        if(this.tiles.length < 3 || this.HasPung(discardedTile).length === 0) {
          return []
        }
        const possibleKong: Tile[] = this.HasPung(discardedTile)
        if(possibleKong.length !== 0){
            if(possibleKong[0].suit === discardedTile.suit && possibleKong[0].value === discardedTile.value){
                possibleKong.push(discardedTile)
            }
        }
        return possibleKong
    }

    // Has a triple
    HasPung(discardedTile: Tile): Tile[] {
      if (this.tiles.length < 2) {
          return []
      }
  
      if (this.tiles.length === 2) {
          if (this.tiles[0].suit === this.tiles[1].suit && this.tiles[0].suit === discardedTile.suit) {
              if (this.tiles[0].value === this.tiles[1].value && this.tiles[0].value === discardedTile.value) {
                  return [this.tiles[0], this.tiles[1], discardedTile]
              }
          }
      } else {
          for (let i = 0; i < this.tiles.length - 1; i++) {
              const p_tile0 = this.tiles[i]
              const p_tile1 = this.tiles[i + 1]
              if (p_tile0.suit === p_tile1.suit && p_tile0.suit === discardedTile.suit) {
                  if (p_tile0.value === p_tile1.value && p_tile0.value === discardedTile.value) {
                      return [p_tile0, p_tile1, discardedTile]
                  }
              }
          }
      }
      return []
    }

    // max amount of eligible hands should be 3
    HasChow(discardedTile: Tile, discardingPlayerTurnOrder: number): Tile[][] {
      const possibleChow: Tile[][] = []
      const previousPlayerTurnOrder = (this.turnOrder - 1 + 4) % 4 // Assuming there are 4 players
      if (discardingPlayerTurnOrder !== previousPlayerTurnOrder || !discardedTile.value || this.tiles.length < 2) {
          return []
      }
  
      for (let i = 0; i < this.tiles.length - 1; i++) {
          const p_tile0 = this.tiles[i]
          const p_tile1 = this.tiles[i + 1]
  
          if (p_tile0.suit !== discardedTile.suit || p_tile1.suit !== discardedTile.suit) {
              continue
          }
  
          // if it goes [p_tile0, p_tile1, discard]
          if (p_tile0.value === discardedTile.value - 2 && p_tile1.value === discardedTile.value - 1) {
              possibleChow.push([p_tile0, p_tile1, discardedTile])
          }
          // if it goes [p_tile0, discard, p_tile1]
          else if (p_tile0.value === discardedTile.value - 1 && p_tile1.value === discardedTile.value + 1) {
              possibleChow.push([p_tile0, discardedTile, p_tile1])
          }
          // if it goes [discard, p_tile0, p_tile1]
          else if (p_tile0.value === discardedTile.value + 1 && p_tile1.value === discardedTile.value + 2) {
              possibleChow.push([discardedTile, p_tile0, p_tile1])
          }
      }
  
      return possibleChow
  }
      
}