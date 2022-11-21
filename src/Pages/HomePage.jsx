import React, { useState, useEffect } from 'react'

// import DeckMap from '../Components/DeckMap'
import MovieMap from '../Components/MovieMap'
import Search from '../Components/Search'

// import './HomePage.css';

export default function HomePage () {
  /* ++++++++++ Function State ++++++++++ */
  const [searchVal, setSearchVal] = useState('') // Defining search value so that it can be accessed in Map component as well.
  const [movies, setMovies] = useState([])
  const [location, setLocation] = useState([])
  /* ---------- Function State ---------- */

  /* ++++++++++ Side Effects ++++++++++ */
  useEffect(() => {
    fetch('https://data.sfgov.org/resource/yitu-d5am.json')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data)
        // console.log(data)
        // console.log([...new Set(data.map((value) => value.locations))])
      })
  }, [])

  /* ---------- Side Effects ---------- */

  /* ++++++++++ Function Constants ++++++++++ */
  /* ---------- Function Constants ---------- */

  /* ++++++++++ Function Methods ++++++++++ */
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Function Render Method ++++++++++ */
  return <div className='home-page'>
  <Search
  movies={ movies }
  searchVal = { searchVal } setSearchVal = { setSearchVal }
  location = { location } setLocation = { setLocation } />

  <MovieMap location = { location } />
  </div>
}

HomePage.displayName = 'HomePage'
// HomePage.propTypes = { propname: PropTypes.propType.isRequired,};
