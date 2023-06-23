import { combineReducers } from "redux";
import { bankReducer } from "./bankReducer";


export type State = ReturnType<typeof reducers>

export const reducers = combineReducers({
    bank: bankReducer
})
