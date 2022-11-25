import { React } from 'react'

import PropTypes from 'prop-types'

import './OutlineBtn.scss'

export default function OutlineBtn ({ btnText, btnOnClick, Icon }) {
  return (
  <button className="outline-btn" onClick={ btnOnClick }>
  <span className="outline-btn__text">{ btnText }</span>
    <div className="outline-btn__icon"><Icon /></div>
  </button>
  )
}

OutlineBtn.displayName = 'OutlineBtn'
OutlineBtn.propTypes = {
  btnText: PropTypes.string.isRequired,
  btnOnClick: PropTypes.func,
  Icon: PropTypes.object
}
