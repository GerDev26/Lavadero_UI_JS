import { useEffect, useState } from 'react'
import { SERVICE_ENDPOINT } from '../resources/myApi'

export function useAllServices () {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(SERVICE_ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.log(error)
        setServices([]) // En caso de error, vaciar los servicios
      }
    }

    fetchServices()
  }, [])

  return services
}
