import {useContext, useState} from "react";
import { useTask } from "../contexts/TaskContext";
export default function Task({task}) {
    const [isEditing, setIsEditing] = useState(false)
    const {onChangeTask,onDeleteTask} = useTask()

    const content = isEditing ?(
        <>
            <input type="text" 
                value ={task.title} 
                onChange={(e)=>onChangeTask({
                    ...task,
                    title: e.target.value
                })}/>
            <button onClick={() =>setIsEditing(false)}>Save</button>
        </>
        
    ) : (
        <>
            <span>{task.title}</span>
            <button onClick={() =>setIsEditing(true)}>Edit</button>
        </>
    )
    return (
        <div>
            <input type="checkbox" 
                checked={task.done} 
                onChange={(e)=>onChangeTask({
                    ...task,
                    done: e.target.checked
            })}/>
            {content}
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
    )
}