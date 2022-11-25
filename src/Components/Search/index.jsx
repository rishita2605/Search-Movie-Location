import { React, useState, useEffect } from 'react'

import Autocomplete from 'react-autocomplete'
import PropTypes from 'prop-types'
import useMeasure from 'react-use-measure'

import SearchBtn from '../SearchBtn'
import { ReactComponent as SearchIcon } from '../../Icons/SearchIcon.svg'

export default function Search ({ movies, searchVal, setSearchVal, setLocation }) {
  /* ++++++++++ Function State ++++++++++ */
  const [movieTitle, setMovieTitle] = useState([])
  const [ref, bounds] = useMeasure()
  /* ---------- Function State ---------- */

  /* ++++++++++ Function Constants ++++++++++ */
  const menuStyle = {
    display: 'block',
    maxHeight: '30vh',
    position: 'absolute',
    overflow: 'auto',
    width: bounds.width,
    scrollBehavior: 'smooth',
    left: 0,
    top: bounds.height // height of search container
  }

  const menuItemStyle = {
    isHighlighted: {
      background: 'rgba(0,0,0,0.01)',
      boxShadow: '0 2px 10px rgba(255, 244, 255, 0.676)'
    },
    notHighlighted: {
      background: 'rgba(0,0,0,0.01)'
    }
  }
  /* ---------- Function Constants ---------- */

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
  const searchMovie = (event) => {
    // Checking if the input is empty i.e no search value entered.
    if ((event.key === 'Enter' && !event.target.value.trim()) && !searchVal.trim()) return

    if (event.key === 'Enter') {
      setSearchVal(event.target.value)
    }

    const loc = []
    if (event.type === 'click' || event.key === 'Enter') {
      for (const m of movies) {
        if (m.title === searchVal) loc.push(m.locations)
      }

      // so that the movie card is displayed even when no movie found.
      if (loc?.length === 0) {
        loc.push('no movie')
      }
      setLocation(loc)
    }
  }
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Function Render Method ++++++++++ */
  return (
  <div className="search">
  <div className = 'search__container' ref={ref}>
    <div className="autocomplete-container">
      <Autocomplete
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
        style= { isHighlighted ? menuItemStyle.isHighlighted : menuItemStyle.notHighlighted }
        className = 'search__menu-item'>
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
          return <input {...props} onKeyUp={(evt) => { searchMovie(evt) }} className='search__input'/>
        }
      }
      menuStyle={menuStyle}
      />
    </div>
    <SearchIcon className='icon-container'/>
    <SearchBtn onClickBtn= { searchMovie }/>
  </div>
  </div>
  )
}

Search.displayName = 'Search'
Search.propTypes = {
  location: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  searchVal: PropTypes.string.isRequired,
  setSearchVal: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired
}
