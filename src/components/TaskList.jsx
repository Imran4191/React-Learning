import { useContext } from "react"
import Task from "./Task"
import { useTask } from "../contexts/TaskContext"
export default function TaskList() {
    const {tasks} = useTask()
    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => <li key={task.id}>
                    <Task 
                        task={task}  
                    /></li>)}  
            </ul>
        </div>
    )
}