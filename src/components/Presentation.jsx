import { useAllTypeOfVehicles } from '../hooks/useTypeOfVehicles'

export function Banner () {
  const typeOfVehicles = useAllTypeOfVehicles()

  return (
    <div className='grid grid-rows-2 grid-cols-4 h-[85vh] gap-2 w-full px-4'>
      <ItemBanner className='first:row-span-2 first:col-span-2' text='' imgUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSMYJB_cGhbUw0g0LYPMWdlDip_T6xkOvs6krkLWMAQKWLW_DAuPl5bNpJxzCxH94xZhI&usqp=CAU' />
      {typeOfVehicles.map(typeOfVehicle => (
        <ItemBanner className='last:col-span-2 last:row-start-1 last:col-start-3' key={typeOfVehicle.id} text={typeOfVehicle.description} imgUrl={typeOfVehicle.image} />
      ))}
    </div>
  )
}

function ItemBanner ({ text, imgUrl, className = '' }) {
  return (
    <div className={'relative overflow-hidden ' + className}>
      <img className='absolute w-full h-full object-cover' src={imgUrl} alt={text} />
      <div className='absolute w-full h-full bg-gradient-to-t from-black  opacity-70' />
      <h2 className='absolute uppercase bottom-6 left-6 text-4xl font-bold text-white'>{text}</h2>
    </div>
  )
}
