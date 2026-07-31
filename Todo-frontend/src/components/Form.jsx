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
