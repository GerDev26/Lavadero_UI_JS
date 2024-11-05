import { Link, useLocation, useNavigate } from 'react-router-dom'
import { InputPassword } from '../components/Input'
import { resetPassword } from '../services/authService'
import { InputContext, InputContextProvider } from '../context/InputContext'
import { useContext } from 'react'

export function ResetPassword () {
  return (
    <main className='relative w-full h-screen flex items-center justify-center'>
      <InputContextProvider>
        <Form />
      </InputContextProvider>
      <img className='absolute top-0 w-full h-full object-cover blur-[2px]' src='https://www.shutterstock.com/image-photo/woman-washing-her-car-selfservice-600nw-1861269733.jpg' alt='' />
      <div className='absolute top-0 w-full h-full z-10 opacity-25 bg-black' />
    </main>
  )
}

function Form () {
  const navigate = useNavigate()
  const { fields, setInvalidForm } = useContext(InputContext)

  const query = new URLSearchParams(useLocation().search)
  const token = query.get('code')

  const handlesubmit = async (formEvent) => {
    formEvent.preventDefault()
    setInvalidForm(true)
    try {
      await resetPassword({ token, password: fields.password })
      // eslint-disable-next-line no-undef
      alert('Se reinicio la contraseña con exito')
    } catch (error) {
      // eslint-disable-next-line no-undef
      alert(error)
    }
    navigate('/')
  }
  return (
    <form onSubmit={handlesubmit} className='w-[40%] max-w-[340px] z-20 h-[80%] max-h-[350px] rounded p-8 bg-gray-50 flex flex-col justify-center gap-3'>
      <h1 className='text-3xl mb-4 font-medium text-center'>Cambiar contraseña</h1>
      <div className='flex items-center justify-center'>
        <InputPassword text='Contraseña' />

      </div>
      <div className='flex flex-col gap-1'>
        <SubmitButton />
        <Link to='/' className='transition duration-50 w-full h-10 bg-white border-2 rounded-sm font-semibold border-black flex items-center justify-center hover:scale-105'> Volver </Link>
      </div>
    </form>
  )
}

function SubmitButton () {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-gray-500' : 'hover:scale-105 bg-black'
  return (
    <button type='submit' disabled={invalidForm} className={'transition duration-50  w-full h-10 font-semibold text-white text-lg rounded-sm ' + buttonStyle}> Enviar </button>
  )
}
