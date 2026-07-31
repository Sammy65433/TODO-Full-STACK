import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import todoRoutes from './routes/todo.js'

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/api/todos', todoRoutes)


app.listen(port, () => {
    console.log('Listening on port:', port)
    connectDB()
})
