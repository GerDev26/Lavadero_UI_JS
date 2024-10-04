import { useContext, useEffect } from 'react'
import { Table, TableRow, TableRowItem } from './BaseTable'
import { AppointmentContext } from '../../context/AppointmentContext'
import { useUserAppointments } from '../../hooks/useAppointments'

export function UserAppointmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Patente', 'Tipo', 'Servicio', 'Opcion']
  const { setAppointments, reservedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  const userAppointments = useUserAppointments()

  useEffect(() => {
    setAppointments(userAppointments)
  }, [userAppointments])

  return (
    <Table cols={cols} tableName={tableName}>
      {
        reservedAppointments.length > 0
          ? reservedAppointments.map((appointment, index) => (
            <TableRow
              key={index}
              deleteCallback={async () => releaseReservedAppointment(appointment)}
            >
              <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
              <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
              <TableRowItem col={cols[2]}>{appointment.vehicle.vehicleDomain}</TableRowItem>
              <TableRowItem col={cols[3]}>{appointment.vehicle.vehicleType}</TableRowItem>
              <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
            </TableRow>
          ))
          : (
            <tr>
              <td colSpan={cols.length + 1} rowSpan={5} className='w-screen md:w-full h-72 bg-gray-900 animate-skeletonLoading text-transparent'>
                Cargando...
              </td>
            </tr>
            )
        }
    </Table>
  )
}

export function EmployAppointmentTable ({ tableName = 'Turnos' }) {
  const { reservedAppointments, completeReservedAppointment } = useContext(AppointmentContext)
  const cols = ['Fecha', 'Horario', 'Usuario', 'Patente', 'Servicio', 'Completar']

  return (
    <Table cols={cols} tableName={tableName}>
      {
            reservedAppointments.length > 0
              ? reservedAppointments.map((appointment, index) => (
                <TableRow
                  key={index}
                  deleteCallback={async () => completeReservedAppointment(appointment)}
                >
                  <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                  <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                  <TableRowItem col={cols[2]}>{appointment.user.name}</TableRowItem>
                  <TableRowItem col={cols[3]}>{appointment.vehicle.vehicleDomain}</TableRowItem>
                  <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
                </TableRow>
              ))
              : (
                <tr>
                  <td colSpan={cols.length + 1} rowSpan={5} className='w-screen md:w-full h-72 bg-gray-900 animate-skeletonLoading text-transparent'>
                    Cargando...
                  </td>
                </tr>
                )
            }
    </Table>
  )
}
