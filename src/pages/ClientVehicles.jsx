import { CreateVehicleModal, UpdateVehicleModal } from '../components/CRUD/Modal'
import { UserVehiclesTable } from '../components/Tables/VehicleTable'
import { InputContextProvider } from '../context/InputContext'
import { ModalProvider } from '../context/ModalContext'
import { VehicleProvider } from '../context/VehicleContext'
import { OpenModalBtn } from './AdminCrud'

export function ClientVehicles () {
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
