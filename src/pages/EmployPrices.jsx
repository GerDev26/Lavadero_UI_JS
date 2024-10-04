import { useContext } from 'react'
import { EmployPricesTable } from '../components/Tables/PricesTable'
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
    <div className='w-full gap-8 m-auto min-h-[40vh] p-2'>
      <div className='grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-2 w-full md:w-fit justify-between items-end my-2'>
        <TypeDropdown />
        <ServiceDropdown />
        <button className='bg-gray-800 rounded-sm text-white col-span-2 md:col-span-1 h-full w-full p-2' onClick={() => { clearFields('Opcion') }}>Limpiar</button>
      </div>
      <EmployPricesTable vehicleType={fields.vehicleType} service={fields.service} />
    </div>
  )
}
