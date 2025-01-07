import { useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { use } from "react";

function App() {
  const [todosText, setTodosText] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(false);


  const getTodos = async () => {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    setTodos(data);
  }
  useEffect(() => {
    getTodos();
  }, []);
  const submitHandler = async(e) => {
    e.preventDefault();
    const newtodo = {
      title: todosText,
      completed: false,
    };
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTodosText("");
     });
     await getTodos();

  }
  return (
    <div className="App">
      <form onSubmit={submitHandler}> 
        <input type="text"  value={todosText} onChange={(e)=>setTodosText(e.target.value)}/>
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed}/>
            <span>{todo.title}</span>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
