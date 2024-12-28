import { useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import TaskProvider from "./contexts/TaskContext";


let nextId = 4;
function App() {
  return (
    <div className="App">
      <TaskProvider>
        <AddTask />
        <TaskList 
        />
      </TaskProvider>
    </div>
  );
}
export default App;
