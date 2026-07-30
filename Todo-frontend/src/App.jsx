import { useEffect } from 'react'




export default function App() {

  async function test() {
    fetch('http://localhost:3000/');
  }

  useEffect(() => {

  }, [])




  return (
    <div>
      Hello Star Wars!
    </div>
  )
}
