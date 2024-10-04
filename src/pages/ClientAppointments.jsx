import { UserAppointmentTable } from '../components/Tables/AppointmentsTable'
import { AppointmentProvider } from '../context/AppointmentContext'

export function ClientAppointments () {
  return (
    <>
      <AppointmentProvider>
        <section className='p-2'>
          <UserAppointmentTable />
        </section>
      </AppointmentProvider>
    </>
  )
}
