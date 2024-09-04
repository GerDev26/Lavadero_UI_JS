import { CreateVehicleModal, UpdateVehicleModal } from '../components/CRUD/Modal'
import { VehicleTable } from '../components/CRUD/Table'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { InputContextProvider } from '../context/InputContext'
import { ModalProvider } from '../context/ModalContext'
import { VehicleProvider } from '../context/VehicleContext'
import { OpenModalBtn } from './AdminCrud'

export function ClientVehicles () {
  return (
    <>
      <ModalProvider>
        <Navbar />
        <VehicleProvider>
          <InputContextProvider>
            <UpdateVehicleModal />
          </InputContextProvider>
          <InputContextProvider>
            <CreateVehicleModal />
          </InputContextProvider>
          <div className='m-auto my-8 w-fit'>
            <OpenModalBtn text='Añadir Vehiculo' />
            <VehicleTable />
          </div>
        </VehicleProvider>
        <Footer />

      </ModalProvider>
    </>
  )
}
