import { FullScreenSimpleLoader } from '../components/SimpleLoader'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Home } from './Home'
import { AdminUsers } from './AdminUsers'
import { useNavigate } from 'react-router-dom'

export function Users () {
  const { role } = useContext(AuthContext)
  const navigate = useNavigate()

  switch (role) {
    case 'administrador':
      return <AdminUsers />
    case 'empleado':
      return <Home />
    case 'cliente':
      navigate('/')
      break
    case 'visitor':
      navigate('/')
      break

    default:
      return <FullScreenSimpleLoader />
  }
}
