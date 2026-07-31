import Todo from '../models/todo.js'

// GET /api/todos
export async function getTodos(req, res) {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
        res.json(todos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

// POST /api/todos
export async function createTodo(req, res) {
    try {
        const postTodo = await Todo.create(req.body)
        res.status(201).json(postTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

// DELETE /api/todos/:id
export async function deleteTodo(req, res) {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        res.json(deletedTodo)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

// PUT /api/todos/:id
export async function updateTodo(req, res) {
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
}
