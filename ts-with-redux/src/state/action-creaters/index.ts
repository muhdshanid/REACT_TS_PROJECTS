import { Dispatch } from "redux"
import { ActionEnum } from "../action-types"
import { ActionType } from "../actions"


export const deposit = (amount: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch({
            type: ActionEnum.DEPOSIT,
            payload: amount
        })
    }
}
export const withdraw = (amount: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch({
            type: ActionEnum.WITHDRAW,
            payload: amount
        })
    }
}
export const bankrupt = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch({
            type: ActionEnum.BANKRUPT
        })
    }
}