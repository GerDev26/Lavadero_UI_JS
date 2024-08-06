import { Link, useNavigate } from 'react-router-dom'
import { InputEmail, InputPassword } from '../components/Input'
import { getFormFields, mapFields } from '../helpers/formHelpers'
import { startSession } from '../services/authService'
import { setAccessToken } from '../helpers/tokenHelpers'

export function Login () {
  const navigate = useNavigate()

  const newStructure = {
    Email: 'email',
    Contraseña: 'password'
  }

  const login = async (formEvent) => {
    const formFields = getFormFields({ formEvent })
    const mappedFields = mapFields({ formFields, newStructure })
    try {
      const token = await startSession({ user: mappedFields })
      setAccessToken({ token })
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }
  const handlesubmit = (formEvent) => {
    login(formEvent).catch((error) => {
      console.log(error)
    })
  }

  return (

    <main className='relative w-full h-screen flex items-center justify-center'>
      <div className='relative w-[80%] max-w-[800px] z-20 h-[80vh] max-h-[500px] flex rounded-lg overflow-hidden'>
        <div className='relative h-full w-full px-8 flex flex-col items-center'>
          <div className=' relative z-10 text-white mt-14 gap-3 flex flex-col'>
            <h1 className='text-4xl font-bold'>Bienvenido a RFcarwash</h1>
            <p className='text-xl font-medium'>Optimiza cada aspecto de tu lavadero y brinda un servicio impecable a tus clientes.</p>
          </div>
          <div className='z-0 absolute top-0 w-full h-full bg-black opacity-50' />
        </div>
        <form onSubmit={handlesubmit} className='w-fit h-full p-8 bg-gray-50 flex flex-col justify-center'>
          <h1 className='text-3xl mb-4 font-medium text-center'>Iniciar Sesion</h1>
          <InputEmail text='Email' />
          <InputPassword text='Contraseña' />
          <div className='flex flex-col gap-1 mb-2'>
            <button type='submit' className='transition duration-50 w-full h-10 bg-black font-semibold text-white text-lg rounded-sm hover:scale-105'>Iniciar Sesion </button>
            <Link to='/' className='transition duration-50 w-full h-10 bg-white border-2 rounded-sm font-semibold border-black flex items-center justify-center hover:scale-105'> Volver </Link>
          </div>
          <p>¿Olvidaste tu contraseña? <u className='linear hover:text-blue-600 cursor-pointer'>Recuperala</u></p>
          <p>Si no tienes una cuenta puedes <u><Link to='/signup'>Registrate</Link></u></p>
        </form>

      </div>
      <img className='absolute top-0 w-full h-full object-cover blur-[2px]' src='https://www.shutterstock.com/image-photo/woman-washing-her-car-selfservice-600nw-1861269733.jpg' alt='' />
      <div className='absolute top-0 w-full h-full z-10 opacity-25 bg-black' />
    </main>

  )
}
