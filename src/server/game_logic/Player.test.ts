import { Tile } from "../../common/types"
import { Player } from "./Player"

describe('Player', () => {
  let player: Player
  const tile1: Tile = { suit: 'Bamboo', value: 1 }
  const tile2: Tile = { suit: 'Bamboo', value: 2 }
  const tile3: Tile = { suit: 'Bamboo', value: 3 }
  const tile4: Tile = { suit: 'Bamboo', value: 4 }

  beforeEach(() => {
    player = new Player('player1')
  })

  describe('HasKong', () => {
    it('should return a kong if the player has a pung and the discarded tile matches', () => {
      player.AddToHand(tile1)
      player.AddToHand(tile1)
      player.AddToHand(tile1)
      const result = player.HasKong(tile1)
      expect(result).toEqual([tile1, tile1, tile1, tile1])
    })

    it('should return an empty array if the player does not have a kong', () => {
      player.AddToHand(tile1)
      player.AddToHand(tile1)
      const result = player.HasKong(tile1)
      expect(result).toEqual([])

      const player2 = new Player('player2')
      player2.AddToHand(tile1)
      player2.AddToHand(tile2)
      player2.AddToHand(tile3)
      const result2 = player2.HasKong(tile1)
      expect(result2).toEqual([])
    })
  })

  describe('HasPung', () => {
        it('should return a pung if the player has two matching tiles and the discarded tile matches and only has 2 tiles left in hand', () => {
            player.AddToHand(tile1)
            player.AddToHand(tile1)
            const result = player.HasPung(tile1)
            expect(result).toEqual([tile1, tile1, tile1])
        })

        it('should return a pung if the player has two matching tiles and the discarded tile matches and has more than 2 tiles left in hand', () => {
            player.AddToHand(tile1)
            player.AddToHand(tile1)
            player.AddToHand(tile2)
            const result = player.HasPung(tile1)
            expect(result).toEqual([tile1, tile1, tile1])
        })

        it('should return an empty array if the player does not have two matching tiles', () => {
            player.AddToHand(tile1)
            const result = player.HasPung(tile1)
            expect(result).toEqual([])
        })
    })

    describe('HasChow', () => {
        it('should return a chow if the player has two matching tiles and the discarded tile matches and only has 2 tiles left in hand', () => {
            player.AddToHand(tile1)
            player.AddToHand(tile2)
            const result = player.HasChow(tile3, 3)
            expect(result).toEqual([[tile1, tile2, tile3]])
        })

        it('should return muliple chows if the player has multiple options for a chow', () => {
            player.AddToHand(tile1)
            player.AddToHand(tile2)
            player.AddToHand(tile4)
            const result = player.HasChow(tile3, 3)
            expect(result).toEqual([[tile1, tile2, tile3], [tile2, tile3, tile4]])
        })

        it('should return an empty array if the turn order is not correct', () => {
            player.AddToHand(tile1)
            player.AddToHand(tile2)
            const result = player.HasChow(tile3, 2)
            expect(result).toEqual([])
        })

        it('should not return a chow if the turn order is correct but the tiles are not in sequence', () => {
            player.AddToHand(tile1)
            player.AddToHand(tile2)
            const result = player.HasChow(tile4, 3)
            expect(result).toEqual([])
        })
    })
})