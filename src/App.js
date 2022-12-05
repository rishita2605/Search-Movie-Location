import React, { useState } from 'react'

import './App.scss'
import { ReactComponent as MoonIcon } from './Icons/MoonIcon.svg'
import HomePage from './Pages/HomePage'
import { ReactComponent as SunIcon } from './Icons/SunIcon.svg'
import { ThemeContext, themes } from './Contexts/ThemeContext'

function App () {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <div className="App">
      <div className='App__header'>
        <ThemeContext.Consumer>
          {
            ({ changeTheme }) => (
              <button onClick={() => {
                setDarkMode(!darkMode)
                changeTheme(darkMode ? themes.dark : themes.light)
              }}
              className='icon-btn'>
                { darkMode ? <MoonIcon /> : <SunIcon /> }
              </button>
            )
          }
        </ThemeContext.Consumer>
      </div>

      <HomePage />
    </div>
  )
}

export default App
