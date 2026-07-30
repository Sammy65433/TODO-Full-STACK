```md
Full-stack todo app setup summary

Project structure
```bash
todo-fullstack/
  frontend/
  backend/
```

```md
Frontend setup
```

```bash
mkdir todo-fullstack
cd todo-fullstack

npm create vite@latest frontend
```

Choose:
- `React`
- `JavaScript`

Then:

```bash
cd frontend
npm install
cd ..
```

```md
Backend setup
```

```bash
mkdir backend
cd backend
npm init -y
```

In `backend/package.json`, add:

```json
"type": "module"
```

```md
Backend dependencies to install
```

You can install them all at once:

```bash
npm install express cors mongoose dotenv
```

He also used `nodemon` to run the backend. If you do not already have it globally, install it as a dev dependency:

```bash
npm install -D nodemon
```

```md
Backend files to create
```

Inside `backend`:

```bash
touch index.js
touch db.js
touch .env
touch .env.example
mkdir models
touch models/Todo.js
touch .gitignore
```

```md
Backend `.gitignore`
```

In `backend/.gitignore`:

```gitignore
node_modules/
.env
```

```md
Frontend `.gitignore`
```

The Vite frontend already includes one, so that is fine.

```md
GitHub setup
```

- Create a new GitHub repo with the same name as the main folder
- Do **not** add a README on GitHub
- Do **not** click extra setup options

Then from the main project folder:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Important:
- Create `README.md` locally if you want one
- Do not click `Add a README` on GitHub after pushing

```md
Recommended terminals in VS Code
```

- 1 terminal in the main project folder for Git commands
- 1 terminal in `backend`
- 1 terminal in `frontend`

```md
Environment variables
```

In `backend/.env`:

```env
MONGO_URL=your_connection_string_here
```

In `backend/.env.example`:

```env
MONGO_URL=
```

```md
How to build `MONGO_URL`
```

Your MongoDB connection string should include:
- username
- password
- database name

Important:
- remove angle brackets like `<password>`
- replace with your real password
- put the database name between `/` and `?`

Example:

```env
MONGO_URL=mongodb+srv://username:password@cluster-url/todos?retryWrites=true&w=majority
```

If you use the non-SRV string, same rule:
- database name goes between `/` and `?`

```md
Where to get the MongoDB connection string
```

MongoDB Atlas:
- `Project Overview` or `Clusters`
- click `Connect`
- click `Drivers`
- copy the connection string

```md
`backend/db.js`
```

```js
import mongoose from 'mongoose'

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to MongoDB')
  } catch (e) {
    console.log(e.message)
  }
}

export default connectDB
```

```md
`backend/models/Todo.js`
```

```js
import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
```

```md
Current `backend/index.js`
```

```js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import Todo from './models/Todo.js'

const app = express()
const port = 3000

app.use(cors())

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
  connectDB()
})
```

Notes:
- include `.js` in backend imports
- use `await Todo.find()`
- return JSON with `res.json(...)`

```md
Frontend `App.jsx` for testing
```

```jsx
import { useEffect } from 'react'

export default function App() {
  async function getTodos() {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div>
      Hello World!
    </div>
  )
}
```

```md
How to run the app
```

Backend:

```bash
cd backend
nodemon
```

If not using nodemon:

```bash
node index.js
```

Frontend:

```bash
cd frontend
npm run dev
```

```md
What you should see when it works
```

Backend terminal:
- `Listening on port: 3000`
- `Connected to MongoDB`

Frontend:
- Vite app running on something like `http://localhost:5173`

Browser console:
- `[]` or `Array(0)` if there are no todos yet

```md
What the empty array means
```

It means:
- frontend connected to backend
- backend connected to MongoDB
- query worked
- collection exists but has no documents yet

```md
CORS summary
```

Without CORS:
- frontend on `5173` cannot talk to backend on `3000`

Allow it with:

```js
app.use(cors())
```

Later, you can restrict it:

```js
app.use(cors({
  origin: 'http://localhost:5173'
}))
```

```md
Strict mode note
```

In development, React Strict Mode may cause `useEffect` behavior to appear twice.
That is normal in development, not production.

```md
Common errors and fixes
```

`404 Not Found`
- frontend fetch URL does not match backend route
- make sure route is `/api/todos`

`Unexpected token '<'`
- backend returned HTML error page, usually because the route was wrong
- fix the route, then `response.json()` will work

`ERR_CONNECTION_REFUSED`
- backend is not running on port `3000`

`CORS policy error`
- missing `app.use(cors())`

`cors is not defined`
- forgot:
```js
import cors from 'cors'
```

`Bad auth` or MongoDB auth errors
- wrong username or password in connection string
- old working connection string may help
- make sure env variable name matches exactly

Env variable mismatch example:
- if `.env` has `MONGO_URI`
- then `db.js` must use `process.env.MONGO_URI`
- if `.env` has `MONGO_URL`
- then `db.js` must use `process.env.MONGO_URL`

```md
Backend reset steps if setup breaks
```

Stop the backend, then delete:
- `node_modules`
- `package.json`
- `package-lock.json`

Then recreate:

```bash
npm init -y
npm install express cors mongoose dotenv
```

Add back:

```json
"type": "module"
```

```md
Current milestone
```

At this point you have:
- frontend set up
- backend set up
- MongoDB connected
- Todo model created
- GET `/api/todos` working
- frontend successfully fetching todos from the database
```