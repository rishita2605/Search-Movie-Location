import { React, useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

// import PropTypes from 'prop-types'

// import './DeckMap.css'
import geoJson from './chicago-parks.json'

export default function Map () {
  // Public key of mapbox
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
  const mapContainerRef = useRef(null)
  const [place, setPlace] = useState(encodeURIComponent('Crissy Field'))
  // const [center, setCenter] = useState([])
  let map
  // Initialize map when component mounts
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.65, 41.84],
      zoom: 10
    })

    setPlace(encodeURIComponent('Russian Hill'))
    // Create default markers
    geoJson.features.map((feature) =>
      new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    )

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?bbox=-122.517688%2C37.707798%2C-122.356967%2C37.832427&proximity=-122.419906%2C37.779026&types=place%2Cpostcode%2Caddress&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data?.features[0].center)
        // setCenter(data?.features[0].center)
        map.flyTo({
          center: data?.features[0].center,
          essential: true
        })
        new mapboxgl.Marker().setLngLat(data?.features[0].center).addTo(map)
        // console.log(data)
      })

    // Clean up on unmount
    return () => map.remove()
  }, [])

  // useEffect(() => {
  //   console.log({ place })
  //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?bbox=-122.517688%2C37.707798%2C-122.356967%2C37.832427&proximity=-122.419906%2C37.779026&types=place%2Cpostcode%2Caddress&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data?.features[0].center)
  //       map.flyTo({
  //         center: data?.features[0].center,
  //         essential: true
  //       })
  //       // console.log(data)
  //     })
  // })
  return <div className="map-container" ref={mapContainerRef} />
}
