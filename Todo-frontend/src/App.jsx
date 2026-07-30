import { useEffect, useState } from 'react'

export default function App() {

  const [todos, setTodos] = useState([]);

  async function getData() {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    console.log(data);
    setTodos(data);
  }

  useEffect(() => {
    getData()
  }, [])

  return
  <div>
    Hello Star Wars!
    <ul>
      {todos.map((todo) =>
        <li key={todo._id}>
          {todo.text}
        </li>
      )}
    </ul>

  </div>
    
}
