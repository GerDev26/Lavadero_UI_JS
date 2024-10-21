/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { AppointmentContext, AppointmentProvider } from '../context/AppointmentContext'
import { useAppointments } from '../hooks/useAppointments'
import { getActualDate } from '../helpers/dateHelpers'
import { EmployCompletedAppointmentTable, EmployReservedAppointmentTable } from '../components/Tables/AppointmentsTable'

export function EmployAppointments () {
  return (
    <>
      <AppointmentProvider>
        <Crud />
      </AppointmentProvider>
    </>
  )
}

function Crud () {
  const { setAppointments } = useContext(AppointmentContext)
  const actualDate = getActualDate()
  console.log(actualDate)
  const [date, setDate] = useState(actualDate)
  const [month, setMonth] = useState('')
  const { data, error, loading } = useAppointments({ month: '9' })

  const handleMonth = (m) => {
    const [a, formattedMonth] = m.target.value.split('-')
    setMonth(formattedMonth)
    setDate('')
  }
  const handleDate = (d) => {
    setDate(d.target.value)
    setMonth('')
  }

  return (
    <div className='m-auto flex gap-8 my-8 w-fit'>
      <div>
        <div className='flex justify-between items-center'>
          <input type='date' value={date} onChange={(d) => { handleDate(d) }} />
          <input type='month' onChange={(m) => { handleMonth(m) }} />
        </div>
        <EmployReservedAppointmentTable tableName='Reservados' date={date} month={month} />
      </div>
    </div>
  )
}
