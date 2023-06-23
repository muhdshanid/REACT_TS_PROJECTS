import { useState } from "react"
import Select, { SelectOption } from "./components/Select"

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
]
function App() {
  const [valueOne, setValueOne] = useState<SelectOption[]>([options[0]])
  const [valueTwo, setValueTwo] = useState<SelectOption | undefined>(options[0])
  return (
  <div>
    <Select options={options} multiple={false}  value={valueTwo} onChange={option => setValueTwo(option)}/>
    <Select options={options} multiple={true}  value={valueOne} onChange={option => setValueOne(option)}/>
  </div>
  )
}

export default App
