
import './App.css'

import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const inputRef = useRef()

  async function getTodos() {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const todo = {
      text: inputRef.current.value
    }

    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })

    await response.json()

    inputRef.current.value = ''
    inputRef.current.focus()

    getTodos()
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE'
    })

    getTodos()
  }

  async function handleUpdate(id) {
    const todo = todos.find((todo) => todo._id === id)

    todo.completed = !todo.completed

    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })

    console.log(response)

    getTodos()
  }

  return (
    <div>
      <h1>Todos List</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Submit</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdate(todo._id)}
            />
            {todo.text}
            <button type="button" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
