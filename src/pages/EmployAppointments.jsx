/* eslint-disable react-hooks/exhaustive-deps */
import { InputContextProvider } from '../context/InputContext'
import { AppointmentStateDropdown } from '../components/Input'
import { AppointmentProvider } from '../context/AppointmentContext'
import { useState } from 'react'
import { EmployAppointmentTable } from '../components/Tables/AppointmentsTable'

export function EmployAppointments () {
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  const [monthValue, setMonthValue] = useState('')

  const handleMonth = (m) => {
    const [a, formattedMonth] = m.target.value.split('-')
    setMonth(formattedMonth)
    setMonthValue(m.target.value)
    setDate('')
  }
  const handleDate = (d) => {
    setDate(d.target.value)
    setMonth('')
    setMonthValue('')
  }

  return (
    <AppointmentProvider>
      <InputContextProvider>
        <section className='p-2 my-2'>
          <div className='flex flex-wrap gap-2 items-end justify-end mb-1'>
            <div>
              <h3 className='font-bold'>Fecha</h3>
              <input className='px-2 bg-gray-800 text-white rounded-sm h-12' value={date} type='date' onChange={(d) => { handleDate(d) }} />
            </div>
            <div>
              <h3 className='font-bold'>Mes</h3>
              <input className='px-2 bg-gray-800 text-white rounded-sm h-12' value={monthValue} type='month' onChange={(d) => { handleMonth(d) }} />
            </div>
            <AppointmentStateDropdown initialValue='Reservado' />
          </div>
          <EmployAppointmentTable date={date} month={month} />
        </section>
      </InputContextProvider>
    </AppointmentProvider>
  )
}
