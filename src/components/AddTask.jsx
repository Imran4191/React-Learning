import { useContext, useState } from "react"
import Task from "./Task";
import {useTask } from "../contexts/TaskContext";
export default function AddTask() {
    const [text, setText] = useState('')
    const {onAddTask} = useTask()


    return (
        <div>
            <input type="text" placeholder="Add task" valu={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={()=>{
                setText('');
                onAddTask(text);}}>Add</button>
        </div>
    )
}