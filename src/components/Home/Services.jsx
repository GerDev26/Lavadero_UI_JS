import { Link } from 'react-router-dom'
import { getAccessToken } from '../../helpers/tokenHelpers'
import { useAllServices } from '../../hooks/useServices'
import { useEffect, useState } from 'react'

export function Services () {
  const services = useAllServices()

  return (
    <div className='flex w-full h-[70vh] max-h-[500px]'>
      {services.map(service => (
        <ServiceItem key={service.id} id={service.id} text={service.service_name} description={service.description} imgUrl={service.image} />
      ))}
    </div>
  )
}

function ServiceItem ({ id, text, imgUrl, description }) {
  const [link, setLink] = useState('/login')

  useEffect(() => {
    try {
      getAccessToken()
      setLink('/turno/' + id)
    } catch {
      setLink('/login')
    }
  }, [])

  return (
    <div className='group transition-all duration-500 flex-grow w-0 relative hover:w-96'>
      <img className='absolute w-full h-full object-cover group-hover:blur-[1px]' src={imgUrl} alt='' />
      <div className='transition-all absolute w-full h-full bg-gradient-to-t from-black opacity-50 group-hover:opacity-80 group-hover:bg-black' />

      <div className='w-full p-10 relative overflow-hidden'>
        <h2 className='drop-shadow-xl uppercase text-3xl font-bold text-white text-center pointer-events-none group-hover:text-start group-hover:text-4xl mb-10'>
          {text}
        </h2>
        <span className='text-2xl text-white hidden group-hover:block'>{description}</span>
      </div>

      <Link to={link}><button className='hidden group-hover:block uppercase text-lg bg-white p-3 font-bold rounded-sm border-2 absolute bottom-4 right-4'>Solicitar turno</button></Link>
    </div>
  )
}
