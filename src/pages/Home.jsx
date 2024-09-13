import { useCheckUserRole } from '../hooks/useUsers'
import { ClientHome } from './ClientHome'
import { AdminHome } from './AdminHome'
import { EmployHome } from './EmployHome'
import { SimpleLoader } from '../components/SimpleLoader'

export function Home () {
  const role = useCheckUserRole()

  console.log(role)
  switch (role) {
    case 'administrador':
      return <AdminHome />
    case 'empleado':
      return <EmployHome />
    case 'cliente':
      return <ClientHome />

    default:
      return (
        <main className='w-full h-screen flex justify-center items-center'>
          <SimpleLoader />
        </main>
      )
  }
}
