import { useEffect, useState } from 'react'
import { USER_VEHICLES } from '../resources/myApi'

export function useUserVehicles (id) {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetch(USER_VEHICLES + id)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setVehicles(data)
      })
  }, [])

  return vehicles
}
