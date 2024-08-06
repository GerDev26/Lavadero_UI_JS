export function InputEmail ({ text }) {
  return (
    <Input text={text} message='Email no valido' type='email' />
  )
}
export function InputText ({ text }) {
  return (
    <Input text={text} message='Texto con error' type='text' />
  )
}
export function InputNumber ({ text }) {
  return (
    <Input text={text} message='Numero incorrecto' type='number' />
  )
}
export function InputPassword ({ text }) {
  return (
    <Input text={text} message='Contraseña no valida' type='password' />
  )
}
export function InputHidden () {
  return (
    <div className='opacity-0'>
      <Input text='asd' message='Cpmtraseña no valida' type='password' />
    </div>
  )
}

export function Input ({ text, type, message }){
  return (
    <label className='w-60 flex flex-col'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>{text}</span>
      <input className='peer w-full p-2 bg-gray-200 border-b-4 border-gray-400 rounded-sm focus:border-black invalid:border-red-600 correct:border-green-500' placeholder={'Ingrese su ' + text} name={text} type={type} />
      <p className='mt-1 invisible peer-invalid:visible text-red-600 text-sm'>
        {message}.
      </p>
    </label>
  )
}
