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

  return <div>Hello Star Wars!</div>
}
