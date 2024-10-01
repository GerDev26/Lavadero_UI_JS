import { AppointmentTable } from '../components/CRUD/Table'
import { AppointmentProvider } from '../context/AppointmentContext'

export function ClientAppointments () {
  return (
    <>
      <AppointmentProvider>
        <div className='m-auto my-8 w-fit'>
          <AppointmentTable />
        </div>
      </AppointmentProvider>
    </>
  )
}
