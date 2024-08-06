import { useEffect, useState } from 'react'
import { APPOINTMENTS_ENDPOINT } from '../resources/myApi'

export function useAllAppointments () {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch(APPOINTMENTS_ENDPOINT)
      .then(async res => await res.json())
      .then(res => {
        setAppointments(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return appointments
}
