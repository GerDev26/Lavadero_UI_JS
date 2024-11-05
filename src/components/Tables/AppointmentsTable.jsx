import { useContext, useEffect } from 'react'
import { CompleteOption, DeleteOption, EmptyTable, ReleaseOption, SkeletonRows, Table, TableRow, TableRowItem } from './BaseTable'
import { AppointmentContext } from '../../context/AppointmentContext'
import { useAppointments, useUserAppointments } from '../../hooks/useAppointments'
import { InputContext } from '../../context/InputContext'

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
    return <SkeletonRows />
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
                 options={[
                   <ReleaseOption key={index} releaseCallback={async () => releaseReservedAppointment(appointment)} />
                 ]}
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

export function AdminAppointmentTable ({ month = '11', date = '' }) {
  const { fields } = useContext(InputContext)
  const { setAppointments } = useContext(AppointmentContext)
  const { loading, data, error } = useAppointments({ month, date })

  useEffect(() => {
    if (!loading && data) {
      setAppointments(data)
    }
  }, [data])

  if (loading) {
    return <SkeletonRows cols={[]} tableName='Cargando...' />
  }
  if (error) {
    return 'Error'
  }

  switch (fields.state) {
    case 'Reservado':
      return <AdminReservedAppoinmentTable tableName={'Turnos ' + fields.state + 's'} />
    case 'Completado':
      return <AdminCompletedAppoinmentTable tableName={'Turnos ' + fields.state + 's'} />
    case 'Disponible':
      return <AdminAvaibleAppoinmentTable tableName={'Turnos ' + fields.state + 's'} />

    default:
      break
  }
}
export function EmployAppointmentTable ({ month = '11', date = '' }) {
  const { fields } = useContext(InputContext)
  const { setAppointments } = useContext(AppointmentContext)
  const { loading, data, error } = useAppointments({ month, date })

  useEffect(() => {
    if (!loading && data) {
      setAppointments(data)
    }
  }, [data])

  if (loading) {
    return <SkeletonRows cols={[]} tableName='Cargando...' />
  }
  if (error) {
    return 'Error'
  }

  switch (fields.state) {
    case 'Reservado':
      return <EmployReservedAppoinmentTable tableName={'Turnos ' + fields.state + 's'} />
    case 'Completado':
      return <EmployCompletedAppoinmentTable tableName={'Turnos ' + fields.state + 's'} />
    case 'Disponible':
      return <EmployAvaibleAppoinmentTable tableName={'Turnos ' + fields.state + 's'} />

    default:
      break
  }
}

function AdminReservedAppoinmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Patente', 'Tipo', 'Servicio', 'Opcion']
  const { reservedAppointments, completeReservedAppointment } = useContext(AppointmentContext)
  if (reservedAppointments.length > 0) {
    return (
      <Table cols={cols} tableName={tableName}>
        {
               reservedAppointments.map((appointment, index) => (
                 <TableRow
                   key={index}
                   options={[
                     <CompleteOption key={index} completeCallback={() => completeReservedAppointment(appointment)} />
                   ]}
                 >
                   <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                   <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                   <TableRowItem col={cols[2]}>{appointment.vehicle?.vehicleDomain}</TableRowItem>
                   <TableRowItem col={cols[3]}>{appointment.vehicle?.vehicleType}</TableRowItem>
                   <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
                 </TableRow>
               ))
            }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName={tableName} />
  }
}
function AdminAvaibleAppoinmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Opcion']
  const { avaibleAppointments, removeAppointment } = useContext(AppointmentContext)
  if (avaibleAppointments.length > 0) {
    return (
      <Table
        cols={cols}
        tableName={tableName}
      >
        {
               avaibleAppointments.map((appointment, index) => (
                 <TableRow
                   key={index}
                   options={[
                     <DeleteOption key={index} deleteCallback={() => removeAppointment(appointment)} />
                   ]}
                 >
                   <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                   <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                 </TableRow>
               ))
            }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName={tableName} />
  }
}
function AdminCompletedAppoinmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Patente', 'Tipo', 'Servicio', 'Opcion']
  const { completedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  if (completedAppointments.length > 0) {
    return (
      <Table cols={cols} tableName={tableName}>
        {
               completedAppointments.map((appointment, index) => (
                 <TableRow
                   key={index}
                   options={[
                     <ReleaseOption key={index} releaseCallback={() => releaseReservedAppointment(appointment)} />
                   ]}
                 >
                   <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                   <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                   <TableRowItem col={cols[2]}>{appointment.vehicle?.vehicleDomain}</TableRowItem>
                   <TableRowItem col={cols[3]}>{appointment.vehicle?.vehicleType}</TableRowItem>
                   <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
                 </TableRow>
               ))
            }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName={tableName} />
  }
}
function EmployReservedAppoinmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Patente', 'Tipo', 'Servicio', 'Opcion']
  const { reservedAppointments, completeReservedAppointment } = useContext(AppointmentContext)
  if (reservedAppointments.length > 0) {
    return (
      <Table cols={cols} tableName={tableName}>
        {
               reservedAppointments.map((appointment, index) => (
                 <TableRow
                   key={index}
                   options={[
                     <CompleteOption key={index} completeCallback={() => completeReservedAppointment(appointment)} />
                   ]}
                 >
                   <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                   <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                   <TableRowItem col={cols[2]}>{appointment.vehicle?.vehicleDomain}</TableRowItem>
                   <TableRowItem col={cols[3]}>{appointment.vehicle?.vehicleType}</TableRowItem>
                   <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
                 </TableRow>
               ))
            }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName={tableName} />
  }
}
function EmployAvaibleAppoinmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario']
  const { avaibleAppointments } = useContext(AppointmentContext)
  if (avaibleAppointments.length > 0) {
    return (
      <Table
        cols={cols}
        tableName={tableName}
      >
        {
               avaibleAppointments.map((appointment, index) => (
                 <TableRow
                   key={index}
                 >
                   <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                   <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                 </TableRow>
               ))
            }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName={tableName} />
  }
}
function EmployCompletedAppoinmentTable ({ tableName = 'Turnos' }) {
  const cols = ['Fecha', 'Horario', 'Patente', 'Tipo', 'Servicio', 'Opcion']
  const { completedAppointments, releaseReservedAppointment } = useContext(AppointmentContext)
  if (completedAppointments.length > 0) {
    return (
      <Table cols={cols} tableName={tableName}>
        {
               completedAppointments.map((appointment, index) => (
                 <TableRow
                   key={index}
                   options={[
                     <ReleaseOption key={index} releaseCallback={() => releaseReservedAppointment(appointment)} />
                   ]}
                 >
                   <TableRowItem col={cols[0]}>{appointment.date}</TableRowItem>
                   <TableRowItem col={cols[1]}>{appointment.hour}</TableRowItem>
                   <TableRowItem col={cols[2]}>{appointment.vehicle?.vehicleDomain}</TableRowItem>
                   <TableRowItem col={cols[3]}>{appointment.vehicle?.vehicleType}</TableRowItem>
                   <TableRowItem col={cols[4]}>{appointment.service}</TableRowItem>
                 </TableRow>
               ))
            }
      </Table>
    )
  } else {
    return <EmptyTable cols={cols} tableName={tableName} />
  }
}
