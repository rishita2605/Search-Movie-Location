import { React } from 'react'

import PropTypes from 'prop-types'

import './SolidBtn.scss'

export default function SolidBtn ({ onClickBtn, btnText }) {
  return <button className='solid-btn' onClick={onClickBtn}>{btnText}</button>
}

SolidBtn.displayName = 'SolidBtn'
SolidBtn.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired
}
