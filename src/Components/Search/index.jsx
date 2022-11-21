import { React, useState, useEffect } from 'react'

import Autocomplete from 'react-autocomplete'
import PropTypes from 'prop-types'

// import './Search.css'

export default function Search ({ movies, searchVal, setSearchVal, location, setLocation }) {
  /* ++++++++++ Function State ++++++++++ */
  const [movieTitle, setMovieTitle] = useState([])
  /* ---------- Function State ---------- */

  /* ++++++++++ Side Effects ++++++++++ */
  useEffect(
    () => {
      const movieObj = []
      // Get unique list of movies for dropdown
      for (const m of [...new Set(movies.map((value) => value.title))]) {
        movieObj.push({ title: m })
      }
      setMovieTitle(movieObj)
    }, [movies]
  )
  /* ---------- Side Effects ---------- */

  /* ++++++++++ Function Methods ++++++++++ */

  /**
   * To search when enter is pressed.
   * @param object event
   */
  const searchOnEnter = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      setSearchVal(event.target.value)
      const loc = []
      for (const m of movies) {
        if (m.title === searchVal) loc.push(m.locations)
      }
      setLocation(loc)
    }
  }
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Function Render Method ++++++++++ */
  return <div className = 'search'><Autocomplete
  items = {movieTitle}
  // What value from the items' object should be displayed in the dropdown.
  getItemValue = { (item) => item.title }

  /**
   * Renders the dropdown item.
   *
   * @param item
   * @param isHighlighted controls whether the item should be highlighted.
   */
  renderItem = { (item, isHighlighted) => {
    return <div key={item.title}
    style={ { background: isHighlighted ? '#bcf5bc' : 'white' } }>
      {item.title}
    </div>
  } }

  /**
   * The items should be matched even if the cases don't match.
   * shouldItemRender is invoked for each item in items. The return value of this function
   * determines whether a dropdown element needs to be displayed or not.
   * Displaying items only when they're found in the list. All items are displayed by default.
   *
   * @param item item from list
   * @param value value entered in input
  */
  shouldItemRender = { (item, value) => {
    return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 && value.length >= 0
  } }

  value={searchVal}
  onChange={ (event) => setSearchVal(event.target.value) }
  onSelect={ (val) => setSearchVal(val) }

  // Using render input so that the onKeyUp event can be attached to it.
  renderInput={
    function (props) {
      return <input {...props} onKeyUp={(evt) => { searchOnEnter(evt) }}/>
    }
  }
  />
  </div>
}

Search.displayName = 'Search'
Search.propTypes = {
  movies: PropTypes.array.isRequired,
  searchVal: PropTypes.string.isRequired,
  setSearchVal: PropTypes.func.isRequired,
  location: PropTypes.array.isRequired,
  setLocation: PropTypes.func.isRequired
}
