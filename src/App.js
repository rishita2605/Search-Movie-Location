import React from 'react'
import './App.scss'
import HomePage from './Pages/HomePage'

function App () {
  return (
    <div className="App dark">
      <div className="bubbles">
      <div className="bubbles__1"></div>
      <div className="bubbles__2"></div>
      <div className="bubbles__3"></div>
      <div className="bubbles__4"></div>
      </div>
      <HomePage />
    </div>
  )
}

export default App
