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