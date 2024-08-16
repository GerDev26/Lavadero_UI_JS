import { getAccessToken } from '../helpers/tokenHelpers'
import { USER_NEW_VEHICLE, VEHICLE_ENDPOINT } from '../resources/myApi'

export async function newClientVehicle (vehicle) {
  try {
    const token = getAccessToken()
    const res = await fetch(USER_NEW_VEHICLE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicle)
    })

    if (!res.ok) {
      const error = res.json()
      throw new Error(error)
    }

    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteVehicle (id) {
  try {
    const res = await fetch(VEHICLE_ENDPOINT + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error)
    }
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
