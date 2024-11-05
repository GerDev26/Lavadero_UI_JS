import { PRICES_ENDPOINT } from '../resources/myApi'
import { useFetch } from './useFetch' // Asegúrate de que el path sea correcto
import { getAccessToken } from '../helpers/tokenHelpers'

export function usePrices ({ vehicleType = '', service = '' } = { vehicleType: '', service: '' }) {
  const token = getAccessToken()
  const queryParams = new URLSearchParams({
    vehicleType,
    service
  }).toString()

  console.log(queryParams)

  const { data, loading, error } = useFetch({
    endpoint: PRICES_ENDPOINT,
    headers: { Authorization: `Bearer ${token}` }, // Añade headers si es necesario
    queryParams
  })

  return { data: data?.data, loading, error }
}
