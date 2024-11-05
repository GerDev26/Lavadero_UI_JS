import { UserCreateModal, UserUpdateModal } from '../components/CRUD/Modal'
import { UserTable } from '../components/Tables/UserTable'
import { InputContextProvider } from '../context/InputContext'
import { ModalProvider } from '../context/ModalContext'
import { UsersProvider } from '../context/UserContext'
import { OpenModalBtn } from './AdminCrud'

export function AdminUsers () {
  return (
    <div className='p-2'>

      <ModalProvider>
        <UsersProvider>
          <InputContextProvider>
            <div className='my-1'>
              <OpenModalBtn text='Añadir usuario' />

            </div>
            <UserCreateModal />
          </InputContextProvider>
          <InputContextProvider>
            <UserUpdateModal />
          </InputContextProvider>
          <UserTable />
        </UsersProvider>
      </ModalProvider>
    </div>

  )
}
