import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import Todo from './models/todo.js'

const app = express()
const port = 3000

app.use(cors())

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.listen(port, () => {
    console.log('Listening on port:', port)
    connectDB()
})
