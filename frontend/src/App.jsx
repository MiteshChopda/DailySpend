import { useState } from 'react'
import './App.css'
import InputsForm from './InputsForm'


function Toggle({handleToggle}) {
  return (
    <button
      className='toggleButton rounded'
      onClick={handleToggle}
    >tgl</button>
  )
}

function App() {
  const [toDashboard, setToDashboard] = useState(false);

  const handleToggle = (e) => {
    setToDashboard(!toDashboard);
  }

  if (toDashboard) {
    return (
      <>
        <Toggle handleToggle={handleToggle}/>
        <h1>hii</h1>

        {/* Dashdoard Component*/}
      </>
    )
  }
  else {
    return (
      <>
        <Toggle handleToggle={handleToggle} />
        <InputsForm handleToggle={handleToggle}></InputsForm>
      </>
    )

  }

}

export default App
