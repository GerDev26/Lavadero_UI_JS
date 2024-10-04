import { useContext, useEffect, useState } from 'react'
import { getActualDate, sevenDays } from '../helpers/dateHelpers'
import { useWeekAppointments } from '../hooks/useAppointments'
import { InputContext } from '../context/InputContext'
import { ArrowDownIcon } from '@heroicons/react/20/solid'
import { useUserVehicles } from '../hooks/useVehicles'
import { useNavigate, useParams } from 'react-router-dom'
import { reserveAppointment } from '../services/appointmentServices'

export function AppointmentReserve () {
  const { service } = useParams()
  const weekAppointments = useWeekAppointments()
  const { fields, addField, validateField, setInvalidForm } = useContext(InputContext)
  const navigate = useNavigate()

  useEffect(() => {
    addField('service_id', service)
    validateField('service_id', true)
    setInvalidForm(true)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(fields)
    setInvalidForm(true)
    try {
      await reserveAppointment(fields)
      navigate('/')
    } catch {
      alert('Te faltan opciones por seleccionar')
      setInvalidForm(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='relative w-full md:min-h-[80vh] gap-2 p-2 grid grid-rows-1 md:grid-cols-2'>
      <div className='overflow-hidden'>
        <div className='w-full bg-black text-center py-2 px-4 flex justify-between'>
          <h3 className='text-2xl font-bold text-white'>Seleccione un turno</h3>
          <ArrowDownIcon className='w-6 text-white' />
        </div>
        <AvaibleDaysList weekAppointments={weekAppointments} />
        <AvaibleAppointments weekAppointments={weekAppointments} />
      </div>
      <div className='w-full h-full overflow-hidden'>
        <div className='w-full bg-black text-center py-2 px-4 flex justify-between'>
          <h3 className='text-2xl font-bold text-white'>Seleccione un vehiculo</h3>
          <ArrowDownIcon className='w-6 text-white' />
        </div>
        <UserVehiclesList />
      </div>
      <SubmitButton text='Reservar' />
    </form>
  )
}

export function SubmitButton ({ text }) {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-gray-500' : 'md:hover:scale-105 bg-black'
  console.log(invalidForm)
  return (
    <button type='submit' disabled={invalidForm} className={'transition md:absolute uppercase p-4 bottom-5 right-5 duration-50  font-semibold text-white text-lg rounded-sm ' + buttonStyle}> {text} </button>
  )
}
function AvaibleDaysList ({ weekAppointments }) {
  const { addField, validateField } = useContext(InputContext)
  const weekDays = sevenDays()
  const [selectedDay, setSelectedDay] = useState(0)

  useEffect(() => {
    addField('date', weekDays[0].date)
  }, [])

  const handleDaySelect = (index, date) => {
    validateField('date', true)
    addField('date', date)
    setSelectedDay(index)
  }

  const verifyAvaibleDay = (actualDay) => {
    const appointments = weekAppointments.filter(day => day.date === actualDay)
    if (appointments.length === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <ul className='grid grid-cols-3 md:grid-cols-6 grid-rows-2 md:grid-rows-1 gap-2 p-2 bg-gray-800 min-h-36 md:min-h-16 overflow-hidden'>
      {
        weekAppointments
          ? weekDays.map((day, index) => (
            <Day
              key={index}
              weekday={day.weekday}
              date={day.formattedDate}
              isActive={selectedDay === index}
              callback={() => handleDaySelect(index, day.date)}
              isAvaible={verifyAvaibleDay(day.date)}
            />
          ))
          : weekDays.map((day, index) => (
            <div key={index} className='w-full flex justify-center items-center'>
              <div className=' w-6 h-6 border-b-2 animate-spin border-white rounded-full' />
            </div>
          ))
          }
    </ul>
  )
}
function Day ({ weekday, date, isActive, callback, isAvaible }) {
  const liActiveStyles = isActive ? 'bg-gray-900' : 'bg-gray-800'
  const liIsAvaibleStyles = isAvaible ? 'line-through cursor-not-allowed text-red-800 ' : 'cursor-pointer text-white hover:bg-gray-900'

  return (
    <li onClick={isAvaible ? null : callback} className={` text-sm flex flex-col justify-center items-center rounded-sm  p-1 font-semibold w-full min-h-12 ${liActiveStyles} ${liIsAvaibleStyles}`}>
      <span>{weekday}</span>
      <p>{date}</p>
    </li>
  )
}

function AvaibleAppointments ({ weekAppointments }) {
  const { fields } = useContext(InputContext)

  if (weekAppointments) {
    const avaibleDates = weekAppointments.filter(app => app.date === fields.date)
    return (
      <ul className='w-full grid grid-cols-2 md:grid-cols-4 place-content-start gap-1 grid-flow-row bg-gray-600 p-2 h-full'>
        {avaibleDates.map(app => (
          <Appointments key={app.id} id={app.id} hour={app.hour} />
        ))}
      </ul>
    )
  } else {
    return (
      <ul className='w-full flex justify-center bg-gray-600 p-8 h-full'>
        <div className=' w-12 h-12 border-b-2 animate-spin border-white rounded-full' />
      </ul>
    )
  }
}
function Appointments ({ id, hour }) {
  const { addField, validateField, fields } = useContext(InputContext)

  const isActive = fields.appointment_id === id
  const divBackgroundStyle = isActive ? 'bg-gray-900' : 'bg-gray-800'

  const handleSelect = (id) => {
    addField('appointment_id', id)
    validateField('hour', true)
  }

  return (
    <div
      onClick={() => handleSelect(id)}
      className={`border-4 text-white border-gray-700 hover:bg-gray-900 flex justify-center items-center rounded-sm font-semibold min-h-12 cursor-pointer ${divBackgroundStyle}`}
    >
      <p>{hour}</p>
    </div>
  )
}

function UserVehiclesList () {
  const userVehicles = useUserVehicles()
  return (
    <ul className='w-full h-full grid grid-cols-1 md:grid-cols-4 grid-flow-row bg-gray-600 place-content-start gap-2 p-2'>
      {
      userVehicles
        ? userVehicles.map(vehicle => (
          <UserVehicle key={vehicle.id} id={vehicle.id} domain={vehicle.vehicleDomain} type={vehicle.vehicleType} />
        ))
        : <div className='w-full h-full flex justify-center items-center row-span-2 col-span-2 md:col-span-4 p-8'>
          <div className=' w-20 h-20 border-b-2 animate-spin border-white rounded-full' />

        </div>
      }
    </ul>
  )
}

function UserVehicle ({ id, domain, type }) {
  const { fields, addField, validateField } = useContext(InputContext)

  const isActive = fields.vehicle_id === id

  const divBackgroundStyle = isActive ? 'bg-gray-900' : 'bg-gray-800'

  const handleSelect = (id) => {
    addField('vehicle_id', id)
    validateField('vehicle_id', true)
  }

  return (
    <div
      onClick={() => handleSelect(id)}
      className={`flex md:flex-col justify-evenly items-center bg-gray-800 md:p-1 p-3 text-xl uppercase text-white border-4 font-semibold border-gray-700 cursor-pointer ${divBackgroundStyle}`}
    >
      <p>{type}</p>
      <p>{domain}</p>
    </div>
  )
}
