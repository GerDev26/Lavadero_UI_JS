import { useEffect, useState } from 'react'
import { USER_ROLE, USERS_ENDPOINT } from '../resources/myApi'
import { getAccessToken } from '../helpers/tokenHelpers'

export function useAllUsers () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(USERS_ENDPOINT)
      .then(async res => await res.json())
      .then(data => {
        setUsers(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return users
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
