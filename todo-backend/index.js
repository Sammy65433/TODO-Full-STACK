import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

const app = express();

const port = 3000

//allow requests from frontend 
app.use(cors());



app.get('/test', (req, res) => {
    res.json('Hello from server')
})

app.listen(port, () => {
console.log('Listenign on port:", port');
connectDB();
})