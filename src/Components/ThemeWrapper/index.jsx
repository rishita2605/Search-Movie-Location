import { React, useState, useEffect } from 'react'
import { ThemeContext, themes } from '../../Contexts/ThemeContext'
import PropTypes from 'prop-types'

export default function ThemeWrapper (props) {
  /* ++++++++++ Function State ++++++++++ */
  const [theme, setTheme] = useState(themes.dark)
  /* ---------- Function State ---------- */

  /* ++++++++++ Function Methods ++++++++++ */
  const changeTheme = (theme) => {
    setTheme(theme)
  }
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Side Effects ++++++++++ */
  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add('light-theme')
        break

      case themes.dark:
      default:
        document.body.classList.remove('light-theme')
        break
    }
  }, [theme])
  /* ---------- Side Effects ---------- */

  /* ++++++++++ Function Render Method ++++++++++ */
  return <ThemeContext.Provider value={ { theme, changeTheme } }>
    {props.children}
  </ThemeContext.Provider>
}
ThemeWrapper.displayName = 'ThemeWrapper'
ThemeWrapper.propTypes = { children: PropTypes.object }
