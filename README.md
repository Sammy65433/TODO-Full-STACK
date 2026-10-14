# Full-Stack Todo App

A MERN todo application for creating tasks, marking them complete, and deleting them. I built it to practice the full request-and-response flow between React, an Express API, and MongoDB.

**Live application:** https://todo-frontend-nc1k.onrender.com

## What I Built

I developed both sides of the application:

- Built a React frontend with a task-entry form and interactive todo list.
- Created a Node.js and Express API with routes for all four CRUD operations.
- Modeled tasks in MongoDB using Mongoose. Each task has required text and a `completed` value that defaults to `false`.
- Connected the frontend to the API with `fetch`.
- Used React state to display tasks and reloaded saved data after creating, updating, or deleting a task.
- Organized backend endpoints with an Express Router and split the frontend into `Header`, `Form`, and `TodoList` components.
- Deployed the frontend and backend as separate Render services.

## Features

- Add a task.
- View saved tasks.
- Mark a task complete or incomplete using its checkbox.
- Delete a task.
- Persist changes in MongoDB so they remain after refreshing the page.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express, CORS |
| Database | MongoDB, Mongoose |
| Deployment | Render |

## How It Works

1. React requests saved tasks from `GET /api/todos`.
2. Express handles the request and uses Mongoose to retrieve tasks from MongoDB.
3. The API sends JSON back to the frontend, which stores the results in React state.
4. Adding a task sends a `POST` request.
5. Checking a task sends a `PUT` request that changes its `completed` value.
6. Deleting a task sends a `DELETE` request.
7. After a successful change, the frontend fetches the latest task list to stay in sync with MongoDB.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/todos` | Retrieve tasks |
| POST | `/api/todos` | Create a task |
| PUT | `/api/todos/:id` | Update a task |
| DELETE | `/api/todos/:id` | Delete a task |

A task document includes:

```json
{
  "_id": "MongoDB-generated ID",
  "text": "Finish my project",
  "completed": false
}
```

## Project Structure

```text
todo-fullstack/
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── models/
│   │   └── Todo.js
│   └── routes/
│       └── todo.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Header.jsx
        │   ├── Form.jsx
        │   └── TodoList.jsx
        ├── api.js
        ├── App.jsx
        └── App.css
```

The structure above reflects the refactored version described in my development notes. File names and capitalization should match the repository.

## Run Locally

You need Node.js and a MongoDB connection.

Install backend dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```dotenv
MONGO_URL=your_mongodb_connection_string
```

Start the backend:

```bash
node index.js
```

In another terminal, install frontend dependencies:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```dotenv
VITE_BASE_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite. The Vite port can vary.

**Never commit `.env` files or MongoDB credentials.** The `VITE_BASE_URL` value is a public API address, not a secret.

## Deployment

The backend runs as a Render Web Service, and the Vite frontend runs as a Render Static Site. The frontend uses `VITE_BASE_URL` to send requests to the deployed backend.

Typical Render settings for this repository:

| Service | Root directory | Build command | Start or publish setting |
| --- | --- | --- | --- |
| Backend Web Service | `backend` | `npm install` | Start: `node index.js` |
| Frontend Static Site | `frontend` | `npm install && npm run build` | Publish: `dist` |

The backend needs `MONGO_URL` configured in Render. The frontend needs `VITE_BASE_URL` set to the backend’s public URL. Neither value should point to `localhost` in production.

## Challenges and Lessons

- **Cross-origin requests:** The frontend and backend ran on different local ports, so I added CORS middleware to allow the browser to call the API.
- **JSON requests:** I added `express.json()` so Express could read the task data sent from the React form.
- **Synchronizing the UI:** Saving to MongoDB did not automatically change React state. After create, update, and delete actions, I fetched the latest tasks again.
- **Code organization:** Once the application worked, I moved todo routes out of the main server file and split the frontend into smaller components.

## Future Improvements

- Restrict CORS to approved frontend origins.
- Add clearer loading and error messages for API requests.
- Validate task input and return more specific API errors.
- Add automated API and frontend tests.
- Add user accounts if private, per-user task lists become a project requirement.
