```md
1. Create a main project folder
```
```bash
mkdir todo-fullstack
cd todo-fullstack
```

```md
2. Create the frontend React app with Vite
```
```bash
npm create vite@latest frontend
```
- Choose `React`
- Choose `JavaScript`

```md
3. Install frontend dependencies
```
```bash
cd frontend
npm install
cd ..
```

```md
4. Create the backend folder
```
```bash
mkdir backend
cd backend
```

```md
5. Initialize backend package.json
```
```bash
npm init -y
```

```md
6. Update backend to use modules
```
Add this to `backend/package.json`:
```json
"type": "module"
```

```md
7. Install Express
```
```bash
npm install express
```

```md
8. Create the backend server file
```
```bash
touch index.js
```

```md
9. Add basic Express server code
```
```js
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello from server')
})

app.listen(port, () => {
  console.log('Listening on port:', port)
})
```

```md
10. Run the backend server
```
```bash
node index.js
```

```md
11. Confirm it works
```
Open `http://localhost:3000` and check for:
`Hello from server`

```md
12. Recommended project structure
```
```bash
todo-fullstack/
  frontend/
  backend/
```

```md
13. Add `.gitignore` files
```
You can use one top-level `.gitignore`, but in class he used one inside `backend` and kept the existing one in `frontend`.

In `backend/.gitignore` add:
```gitignore
node_modules/
.env
```

The `frontend` Vite app already has its own `.gitignore`, so that is fine for now.

```md
14. Create a GitHub repository
```
- Go to GitHub
- Create a new repository
- Use the same name as your main project folder, like `todo-fullstack`
- Do **not** add a README on GitHub
- Do **not** click extra setup options

```md
15. Open multiple terminals in VS Code
```
Recommended:
- One terminal in the main project folder for Git commands
- One terminal in `backend` for running the backend
- One terminal in `frontend` for running the frontend

```md
16. Initialize git in the main project folder
```
Make sure you are in the main project folder, not inside `frontend` or `backend`.

```bash
git init
git add .
git commit -m "first commit"
```

```md
17. Connect local project to GitHub and push
```
Use the 3 commands GitHub gives you after creating the empty repository, usually like:

```bash
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

```md
18. Verify the push
```
Refresh your GitHub repository and confirm both folders appear:
- `frontend`
- `backend`

```md
19. Important GitHub note
```
If you want a `README.md`, create it locally yourself.

Do **not** click the GitHub `Add a README` button after pushing, because that can make your remote repo out of sync with your local repo.

```md
20. Run the backend
```
From the `backend` terminal:

```bash
nodemon
```

If you are not using global nodemon, you can also run:

```bash
node index.js
```

```md
21. Run the frontend
```
From the `frontend` terminal:

```bash
npm run dev
```

```md
22. Confirm both are running
```
- Backend should run on `http://localhost:3000`
- Frontend Vite app should run on something like `http://localhost:5173`

```md
23. Next step
```
After both are running, the next step is to test communication between the frontend and backend by sending a request from the React app to the Express server.
```


```md
24. Update `App.jsx` to test backend communication
```

```jsx
import { useEffect } from 'react'

export default function App() {
  async function test() {
    fetch('http://localhost:3000')
  }

  useEffect(() => {
    // test()
  }, [])

  return (
    <div>
      Hello World!
    </div>
  )
}
```

```md
25. Use `useEffect` for the initial API call
```
- Import `useEffect` from React
- Create an empty dependency array `[]`
- This makes the effect run only on the first render

```md
26. Create an async function for the API request
```
- He said to make an `async function`
- Put the `fetch()` call inside that function
- Otherwise you would need to use `.then()`

```md
27. Use the backend URL as the request URL
```

```js
fetch('http://localhost:3000')
```

```md
28. Call the function inside `useEffect`
```
He commented it out temporarily, but the idea is:

```jsx
useEffect(() => {
  test()
}, [])
```

```md
29. Push your new code changes to GitHub
```
From the main project folder:

```bash
git add .
git commit -m "connect frontend to backend"
git push
```

```md
30. Current focus
```
 testing whether the frontend can successfully send a request to the backend.

 Add these:

```md
31. Update the backend route to a test route
```

Instead of only using `/`, he changed it to a clearer test route like `/test`.

```js
app.get('/test', (req, res) => {
  res.send('Hello from server')
})
```

```md
32. Update `App.jsx` to fetch from the test route
```

```jsx
import { useEffect } from 'react'

export default function App() {
  async function test() {
    const response = await fetch('http://localhost:3000/test')
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    test()
  }, [])

  return (
    <div>
      Hello World!
    </div>
  )
}
```

```md
33. Parse the backend response
```
- Store the fetch response in a variable
- Use `await response.json()`
- Log the parsed data with `console.log(data)`

```md
34. Refresh the frontend and check the browser console
```
- Open the app in the browser
- Open Inspect → Console
- Refresh the page
- Look for the logged data or any errors

```md
35. Notice the CORS error
```
At this point, the frontend request fails because:
- frontend is on `localhost:5173`
- backend is on `localhost:3000`

These are different origins, so the browser blocks the request unless the backend allows it.

```md
36. Understand why the request is blocked
```
Browsers block requests between different ports by default for security reasons.

The backend must explicitly allow requests from the frontend origin.

```md
37. Next step
```
The next thing he is about to do is configure the backend to allow requests from the frontend on port `5173`.

```md
38. Git note on commits
```
He said it does not really matter which terminal you commit from, but he usually commits from the main project folder so he can push everything together.

Add these next:

```md
39. Install `cors` in the backend
```

From the `backend` folder:

```bash
npm install cors
```

```md
40. Import `cors` in `backend/index.js`
```

```js
import cors from 'cors'
```

```md
41. Enable CORS middleware
```

Add this before your routes:

```js
app.use(cors())
```

He said this is the simple version for now and allows requests from anywhere.

```md
42. Optional later: restrict CORS to the frontend origin
```

For development he is leaving it open, but later you can make it more specific:

```js
app.use(cors({
  origin: 'http://localhost:5173'
}))
```

```md
43. Change the backend response to JSON
```

Since the frontend is using `response.json()`, the backend should return JSON instead of plain text.

Update the route to:

```js
app.get('/test', (req, res) => {
  res.json({ message: 'Hello from server' })
})
```

```md
44. Restart the backend server
```

If needed:

```bash
nodemon
```

or

```bash
node index.js
```

```md
45. Refresh the frontend and check the console again
```
- Refresh the React app
- Open Inspect → Console
- You should now see the logged JSON data instead of the CORS error

```md
46. If backend setup is broken, recreate backend files
```

He walked someone through this reset process:

- Stop the backend server
- Delete:
  - `node_modules`
  - `package.json`
  - `package-lock.json`

Then recreate it:

```bash
npm init -y
npm install express
npm install cors
```

Then add back:

```json
"type": "module"
```

```md
47. Important backend setup order
```

He emphasized:
- always run `npm init -y` before installing packages

```md
48. Current working backend example
```

```js
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from server' })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
```

```md
49. Current goal
```

At this point, the goal is to confirm:
- backend runs on `3000`
- frontend runs on `5173`
- frontend can successfully fetch from `http://localhost:3000/test`
- console shows the JSON response

```md
50. Current CORS takeaway
```

- Without `cors()`, frontend and backend on different ports cannot communicate
- With `app.use(cors())`, the backend allows cross-origin requests
- Later, you can restrict it to a specific origin like `http://localhost:5173`


Add these:

```md
51. Install database-related backend packages
```

From the `backend` folder:

```bash
npm install mongoose dotenv
```

He installed both:
- `mongoose` for MongoDB connection
- `dotenv` for environment variables

```md
52. Create a database config file
```

In `backend`, create:

```bash
touch db.js
```

```md
53. Add starter MongoDB connection code in `db.js`
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
54. Create a `.env` file in the backend
```

In `backend/.env` add:

```env
MONGO_URL=your_connection_string_here
```

```md
55. Build the MongoDB connection string
```

He said your `MONGO_URL` should include:
- username
- password
- database name

Important:
- remove the angle brackets like `<password>`
- put your real password in that spot
- put the database name between the `/` and `?`

Example pattern:

```env
MONGO_URL=mongodb+srv://username:password@cluster-url/todos?retryWrites=true&w=majority
```

If using the non-SRV version, same idea:
- database name still goes between `/` and `?`

```md
56. Get the connection string from MongoDB Atlas
```

Path he described:
- Go to MongoDB Atlas
- Go to `Project Overview` or `Clusters`
- Click `Connect`
- Click `Drivers`
- Copy the connection string shown there

```md
57. Create an `.env.example` file
```

He recommended making an example file for projects so others know what variables are needed.

Example:

```env
MONGO_URL=
```

This file should show the variable name only, not your real secret.

```md
58. Configure dotenv at the top of `index.js`
```

At the very top of `backend/index.js`, add:

```js
import 'dotenv/config'
```

He said to put this at the top because environment variables should be configured before anything else.

```md
59. Import the database connection function into `index.js`
```

In `backend/index.js`:

```js
import connectDB from './db.js'
```

He specifically noted to include the `.js` extension.

```md
60. Call `connectDB()` when the server starts
```

He said he likes to call it inside `app.listen()` after the server log.

Example:

```js
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
  connectDB()
})
```

```md
61. Expected backend terminal messages
```

When everything works, you should see:
- `Listening on port: 3000`
- `Connected to MongoDB`

```md
62. Current backend focus
```

At this point:
- frontend talks to backend
- backend talks to database

That completes the main connection setup foundation for the full-stack app.
```

If you want, your current full `index.js` is basically moving toward this:

```js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'

const app = express()
const port = 3000

app.use(cors())

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from server' })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
  connectDB()
})
```





```md
63. Create a `models` folder in the backend
```

Inside `backend`, create a folder for models:

```bash
mkdir models
```

```md
64. Create a Todo model file
```

Inside `backend/models`, create:

```bash
touch Todo.js
```

```md
65. Import `mongoose` into the Todo model file
```

```js
import mongoose from 'mongoose'
```

```md
66. Create the Todo schema
```

He started the schema with:
- `text`
  - type `String`
  - `required: true`
- `completed`
  - type `Boolean`
  - `default: false`

Example:

```js
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
```

```md
67. Create the Todo model from the schema
```

Use `mongoose.model()`.

- First argument: the model name
- He said this also determines the collection name

Example:

```js
const Todo = mongoose.model('Todo', todoSchema)
```

```md
68. Export the Todo model
```

```js
export default Todo
```

```md
69. Full `backend/models/Todo.js` example
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
70. Purpose of this step
```

He said:
- the schema gives the data structure
- the model lets you actually work with and retrieve the data

```md
71. Current focus
```

At this point the app now has:
- frontend connected to backend
- backend connected to MongoDB
- a Todo schema and model ready for database operations



```md
72. Import the Todo model into `index.js`
```

He imported the model so the backend can query the database.

```js
import Todo from './models/todo.js'
```


```md
73. Replace the test route with a todos API route
```

He changed the endpoint from the earlier test route to a real todos route.

```js
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})
```

```md
74. Make the route handler async
```

Because `Todo.find()` is asynchronous, the route should use `async` and `await`.

```md
75. Use `Todo.find()` to get all todos
```

He said:
- `Todo.find()` returns all documents in the todos collection
- you can pass nothing or an empty object
- either way it returns everything

Examples:

```js
const todos = await Todo.find()
```

or

```js
const todos = await Todo.find({})
```

```md
76. Send the todos back as JSON
```

```js
res.json(todos)
```

If the collection is empty, the frontend should receive:

```js
[]
```

That is the expected good result for a new collection.

```md
77. Update the frontend fetch URL
```

Since the backend endpoint changed, `App.jsx` should now fetch from:

```js
http://localhost:3000/api/todos
```

```md
78. Rename the frontend test function if desired
```

He said he was changing the name from a temporary `test()` name to something clearer.

For example:

```jsx
async function getTodos() {
  const response = await fetch('http://localhost:3000/api/todos')
  const data = await response.json()
  console.log(data)
}
```

```md
79. Keep calling the fetch function inside `useEffect`
```

```jsx
useEffect(() => {
  getTodos()
}, [])
```

```md
80. Refresh the frontend and check the browser console
```

Expected result:
- an empty array `[]`
- or something like `Array(0)`

He said this is a good sign because it means:
- frontend talked to backend
- backend talked to MongoDB
- query ran successfully
- collection exists but has no documents yet

```md
81. Understand what Mongoose created automatically
```

He pointed out that:
- the database appeared
- the todos collection appeared
- he did not manually create them

This happened automatically once the app made the request and Mongoose used the model.

```md
82. Current project milestone
```

At this point, all three layers are connected:
- frontend
- backend
- database

And the app can successfully read from the todos collection, even if it is currently empty.
```


He means there are **two valid ways** to build the app.

Example 1, **backend-first**:
- Build all API routes first
- Then connect the frontend to them

For a todo app, that would mean making:
- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

Then later, in React, you build:
- todo list display
- add todo form
- complete checkbox
- delete button

Example 2, **frontend-first**:
- Build the UI first with placeholder data
- Then add backend routes only when the UI needs real data

For example:
1. Build a React todo list with hardcoded todos
2. Build an input and Add button
3. Build a checkbox and Delete button
4. Then replace fake data with:
   - `GET /api/todos`
   - `POST /api/todos`
   - `PUT /api/todos/:id`
   - `DELETE /api/todos/:id`

So when he says:
- “front end to back end” = build UI first, then create the needed route
- “back end to front end” = build API first, then connect UI to it

For your README notes, you could write:

```md
Next development options:
- Backend-first: finish all CRUD routes, then build the UI
- Frontend-first: build the UI with placeholder data, then connect each feature to backend routes as needed
```


```md
83. Add state to store fetched todos
```

In `App.jsx`, create a state variable as an empty array so it is safe to map over:

```jsx
const [todos, setTodos] = useState([])
```

He said he chose an empty array because he wants to map over the data later without errors.

```md
84. Save fetched todos into state
```

Instead of only logging the fetched data, store it:

```jsx
async function getTodos() {
  const response = await fetch('http://localhost:3000/api/todos')
  const data = await response.json()
  console.log(data)
  setTodos(data)
}
```

```md
85. Render the todos list
```

He rendered the list with a `ul` and mapped over `todos`:

```jsx
<ul>
  {todos.map((todo) => (
    <li key={todo._id}>
      {todo.text}
    </li>
  ))}
</ul>
```

```md
86. Use MongoDB `_id` as the React key
```

He pointed out every MongoDB document gets an automatically generated `_id`, and that is ideal for the React `key`.

```jsx
key={todo._id}
```

```md
87. Add a checkbox to each todo item
```

He then displayed the `completed` property too:

```jsx
<li key={todo._id}>
  <input type="checkbox" checked={todo.completed} readOnly />
  {todo.text}
</li>
```

He used the schema fields:
- `text`
- `completed`

```md
88. Add a heading for the page
```

```jsx
<h1>Todos</h1>
```

```md
89. Create a form above the list
```

He added a basic form in `App.jsx` first instead of making a separate component too early:

```jsx
<form>
  <input type="text" />
  <button>Submit</button>
</form>
```

```md
90. Use `useRef` for the input instead of state
```

He chose an uncontrolled input with `useRef`.

Import it:

```jsx
import { useEffect, useRef, useState } from 'react'
```

Create the ref:

```jsx
const inputRef = useRef()
```

Attach it to the input:

```jsx
<input type="text" ref={inputRef} />
```

```md
91. Add a submit handler for the form
```

Attach an `onSubmit` handler:

```jsx
<form onSubmit={handleSubmit}>
```

Create the function:

```jsx
function handleSubmit(e) {
  e.preventDefault()
}
```

He said `preventDefault()` is important so the page does not refresh automatically.

```md
92. Test the form handler with a console log
```

He tested submission first before sending data anywhere:

```jsx
function handleSubmit(e) {
  e.preventDefault()
  console.log('test')
}
```

```md
93. Create a todo object from the input value
```

Inside `handleSubmit`, package the input into an object that matches the schema:

```jsx
function handleSubmit(e) {
  e.preventDefault()

  const todo = {
    text: inputRef.current.value
  }

  console.log(todo)
}
```

He explained:
- `inputRef.current` gives the actual input element
- `inputRef.current.value` gives the text the user typed

```md
94. The todo object only needs `text`
```

He said the backend/database will generate:
- `_id`
- `completed` default value

So on the frontend, for now, the object only needs:

```js
{
  text: inputRef.current.value
}
```

```md
95. Current stopping point
```

Right before break, the app could:
- fetch todos
- store them in state
- render the list
- render a form
- capture user input with `useRef`
- build the todo object
- log the object on submit

```md
96. Next step after break
```

He said the next step is to send that todo object to the backend as a `POST` request so the server can save it to the database.


```md
97. Send the new todo to the backend with a POST request
```

He updated `handleSubmit` to make a `fetch()` request to the same todos endpoint, but with the `POST` method.

```jsx
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

  const newTodo = await response.json()
  console.log(newTodo)
}
```

Key points he added:
- `handleSubmit` must be `async`
- same endpoint: `/api/todos`
- add fetch options
- `method: 'POST'`
- `headers: { 'Content-Type': 'application/json' }`
- `body: JSON.stringify(todo)`
- parse response with `await response.json()`

```md
98. Add JSON body parsing middleware in the backend
```

He said once you start sending request bodies, you need:

```js
app.use(express.json())
```

Add it near the top of `index.js`, before routes.

```md
99. Create the backend POST route
```

He added a `POST /api/todos` route to create a new todo:

```js
app.post('/api/todos', async (req, res) => {
  console.log(req.body)
  const todo = await Todo.create(req.body)
  res.json(todo)
})
```

Key ideas:
- frontend sends JSON in `req.body`
- Express reads it because of `express.json()`
- `Todo.create(req.body)` saves it to MongoDB
- backend sends the created todo back to frontend

```md
100. Test creating a todo from the frontend
```

He tested it directly through the React form instead of Postman/Thunder Client.

Expected result:
- no error
- backend logs request body
- MongoDB gets a new document
- response includes autogenerated `_id`
- response includes `completed: false`

```md
101. Fix validation errors if `text` is missing
```

If you get:

```txt
ValidationError: Todo validation failed: text: Path `text` is required
```

That means the submitted object is missing `text` or it is empty.

Check:
- input has `ref={inputRef}`
- object is built with:
```js
const todo = { text: inputRef.current.value }
```
- user actually typed something

```md
102. Save the newly created todo into React state
```

He said the database updates, but React also needs to update.

After receiving `newTodo`, add it to state:

```jsx
setTodos([...todos, newTodo])
```

Full `handleSubmit` at this stage:

```jsx
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

  const newTodo = await response.json()
  console.log(newTodo)

  setTodos([...todos, newTodo])
}
```

He emphasized:
- `todos` is an array
- pass a **new array**
- copy old todos, then add the new one

```md
103. Clear and refocus the input after submit
```

Because he used `useRef`, he cleared the input manually:

```jsx
inputRef.current.value = ''
inputRef.current.focus()
```

Full version:

```jsx
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

  const newTodo = await response.json()
  setTodos([...todos, newTodo])

  inputRef.current.value = ''
  inputRef.current.focus()
}
```

```md
104. Temporary checkbox warning fix
```

React warned about `checked` without an `onChange`.

He temporarily used:

```jsx
<input
  type="checkbox"
  checked={todo.completed}
  onChange={() => {}}
/>
```

He said this is just to stop the warning for now.

```md
105. Add a Delete button to each todo
```

He added a delete button in the mapped list:

```jsx
<button type="button" onClick={() => handleDelete(todo._id)}>
  Delete
</button>
```

Key idea:
- pass `todo._id` directly
- easier than relying on the event object

```md
106. Create the frontend delete handler
```

He started with a function that receives the id.

Because it uses `await`, it must be `async`:

```jsx
async function handleDelete(id) {
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'DELETE'
  })

  console.log(id)
}
```

Key points:
- same endpoint pattern, but append `/${id}`
- add fetch options
- `method: 'DELETE'`

```md
107. Create the backend DELETE route
```

In `index.js` he added:

```js
app.delete('/api/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
  console.log(deletedTodo)
  res.json(deletedTodo)
})
```

Key ideas:
- path includes `:id`
- access it with `req.params.id`
- use `Todo.findByIdAndDelete(...)`
- send deleted document back with `res.json(...)`

```md
108. Delete works in the database, but the UI still needs updating
```

He pointed out:
- clicking Delete removes the document from MongoDB
- but it stays visible in the UI until refresh
- React state still contains that todo

```md
109. Remove the deleted todo from state without refreshing
```

This is the next step he is describing now.

After the delete request succeeds, update state so the item disappears immediately:

```jsx
setTodos(todos.filter((todo) => todo._id !== id))
```

So `handleDelete` becomes:

```jsx
async function handleDelete(id) {
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'DELETE'
  })

  setTodos(todos.filter((todo) => todo._id !== id))
}
```

This matches what he is saying now:
- you do **not** have to refresh the whole page
- database changes are not enough
- state must also change

```md
110. Current CRUD status
```

At this point you have:
- `Create` working
- `Read` working
- `Delete` working in backend
- `Delete` now needs final frontend state update
- `Update` is next, likely through the checkbox

```md
111. Next likely step
```

He said the checkbox will be used for `Update`, specifically updating the `completed` property of a todo document.


```md
112. Simplify state syncing by reusing `getTodos()`
```

He changed direction slightly and said instead of manually updating state after every create or delete, you can just call `getTodos()` again.

Example after create:

```jsx
getTodos()
```

Example after delete:

```jsx
getTodos()
```

He said this is a little simpler because:
- `getTodos()` already fetches the latest data
- `getTodos()` already updates state
- it keeps frontend state synced with the database

Tradeoff:
- it makes another request to the backend

```md
113. Use `getTodos()` after POST instead of manually appending to state
```

Instead of:

```jsx
setTodos([...todos, newTodo])
```

he switched to:

```jsx
getTodos()
```

So `handleSubmit` becomes more like:

```jsx
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
```

```md
114. Use `getTodos()` after DELETE instead of filtering local state
```

Instead of:

```jsx
setTodos(todos.filter((todo) => todo._id !== id))
```

he changed it to:

```jsx
getTodos()
```

So `handleDelete` becomes:

```jsx
async function handleDelete(id) {
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'DELETE'
  })

  getTodos()
}
```

```md
115. Start wiring up Update with the checkbox
```

He said the checkbox controls the last CRUD operation: `Update`.

Replace the temporary empty handler with:

```jsx
onChange={() => handleUpdate(todo._id)}
```

```md
116. Create `handleUpdate(id)` in the frontend
```

He created a new async handler:

```jsx
async function handleUpdate(id) {

}
```

This should receive the clicked todo’s `_id`.

```md
117. Find the clicked todo from React state
```

He used the local `todos` state to find the current todo document so he could inspect its current `completed` value.

```jsx
const todo = todos.find((todo) => todo._id === id)
```

He said this matters because:
- you need to know the current value of `completed`
- then you can flip it

```md
118. Flip the `completed` value locally first
```

He temporarily updated the todo object locally:

```jsx
todo.completed = !todo.completed
```

This switches:
- `false` → `true`
- `true` → `false`

He also used console logs before and after to test it.

```jsx
console.log(todo)
todo.completed = !todo.completed
console.log(todo)
```

```md
119. Send the updated todo in a PUT request
```

He said update is similar to POST.

Frontend fetch should:
- use `PUT`
- include the todo id in the path
- send the updated todo as JSON in the body

```jsx
await fetch(`http://localhost:3000/api/todos/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(todo)
})
```

Important:
- the URL must include the slash before `${id}`

Correct:

```jsx
`http://localhost:3000/api/todos/${id}`
```

```md
120. Refresh frontend state after PUT
```

Just like create and delete, he reused `getTodos()` afterward.

```jsx
getTodos()
```

So `handleUpdate` is moving toward:

```jsx
async function handleUpdate(id) {
  const todo = todos.find((todo) => todo._id === id)

  todo.completed = !todo.completed

  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })

  getTodos()
}
```

```md
121. Add the backend PUT route
```

In `index.js`, he added:

```js
app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body
  )

  console.log(updatedTodo)
  res.json(updatedTodo)
})
```

He emphasized:
- route path is `/api/todos/:id`
- second argument must be `req.body`
- that is the updated todo coming from the frontend

```md
122. Optional improvement: return the updated document instead of the old one
```

He mentioned Mongoose can return the updated version by adding:

```js
{ new: true }
```

So a better version is:

```js
app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updatedTodo)
})
```

```md
123. How he tested the update
```

He said:
- click the checkbox
- refresh the page
- if it stays checked, the update persisted in MongoDB

That confirmed:
- the PUT route is working
- MongoDB is updating the document
- `completed` is being saved correctly

```md
124. Common update mistakes he debugged
```

He corrected a few issues:
- missing slash before `${id}` in the PUT URL
- forgetting to pass `req.body` as the second argument in `findByIdAndUpdate`
- missing/misplaced curly brackets in `App.jsx`
- code accidentally outside `handleUpdate`

```md
125. Current CRUD milestone
```

At this point the app has all CRUD pieces wired up:

- `Create` via form submit and POST
- `Read` via `getTodos()` and GET
- `Delete` via button and DELETE
- `Update` via checkbox and PUT

And the frontend now stays synced by reusing:

```jsx
getTodos()
```

after each mutation.
```

```md
126. Add `try/catch` to backend routes
```

He said a good next improvement is adding error handling around each backend route.

Pattern:

```js
try {
  // route logic
} catch (error) {
  console.log(error.message)
  res.status(500).json({ error: error.message })
}
```

He also mentioned:
- sometimes you do not want to send too much error detail to the frontend
- you may want more generic messages later

```md
127. Add status codes to backend responses
```

He talked about adding proper status codes, for example:
- `200` for OK
- `201` for successful create
- `400` for bad request
- `500` for server error

Examples:
- `POST` can use `201`
- `GET`, `PUT`, `DELETE` commonly use `200`

```md
128. Add `try/catch` to frontend fetch functions too
```

He said frontend fetch functions can also have `try/catch`.

That means:
- `getTodos`
- `handleSubmit`
- `handleDelete`
- `handleUpdate`

can each catch and log errors.

```md
129. Begin refactoring backend into separate files
```

He said the code-along kept everything in single files for simplicity, but now that it works, it is a good time to refactor.

Current issue:
- too much in `index.js`
- too much in `App.jsx`

He started with the backend first.

```md
130. Create a `routes` folder in the backend
```

Inside `backend`, create:

```bash
mkdir routes
```

```md
131. Create a todo routes file
```

Inside `backend/routes`, create:

```bash
touch todo.js
```

```md
132. Create an Express Router in `routes/todo.js`
```

He started the file with:

```js
import express from 'express'

const router = express.Router()
```

```md
133. Import the Todo model into the router file
```

Because the route logic uses the model, move that import into the route file:

```js
import Todo from '../models/todo.js'
```

He noted:
- go back one folder with `../`
- include `.js`

```md
134. Move all todo route logic from `index.js` into the router file
```

He said:
- `app.get` becomes `router.get`
- `app.post` becomes `router.post`
- `app.delete` becomes `router.delete`
- `app.put` becomes `router.put`

```md
135. Use shorter paths inside the router file
```

Because the router will be mounted at `/api/todos` in `index.js`, the route file no longer needs to repeat `/api/todos`.

So inside `routes/todo.js`, use:

```js
router.get('/')
router.post('/')
router.delete('/:id')
router.put('/:id')
```

```md
136. Export the router from `routes/todo.js`
```

At the bottom:

```js
export default router
```

```md
137. Import todo routes into `index.js`
```

In `backend/index.js`:

```js
import todoRoutes from './routes/todo.js'
```

```md
138. Mount the router with `app.use`
```

He said an Express Router is basically middleware, so you import it and use it with `app.use`.

In `index.js`:

```js
app.use('/api/todos', todoRoutes)
```

This means:
- the base path is defined once in `index.js`
- the route file only needs `/` and `/:id`

```md
139. Remove old todo route logic from `index.js`
```

After moving the routes, `index.js` should stay cleaner and only keep:
- imports
- middleware
- mounted routes
- server startup
- database connection

```md
140. Refactored backend structure so far
```

At this point backend is moving toward:

```bash
backend/
  db.js
  index.js
  models/
    todo.js
  routes/
    todo.js
```

```md
141. Current `index.js` after route refactor
```

```js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import todoRoutes from './routes/todo.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api/todos', todoRoutes)

app.listen(port, () => {
  console.log('Listening on port:', port)
  connectDB()
})
```

```md
142. Current `routes/todo.js` after route refactor
```

```js
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
```

```md
143. End-of-session summary
```

He said you did a lot:
- set up the full-stack app
- connected frontend to backend
- connected backend to MongoDB
- built a simple CRUD todo app
- added backend error handling
- started backend refactoring with Express Router

```md
144. Likely next step
```

His partial said they may:
- keep working on it a bit more
- do a little more refactoring

Most likely next:
- more backend cleanup
- then frontend refactoring out of `App.jsx`
- possibly prep for deployment tomorrow
```




he added new frontend refactor steps.


```md
145. Frontend refactor goal
```

He said now that the app works, the frontend should be organized better because everything is currently inside `App.jsx`.

He is splitting the UI into components.

Planned components:
- `Header`
- `Form`
- `TodoList`

He said this is easier to do near the end, after the app already works.

```md
146. Create a `components` folder in the frontend
```

Inside `frontend/src`, create:

```bash
mkdir components
```

```md
147. Create `Header.jsx`
```

Inside `frontend/src/components`, create:

```bash
touch Header.jsx
```

Put:

```jsx
export default function Header() {
  return (
    <header>
      <h1>To dos List</h1>
    </header>
  )
}
```

```md
148. Import and render `Header` in `App.jsx`
```

In `App.jsx`:

```jsx
import Header from './components/Header.jsx'
```

Then replace the old heading with:

```jsx
<Header />
```

```md
149. Create `Form.jsx`
```

Inside `frontend/src/components`, create:

```bash
touch Form.jsx
```

He started by moving the form into its own component.

At first he passed:
- `handleSubmit`
- `inputRef`

Then he changed direction and moved more of the logic into the `Form` component itself.

```md
150. Final direction for the form refactor
```

He said:
- all logic related to the input ref should live inside the `Form` component
- `preventDefault()` is also related to form submission, so that should live in the form too
- this led him to rename the function from `handleSubmit` to `handleCreate`

Reason:
- `handleCreate` matches the CRUD pattern better
- it also matches:
  - `handleDelete`
  - `handleUpdate`

```md
151. `Form.jsx` should own the input ref
```

He moved:
- `useRef`
- input clearing
- focusing
- form submission wrapper

into the `Form` component.

So the `Form` component should:
- import `useRef`
- create its own `inputRef`
- prevent default
- build the todo object
- pass the todo up through a prop function

```md
152. New `Form.jsx` pattern
```

This is the pattern he was moving toward:

```jsx
import { useRef } from 'react'

export default function Form({ handleCreate }) {
  const inputRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()

    const todo = {
      text: inputRef.current.value
    }

    await handleCreate(todo)

    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button>Submit</button>
    </form>
  )
}
```

Key idea:
- `Form` handles form-specific logic
- `App` still owns state and CRUD handlers

```md
153. Update `App.jsx` to use `handleCreate` instead of the old form logic
```

He said the reason the app component still holds some functions is because:
- `App` owns the `todos` state

So the create function in `App.jsx` becomes simpler and just handles data creation:

```jsx
async function handleCreate(todo) {
  await createTodo(todo)
  loadTodos()
}
```

This means:
- `App` no longer needs `inputRef`
- `App` no longer needs `preventDefault()`
- `App` no longer needs direct form element handling

```md
154. Create `TodoList.jsx`
```

Inside `frontend/src/components`, create:

```bash
touch TodoList.jsx
```

He said the todo list needs:
- the `todos` state variable
- the `handleUpdate` function
- also `handleDelete`

```md
155. `TodoList.jsx` props
```

The todo list component should receive:
- `todos`
- `handleDelete`
- `handleUpdate`

Because:
- `App` owns the state
- `TodoList` just renders it and calls the handlers

```md
156. `TodoList.jsx` example
```

```jsx
export default function TodoList({ todos, handleDelete, handleUpdate }) {
  return (
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
  )
}
```

```md
157. Update `App.jsx` to use components
```

The simplified `App.jsx` should now move toward this shape:

```jsx
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
```

```md
158. Why he changed the names
```

He said naming was part of the reason for the pause.

The idea is:
- `handleCreate` = create a new todo
- `handleDelete` = delete a todo
- `handleUpdate` = update a todo

This matches the CRUD pattern better than mixing everything under `handleSubmit`.

```md
159. API.js is still optional
```

He confirmed:
- `api.js` is not mandatory for capstone
- but it is helpful when the project gets bigger
- backend and frontend folder structure are more important

```md
160. Important frontend structure notes for capstone
```

He said:
- use a `components` folder
- if using React Router, also use a `pages` folder
- page-level components should go in `pages`

```md
161. Important backend import reminder
```

He hit an error because of a missing backend file extension.

Reminder:
- backend imports need `.js`

Example:

```js
import todoRoutes from './routes/todo.js'
```

and

```js
import Todo from '../models/todo.js'
```

```md
162. Current direction after this point
```

At this stage:
- backend refactor: routes and controllers
- frontend refactor: components and optional `api.js`
- next major goal after refactor is deployment
```











```md
Render backend deployment steps
```

1. Go to `render.com`
2. Open your `Dashboard`
3. Click `New`
4. Choose `Web Service`
5. Connect your GitHub account if needed
6. Select your full-stack project repository
7. On the setup page, configure the backend service
Add these:

```md
8. Choose the free instance type
```

- Select the `Free` plan
- He noted free instances spin down after inactivity

```md
9. Add backend environment variables in Render
```

This is important because your backend `.env` file is **not** on GitHub.

Add your backend env var in Render:
- key: `MONGO_URL`
- value: your **actual full MongoDB connection string**

Important:
- include your real username and password in the connection string
- do **not** just use the example placeholder values

```md
10. Update backend port logic before deploying
```

He added support for Render’s port environment variable.

In `backend/index.js`, change your port setup to:

```js
const port = process.env.PORT || 3000
```

This means:
- locally it uses `3000`
- on Render it uses Render’s provided port

```md
11. Push the port change to GitHub before deploying
```

After updating the backend port logic:

```bash
git add .
git commit -m "support production port"
git push
```

```md
12. Make sure MongoDB Atlas allows access
```

He said to make sure your MongoDB Atlas setup accepts the deployed backend connection.

Main things to verify:
- connection string is correct
- Atlas network access allows connections

He mentioned allowing access from anywhere, at least for now, so Render can connect.

```md
13. Deploy the backend service
```

Once settings and env vars are ready, create/deploy the Render web service.

```md
14. Test the deployed backend URL
```

After deployment, Render gives you a backend URL.

That URL is now your deployed API base URL.

He indicated you should be able to open it and use routes like your API endpoints on Render.

```md
15. Free-tier behavior note
```

He said if you stop using it for a while, the free instance may spin down and take a little time to wake back up again.

```md
Backend service settings
```

- **Name**: something like `todo-backend`
- **Language**: `Node`
- **Root Directory**: `backend`
  - or whatever your backend folder is actually named
  - it must match the exact folder name in your repo

- **Build Command**:
```bash
npm install
```

- **Start Command**:
```bash
node index
```

He said:
- use `node index` because your main server file is `index.js`
- do **not** use `nodemon`
- `nodemon` is only for development

```md
Important notes
```

- Root directory is the backend folder inside the full-stack repo
- If your folder name is capitalized, match it exactly
- If your server file had a different name, your start command would use that instead
  - for example `node server`

```md
Likely next step after this
```

After backend setup, the next thing will likely be:
- add backend environment variables on Render
- deploy
- then do a similar process for the frontend











He finished the **backend deploy** and started the **frontend deploy** on Render.

What he just did for frontend:

- Clicked `New`
- Chose `Static Site`
- Connected the **same GitHub repo**
- Made a **new Render project** just for the frontend
- Changed the frontend service name to something like:
  - `todo-frontend`

Then he started configuring frontend-specific settings:

- **Root Directory** should be your frontend folder
  - for example `frontend`
  - and it must match the exact folder name/casing in your repo

- **Build Command**:
```bash
npm run build
```

He explained:
- this creates the production-ready frontend
- Vite outputs that into a `dist` folder
- `dist` stands for distribution
- older setups sometimes called this `build`

So the key new thing is:
- frontend on Render should be deployed as a **Static Site**
- not a web service
- with root directory = frontend folder
- build command = `npm run build`

He was likely about to talk next about:
- the publish directory, which should probably be `dist`
- and then environment variables for the frontend backend URL