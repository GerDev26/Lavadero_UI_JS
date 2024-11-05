import { useContext, useEffect, useState } from 'react'
import { sevenDays } from '../helpers/dateHelpers'
import { useWeekAppointments } from '../hooks/useAppointments'
import { InputContext } from '../context/InputContext'
import { ArrowDownIcon } from '@heroicons/react/20/solid'
import { useUserVehicles } from '../hooks/useVehicles'
import { useNavigate, useParams } from 'react-router-dom'
import { reserveAppointment } from '../services/appointmentServices'

export function AppointmentReserve () {
  const { service } = useParams()
  const { data: weekAppointments, loading } = useWeekAppointments()
  const { fields, addField, validateField, setInvalidForm } = useContext(InputContext)
  const navigate = useNavigate()

  useEffect(() => {
    addField('service_id', service)
    validateField('service_id', true)
    setInvalidForm(true)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
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
        <AvaibleDaysList weekAppointments={weekAppointments} loading={loading} />
        <AvaibleAppointments weekAppointments={weekAppointments} loading={loading} />
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

function LoadingIndicator ({ text }) {
  return (
    <div className='flex justify-center items-center'>
      <div className='animate-spin w-12 h-12 border-4 border-t-transparent border-white rounded-full' />
      <p className='text-white ml-4'>{text}</p>
    </div>
  )
}

export function SubmitButton ({ text }) {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-gray-500' : 'md:hover:scale-105 bg-black'
  return (
    <button type='submit' disabled={invalidForm} className={'transition md:absolute uppercase p-4 bottom-5 right-5 duration-50 font-semibold text-white text-lg rounded-sm ' + buttonStyle}>
      {text}
    </button>
  )
}

function AvaibleDaysList ({ weekAppointments, loading }) {
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
    return appointments.length === 0
  }

  if (loading) return <ul className='w-full h-full pt-10 bg-gray-600'><LoadingIndicator text='Cargando turnos' /></ul>

  return (
    <ul className='grid grid-cols-3 md:grid-cols-6 grid-rows-2 md:grid-rows-1 gap-2 p-2 bg-gray-800 min-h-36 md:min-h-16 overflow-hidden'>
      {weekAppointments
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
        : <LoadingIndicator text='Cargando días...' />}
    </ul>
  )
}

function Day ({ weekday, date, isActive, callback, isAvaible }) {
  const liActiveStyles = isActive ? 'bg-gray-950' : 'bg-gray-800'
  const liIsAvaibleStyles = isAvaible ? 'line-through cursor-not-allowed text-red-800' : 'cursor-pointer text-white'

  return (
    <li onClick={!isAvaible ? callback : null} className={`transition-all text-sm flex flex-col justify-center items-center rounded-sm p-1 font-semibold w-full min-h-12 ${liActiveStyles} ${liIsAvaibleStyles}`}>
      <span>{weekday}</span>
      <p>{date}</p>
    </li>
  )
}

function AvaibleAppointments ({ weekAppointments }) {
  const { fields } = useContext(InputContext)
  const avaibleDates = weekAppointments?.filter(app => app.date === fields.date) || []

  return (
    <ul className='w-full relative grid grid-cols-2 md:grid-cols-4 place-content-start gap-1 grid-flow-row bg-gray-600 p-2 h-full min-h-32'>
      {avaibleDates.length > 0
        ? (
            avaibleDates.map(app => (
              <Appointments key={app.id} id={app.id} hour={app.hour} />
            ))
          )
        : (
          <h1 className='text-4xl text-white whitespace-nowrap absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'>No hay turnos</h1>
          )}
    </ul>
  )
}

function Appointments ({ id, hour }) {
  const { addField, validateField, fields } = useContext(InputContext)
  const isActive = fields.appointment_id === id
  const divBackgroundStyle = isActive ? 'bg-gray-950 scale-95 border-none' : 'bg-gray-800'

  const handleSelect = () => {
    addField('appointment_id', id)
    validateField('hour', true)
  }

  return (
    <div
      onClick={handleSelect}
      className={`transition-all border-4 text-white border-gray-700 flex justify-center items-center rounded-sm font-semibold min-h-12 cursor-pointer ${divBackgroundStyle}`}
    >
      <p>{hour}</p>
    </div>
  )
}

function UserVehiclesList () {
  const { vehicles, loading, error } = useUserVehicles()

  if (loading) {
    return (
      <ul className='w-full h-full bg-gray-600 gap-2 py-10'>
        <LoadingIndicator text='Cargando vehículos...' />
      </ul>
    )
  }
  if (error) return <p>Error al cargar vehículos</p>
  return (
    <ul className='relative w-full h-full grid grid-cols-1 md:grid-cols-4 grid-flow-row bg-gray-600 place-content-start gap-2 p-2 min-h-32'>
      {vehicles.length > 0
        ? (
            vehicles.map(vehicle => (
              <UserVehicle key={vehicle.id} id={vehicle.id} domain={vehicle.vehicleDomain} type={vehicle.vehicleType} />
            ))
          )
        : (
          <p className='text-white font-bold text-4xl absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'>No hay vehículos</p>
          )}
    </ul>
  )
}

function UserVehicle ({ id, domain, type }) {
  const { fields, addField, validateField } = useContext(InputContext)
  const isActive = fields.vehicle_id === id
  const divBackgroundStyle = isActive ? 'bg-gray-950 scale-95 border-none' : 'bg-gray-800'

  const handleSelect = () => {
    addField('vehicle_id', id)
    validateField('vehicle_id', true)
  }

  return (
    <div
      onClick={handleSelect}
      className={`transition-all flex md:flex-col justify-evenly items-center bg-gray-800 md:p-1 p-3 text-xl uppercase text-white border-4 font-semibold border-gray-700 cursor-pointer ${divBackgroundStyle}`}
    >
      <p>{type}</p>
      <p>{domain}</p>
    </div>
  )
}
