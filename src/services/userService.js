import { getAccessToken } from '../helpers/tokenHelpers'
import { USER_ROLE, USERS_ENDPOINT } from '../resources/myApi'

export async function DeleteUser (id) {
  try {
    const response = await fetch(`${USERS_ENDPOINT}${id}`, { method: 'DELETE' })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData)
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function CreateUser (user) {
  try {
    const response = await fetch(USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      const errors = await response.json()
      console.log(errors)
      throw new Error(errors)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export async function checkRole () {
  try {
    const token = getAccessToken()
    const res = await fetch(USER_ROLE, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error.errors)
    throw error
  }
}
