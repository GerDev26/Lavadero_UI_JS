import { getAccessToken } from '../helpers/tokenHelpers'
import { APPOINTMENTS_COMPLETE, APPOINTMENTS_ENDPOINT, APPOINTMENTS_RELEASE, APPOINTMENTS_RESERVE } from '../resources/myApi'

export async function reserveAppointment (appointment) {
  try {
    const token = getAccessToken()
    console.log(token)
    console.log(appointment)
    const res = await fetch(APPOINTMENTS_RESERVE, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment)
    })

    if (!res.ok) {
      const errors = await res.json()
      console.log(errors)
      throw new Error(errors)
    }

    const data = await res.json()
    // eslint-disable-next-line no-undef
    alert(data.message)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteAppointment (id) {
  const token = getAccessToken()
  const res = await fetch(APPOINTMENTS_ENDPOINT + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    const error = await res.json()
    throw error
  }
  const data = await res.json()
  console.log(data)
  return data
}
export async function releaseAppointment (id) {
  const token = getAccessToken()
  const res = await fetch(APPOINTMENTS_RELEASE + id, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    const error = await res.json()
    console.log('hola')
    throw error
  }
  const data = await res.json()
  console.log(data)
  return data
}
export async function completeAppointment (id) {
  const token = getAccessToken()
  const res = await fetch(APPOINTMENTS_COMPLETE + id, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    const error = await res.json()
    console.log('hola')
    throw error
  }
  const data = await res.json()
  console.log(data)
  return data
}
