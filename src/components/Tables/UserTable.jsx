import { useContext, useEffect } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { UsersContext } from '../../context/UserContext'
import { useAllUsers } from '../../hooks/useUsers'
import { DeleteOption, EmptyTable, SkeletonRows, Table, TableRow, TableRowItem, UpdateOption } from '../Tables/BaseTable'

export function UserTable ({ tableName = 'Usuarios' }) {
  const cols = ['Nombre', 'Apellido', 'Teléfono', 'Email', 'Rol', 'Opción']
  const { users, setUsers, deleteUser } = useContext(UsersContext)
  const { setUpdateModal, setUpdateValues } = useContext(ModalContext)
  const { data: userData, loading, error } = useAllUsers()

  useEffect(() => {
    if (!loading && userData) {
      setUsers(userData)
    }
  }, [userData, loading])

  const handleDelete = async (user) => {
    await deleteUser(user)
  }

  const handleUpdate = (selectedUser) => {
    setUpdateValues(selectedUser)
    setUpdateModal(true)
  }

  if (loading) {
    return <SkeletonRows />
  }

  if (error) {
    return <p>Error al cargar los usuarios</p>
  }

  return users.length > 0
    ? (
      <Table cols={cols} tableName={tableName}>
        {users.map((user) => (
          <TableRow
            key={user.id}
            options={[
              <DeleteOption
                key={`delete-${user.id}`}
                deleteCallback={async () => await handleDelete(user)}
              />,
              <UpdateOption
                key={`update-${user.id}`}
                updateCallback={() => handleUpdate(user)}
              />
            ]}
          >
            <TableRowItem col={cols[0]}>{user.name}</TableRowItem>
            <TableRowItem col={cols[1]}>{user.surname}</TableRowItem>
            <TableRowItem col={cols[2]}>{user.phone_number}</TableRowItem>
            <TableRowItem normal col={cols[3]}>{user.email}</TableRowItem>
            <TableRowItem col={cols[4]}>{user.role?.description}</TableRowItem>
          </TableRow>
        ))}
      </Table>
      )
    : (
      <EmptyTable cols={cols} tableName={tableName} message='No hay usuarios disponibles' />
      )
}
