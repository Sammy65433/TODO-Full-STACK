import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Form from './components/Form.jsx'
import TodoList from './components/TodoList.jsx'
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo
} from './api.js'

export default function App() {
  const [todos, setTodos] = useState([])

  async function loadTodos() {
    const data = await getTodos()
    setTodos(data)
  }

  useEffect(() => {
    loadTodos()
  }, [])

  async function handleCreate(todo) {
    await createTodo(todo)
    loadTodos()
  }

  async function handleDelete(id) {
    await deleteTodo(id)
    loadTodos()
  }

  async function handleUpdate(id) {
    const todo = todos.find((todo) => todo._id === id)
    todo.completed = !todo.completed

    await updateTodo(id, todo)
    loadTodos()
  }

  return (
    <div>
      <Header />
      <Form handleCreate={handleCreate} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}
