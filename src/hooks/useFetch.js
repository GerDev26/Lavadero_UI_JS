import { useEffect, useState } from 'react'

const initialState = {
  endpoint: '',
  headers: {},
  queryParams: ''
}

export function useFetch ({ endpoint, headers, queryParams } = initialState) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${endpoint}?${queryParams}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError(true)
      })
  }, [queryParams])

  return { data, loading, error }
}
