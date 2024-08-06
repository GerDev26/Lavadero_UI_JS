import { useEffect, useState } from 'react'
import { SERVICE_ENDPOINT } from '../resources/myApi'

export function useAllServices () {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch(SERVICE_ENDPOINT)
      .then(async res => await res.json())
      .then(data => {
        setServices(data)
      })
      .catch(error => {
        console.log(error)
        setServices([])
      })
  }, [])

  return services
}
