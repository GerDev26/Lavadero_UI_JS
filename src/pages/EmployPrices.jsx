import { useContext } from 'react'
import { EmployPricesTable } from '../components/CRUD/Table'
import { Footer } from '../components/Footer'
import { ServiceDropdown, TypeDropdown } from '../components/Input'
import { Navbar } from '../components/Navbar'
import { InputContext, InputContextProvider } from '../context/InputContext'

export function EmployPrices () {
  return (
    <>
      <Navbar />
      <InputContextProvider>
        <Crud />
      </InputContextProvider>
      <Footer />

    </>
  )
}

export function Crud () {
  const { fields, clearFields } = useContext(InputContext)
  return (
    <div className='w-fit gap-8 m-auto justify-center min-h-[40vh]'>
      <div className='flex justify-between items-end my-2'>
        <TypeDropdown />
        <ServiceDropdown />
        <button className='bg-gray-800 rounded-sm text-white h-fit w-fit p-2' onClick={() => { clearFields('Opcion') }}>Limpiar</button>
      </div>
      <EmployPricesTable vehicleType={fields.vehicleType} service={fields.service} />
    </div>
  )
}
