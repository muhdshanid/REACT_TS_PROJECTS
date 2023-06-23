export interface DepositAction {
    type: "deposit",
    payload: number
}
export interface WithdrawAction {
    type: "withdraw",
    payload: number
}
export interface BankruptAction {
    type: "bankrupt",
}
export type ActionType = DepositAction | WithdrawAction | BankruptAction

