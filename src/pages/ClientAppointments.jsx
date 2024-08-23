import { AppointmentTable } from '../components/CRUD/Table'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { AppointmentProvider } from '../context/AppointmentContext'

export function ClientAppointments () {
  return (
    <>
      <Navbar />
      <AppointmentProvider>
        <div className='m-auto my-8 w-fit'>
          <AppointmentTable />
        </div>
      </AppointmentProvider>
      <Footer />
    </>
  )
}
