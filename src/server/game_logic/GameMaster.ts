import { GameState, MahjongMessage } from "../../common/events"
import { Tile } from "../../common/types"
import Deck from "./Deck"
import { Player } from "./Player"

    export default class GameMaster {
        currentState: GameState = GameState.WAITING
        currentPlayer: Player | null
        currentHighestAction: MahjongMessage | null
        deck: Deck
        private players: Player[]
        constructor(isShuffled: boolean) {
            // Determine player order arbitrarily for now
            // TODO: do this
            //this.playOrder = [this.playerEast, this.playerSouth, this.playerWest, this.playerNorth]

            this.deck = new Deck(isShuffled)
            this.currentHighestAction = null
            this.currentPlayer = null
            this.players = []
        }

        AddPlayer(playerId: string){ this.players.push(new Player(playerId)) }
        RemovePlayer(removePlayer: Player){ this.players = this.players.filter((player) => player.playerId !== removePlayer.playerId) }
        GetPlayers(){return this.players}
        GetPlayer = (playerId: string): Player => {
            const player = this.players.find(player => player.playerId === playerId)
            if(player === undefined){
                throw new Error('Player not found')
            }
            return player
        }
        GetCurrentState(){return this.currentState}
        GetCurrentPlayer(){return this.currentPlayer}
        ModifyTurnOrder(playerId: string, turnOrder: number){
            const player = this.GetPlayer(playerId)
            player.turnOrder = turnOrder
        }
        GetPlayerHand(playerId: string){return this.players.find(player => player.playerId === playerId)?.GetHand()}
        InitGame(){
            this.currentState = GameState.DEAL
            this.deck.Init_Deal(this.players,0)
        }

        UpdatePlayerHand(playerId: string, tile: Tile) {
            return this.players.find(player => player.playerId === playerId)?.UpdateHand(tile)
        }
        DeterminePlayersWithAction(discardedTile: Tile, currentTurnOrder: number): Player[] {
            return this.players.reduce((acc: Player[], player) => {
                if(player.turnOrder !== currentTurnOrder){
                    const action = player.HasAction(discardedTile, currentTurnOrder)
                    if(action.Pung.length > 0 || action.Kong.length > 0 || action.Chow.length > 0){
                        acc.push(player)
                    }
                }
                return acc
            }, [])
        }

        AdvanceTurn(){
            // const drawnTile: Tile = this.deck.Deal_One()
            // this.currentPlayer++
            // if(this.currentPlayer === 4) this.currentPlayer = 0
            // this.currentState = GameState.PICKUP
        }

        DetermineNextPlayer(proposedAction: MahjongMessage){
            if(this.currentHighestAction === undefined){
                if(proposedAction !== MahjongMessage.PASS && proposedAction !== MahjongMessage.DISCARD){
                    this.currentHighestAction = proposedAction
                }
            }
            else{
                if(proposedAction !== MahjongMessage.PASS && proposedAction !== MahjongMessage.DISCARD){
                    
                }
            }
        }
    }