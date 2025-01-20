import { Tile } from "../common/types"
import { RECEIVE_HAND, SELECT_TILE } from "./mahjongActionTypes"

export type initialStateType = {
    selectedTile: Tile | null,
    hand: Tile[] | null

}

const initialState = {
    selectedTile: null,
    hand: []
}

const mahjongReducer = (state: initialStateType = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case SELECT_TILE:
            return {
                ...state,
                tile: action.payload.tile
            }
        case RECEIVE_HAND:
            return {
                ...state,
                hand: action.payload
            }
        default:
            return state
    }
}

export default mahjongReducer
