import { Bars3Icon } from '@heroicons/react/20/solid'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAccessToken } from '../helpers/tokenHelpers'
import { AuthContext } from '../context/AuthContext'

export function Navbar () {
  const [menuState, setMenuState] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState()
  const { role } = useContext(AuthContext)

  const toggleMenu = () => {
    setMenuState(!menuState)
  }
  useEffect(() => {
    console.log(role)
    switch (role) {
      case 'empleado':
        setSelectedMenu(<EmployMenu />)
        break

      default:
        setSelectedMenu(<ClientMenu />)
        break
    }
  }, [role])

  return (
    <nav className='sticky top-0 left-0 z-50 w-full flex justify-between items-center px-5 py-3 text-white text-l opacity-95'>
      <div className=' absolute top-0 left-0 w-full h-full bg-black z-0' />
      <h1 className='text-4xl font-bold z-10'><Link to='/'>RFcarwash</Link></h1>
      {selectedMenu}
      <Bars3Icon onClick={toggleMenu} className='relative z-50 w-8 h-8 mr-2 text-white md:hidden' />
    </nav>
  )
}

function EmployMenu ({ menuState }) {
  return (
    <Menu menuState={menuState}>
      <SessionItemCheck>
        <CloseSessionItem />
      </SessionItemCheck>
    </Menu>
  )
}
function ClientMenu ({ menuState }) {
  return (
    <Menu menuState={menuState}>
      <SessionItemCheck>
        <Item text='mis turnos' to='/misTurnos' />
        <Item text='mis vehiculos' to='/misVehiculos' />
        <CloseSessionItem />
      </SessionItemCheck>
    </Menu>
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
function SessionItemCheck ({ children }) {
  const token = getAccessToken()
  if (!token) {
    return <Item text='Iniciar Sesión' to='/login' />
  } else {
    return <>{children}</>
  }
}

function CloseSessionItem () {
  const { logout } = useContext(AuthContext)

  return (
    <Item onClick={logout} text='Cerrar sesion' />
  )
}
