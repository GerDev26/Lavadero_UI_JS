import { useEffect, useState } from 'react'
import { APPOINTMENTS_DATES, APPOINTMENTS_ENDPOINT, USER_APPOINTMENTS } from '../resources/myApi'
import { getAccessToken } from '../helpers/tokenHelpers'

export function useUserAppointments () {
  const [appointments, setAppointments] = useState([])
  const token = getAccessToken()

  useEffect(() => {
    fetch(USER_APPOINTMENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setAppointments(data)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  }, [])

  return appointments
}

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
