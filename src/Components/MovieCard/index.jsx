import { React, useState, useEffect, useRef } from 'react'

import PropTypes from 'prop-types'

import { ReactComponent as CloseIcon } from '../../Icons/CloseIcon.svg'
import { ReactComponent as HeartIcon } from '../../Icons/HeartIcon.svg'
import OutlineBtn from '../OutlineBtn'

export default function MovieCard ({ movies, location, searchVal, setZoom }) {
  /* ++++++++++ Function State ++++++++++ */
  const [display, setDisplay] = useState(false) // don't display card until something is searched
  const [style, setStyle] = useState({
    width: '0'
  })
  const [cardContent, setCardContent] = useState({
    movieName: '',
    actors: [],
    director: '',
    productionCompany: '',
    releaseYear: 0
  })
  const cardRef = useRef(null)
  const containerRef = useRef(null)
  /* ---------- Function State ---------- */

  /* ++++++++++ Function Constants ++++++++++ */
  /* ---------- Function Constants ---------- */

  /* ++++++++++ Function Methods ++++++++++ */
  const closeCard = () => {
    cardRef.current.classList.remove('is-card-visible')
    containerRef.current.classList.remove('is-container-visible')
    setDisplay(false)
    // Hide card
    setStyle({
      width: '0'
    })
  }

  const zoomOnClick = () => {
    setZoom(Math.floor(Math.random() * 8) + 6)
    setStyle({
      width: '29vw'
    })
  }
  const displayCard = (displayVal) => {
    setDisplay(displayVal)
    cardRef.current.classList.add('is-card-visible')
    containerRef.current.classList.add('is-container-visible')
    // Display card after map animation
    setTimeout(() => {
      setStyle({
        width: '29vw'
      })
    }, 800)
  }
  /* ---------- Function Methods ---------- */
  /* ++++++++++ Side Effects ++++++++++ */
  // Only the location state changes when a value is searched
  useEffect(() => {
    const movieData = {}
    for (const m of movies) {
      if (m.title === searchVal) {
        movieData.movieName = searchVal
        movieData.actors = [m.actor_1, m.actor_2, m.actor_3]
        movieData.director = m.director
        movieData.productionCompany = m.production_company
        movieData.releaseYear = m.release_year
        movieData.location = location.filter((l) => { return !!l })
        movieData.actors = movieData.actors.filter((a) => { return !!a })
        displayCard(true)
      }
    }

    if (location[0] === 'no movie') {
      displayCard(false)
    }

    setCardContent(movieData)
  }, [location])
  /* ---------- Side Effects ---------- */
  console.log({ style })
  return (
  <div className='card-container' ref={containerRef}
  style={ style }>
    <div className="card" ref={cardRef}>
    <div className="close">
      <button className="close__btn" onClick={ closeCard }>
        <CloseIcon className='close__btn__icon'/>
      </button>
    </div>
    <div className='movie-card'>
      <div className="movie-card__header">
        <div className="movie-card__header--title">{cardContent?.movieName}</div>
        {
          cardContent?.releaseYear &&
          <div className="movie-card__header--year">{cardContent?.releaseYear}</div>
        }
      </div>
      <div className="movie-card__body">
        {
          cardContent?.director && <div className="movie-card__body__field">
            <span className='movie-card__body__field--label'> Director: {' '}</span> {cardContent?.director}
          </div>
        }
        {
          cardContent?.director && <div className="movie-card__body__field">
            <span className='movie-card__body__field--label'> Production Company: {' '}</span> {cardContent?.productionCompany}
          </div>
        }
        {
          cardContent?.location?.length > 0 &&
          <div className='movie-card__body__field'>
            <span className='movie-card__body__field--label'> Shot in: {' '}</span>
            {cardContent?.location?.map((elem, index, array) => {
              const separator = index === array.length - 1 ? '' : ', '
              return elem + separator
            })}
          </div>
        }
        {
          cardContent?.actors?.length > 0 &&
          <div className='movie-card__body__field'>
          <span className='movie-card__body__field--label'> Cast: {' '}</span>
            {cardContent?.actors?.map((elem, index, array) => {
              const separator = index === array.length - 1 ? '' : ', '
              return elem + separator
            })}
          </div>
        }
      </div>
    </div>
    {
      display
        ? (
        <OutlineBtn btnOnClick={zoomOnClick} btnText='Want to Visit' Icon={HeartIcon} />
          )
        : (<div className='no-movie'>Uh oh. No such movie found!</div>)
    }

    </div>
  </div>
  )
}

MovieCard.displayName = 'MovieCard'
MovieCard.propTypes = {
  location: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  searchVal: PropTypes.string.isRequired,
  setZoom: PropTypes.func.isRequired
}
