import { React, useState, useEffect } from 'react'

import PropTypes from 'prop-types'

export default function MovieCard ({ movies, location, searchVal }) {
  /* ++++++++++ Function State ++++++++++ */
  const [display, setDisplay] = useState(false) // don't display card until something is searched
  const [cardContent, setCardContent] = useState({
    movieName: '',
    actors: [],
    director: '',
    productionCompany: '',
    releaseYear: 0
  })
  /* ---------- Function State ---------- */

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
        setDisplay(true)
      }
    }
    setCardContent(movieData)
  }, [location])
  /* ---------- Side Effects ---------- */

  console.log({ cardContent })
  return (display &&
  <div className='card-container'>
  <div className='movie-card'>
    <div className="movie-card__header">Movie: {cardContent.movieName}</div>
    <div className="movie-card__body">
      {
        cardContent.releaseYear &&
        <div className='movie-card__body__realease-year'>
          <b>Released on:</b> {cardContent.releaseYear}
        </div>
      }
      <div className='movie-card__body__movie-info'>
         {cardContent.director && (<b>Directed by: {cardContent.director} || </b>)}
         {cardContent.productionCompany && (<b>Produced by: {cardContent.productionCompany}</b>)}
      </div>
      {
        cardContent.location.length > 0 &&
        <div className='movie-card__body__location'>
          <b>Location: {' '}</b>
          {cardContent.location.map((elem, index, array) => {
            const separator = index === array.length - 1 ? '' : ', '
            return elem + separator
          })}
        </div>
      }
      {
        cardContent.actors.length > 0 &&
        <div className='movie-card__body__actors'>
         <b> Actors: {' '}</b>
          {cardContent.actors.map((elem, index, array) => {
            const separator = index === array.length - 1 ? '' : ', '
            return elem + separator
          })}
        </div>
      }
    </div>
  </div>
  </div>
  )
}

MovieCard.displayName = 'MovieCard'
MovieCard.propTypes = {
  movies: PropTypes.array.isRequired,
  location: PropTypes.array.isRequired,
  searchVal: PropTypes.string.isRequired
}
