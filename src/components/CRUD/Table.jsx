/* eslint-disable react-hooks/exhaustive-deps */
import { useAllUsers } from '../../hooks/useUsers'
import { useContext, useEffect } from 'react'
import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { UsersContext } from '../../context/UserContext'
import { useUserVehicles } from '../../hooks/useVehicles'
import { VehicleContext } from '../../context/VehicleContext'
import { ModalContext } from '../../context/ModalContext'
import { useUserAppointments } from '../../hooks/useAppointments'
import { AppointmentContext } from '../../context/AppointmentContext'
import { usePrices } from '../../hooks/usePrices'
import { firstLetterMayus } from '../../helpers/stringHelpers'

function TableCol ({ children, onClick }) {
  return <td onClick={onClick} className='cursor-default p-3 uppercase font-bold'>{children}</td>
}
function TableRow ({ children, onClick, textFormat }) {
  let modifyText = t => t
  switch (textFormat) {
    case 'mayus':
      modifyText = t => t.toUpperCase()
      break
    case 'minus':

      modifyText = t => t.toLowerCase()
      break
    case 'capitalize':
      modifyText = t => firstLetterMayus(t)
      break

    default:

      break
  }
  return <th onClick={onClick} className='cursor-default p-3 font-normal border-b-2 border-gray-400'>{modifyText(children)}</th>
}

export function Table ({ cols, children }) {
  return (
    <table className='text-l min-w-[40vw] w-fit h-fit bg-gray-50 rounded-lg overflow-hidden'>
      <thead>
        <tr className='bg-black text-white font-black text-center opacity-90'>
          {cols.map((col, index) => <TableCol key={index}>{col}</TableCol>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export function VehicleTable () {
  const userVehicles = useUserVehicles()
  const { setVehicles, vehicles, removeVehicle } = useContext(VehicleContext)
  const { setUpdateModal, setUpdateValues } = useContext(ModalContext)

  useEffect(() => {
    setVehicles(userVehicles)
  }, [userVehicles])

  const handleDelete = async (vehicle) => {
    await removeVehicle(vehicle)
  }
  const handleUpdate = (selectedVehicle) => {
    setUpdateValues(selectedVehicle)
    setUpdateModal(true)
  }

  return (
    <Table cols={['dominio', 'tipo', 'Eliminar', 'Modificar']}>
      {(vehicles.length > 0)
        ? vehicles.map(vehicle => (
          <tr key={vehicle.id}>
            <TableRow>{vehicle.vehicleDomain}</TableRow>
            <TableRow>{vehicle.vehicleType}</TableRow>
            <TableRow onClick={async () => await handleDelete(vehicle)}><TrashIcon className='text-red-700 drop-shadow-lg hover:scale-105 active:scale-95 m-auto w-6 cursor-pointer' /></TableRow>
            <TableRow onClick={() => handleUpdate(vehicle)}><PencilIcon className='text-yellow-500 drop-shadow-lg hover:scale-105 active:scale-95 m-auto w-6 cursor-pointer' /></TableRow>
          </tr>
        ))
        : (
          <tr />
          )}
    </Table>
  )
}
export function AppointmentTable () {
  const { setAppointments, reservedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  const userAppointments = useUserAppointments()

  useEffect(() => {
    setAppointments(userAppointments)
  }, [userAppointments])

  return (
    <Table cols={['fecha', 'hora', 'dominio', 'tipo', 'eliminar']}>
      {(reservedAppointments.length > 0)
        ? reservedAppointments.map(appointment => (
          <tr key={appointment.id}>
            <TableRow>{appointment.date}</TableRow>
            <TableRow>{appointment.hour}</TableRow>
            <TableRow>{appointment.vehicle.vehicleDomain}</TableRow>
            <TableRow>{appointment.vehicle.vehicleType}</TableRow>
            <TableRow onClick={async () => { await releaseReservedAppointment(appointment) }}><TrashIcon className='text-red-700 drop-shadow-lg hover:scale-105 active:scale-95 m-auto w-6 cursor-pointer' /></TableRow>
          </tr>
        ))
        : (
          <tr>
            <td className='text-center p-4' colSpan={5}>No hay turnos disponibles</td>
          </tr>
          )}
    </Table>
  )
}

export function EmployCompleteAppointmentTable () {
  const { completedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  return (
    <Table cols={['fecha', 'hora', 'usuario', 'dominio', 'deshacer']}>
      {(completedAppointments.length > 0)
        ? completedAppointments.map(appointment => (
          <tr key={appointment.id}>
            <TableRow>{appointment.date}</TableRow>
            <TableRow>{appointment.hour}</TableRow>
            <TableRow>{appointment.user.name}</TableRow>
            <TableRow>{appointment.vehicle.vehicleDomain}</TableRow>
            <TableRow onClick={async () => { await releaseReservedAppointment(appointment) }}><XCircleIcon className='text-red-700 drop-shadow-lg hover:scale-105 active:scale-95 m-auto w-6 cursor-pointer' /></TableRow>
          </tr>
        ))
        : (
          <tr>
            <td className='text-center p-4' colSpan={5}>No hay turnos disponibles</td>
          </tr>
          )}
    </Table>
  )
}
export function EmployReserveAppointmentTable () {
  const { reservedAppointments, completeReservedAppointment } = useContext(AppointmentContext)
  return (
    <Table cols={['fecha', 'hora', 'usuario', 'dominio', 'completar']}>
      {(reservedAppointments.length > 0)
        ? reservedAppointments.map(appointment => (
          <tr key={appointment.id}>
            <TableRow>{appointment.date}</TableRow>
            <TableRow>{appointment.hour}</TableRow>
            <TableRow textFormat='capitalize'>{appointment.user.name}</TableRow>
            <TableRow textFormat='capitalize'>{appointment.vehicle.vehicleDomain}</TableRow>
            <TableRow onClick={() => completeReservedAppointment(appointment)}><CheckCircleIcon className='text-green-600 drop-shadow-lg hover:scale-105 active:scale-95 m-auto w-6 cursor-pointer' /></TableRow>
          </tr>
        ))
        : (
          <tr>
            <td className='text-center p-4' colSpan={5}>No hay turnos disponibles</td>
          </tr>
          )}
    </Table>
  )
}
export function UserTable () {
  const allUsers = useAllUsers()
  const { users, setUsers, deleteUser, updateUser } = useContext(UsersContext)

  useEffect(() => {
    setUsers(allUsers || [])
  }, [allUsers])

  const handleDelete = async (selectedUser) => {
    console.log(selectedUser)
    await deleteUser(selectedUser)
  }

  const handleUpdate = (selectedUser) => {
    updateUser(selectedUser, {
      id: '2',
      name: 'German',
      surname: 'Canteros',
      phone_number: '423123123123',
      password: '2222',
      email: 'erjnweijgjwq'
    })
  }

  return (
    <Table cols={['id', 'nombre', 'apellido', 'Telefono', 'E-mail', 'Eliminar', 'Modificar']}>
      {(users != null)
        ? users.map(user => (
          <tr key={user.id}>
            <TableRow>{user.id}</TableRow>
            <TableRow>{user.name}</TableRow>
            <TableRow>{user.surname}</TableRow>
            <TableRow>{user.phone_number}</TableRow>
            <TableRow>{user.email}</TableRow>
            <TableRow onClick={async () => await handleDelete(user)}><TrashIcon className='m-auto w-6 cursor-pointer' /></TableRow>
            <TableRow onClick={() => handleUpdate(user)}><PencilIcon className='m-auto w-6 cursor-pointer' /></TableRow>
          </tr>
        ))
        : (
          <tr>
            <TableRow>Cargando</TableRow>
          </tr>
          )}
    </Table>
  )
}

export function EmployPricesTable ({ vehicleType, service }) {
  const prices = usePrices({ vehicleType, service })
  return (
    <Table cols={['Valor', 'Servicio', 'Tipo']}>
      {(prices)
        ? prices.map(price => (
          <tr key={price.id}>
            <TableRow>${price.value}</TableRow>
            <TableRow textFormat='capitalize'>{price.service}</TableRow>
            <TableRow textFormat='capitalize'>{price.vehicleType}</TableRow>
          </tr>
        ))
        : (
          <tr>
            <td className='text-center p-4' colSpan={5}>No hay turnos disponibles</td>
          </tr>
          )}
    </Table>
  )
}
