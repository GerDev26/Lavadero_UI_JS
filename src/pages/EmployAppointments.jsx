import { useContext, useEffect, useRef, useState } from 'react'
import { EmployCompleteAppointmentTable, EmployReserveAppointmentTable } from '../components/CRUD/Table'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { AppointmentContext, AppointmentProvider } from '../context/AppointmentContext'
import { useAppointments } from '../hooks/useAppointments'
import { getActualDate } from '../helpers/dateHelpers'

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
  const actualDate = getActualDate()
  const [date, setDate] = useState(actualDate)
  const appointments = useAppointments(date)

  useEffect(() => {
    console.log(appointments)
    setAppointments(appointments)
  }, [appointments])

  return (
    <div className='m-auto flex gap-8 my-8 w-fit'>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl font-semibold m-1'>Reservados</h3>
          <input type='date' value={date} onChange={(d) => { setDate(d.target.value) }} />
        </div>
        <EmployReserveAppointmentTable />
      </div>
      <div>
        <h3 className='text-2xl font-semibold m-1'>Completados</h3>
        <EmployCompleteAppointmentTable />
      </div>
    </div>
  )
}
