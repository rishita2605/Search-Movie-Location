import { React } from 'react'

import PropTypes from 'prop-types'

import './OutlineBtn.scss'

export default function OutlineBtn ({ btnText, btnOnClick, Icon, ...props }) {
  /* ++++++++++ Function Constants ++++++++++ */
  const classNames = Object.keys(props).length !== 0 ? ['outline-btn', ...props.className.split(' ')] : ['outline-btn']
  // to allow multiple classes to be added
  /* ---------- Function Constants ---------- */

  /* ++++++++++ Function Render Method ++++++++++ */
  return (
  <button className={classNames.join(' ')} onClick={ btnOnClick }>
  <span className="outline-btn__text">{ btnText }</span>
    <div className="outline-btn__icon"><Icon /></div>
  </button>
  )
}

OutlineBtn.displayName = 'OutlineBtn'
OutlineBtn.propTypes = {
  btnText: PropTypes.string.isRequired,
  btnOnClick: PropTypes.func,
  Icon: PropTypes.object,
  className: PropTypes.string
}
