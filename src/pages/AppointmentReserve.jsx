import { useContext, useEffect } from 'react'
import { useAppointmentHour } from '../hooks/useAppointments'
import { useUserVehicles } from '../hooks/useVehicles'
import { FormContext, FormProvider } from '../context/FormContext'
import { useNavigate, useParams } from 'react-router-dom'
import { reserveAppointment } from '../services/appointmentServices'
import { getActualDate, sevenDays } from '../helpers/dateHelpers'

export function AppointmentReserve () {
  return (
    <>
      <FormProvider>
        <ReserveForm />
      </FormProvider>
    </>
  )
}
function ReserveForm () {
  const navigate = useNavigate()
  const { service } = useParams()
  const { values, setValue } = useContext(FormContext)
  const actualDate = getActualDate()

  useEffect(() => {
    setValue({ key: 'date', value: actualDate })
    setValue({ key: 'service_id', value: service })
  }, [])

  const handlesubmit = async () => {
    await reserveAppointment(values)
    navigate('/')
  }

  return (
    <div className='grid grid-cols-3 grid-rows-1 gap-2 h-[500px] m-4 relative'>
      <section className='w-full h-full col-span-2 border-2 border-black rounded-md'>
        <DatesOptions />
        <ScheduleOptions scheduleDate={values.date} />

      </section>
      <section className='border-2 border-black overflow-y-scroll'>
        <VehicleOptions />
      </section>
      <button className='transition absolute right-4 bottom-4 bg-green-700 rounded-md p-2 text-white cursor-pointer hover:scale-105' onClick={handlesubmit}>Reservar Turno</button>
    </div>
  )
}
function VehicleOptions () {
  const vehicles = useUserVehicles()
  return (
    <div className='flex flex-col gap-2 p-2 overflow-hidden'>
      {
      (vehicles.length > 0)
        ? vehicles.map(vehicle => (
          <UserVehicle key={vehicle.id} id={vehicle.id} domain={vehicle.vehicleDomain} type={vehicle.vehicleType} />
        ))
        : <p>No Hay vehiculos</p>
    }
    </div>

  )
}
function UserVehicle ({ id, domain, type }) {
  const { values, setValue } = useContext(FormContext)

  const handleClick = () => {
    setValue({ key: 'vehicle_id', value: id })
  }

  const isActive = values.vehicle_id === id
  const classname = isActive ? 'bg-black text-white' : ''

  return (
    <button onClick={handleClick} className={classname + ' border-2 border-black flex justify-around py-1'}>
      <p>{type.toUpperCase()}</p>
      <p>{domain.toUpperCase()}</p>
    </button>
  )
}
function ScheduleOptions () {
  const { values } = useContext(FormContext)
  const schedules = useAppointmentHour(values.date)

  return (
    <div className='grid grid-cols-7 grid-flow-row gap-2 p-1'>
      {
        schedules.map(schedule => (
          <Schedule key={schedule.id} id={schedule.id} hour={schedule.hour} />
        ))
      }
    </div>
  )
}

function Schedule ({ id, hour }) {
  const { values, setValue } = useContext(FormContext)

  const handleClick = () => {
    setValue({ key: 'appointment_id', value: id })
  }

  const isActive = values.appointment_id === id
  const classname = isActive ? 'bg-black text-white' : ''

  return (
    <button onClick={handleClick} className={classname + ' py-1 border-2 border-black rounded-xl'}>{hour}</button>
  )
}
function DatesOptions () {
  const dates = sevenDays()

  return (
    <div className='grid grid-cols-7 grid-rows-1 gap-1 p-1 my-2'>
      {
    dates.map((date, index) => (
      <Date key={index} date={date.date} day={date.formattedDate} dayName={date.weekday} />
    ))
  }
    </div>
  )
}
function Date ({ date, day, dayName }) {
  const { values, setValue } = useContext(FormContext)

  const handleClick = () => {
    setValue({ key: 'date', value: date })
  }

  const isActive = values.date === date
  const classname = isActive ? 'bg-black text-white' : 'border-black'

  return (
    <div onClick={handleClick} className={classname + ' border-2 flex flex-col justify-center items-center rounded-xl py-1 cursor-pointer'}>
      <p>{day}</p>
      <p>{dayName}</p>
    </div>
  )
}
