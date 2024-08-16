import { VehicleModal } from '../components/CRUD/Modal'
import { VehicleTable } from '../components/CRUD/Table'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { ModalProvider } from '../context/ModalContext'
import { VehicleProvider } from '../context/VehicleContext'
import { OpenModalBtn } from './AdminCrud'

export function ClientVehicles () {
  return (
    <>
      <ModalProvider>
        <Navbar />
        <VehicleProvider>
          <VehicleModal />
          <div className='m-auto w-fit'>
            <OpenModalBtn text='Añadir Vehiculo' />
            <VehicleTable />
          </div>
        </VehicleProvider>
        <Footer />

      </ModalProvider>
    </>
  )
}
