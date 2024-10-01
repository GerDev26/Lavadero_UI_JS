import { createContext, useState } from 'react'
import { useCheckUserRole } from '../hooks/useUsers'
import { closeSession, registerUser, startSession } from '../services/authService'
import { getAccessToken, removeAccessToken, setAccessToken } from '../helpers/tokenHelpers'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [reloadRole, setReloadRole] = useState(false)
  const role = useCheckUserRole(reloadRole)

  const login = async (user) => {
    const loggedUser = await startSession({ user })
    setAccessToken({ token: loggedUser.accessToken })
    setReloadRole(!reloadRole)

    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  const register = async (newUser) => {
    const token = await registerUser(newUser)
    setAccessToken({ token })
    setReloadRole(!reloadRole)

    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  const logout = async () => {
    const token = getAccessToken()
    await closeSession({ token })
    removeAccessToken()
    setReloadRole(!reloadRole)

    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  return (
    <AuthContext.Provider value={{ role, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
