import { useEffect, useState } from 'react'
import { PRICES_ENDPOINT } from '../resources/myApi'

const initialValue = {
  vehicleType: '',
  service: ''
}

export function usePrices ({ vehicleType, service } = initialValue) {
  const [prices, setPrices] = useState()

  useEffect(() => {
    const searchService = 'service=' + service + '&&'
    const searchVehicleType = 'vehicleType=' + vehicleType + '&&'
    fetch(PRICES_ENDPOINT + '?' + searchService + searchVehicleType)
      .then(res => res.json())
      .then(data => {
        setPrices(data.data)
      })
      .catch(error => { throw error })
  }, [vehicleType, service])

  return prices
}
