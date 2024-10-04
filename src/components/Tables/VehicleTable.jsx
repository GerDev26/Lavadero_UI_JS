import { useContext, useEffect } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { VehicleContext } from '../../context/VehicleContext'
import { useUserVehicles } from '../../hooks/useVehicles'
import { Table, TableRow, TableRowItem } from '../Tables/BaseTable'

export function UserVehiclesTable ({ tableName = 'Vehiculos' }) {
  const cols = ['Dominio', 'Tipo', 'Opcion']
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
    <Table cols={cols} tableName={tableName}>
      {
        vehicles.length > 0
          ? vehicles.map((vehicle, index) => (
            <TableRow
              key={index}
              deleteCallback={async () => handleDelete(vehicle)}
              updateCallback={() => handleUpdate(vehicle)}
            >
              <TableRowItem col={cols[0]}>{vehicle.vehicleDomain}</TableRowItem>
              <TableRowItem col={cols[1]}>{vehicle.vehicleType}</TableRowItem>
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
