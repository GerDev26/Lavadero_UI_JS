import { ClientHome } from './ClientHome'
import { FullScreenSimpleLoader } from '../components/SimpleLoader'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { AdminPrices } from './AdminPrices'
import { EmployPrices } from './EmployPrices'
import { Home } from './Home'
import { useNavigate } from 'react-router-dom'

export function Prices () {
  const { role } = useContext(AuthContext)
  const navigate = useNavigate()

  switch (role) {
    case 'administrador':
      return <AdminPrices />
    case 'empleado':
      return <EmployPrices />
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
