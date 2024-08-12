import { Bars3Icon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { closeSession } from '../services/authService'
import { getAccessToken, removeAccessToken } from '../helpers/tokenHelpers'

export function Navbar () {
  const [menuState, setMenuState] = useState(false)

  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  return (
    <nav className='sticky top-0 left-0 z-20 w-full flex justify-between items-center px-5 py-3 text-white text-l opacity-95'>
      <div className=' absolute top-0 left-0 w-full h-full bg-black z-0' />
      <h1 className='text-4xl font-bold z-10'><Link to='/'>RFcarwash</Link></h1>
      <Menu menuState={menuState}>
        {/*         <Item text='Mis autos' to='/CRUD' />
        <Item text='Mis turnos' to='/TURNOS' /> */}
        <SessionItem />
      </Menu>
      <Bars3Icon onClick={toggleMenu} className='relative z-50 w-8 h-8 mr-2 text-white md:hidden' />
    </nav>
  )
}

export function Menu ({ children, menuState }) {
  const menuClass = menuState ? ' translate-x-0' : ' translate-x-full'

  return (
    <ol
      className={
        'z-50 fixed right-0 top-0 transition h-screen bg-gray-950 w-60 flex flex-col gap-2 pt-20 md:relative md:w-fit md:h-fit md:flex-row md:bg-transparent md:pt-0 md:translate-x-0' +
        menuClass
      }
    >
      {children}
    </ol>
  )
}

function Item ({ text, to, onClick }) {
  return (
    <Link onClick={onClick} to={to} className='group relative px-4 py-3 cursor-pointer uppercase'>
      <h3 className='transition-all relative z-10 md:group-hover:text-black'>{text}</h3>
      <div className='transition-all absolute w-full bg-white h-1 bottom-0 left-0 z-0 group-hover:h-full hidden
      md:block'
      />
    </Link>
  )
}
function SessionItem () {
  try {
    getAccessToken()
    return <CloseSessionItem />
  } catch (error) {
    return <Item text='Iniciar Sesión' to='/login' />
  }
}

function CloseSessionItem () {
  const token = getAccessToken()

  const logout = async () => {
    try {
      await closeSession({ token })
      removeAccessToken()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const handleClick = () => {
    logout().catch((error) => {
      console.log(error)
    })
  }

  return (
    <Item onClick={handleClick} to='/' text='Cerrar sesion' />
  )
}
