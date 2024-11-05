import { useContext } from 'react'
import { EmployPricesTable } from '../components/Tables/PricesTable'
import { ServiceDropdown, TypeDropdown } from '../components/Input'
import { InputContext, InputContextProvider } from '../context/InputContext'

export function EmployPrices () {
  return (
    <InputContextProvider>
      <div className='w-full gap-8 m-auto min-h-[40vh] p-2'>
        <div className='flex gap-2 flex-wrap mb-2 max-h-18'>

          <TypeDropdown />
          <ServiceDropdown />
          <ClearButton />
        </div>
        <EmployPricesTable />
      </div>
    </InputContextProvider>
  )
}

function ClearButton () {
  const { clearFields } = useContext(InputContext)
  return (
    <div>
      <h3 className='opacity-0'>Limpiar</h3>
      <button className='bg-gray-800 rounded-sm text-white col-span-2 md:col-span-1 h-12 w-fit px-4 py-2' onClick={() => { clearFields('Opcion') }}>Limpiar</button>
    </div>
  )
}

export function Crud () {
  const { fields, clearFields } = useContext(InputContext)
  return (
    <div className='w-full gap-8 m-auto min-h-[40vh] p-2'>
      <div className='flex gap-2 flex-wrap mb-2 max-h-18'>
        <TypeDropdown />
        <ServiceDropdown />
        <div>
          <h3 className='opacity-0'>Limpiar</h3>
          <button className='bg-gray-800 rounded-sm text-white col-span-2 md:col-span-1 h-12 w-fit px-4 py-2' onClick={() => { clearFields('Opcion') }}>Limpiar</button>
        </div>
      </div>
      <EmployPricesTable vehicleType={fields.vehicleType} service={fields.service} />
    </div>
  )
}
