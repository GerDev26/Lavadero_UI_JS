import { getAccessToken } from '../helpers/tokenHelpers'
import { PRICES_ENDPOINT } from '../resources/myApi'

export async function updatePrice (priceId, modifyPrice) {
  const token = getAccessToken()
  try {
    const response = await fetch(`${PRICES_ENDPOINT}/${priceId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(modifyPrice)
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
