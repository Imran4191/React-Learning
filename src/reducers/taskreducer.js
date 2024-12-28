export default function taskReducer(tasks, action) {
    switch (action.type) {
        case "added":
            return [
                ...tasks,
                {
                    id : action.id,
                    title : action.text,
                    done : false,
                }
      
            ]
        case "updated":
            return (
                tasks.map(t => {
                    if(t.id === action.task.id) {
                        return {...t,
                            title: action.task.title, 
                            done: action.task.done}
                    }
                    return t
                })
            );
        case "deleted":
            return tasks.filter(t => t.id !== action.id);
        default:
            throw new Error(`No action matched!}`);
    }
}