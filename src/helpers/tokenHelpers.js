export function getAccessToken () {
  const token = window.localStorage.getItem('access_token')
  if (token !== null) {
    return token
  }
  console.log('No existe un token de acceso activo')
}

export function setAccessToken ({ token }) {
  window.localStorage.setItem('access_token', token)
  const savedToken = window.localStorage.getItem('access_token')
  if (savedToken === null) {
    throw new Error('No se pudo guardar el token')
  }
}

export function removeAccessToken () {
  window.localStorage.removeItem('access_token')
  const deletedToken = window.localStorage.getItem('access_token')
  if (deletedToken !== null) {
    throw new Error('No se eliminó el token')
  }
}
