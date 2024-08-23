import { ArrowDownCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { useAllTypeOfVehicles } from '../hooks/useTypeOfVehicles'

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

export function Input ({ text, type, message, inputProps }) {
  return (
    <label className='w-60 flex flex-col'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>{text}</span>
      <input {...inputProps} className='peer w-full p-2 bg-gray-200 border-b-4 border-gray-400 rounded-sm focus:border-black invalid:border-red-600 correct:border-green-500' placeholder={'Ingrese su ' + text} name={text} type={type} />
      <p className='mt-1 invisible peer-invalid:visible text-red-600 text-sm'>
        {message}.
      </p>
    </label>
  )
}
export function BigInput ({ labelText, errorMessage, inputProps, callback = () => {}, isOk, initialValue = '' }) {
  const text = useRef()
  const [border, setBorder] = useState('')
  const [inputText, setInputText] = useState(initialValue)

  const handleChange = (event) => {
    const newValue = event.target.value
    setInputText(newValue)
    callback(newValue)
  }

  useEffect(() => {
    switch (isOk) {
      case true:
        setBorder('border-green-600')
        break
      case false:
        setBorder('border-red-600')
        break
      default:
        setBorder('border-gray-400')
        break
    }
  }, [isOk])

  useEffect(() => {
    setInputText(initialValue || '')
  }, [initialValue])

  return (
    <label className='w-60 flex flex-col'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>{labelText}</span>
      <input
        {...inputProps}
        value={inputText}
        onChange={handleChange}
        ref={text}
        name={labelText}
        className={
          'peer w-full p-2 bg-gray-200 focus:bg-gray-300 border-b-4 rounded-sm ' +
          border
        }
        placeholder={'Ingrese su ' + labelText}
      />
      <p className='mt-1 peer-invalid:visible text-red-600 text-sm'>{errorMessage}.</p>
    </label>
  )
}

export function DomainBigInput ({ initialValue }) {
  const [message, setMessage] = useState('')
  const [isOk, setIsOK] = useState()

  const handleChange = (text) => {
    if (text.length > 7) {
      setMessage('Debe ser menor a 7')
      setIsOK(false)
    } else if (text.length < 7) {
      setMessage('Debe ser mayor a 7')
      setIsOK(false)
    } else {
      setMessage('')
      setIsOK(true)
    }
  }

  return (
    <BigInput inputProps={{ minLength: 7, maxLength: 7 }} initialValue={initialValue} labelText='Dominio' errorMessage={message} callback={handleChange} isOk={isOk} />
  )
}

export function VehicleTypeDropDown ({ initialValue }) {
  const vehiclesTypes = useAllTypeOfVehicles()
  const [option, setOption] = useState(initialValue)
  const [dropdown, setDropdown] = useState(false)

  const handleClick = () => {
    setDropdown(!dropdown)
  }
  const handleSelect = (option) => {
    setOption(option)
    setDropdown(!dropdown)
  }
  useEffect(() => {
    setOption(initialValue || '')
  }, [initialValue])

  const openClose = dropdown ? 'flex flex-col' : 'hidden'
  const inputStyle = dropdown ? 'bg-gray-300' : 'bg-gray-200'
  const ArrowStyle = dropdown ? 'text-gray-500' : 'text-gray-400'

  return (
    <div className='relative'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>Tipo</span>
      <div onClick={handleClick} className='relative flex gap-2 w-60 justify-center items-center'>
        <input name='Tipo' className={'w-full p-2 border-b-4 border-gray-400 rounded-sm cursor-pointer ' + inputStyle} type='text' value={option} readOnly />
        <button className='w-fit h-fit absolute right-2 top-1' type='button'>
          <ArrowDownCircleIcon className={'w-8 h-8 ' + ArrowStyle} />
        </button>
      </div>
      <div className={'absolute top-[80%] bg-gray-200 w-60 px-2 py-1 gap-2 ' + openClose}>
        {vehiclesTypes.map(type => (
          <p key={type.id} className='border-b-2 border-gray-400' onClick={() => { handleSelect(type.description) }}>{type.description}</p>
        ))}
      </div>
    </div>
  )
}
