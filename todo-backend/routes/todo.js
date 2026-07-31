import express from 'express'
import Todo from '../models/todo.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const postTodo = await Todo.create(req.body)
        res.status(201).json(postTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        res.json(deletedTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
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

export default router
