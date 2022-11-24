import { React, useEffect, useRef, useState } from 'react'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import PropTypes from 'prop-types'

export default function MovieMap ({ location }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
  /* ++++++++++ Function State ++++++++++ */
  const mapContainerRef = useRef(null)
  const map = useRef(null)
  const [coords, setCoords] = useState([])
  const [mapMarker, setMapMarker] = useState([])
  /* ---------- Function State ---------- */

  /* ++++++++++ Function Constants ++++++++++ */
  /* ---------- Function Constants ---------- */

  /* ++++++++++ Function Methods ++++++++++ */

  const getCoordinates = async () => {
    const coordinates = []
    console.log(location)

    for (let loc of location) {
      // location with at __ street does not give proper result.
      loc = loc?.indexOf(' at ') === -1 ? loc : loc?.substring(0, loc?.indexOf(' at '))
      // location with between don't give proper result.
      loc = loc?.indexOf(' between ') === -1 ? loc : loc?.substring(0, loc?.indexOf(' between '))

      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc)}.json?bbox=-122.517688%2C37.707798%2C-122.356967%2C37.832427&limit=1&proximity=-122.42344351864507%2C37.784784180620065&types=place%2Caddress%2Cneighborhood%2Cpoi%2Cregion%2Clocality&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)

      const data = await response.json()
      const result = data?.features[0]?.center
      if (result) coordinates.push(data?.features[0]?.center) // add the coordinates only if it not empty / undef
    }

    console.log(coordinates)
    setCoords(coordinates)
  }
  /* ---------- Function Methods ---------- */

  /* ++++++++++ Side Effects ++++++++++ */
  // Creating the map object
  useEffect(() => {
    if (map.current) return // Do not initialise map more than once.

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/rishita2605/clauqtw2m000815s19z7mhl8j',
      // mapbox://styles/rishita2605/clauplkbh00gz14mpmxdryjsf
      // mapbox://styles/rishita2605/clatc3iet000615oyl41h0lpk
      center: [-122.271356, 37.804456],
      zoom: 11
    })

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left')
  })

  // Get coordinates from the location name -> geocoding api
  useEffect(() => {
    console.log(location.length)
    getCoordinates(location)
  }, [location])

  // Add markers whenever a movie is searched
  useEffect(() => {
    if (!map.current) return // Map hasn't been initialised yet

    const markers = []
    for (const m of mapMarker) m.remove() // removing markers of previous movie location.

    // Creating markers for the location.
    for (const c of coords) {
      markers.push(new mapboxgl.Marker().setLngLat(c).addTo(map.current))
    }
    setMapMarker(markers)

    // for the animation when moving from one location to another.
    map.current.flyTo({
      center: coords[0],
      essential: true
    })
  }, [coords, location])
  /* ---------- Side Effects ---------- */

  return <div className='map' ref={mapContainerRef}></div>
}

MovieMap.displayName = 'MovieMap'
MovieMap.propTypes = { location: PropTypes.array.isRequired }
