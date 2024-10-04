import { Link } from 'react-router-dom'
import { useAllServices } from '../../hooks/useServices'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

export function Services () {
  const services = useAllServices()

  return (
    <div className='flex flex-col md:flex-row w-full md:h-[70vh] md:max-h-[500px] gap-2 p-2 md:p-0 md:gap-0'>
      {services.map(service => (
        <ServiceItem key={service.id} id={service.id} text={service.service_name} description={service.description} imgUrl={service.image} />
      ))}
    </div>
  )
}

function ServiceItem ({ id, text, imgUrl, description }) {
  const [link, setLink] = useState('/login')
  const { role } = useContext(AuthContext)

  useEffect(() => {
    if (role === 'cliente') {
      setLink('/turno/' + id)
    } else {
      setLink('/login')
    }
  }, [role])

  return (
    <Link to={link} className='group transition-all duration-500 flex justify-center items-center md:block flex-grow min-h-52 md:min-h-0 md:w-0 w-full relative md:hover:w-96 cursor-pointer'>
      <img className='absolute w-full h-full object-cover md:group-hover:blur-[1px]' src={imgUrl} alt='' />
      <div className='transition-all absolute w-full h-full bg-gradient-to-t from-black opacity-40 md:group-hover:opacity-80 md:group-hover:bg-black bg-black md:bg-transparent' />

      <div className='w-full p-6 md:p-10 text-center md:text-start relative overflow-hidden'>
        <h2 className=' drop-shadow-xl uppercase text-3xl font-bold text-white text-center pointer-events-none md:group-hover:text-start md:group-hover:text-4xl mb-2 md:mb-10'>
          {text}
        </h2>
        <span className='text-2xl text-white md:hidden group-hover:block'>{description}</span>
      </div>

    </Link>
  )
}
