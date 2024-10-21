import { useFetch } from './useFetch'
import { APPOINTMENTS_DATES, APPOINTMENTS_ENDPOINT, APPOINTMENTS_WEEK, USER_APPOINTMENTS } from '../resources/myApi'
import { getAccessToken } from '../helpers/tokenHelpers'

export function useUserAppointments () {
  const token = getAccessToken()
  const { data: appointments, error, loading } = useFetch({
    endpoint: USER_APPOINTMENTS,
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data: appointments || [], error, loading }
}

export function useDates () {
  const { data: dates, error, loading } = useFetch({
    endpoint: APPOINTMENTS_DATES
  })

  return { data: dates || [], error, loading }
}

export function useAppointmentHour (date = '01-01-2024') {
  const { data: appointments, error, loading } = useFetch({
    endpoint: `${APPOINTMENTS_ENDPOINT}${date}`
  })

  return { data: appointments || [], error, loading }
}

export function useAppointments ({ date = '', month = '' }) {
  const { data, error, loading } = useFetch({
    endpoint: APPOINTMENTS_ENDPOINT,
    queryParams: `date=${date}&&month=${month}`
  })

  return { data: data?.data || [], error, loading }
}

export function useWeekAppointments () {
  const { data: appointments, error, loading } = useFetch({
    endpoint: APPOINTMENTS_WEEK
  })

  return { data: appointments || [], error, loading }
}
