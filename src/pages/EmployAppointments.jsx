import { useContext, useEffect } from 'react'
import { EmployCompleteAppointmentTable, EmployReserveAppointmentTable } from '../components/CRUD/Table'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { AppointmentContext, AppointmentProvider } from '../context/AppointmentContext'
import { useAppointments } from '../hooks/useAppointments'

export function EmployAppointments () {
  return (
    <>
      <Navbar />
      <AppointmentProvider>
        <Crud />
      </AppointmentProvider>
      <Footer />
    </>
  )
}

function Crud () {
  const { setAppointments } = useContext(AppointmentContext)
  const appointments = useAppointments()

  useEffect(() => {
    console.log(appointments)
    setAppointments(appointments)
  }, [appointments])

  return (
    <div className='m-auto flex gap-8 my-8 w-fit'>
      <div>
        <h3 className='text-2xl font-semibold m-1'>Reservados</h3>
        <EmployReserveAppointmentTable />
      </div>
      <div>
        <h3 className='text-2xl font-semibold m-1'>Completados</h3>
        <EmployCompleteAppointmentTable />
      </div>
    </div>
  )
}
