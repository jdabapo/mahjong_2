import { Tile } from "../common/types"
import { SELECT_TILE } from "./mahjongActionTypes"

type initialStateType = {
    tile: Tile | null
}

const initialState = {
    tile: null
}

const mahjongReducer = (state: initialStateType = initialState, action: { type: string, tile?: Tile }) => {
    switch (action.type) {
        case SELECT_TILE:
            return {
                ...state,
                tile: action.tile || null
            }
        default:
            return state
    }
}

export default mahjongReducer
