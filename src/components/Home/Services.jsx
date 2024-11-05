import { Link } from 'react-router-dom'
import { useAllServices } from '../../hooks/useServices'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

export function Services () {
  const services = useAllServices()

  return (
    <div className='w-full min-h-96 h-fit grid grid-cols-1 grid-flow-row md:grid-cols-2 md:grid-rows-6 p-3 gap-3'>
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

  const gridSpan = id % 2 === 1 ? 'md:row-span-2' : 'md:row-span-1'

  console.log(id % 2)

  return (
    <Link to={link} className={`group w-full h-full min-h-40 relative content-center rounded-sm overflow-hidden transition-all duration-300 ${gridSpan}`}>
      <img className='absolute top-0 w-full h-full object-cover z-0 blur-[1px] group-hover:scale-105 group-hover:blur-[3px] transition-all duration-300' src={imgUrl} alt='' />
      <div className='bg-black opacity-50 blur-[1px] z-10 w-full h-full absolute top-0' />
      <div className='relative z-20 text-center text-white px-8 transition-all group-hover:-translate-y-1'>
        <h1 className='group-hover:scale-105 transition-all text-3xl font-bold uppercase mb-1'>{text}</h1>
        <p className='group-hover:scale-105 transition-all text-xl'>{description}</p>
      </div>
    </Link>
  )
}
export function OldServices () {
  const services = useAllServices()

  return (
    <div className='flex flex-col md:flex-row w-full md:h-[70vh] md:max-h-[500px] gap-2 p-2 md:p-0 md:gap-0 overflow-hidden'>
      {services.map(service => (
        <ServiceItem key={service.id} id={service.id} text={service.service_name} description={service.description} imgUrl={service.image} />
      ))}
    </div>
  )
}

function OldServiceItem ({ id, text, imgUrl, description }) {
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
