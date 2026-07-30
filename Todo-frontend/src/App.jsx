import { useEffect } from 'react'

export default function App() {

  async function getData() {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return <div>Hello Star Wars!</div>
}
