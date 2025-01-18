import { GameState, MahjongMessage } from "../../common/events"
import { Tile } from "../../common/types"
import Deck from "./Deck"
import { Player } from "./Player"

    export default class GameMaster {
        currentState: GameState = GameState.WAITING
        currentPlayer: Player | null
        currentHighestAction: MahjongMessage | null
        deck: Deck
        private players: Player[] = []
        //playOrder: Array<Player>

        constructor(isShuffled: boolean) {
            // Determine player order arbitrarily for now
            // TODO: do this
            //this.playOrder = [this.playerEast, this.playerSouth, this.playerWest, this.playerNorth]

            this.deck = new Deck(isShuffled)
            this.currentHighestAction = null
            this.currentPlayer = null
            // give players the hands
            // TODO: determine dealer later
            //this.deck.Init_Deal(this.playOrder,0)

            // send message to server to start the game
        }

        AddPlayer(newPlayer: Player){ this.players.push(newPlayer)}
        RemovePlayer(removePlayer: Player){ this.players = this.players.filter((player) => player.playerName !== removePlayer.playerName) }
        GetPlayers(){this.players}

        InitGame(){
            this.currentState = GameState.DEAL
            this.deck.Init_Deal(this.players,0)
        }

        DetermineAction(discardedTile: Tile): any {
            this.players.forEach(player => {
                player.HasAction(discardedTile,this.currentPlayer)
            })
            return []
        }

        AdvanceTurn(){
            const drawnTile: Tile = this.deck.Deal_One()
            this.currentPlayer++
            if(this.currentPlayer === 4) this.currentPlayer = 0
            this.currentState = GameState.PICKUP
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