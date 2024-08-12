import { useEffect, useState } from 'react'
import { USERS_ENDPOINT } from '../resources/myApi'

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
