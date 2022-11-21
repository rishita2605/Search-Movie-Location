import { React } from 'react'

import PropTypes from 'prop-types'

// import './SearchBtn.css'

export default function SearchBtn ({ searchMovie }) {
  return <button className='search__btn' onClick={(evt) => searchMovie(evt)}>Search</button>
}
SearchBtn.displayName = 'SearchBtn'
SearchBtn.propTypes = { searchMovie: PropTypes.func.isRequired }
