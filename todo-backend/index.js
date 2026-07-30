import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

import Todo from './models/todo.js';

const app = express();

const port = 3000

//allow requests from frontend 
app.use(cors());


app.get('/api/todos', async (req, res) => {
    const todos = Todo.find();
    res.json(todos);
})

app.listen(port, () => {
console.log('Listenign on port:", port');
connectDB();
})