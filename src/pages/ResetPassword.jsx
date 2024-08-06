import { Link, useLocation } from 'react-router-dom'
import { InputPassword } from '../components/Input'
import { getFormFields } from '../helpers/formHelpers'
import { resetPassword } from '../services/authService'

export function ResetPassword () {
  const query = new URLSearchParams(useLocation().search)

  const token = query.get('code')

  const handlesubmit = (formEvent) => {
    const formFields = getFormFields({ formEvent })
    if (formFields.Contraseña !== '' && formFields.Contraseña) {
      resetPassword({ token, password: formFields.Contraseña })
    }
  }

  return (
    <main className='relative w-full h-screen flex items-center justify-center'>

      <form onSubmit={handlesubmit} className='w-[40%] max-w-[340px] z-20 h-[80%] max-h-[350px] rounded p-8 bg-gray-50 flex flex-col justify-center gap-3'>
        <h1 className='text-3xl mb-4 font-medium text-center'>Cambiar contraseña</h1>
        <div className='flex items-center justify-center'>
          <InputPassword text='Contraseña' />

        </div>
        <div className='flex flex-col gap-1'>
          <button type='submit' className='transition duration-50 w-full h-10 bg-black font-semibold text-white text-lg rounded-sm hover:scale-105'>Cambiar contraseña </button>
          <Link to='/' className='transition duration-50 w-full h-10 bg-white border-2 rounded-sm font-semibold border-black flex items-center justify-center hover:scale-105'> Volver </Link>
        </div>
      </form>
      <img className='absolute top-0 w-full h-full object-cover blur-[2px]' src='https://www.shutterstock.com/image-photo/woman-washing-her-car-selfservice-600nw-1861269733.jpg' alt='' />
      <div className='absolute top-0 w-full h-full z-10 opacity-25 bg-black' />
    </main>
  )
}
