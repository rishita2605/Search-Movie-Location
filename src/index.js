import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import ThemeWrapper from './Components/ThemeWrapper'
import './global.scss'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeWrapper>
  <React.StrictMode>
    <div className="bubbles">
      <div className="bubbles__1"></div>
      <div className="bubbles__2"></div>
      <div className="bubbles__3"></div>
      <div className="bubbles__4"></div>
      <div className="bubbles__5"></div>
    </div>
    <App />
  </React.StrictMode>
  </ThemeWrapper>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
