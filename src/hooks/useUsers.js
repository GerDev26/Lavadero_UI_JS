import { useEffect, useState } from 'react'
import { ROLE_ENDPOINT, USER_ROLE, USERS_ENDPOINT } from '../resources/myApi'
import { getAccessToken } from '../helpers/tokenHelpers'
import { useFetch } from './useFetch'

export function useRoles () {
  const token = getAccessToken()

  const { data, loading, error } = useFetch({
    endpoint: ROLE_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`
    }, // Agrega headers adicionales si los necesitas
    queryParams: '' // Agrega query params si es necesario
  })

  // Retornamos los datos y el estado de carga y error
  return { data, loading, error }
}
export function useAllUsers () {
  const token = getAccessToken()

  const { data, loading, error } = useFetch({
    endpoint: USERS_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`
    }, // Agrega headers adicionales si los necesitas
    queryParams: '' // Agrega query params si es necesario
  })

  // Retornamos los datos y el estado de carga y error
  return { data, loading, error }
}

export function useCheckUserRole (rechargeRole = false) {
  const [role, setRole] = useState('')

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      fetch(USER_ROLE, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(data => data.json())
        .then(res => {
          setRole(res.role)
        })
        .catch(() => {
          setRole('visitor')
        })
    } else {
      setRole('visitor')
    }
    console.log('render')
  }, [rechargeRole])
  return role
}
