import { Link, useNavigate } from 'react-router-dom'
import { InputEmail } from '../components/Input'
import { getFormFields, mapFields } from '../helpers/formHelpers'
import { sendPasswordToken } from '../services/authService'

export function SendPassword () {
  const navigate = useNavigate()
  const newStructure = {
    Email: 'email'
  }

  const handlesubmit = async (formEvent) => {
    const formFields = getFormFields({ formEvent })
    const mappedFields = mapFields({ formFields, newStructure })
    try {
      await sendPasswordToken({ email: mappedFields })
      // eslint-disable-next-line no-undef
      alert('Se envio con exito')
    } catch (error) {
      // eslint-disable-next-line no-undef
      alert(error)
    }
    navigate('/')
  }

  return (
    <main className='relative w-full h-screen flex items-center justify-center'>

      <form onSubmit={handlesubmit} className='w-[40%] max-w-[380px] z-20 h-[80%] max-h-[350px] rounded p-8 bg-gray-50 flex flex-col justify-center gap-3'>
        <h1 className='text-3xl mb-4 font-medium text-center'>Recuperar Contraseña</h1>
        <div className='flex items-center justify-center'>
          <InputEmail text='Email' />

        </div>
        <div className='flex flex-col gap-1'>
          <button type='submit' className='transition duration-50 w-full h-10 bg-black font-semibold text-white text-lg rounded-sm hover:scale-105'> Enviar </button>
          <Link to='/' className='transition duration-50 w-full h-10 bg-white border-2 rounded-sm font-semibold border-black flex items-center justify-center hover:scale-105'> Volver </Link>
        </div>
      </form>
      <img className='absolute top-0 w-full h-full object-cover blur-[2px]' src='https://www.shutterstock.com/image-photo/woman-washing-her-car-selfservice-600nw-1861269733.jpg' alt='' />
      <div className='absolute top-0 w-full h-full z-10 opacity-25 bg-black' />
    </main>
  )
}