const BASE_URL = 'http://localhost:3000/api/todos'

export async function getTodos() {
    const response = await fetch(BASE_URL)
    return await response.json()
}

export async function createTodo(todo) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await response.json()
}

export async function deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    return await response.json()
}

export async function updateTodo(id, todo) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await response.json()
}
