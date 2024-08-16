import { useEffect, useState } from 'react'
import { APPOINTMENTS_DATES, APPOINTMENTS_ENDPOINT } from '../resources/myApi'

export function useDates () {
  const [dates, setDates] = useState([])

  useEffect(() => {
    fetch(APPOINTMENTS_DATES)
      .then(async res => await res.json())
      .then(data => {
        setDates(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return dates
}

export function useAppointmentHour (date = '01-01-2024') {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch(APPOINTMENTS_ENDPOINT + date)
      .then(async res => await res.json())
      .then(data => {
        setAppointments(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [date])

  return appointments
}
