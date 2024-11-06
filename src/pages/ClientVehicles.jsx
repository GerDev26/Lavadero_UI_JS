import { useContext } from 'react'
import { CreateVehicleModal, UpdateVehicleModal } from '../components/CRUD/Modal'
import { UserVehiclesTable } from '../components/Tables/VehicleTable'
import { InputContextProvider } from '../context/InputContext'
import { ModalProvider } from '../context/ModalContext'
import { VehicleProvider } from '../context/VehicleContext'
import { OpenModalBtn } from './AdminCrud'
import { AuthContext } from '../context/AuthContext'
import { FullScreenSimpleLoader } from '../components/SimpleLoader'
import { useNavigate } from 'react-router-dom'

export function ClientVehicles () {
  const navigate = useNavigate()
  const { role } = useContext(AuthContext)
  if (!role) {
    return <FullScreenSimpleLoader />
  }
  if (role === 'administrador' || role === 'empleado' || role === 'visitor') {
    navigate('/')
  }
  return (
    <>
      <ModalProvider>
        <VehicleProvider>
          <InputContextProvider>
            <UpdateVehicleModal />
          </InputContextProvider>
          <InputContextProvider>
            <CreateVehicleModal />
          </InputContextProvider>
          <div className='p-2 w-full'>
            <OpenModalBtn text='Añadir Vehiculo' />
            <UserVehiclesTable />
          </div>
        </VehicleProvider>

      </ModalProvider>
    </>
  )
}
