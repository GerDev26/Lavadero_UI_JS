import { USER_VEHICLES } from '../resources/myApi'
import { getAccessToken } from '../helpers/tokenHelpers'
import { useFetch } from './useFetch'

export function useUserVehicles () {
  const token = getAccessToken()

  const { data: vehicles, loading, error } = useFetch({
    endpoint: USER_VEHICLES,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  })

  return { vehicles: vehicles || [], loading, error }
}
