import { USERS_ENDPOINT } from '../resources/myApi'

export async function DeleteUser (id) {
  return await new Promise((resolve, reject) => {
    fetch(USERS_ENDPOINT + id, { method: 'DELETE' })
      .then(async res => {
        if (!res.ok) {
          reject(new Error('Error en la consulta'))
        }
        const data = await res.json()
        console.log(data)
        resolve(data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export async function CreateUser (user) {
  return await new Promise((resolve, reject) => {
    fetch(USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(async res => {
        if (!res.ok) {
          reject(new Error('Error en la consulta'))
        }
        const data = await res.json()
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
