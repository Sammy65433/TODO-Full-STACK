import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const inputRef = useRef()

  async function getTodos() {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    console.log(data)
    setTodos(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const todo = {
      text: inputRef.current.value
    };

    console.log(todo);

    //Send as POST - step 96
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      header: {
        'Content-Type': 'application/json'
      }
    })
    const newtodo = await response.json();

    console.log(newtodo);



  }

  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Submit</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
