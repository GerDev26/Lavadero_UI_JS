import { getAccessToken } from '../helpers/tokenHelpers'
import { APPOINTMENTS_RESERVE } from '../resources/myApi'

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
