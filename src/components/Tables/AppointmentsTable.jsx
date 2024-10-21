import { useContext, useEffect } from 'react'
import { EmptyTable, SkeletonRows, Table, TableRow, TableRowItem } from './BaseTable'
import { AppointmentContext } from '../../context/AppointmentContext'
import { useAppointments, useUserAppointments } from '../../hooks/useAppointments'

export function UserAppointmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Patente', 'Tipo', 'Servicio', 'Opcion']
  const { setAppointments, reservedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  const { loading, data, error } = useUserAppointments()

  useEffect(() => {
    if (!loading && data) {
      setAppointments(data)
    }
  }, [data])

  if (loading) {
    return <SkeletonRows cols={cols} tableName='Turnos' />
  }
  if (error) {
    return 'Error'
  }
  if (reservedAppointments.length > 0) {
    return (
      <Table cols={cols} tableName={tableName}>
        {
             reservedAppointments.map((appointment, index) => (
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
          }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName='Turnos' />
  }
}

export function EmployReservedAppointmentTable ({ tableName = 'Turnos', date, month }) {
  const cols = ['Fecha', 'Horario', 'Usuario', 'Patente', 'Tipo', 'Servicio', 'Completar']
  const { setAppointments, reservedAppointments, completeReservedAppointment } = useContext(AppointmentContext)
  const { loading, data, error } = useAppointments({ date, month })

  useEffect(() => {
    if (!loading && data) {
      setAppointments(data)
    }
  }, [data])

  if (loading) {
    return <SkeletonRows cols={cols} tableName='Turnos' />
  }
  if (error) {
    return 'Error'
  }
  if (reservedAppointments.length > 0) {
    return (
      <Table cols={cols} tableName={tableName}>
        {
             reservedAppointments.map((appointment, index) => (
               <TableRow
                 key={index}
                 deleteCallback={async () => await completeReservedAppointment(appointment)}
               >
                 <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                 <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                 <TableRowItem col={cols[2]}>{appointment.user.name}</TableRowItem>
                 <TableRowItem col={cols[3]}>{appointment.vehicle.vehicleDomain}</TableRowItem>
                 <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
               </TableRow>
             ))
          }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName='Turnos' />
  }
}
export function EmployCompletedAppointmentTable ({ tableName = 'Turnos' }) {
  const { completedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  const cols = ['Fecha', 'Horario', 'Usuario', 'Patente', 'Servicio', 'Completar']

  return (
    <Table cols={cols} tableName={tableName}>
      {
            completedAppointments.length > 0
              ? completedAppointments.map((appointment, index) => (
                <TableRow
                  key={index}
                  deleteCallback={async () => await releaseReservedAppointment(appointment)}
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
