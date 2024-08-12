import { useParams } from 'react-router-dom'
import { useUserVehicles } from '../hooks/useVehicles'

export function AppointmentReserve () {
  const { service } = useParams()
  const vehicles = useUserVehicles(4)
  console.log(vehicles)
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='grid grid-cols-2 grid-rows-2 gap-4 h-[500px] w-10/12'>
        <section className='border-2 border-black w-full h-full row-span-2'>
          <div className='grid grid-cols-4 grid-flow-row gap-2 p-2 auto-rows-[110px] auto-cols-[110px]'>
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className='bg-blue-600'>{vehicle.domain}</div>
            ))}
          </div>
        </section>

        <section className='border-2 border-black w-full h-full'>
          <div className='grid grid-cols-7 grid-flow-row gap-2 p-2'>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
            <div className='border-2 border-blue-500 rounded-md flex justify-center items-center'> 12:00 </div>
          </div>
        </section>

        <section className='border-2 border-black w-full h-full'>
          A
        </section>

      </div>
    </main>
  )
}
