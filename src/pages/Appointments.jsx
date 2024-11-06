import { FullScreenSimpleLoader } from '../components/SimpleLoader'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { AdminAppointments } from './AdminAppointments'
import { EmployAppointments } from './EmployAppointments'
import { ClientAppointments } from './ClientAppointments'
import { useNavigate } from 'react-router-dom'

export function Appointments () {
  const { role } = useContext(AuthContext)
  const navigate = useNavigate()

  switch (role) {
    case 'administrador':
      return <AdminAppointments />
    case 'empleado':
      return <EmployAppointments />
    case 'cliente':
      return <ClientAppointments />
    case 'visitor':
      navigate('/')
      break

    default:
      return <FullScreenSimpleLoader />
  }
}
