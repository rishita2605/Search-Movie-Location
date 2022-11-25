import { React } from 'react'

import PropTypes from 'prop-types'

// import './SearchBtn.css'

export default function SearchBtn ({ onClickBtn }) {
  return <button className='search__btn' onClick={onClickBtn}>Search</button>
}
SearchBtn.displayName = 'SearchBtn'
SearchBtn.propTypes = { onClickBtn: PropTypes.func.isRequired }
