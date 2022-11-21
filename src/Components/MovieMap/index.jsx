import { React, useEffect, useRef, useState } from 'react'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import PropTypes from 'prop-types'

export default function MovieMap ({ location }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
  /* ++++++++++ Function State ++++++++++ */
  const mapContainerRef = useRef(null)
  const [coords, setCoords] = useState([])
  /* ---------- Function State ---------- */

  /* ++++++++++ Function Constants ++++++++++ */
  /* ---------- Function Constants ---------- */

  /* ++++++++++ Function Methods ++++++++++ */

  const getCoordinates = async () => {
    const coordinates = []

    for (const loc of location) {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc)}.json?bbox=-122.517688%2C37.707798%2C-122.356967%2C37.832427&limit=1&proximity=-122.42344351864507%2C37.784784180620065&types=place%2Caddress%2Cneighborhood%2Cpoi%2Cregion%2Clocality&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)

      const data = await response.json()
      coordinates.push(data?.features[0]?.center)
    }

    setCoords(coordinates)
  }
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Side Effects ++++++++++ */
  // Creating the map object
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.271356, 37.804456],
      zoom: 10
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    for (const c of coords) {
      new mapboxgl.Marker().setLngLat(c).addTo(map)
    }

    map.flyTo({
      center: coords[0],
      essential: true
    })

    // Clean up on unmount
    return () => map.remove()
  }, [coords, location])

  // Get coordinates from the location name, geocoding api
  useEffect(() => {
    console.log(location)
    getCoordinates(location)
    console.log(coords)
  }, [location])

  /* ---------- Side Effects ---------- */

  return <div className='map' ref={mapContainerRef}></div>
}

MovieMap.displayName = 'MovieMap'
MovieMap.propTypes = { location: PropTypes.array.isRequired }
