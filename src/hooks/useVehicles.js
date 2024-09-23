import { useEffect, useState } from 'react'
import { USER_VEHICLES } from '../resources/myApi'
import { getAccessToken } from '../helpers/tokenHelpers'

export function useUserVehicles () {
  const [vehicles, setVehicles] = useState([])
  const token = getAccessToken()

  useEffect(() => {
    fetch(USER_VEHICLES, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setVehicles(data)
      })
      .catch(error => {
        setVehicles([])
        console.error('Error fetching vehicles:', error)
      })
  }, [])

  return vehicles
}
