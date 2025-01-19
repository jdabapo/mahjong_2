import {combineReducers} from "redux";
import mahjongReducer from "./mahjongReducer";

const rootReducer = combineReducers({mahjong: mahjongReducer});

export default rootReducer

