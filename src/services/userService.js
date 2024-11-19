import { getRoleIdByDesc } from '../helpers/roleHelpers'
import { getAccessToken } from '../helpers/tokenHelpers'
import { USER_ROLE, USERS_ENDPOINT } from '../resources/myApi'

export async function DeleteUser (id) {
  const token = getAccessToken()
  try {
    const response = await fetch(`${USERS_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar el usuario')
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error en DeleteUser:', error)
    throw error
  }
}

export async function CreateUser (user) {
  user.role_id = getRoleIdByDesc(user.role_id)
  const token = getAccessToken()
  try {
    const response = await fetch(USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      const errors = await response.json()
      console.log(errors)
      throw new Error(errors)
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export async function UpdateUser (userID, modifyUser) {
  const token = getAccessToken()
  modifyUser.role_id = getRoleIdByDesc(modifyUser.role_id)
  try {
    const response = await fetch(`${USERS_ENDPOINT}/${userID}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(modifyUser)
    })

    if (!response.ok) {
      const errors = await response.json()
      console.log(errors)
      throw new Error(errors)
    }

    const data = await response.json()
    console.log(data)
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
