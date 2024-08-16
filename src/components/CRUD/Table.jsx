import { useAllUsers } from '../../hooks/useUsers'
import { useContext, useEffect } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { UsersContext } from '../../context/UserContext'
import { useUserVehicles } from '../../hooks/useVehicles'
import { VehicleContext } from '../../context/VehicleContext'

function TableCol ({ children, onClick }) {
  return <td onClick={onClick} className='p-3 uppercase font-bold'>{children}</td>
}
function TableRow ({ children, onClick }) {
  return <th onClick={onClick} className='p-3 font-normal border-b-2 border-gray-400'>{children}</th>
}

export function Table ({ cols, children }) {
  return (
    <table className='text-l w-fit h-fit bg-gray-50 rounded-lg overflow-hidden'>
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

  useEffect(() => {
    setVehicles(userVehicles)
  }, [userVehicles])
  console.log(vehicles)
  const handleDelete = async (vehicle) => {
    await removeVehicle(vehicle)
  }
  const handleUpdate = () => {
    console.log('borrar')
  }

  return (
    <Table cols={['dominio', 'tipo', 'Eliminar', 'Modificar']}>
      {(vehicles.length > 0)
        ? vehicles.map(vehicle => (
          <tr key={vehicle.id}>
            <TableRow>{vehicle.vehicleDomain}</TableRow>
            <TableRow>{vehicle.vehicleType}</TableRow>
            <TableRow onClick={async () => await handleDelete(vehicle)}><TrashIcon className='m-auto w-6 cursor-pointer' /></TableRow>
            <TableRow onClick={() => handleUpdate()}><PencilIcon className='m-auto w-6 cursor-pointer' /></TableRow>
          </tr>
        ))
        : (
          <tr />
          )}
    </Table>
  )
}
export function UserTable () {
  const allUsers = useAllUsers()
  const { users, setUsers, deleteUser, updateUser } = useContext(UsersContext)

  useEffect(() => {
    setUsers(allUsers)
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
