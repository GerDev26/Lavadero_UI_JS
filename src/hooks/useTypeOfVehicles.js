import { useEffect, useState } from 'react'
import { TYPE_OF_VEHICLE_ENDPOINT } from '../resources/myApi'

export function useAllTypeOfVehicles () {
  const [typeOfVehicles, setTypeOfVehicles] = useState([])

  useEffect(() => {
    fetch(TYPE_OF_VEHICLE_ENDPOINT)
      .then(async res => await res.json())
      .then(data => {
        setTypeOfVehicles(data)
      })
      .catch(error => {
        console.log(error)
        setTypeOfVehicles([])
      })
  }, [])

  return typeOfVehicles
}
