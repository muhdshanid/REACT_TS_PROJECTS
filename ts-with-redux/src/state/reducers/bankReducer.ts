import { ActionEnum } from "../action-types"
import { ActionType } from "../actions"


const initialState = 0

export const bankReducer = (state: number  = initialState, action: ActionType) => {
    switch (action.type) {
        case ActionEnum.DEPOSIT:
                return state + action.payload
        case ActionEnum.WITHDRAW:
                return state - action.payload
        case ActionEnum.BANKRUPT:
            return 0 
        default:
            initialState
    }
}