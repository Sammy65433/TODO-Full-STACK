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
