import {v4 as uuidV4} from "uuid"

const list = document.querySelector<HTMLUListElement>("#list")

const form = document.getElementById("new-task-form") as HTMLFormElement | null

const input = document.querySelector<HTMLInputElement>("#new-task-title")

type TaskType = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}


const addListItem = (task: TaskType) => {
  const item = document.createElement("li")
  const label = document.createElement("label")
  let checkBox = document.createElement("input")
  checkBox.type = "checkbox"
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked
    saveTasks()
  })
  checkBox.checked = task.completed
  label.append(checkBox, task.title)
  item.append(label)
  list?.append(item)
}

const saveTasks = () => {
  localStorage.setItem("TASKS",JSON.stringify(tasks))
}

const loadTasks = (): TaskType[] => {
  const tasksJson =  localStorage.getItem("TASKS")
  if(tasksJson == null) return []
 return JSON.parse(tasksJson)
}

const tasks: TaskType[] = loadTasks()

tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()
  if(input?.value == "" || input?.value == null) return 


  const task: TaskType = {
    id: uuidV4(),
    title: input.value,
    completed:false,
    createdAt: new Date()
  }

  tasks.push(task)

  addListItem(task)

  input.value = ""

})
