import React, { useState, useEffect, useRef } from 'react'

import { ReactComponent as DownArrow } from '../Icons/DownArrow.svg'
import './HomePage.scss'
import MovieCard from '../Components/MovieCard'
import MovieMap from '../Components/MovieMap'
import OutlineBtn from '../Components/OutlineBtn'
import Search from '../Components/Search'
import { ReactComponent as UpArrow } from '../Icons/UpArrow.svg'

export default function HomePage () {
  /* ++++++++++ Function State ++++++++++ */
  const [searchVal, setSearchVal] = useState('') // Defining search value so that it can be accessed in Map component as well.
  const [movies, setMovies] = useState([])
  const [location, setLocation] = useState([])
  const [zoom, setZoom] = useState(0.5)
  const [currentIcon, setCurrentIcon] = useState(DownArrow)
  const oneRef = useRef(null)
  const twoRef = useRef(null)
  const [colOne, setColOne] = useState(true)
  /* ---------- Function State ---------- */

  /* ++++++++++ Side Effects ++++++++++ */
  useEffect(() => {
    fetch('https://data.sfgov.org/resource/yitu-d5am.json')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data)
      })

    // To move to different sections on mobile on button click
    if (window.screen.width <= 576) { window.location.replace('/#column-1') }
  }, [])

  /* ---------- Side Effects ---------- */

  /* ++++++++++ Function Constants ++++++++++ */
  /* ---------- Function Constants ---------- */

  /* ++++++++++ Function Methods ++++++++++ */
  /**
   * Navigation button for mobile UI
   */
  const navigateOnClick = () => {
    if (colOne) {
      setCurrentIcon(UpArrow)
      setColOne(!colOne)
      twoRef.current.scrollIntoView()
    } else {
      setCurrentIcon(DownArrow)
      setColOne(!colOne)
      oneRef.current.scrollIntoView()
    }
  }
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Function Render Method ++++++++++ */
  return <div className='home-page container'>
    <div className="container__column container__column--left" id='column-1' ref={oneRef}>
      <Search
        movies={ movies }
        searchVal = { searchVal } setSearchVal = { setSearchVal }
        location = { location } setLocation = { setLocation } />
      <MovieMap
        location = { location }
        setLocation = { setLocation }
        zoom = { zoom }
        setZoom = { setZoom }/>
    </div>
    <div className="container__column container__column--right" id='column-2' ref={twoRef}>
      <MovieCard
        movies={ movies }
        location={ location }
        searchVal={ searchVal }
        setZoom = { setZoom }/>
    </div>
    <OutlineBtn btnText='' btnOnClick={navigateOnClick} Icon={ currentIcon } className='navigate-btn'/>
  </div>
}

HomePage.displayName = 'HomePage'
