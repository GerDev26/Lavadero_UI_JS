import { Link } from 'react-router-dom'
import { InputEmail, InputPassword } from '../components/Input'
import { InputContext, InputContextProvider } from '../context/InputContext'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function Login () {
  return (
    <>
      <div className='fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] z-20 h-[100vh] max-h-[500px] flex flex-col md:flex-row rounded-lg overflow-hidden'>
        <div className='relative h-full w-full px-8 flex-col items-center hidden md:flex'>
          <div className=' relative z-10 text-white mt-14 gap-3 flex flex-col'>
            <h1 className='text-4xl font-bold'>Bienvenido a RFcarwash</h1>
            <p className='text-xl font-medium'>Optimiza cada aspecto de tu lavadero y brinda un servicio impecable a tus clientes.</p>
          </div>
          <div className='z-0 absolute top-0 w-full h-full bg-black opacity-50' />
        </div>
        <InputContextProvider>
          <Form />
        </InputContextProvider>
      </div>
      <img className='fixed top-0 w-full h-full object-cover blur-[2px]' src='https://www.shutterstock.com/image-photo/woman-washing-her-car-selfservice-600nw-1861269733.jpg' alt='' />
      <div className='fixed top-0 w-full h-full z-10 opacity-25 bg-black' />
    </>

  )
}
function Form () {
  const { fields, setInvalidForm } = useContext(InputContext)
  const { login } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setInvalidForm(true)
    try {
      await login(fields)
    } catch {
      alert('Error')
      setInvalidForm(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-fit h-full p-8 bg-gray-50 flex flex-col justify-center'>
      <h1 className='text-3xl mb-4 font-medium text-center'>Iniciar Sesion</h1>
      <InputEmail />
      <InputPassword />
      <div className='flex flex-col gap-1 mb-2'>
        <LoginButton />
        <Link to='/' className='transition duration-50 w-full h-10 bg-white border-2 rounded-sm font-semibold border-black flex items-center justify-center hover:scale-105'> Volver </Link>
      </div>
      <p>¿Olvidaste tu contraseña? <u className='linear hover:text-blue-600 cursor-pointer'><Link to='/sendpassword'> Recuperala </Link></u></p>
      <p>Si no tienes una cuenta puedes <u><Link to='/signup'>Registrate</Link></u></p>
    </form>
  )
}
function LoginButton () {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-gray-500' : 'hover:scale-105 bg-black'
  return (
    <button type='submit' disabled={invalidForm} className={'transition duration-50  w-full h-10 font-semibold text-white text-lg rounded-sm ' + buttonStyle}>Iniciar Sesion </button>
  )
}
