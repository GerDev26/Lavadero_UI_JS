import { Link, useNavigate } from 'react-router-dom'
import { InputEmail, InputNumber, InputPassword, InputText } from '../components/Input'
import { InputContext, InputContextProvider } from '../context/InputContext'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FullScreenSimpleLoader } from '../components/SimpleLoader'

export function Signup () {
  const { role } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!role) {
    return <FullScreenSimpleLoader />
  }
  if (role !== 'visitor') {
    navigate('/')
  }
  return (
    <>
      <div className='fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] md:max-w-[950px] z-20 h-[80%] md:max-h-[500px] flex rounded-lg overflow-hidden'>
        <div className='relative h-full w-7/12 px-8 flex-col items-center hidden md:flex'>
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
  const { register } = useContext(AuthContext)

  const handlesubmit = async (formEvent) => {
    formEvent.preventDefault()
    setInvalidForm(true)
    try {
      await register(fields)
    } catch {
      setInvalidForm(false)
    }
  }

  return (
    <form onSubmit={handlesubmit} className='w-full h-full p-8 bg-gray-50 flex flex-col justify-center'>
      <h1 className='text-3xl mb-4 font-medium'>Crear cuenta</h1>
      <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 md:grid-rows-3 md:min-w-[500px] md:overflow-hidden overflow-scroll'>
        <InputText labelText='Nombre' name='name' />
        <InputText labelText='Apellido' name='surname' />
        <InputEmail />
        <InputPassword />
        <InputNumber labelText='Telefono' name='phone_number' />
      </div>
      <div className='flex flex-col gap-1 mb-2'>
        <SignUpButton />
        <Link to='/' className='transition duration-50 w-full h-10 bg-white border-2 rounded-sm font-semibold border-black flex items-center justify-center hover:scale-105'> Volver </Link>
      </div>
    </form>
  )
}

function SignUpButton () {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-gray-500' : 'hover:scale-105 bg-black'
  return (
    <button type='submit' disabled={invalidForm} className={'transition duration-50  w-full h-10 font-semibold text-white text-lg rounded-sm ' + buttonStyle}> Crear cuenta </button>
  )
}
