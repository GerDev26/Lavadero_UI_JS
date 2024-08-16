import { USERS_ENDPOINT } from '../resources/myApi'

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
