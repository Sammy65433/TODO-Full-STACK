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


New steps:

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
The next thing he is doing is testing whether the frontend can successfully send a request to the backend.