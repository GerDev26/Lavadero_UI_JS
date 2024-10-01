import { ClientHome } from './ClientHome'
import { AdminHome } from './AdminHome'
import { EmployHome } from './EmployHome'
import { FullScreenSimpleLoader } from '../components/SimpleLoader'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function Home () {
  const { role } = useContext(AuthContext)

  switch (role) {
    case 'administrador':
      return <AdminHome />
    case 'empleado':
      return <EmployHome />
    case 'cliente':
      return <ClientHome />
    case 'visitor':
      return <ClientHome />

    default:
      return <FullScreenSimpleLoader />
  }
}
