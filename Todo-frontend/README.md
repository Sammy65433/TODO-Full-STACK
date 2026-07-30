

```md
1. Create a main project folder
```bash
mkdir todo-fullstack
cd todo-fullstack
```

```md
2. Create the frontend React app with Vite
```bash
npm create vite@latest frontend
```
- Choose `React`
- Choose `JavaScript`

```md
3. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

```md
4. Create the backend folder
```bash
mkdir backend
cd backend
```

```md
5. Initialize backend package.json
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
```bash
npm install express
```

```md
8. Create the backend server file
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

For gitignore, add `node_modules` and `.env` in both places or at root if using one top-level `.gitignore`:

```gitignore
node_modules/
.env
dist/
```