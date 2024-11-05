import { useContext, useEffect } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { VehicleContext } from '../../context/VehicleContext'
import { useUserVehicles } from '../../hooks/useVehicles'
import { DeleteOption, EmptyTable, SkeletonRows, Table, TableRow, TableRowItem, UpdateOption } from '../Tables/BaseTable'

export function UserVehiclesTable ({ tableName = 'Vehiculos' }) {
  const cols = ['Dominio', 'Tipo', 'Opcion']
  const { vehicles: userVehicles, loading, error } = useUserVehicles()
  const { setVehicles, vehicles, removeVehicle } = useContext(VehicleContext)
  const { setUpdateModal, setUpdateValues } = useContext(ModalContext)

  useEffect(() => {
    if (!loading && userVehicles) {
      setVehicles(userVehicles)
    }
  }, [userVehicles, loading])

  const handleDelete = async (vehicle) => {
    await removeVehicle(vehicle)
  }

  const handleUpdate = (selectedVehicle) => {
    setUpdateValues(selectedVehicle)
    setUpdateModal(true)
  }

  if (loading) {
    return <SkeletonRows />
  }

  if (error) {
    return <p>Error al cargar los vehículos</p>
  }

  return vehicles.length > 0
    ? (
      <Table cols={cols} tableName={tableName}>
        {vehicles.map((vehicle, index) => (
          <TableRow
            key={index}
            options={[
              <DeleteOption key={index} deleteCallback={async () => await handleDelete(vehicle)} />,
              <UpdateOption key={index} updateCallback={async () => handleUpdate(vehicle)} />
            ]}
          >
            <TableRowItem col={cols[0]}>{vehicle.vehicleDomain}</TableRowItem>
            <TableRowItem col={cols[1]}>{vehicle.vehicleType}</TableRowItem>
          </TableRow>
        ))}
      </Table>
      )
    : (
      <EmptyTable cols={cols} tableName={tableName} message='No hay vehiculos disponibles' />
      )
}
