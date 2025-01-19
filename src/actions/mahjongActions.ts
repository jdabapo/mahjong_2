import { Tile } from "../common/types"
import { SELECT_TILE } from "./mahjongActionTypes"

export const selectTile = (tile: Tile) => {
    return {
        type: SELECT_TILE,
        tile: tile
    }
}