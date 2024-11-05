import { useState } from 'react'
import { AppointmentStateDropdown } from '../components/Input'
import { AdminAppointmentTable } from '../components/Tables/AppointmentsTable'
import { AppointmentProvider } from '../context/AppointmentContext'
import { InputContextProvider } from '../context/InputContext'
import { OpenModalBtn } from './AdminCrud'
import { CreateAppointmentModal } from '../components/CRUD/Modal'
import { ModalProvider } from '../context/ModalContext'

export function AdminAppointments () {
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
    <ModalProvider>
      <AppointmentProvider>
        <InputContextProvider>
          <CreateAppointmentModal />
        </InputContextProvider>
        <InputContextProvider>
          <section className='p-2 my-2'>
            <div className='flex flex-wrap gap-2 items-end justify-between mb-1'>
              <OpenModalBtn text='Añadir Turno' />
              <div className='flex flex-wrap gap-2'>
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
            </div>
            <AdminAppointmentTable date={date} month={month} />
          </section>
        </InputContextProvider>
      </AppointmentProvider>
    </ModalProvider>
  )
}
