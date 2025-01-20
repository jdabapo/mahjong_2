import { Tile } from '../../common/types'
import GameMaster from './GameMaster'
import { Player } from './Player'

describe('GameMaster', () => {
  let gameMaster: GameMaster
  let player1: Player
  let player2: Player
  let player3: Player
  let player4: Player
  let discardedTile: Tile
  let bamboo2: Tile = { suit: 'Bamboo', value: 2 }
  let bamboo3: Tile = { suit: 'Bamboo', value: 3 }
  let bamboo4: Tile = { suit: 'Bamboo', value: 4 }
  let bamboo5: Tile = { suit: 'Bamboo', value: 5 }
  let bamboo6: Tile = { suit: 'Bamboo', value: 6 }

  beforeEach(() => {
    gameMaster = new GameMaster(false)

    gameMaster.AddPlayer('player1')
    gameMaster.AddPlayer('player2')
    gameMaster.AddPlayer('player3')
    gameMaster.AddPlayer('player4')

    player1 = gameMaster.GetPlayer('player1')
    player2 = gameMaster.GetPlayer('player2')
    player3 = gameMaster.GetPlayer('player3')
    player4 = gameMaster.GetPlayer('player4')

    gameMaster.ModifyTurnOrder('player1', 0)
    gameMaster.ModifyTurnOrder('player2', 1)
    gameMaster.ModifyTurnOrder('player3', 2)
    gameMaster.ModifyTurnOrder('player4', 3)

    discardedTile = { suit: 'Bamboo', value: 2 }
  })

  it('should allow pung at any turn', () => {
    jest.spyOn(player1, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player2, 'HasAction').mockReturnValue({ Pung: [bamboo2, bamboo2, discardedTile], Kong: [], Chow: [] })
    jest.spyOn(player3, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player4, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })

    const result = gameMaster.DeterminePlayersWithAction(discardedTile, 0)

    expect(result).toEqual([player2])
  })

  it('should allow kong at any turn', () => {
    jest.spyOn(player1, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player2, 'HasAction').mockReturnValue({ Pung: [], Kong: [bamboo2, bamboo2, bamboo2, discardedTile], Chow: [] })
    jest.spyOn(player3, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player4, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })

    const result = gameMaster.DeterminePlayersWithAction(discardedTile, 0)

    expect(result).toEqual([player2])
  })
  it('should return an empty array if no players have action', () => {
    jest.spyOn(player1, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player2, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player3, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })
    jest.spyOn(player4, 'HasAction').mockReturnValue({ Pung: [], Kong: [], Chow: [] })

    const result = gameMaster.DeterminePlayersWithAction(discardedTile, 0)

    expect(result).toEqual([])
  })
})