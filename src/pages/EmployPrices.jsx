import { useContext } from 'react'
import { EmployPricesTable } from '../components/CRUD/Table'
import { ServiceDropdown, TypeDropdown } from '../components/Input'
import { InputContext, InputContextProvider } from '../context/InputContext'

export function EmployPrices () {
  return (
    <>
      <InputContextProvider>
        <Crud />
      </InputContextProvider>

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
