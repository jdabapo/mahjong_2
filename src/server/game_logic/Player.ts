import { MahjongMessagePayload } from "../../common/events"
import { Hand, Tile } from "../../common/types"

// have to end game with 17
export const MAX_HAND_SIZE = 17

export class Player {
    // TODO: NEEDS CONSTRUCTOR
    constructor(playerId: string)
    {
      this.playerId = playerId
      this.turnOrder = 0
    }

    private tiles: Hand = new Array<Tile>()
    turnOrder: number
    playerId: string | null
    GetHand(): Hand {return this.tiles}

    UpdateHand(pickupTile: Tile,discardTile: Tile): void {
        // push to the tiles hand
        if(pickupTile === discardTile){
            return
        }
        this.tiles.push(pickupTile)
        const index: number = this.tiles.indexOf(discardTile)
        if (index > -1) { this.tiles.splice(index, 1) }
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
    HasAction(discardedTile: Tile,discardingPlayer: Player): MahjongMessagePayload[] {


    }
    // Has quadruple [1,1,1,1]
    // First check if player has a Pung with current discarded tile, will work
    // But still need to check everything
    HasKong(discardedTile: Tile): Array<Array<Tile>>{
        const possibleKong: Array<Array<Tile>> = this.HasPung(discardedTile)
        if(possibleKong.length !== 0){
            if(possibleKong[0][0].suit === discardedTile.suit && possibleKong[0][0].value === discardedTile.value){
                possibleKong[0].push(discardedTile)
            }
        }
        return possibleKong
    }

    // Has a triple
    HasPung(discardedTile: Tile): Array<Array<Tile>>{
        const possiblePung: Array<Array<Tile>> = []
        for (let i = 0; i < this.tiles.length - 2; i++) {
            const p_tile0 = this.tiles[i]
            const p_tile1 = this.tiles[i + 1]
            if(p_tile0.suit === p_tile1.suit  && p_tile0.suit === discardedTile.suit){
                if(p_tile0.value === p_tile1.value && p_tile0.value === discardedTile.value){
                    possiblePung.push([p_tile0,p_tile1,discardedTile])
                }
            }
        }
        return possiblePung
    }

    // max amount of eligible hands should be 3
    HasChow(discardedTile: Tile, nextPlayer: number): Array<Array<Tile>> {
        const possibleChow: Array<Array<Tile>> = []
        if (nextPlayer !== this.turnOrder || !discardedTile.value) {
          return possibleChow
        }
        // TODO: test this make sure it goes through entire list
        for (let i = 0; i < this.tiles.length - 2; i++) {
        
          const p_tile0 = this.tiles[i]
          const p_tile1 = this.tiles[i + 1]
          if(p_tile0.suit !== discardedTile.suit){
            continue
          }
          // if it goes [p_tile0,p_tile1,discard]
          else if (
            p_tile0.value === discardedTile.value - 2 &&
            p_tile1.value === discardedTile.value - 1
          ) { possibleChow.push([p_tile0,p_tile1,discardedTile]) }
          // if it goes [p_tile0,discard,p_tile1]
          else if (
            p_tile0.value === discardedTile.value - 1 &&
            p_tile1.value === discardedTile.value + 1
          ) { possibleChow.push([p_tile0,discardedTile,p_tile1]) }
          // if it goes [discard, p_tile, p_tile1]
          else if (
            p_tile0.value === discardedTile.value + 1 &&
            p_tile1.value === discardedTile.value + 2
          ) { possibleChow.push([discardedTile,p_tile0,p_tile1]) }
        }
        return possibleChow // No chow found
      }
      
}