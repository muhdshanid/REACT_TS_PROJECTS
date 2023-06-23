
import './App.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreaters } from './state'
import { State } from './state/reducers'

function App() {
 
  const dispatch = useDispatch()
  const {deposit, withdraw, bankrupt} = bindActionCreators(actionCreaters, dispatch)
  const amount = useSelector((state: State) => state.bank)
  return (
   <div>
    <h1>{amount}</h1>
    <button onClick={() => deposit(100)}>Deposit</button>
    <button onClick={() => withdraw(10)}>Withdraw</button>
    <button onClick={() => bankrupt()}>Bankrupt</button>
   </div>
  )
}

export default App
