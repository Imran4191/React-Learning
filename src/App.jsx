import { useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { use } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }
  , []);
  return (
    <div className="App">
      <div className="count">
        <h2>Counter is : {count}</h2>
        <button onClick={() => setCount(count+1)}>Increment</button>
      </div>
      <div className="posts">
        <h2>All Posts</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}>
          {posts.map((post) => (
            <li key={post.id} className="post">
              <h3>{post.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
