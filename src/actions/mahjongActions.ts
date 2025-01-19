import { Tile } from "../common/types"
import { RECEIVE_HAND, SELECT_TILE } from "./mahjongActionTypes"

export const selectTile = (tile: Tile) => {
    return {
        type: SELECT_TILE,
        tile: tile
    }
}

export const receiveHand = (hand: Tile[]) => {
    return {
        type: RECEIVE_HAND,
        hand: hand
    }
}