import { Link } from 'react-router-dom'

export function SectionPageCard ({ link, title, img }) {
  return (
    <Link to={link} className='group relative w-full h-full bg-blue-500 rounded-sm overflow-hidden'>
      <h1 className='absolute bottom-6 left-6 z-20 text-6xl text-white uppercase font-semibold'>{title}</h1>
      <img className='transition duration-300 group-hover:scale-110 absolute top-0 right-0 w-full h-full object-cover' src={img} alt='Turnos' />
      <div className='absolute w-full h-full bg-black opacity-45 z-10' />
    </Link>
  )
}
