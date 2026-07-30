import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import Todo from './models/todo.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

app.post('/api/todos', async (req, res) => {
    try {
        console.log(req.body)
        const postTodo = await Todo.create(req.body)
        res.json(postTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        console.log(deletedTodo)
        res.json(deletedTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

app.put('/api/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

app.listen(port, () => {
    console.log('Listening on port:', port)
    connectDB()
})
