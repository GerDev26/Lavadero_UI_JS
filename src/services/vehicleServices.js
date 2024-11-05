import { getAccessToken } from '../helpers/tokenHelpers'
import { getTypeIdByDescription } from '../helpers/vehicleHelper'
import { VEHICLE_ENDPOINT } from '../resources/myApi'

export async function CreateVehicle (vehicle) {
  vehicle.vehicleType = getTypeIdByDescription(vehicle.vehicleType)

  try {
    const token = getAccessToken()
    const res = await fetch(VEHICLE_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicle)
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message)
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
    const token = getAccessToken()
    const res = await fetch(VEHICLE_ENDPOINT + id, {
      method: 'DELETE',
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
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function updateVehicle (id, modifyVehicle) {
  modifyVehicle.vehicleType = getTypeIdByDescription(modifyVehicle.vehicleType)
  console.log(modifyVehicle)
  try {
    const token = getAccessToken()
    const res = await fetch(VEHICLE_ENDPOINT + id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modifyVehicle)
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
