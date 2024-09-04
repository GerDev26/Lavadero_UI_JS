import { ArrowDownCircleIcon } from '@heroicons/react/20/solid'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAllTypeOfVehicles } from '../hooks/useTypeOfVehicles'
import { InputContext } from '../context/InputContext'

export function InputEmail ({ initialValue }) {
  const labelText = 'Email'
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')

  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(labelText, false)
    } else if (!value.includes('@')) {
      setMessage('Tu email debe incluir @')
      validateField(labelText, false)
    } else if (value.includes(' ')) {
      setMessage('Tu email no puede contener espacios')
      validateField(labelText, false)
    } else if (!value.includes('.com')) {
      setMessage('Debe incluir .com')
      validateField(labelText, false)
    } else {
      setMessage('¡Correcto!')
      validateField(labelText, true)
    }
  }
  return (
    <Input labelText={labelText} errorMessage={message} validateInput={validateInput} initialValue={initialValue} />
  )
}
export function InputPassword ({ initialValue }) {
  const labelText = 'Contraseña'
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')

  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(labelText, false)
    } else if (value.length < 8) {
      setMessage('Ingrese almenos 8 caracteres')
      validateField(labelText, false)
    } else {
      setMessage('¡Correcto!')
      validateField(labelText, true)
    }
  }
  return (
    <Input labelText={labelText} errorMessage={message} validateInput={validateInput} type='password' initialValue={initialValue} />
  )
}
export function InputText ({ labelText }) {
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(labelText, false)
    } else if (value.includes(' ')) {
      setMessage('No puede incluir espacios')
      validateField(labelText, false)
    } else if (numbers.some(char => value.includes(char))) {
      setMessage('No puede incluir numeros')
      validateField(labelText, false)
    } else {
      setMessage('¡Correcto!')
      validateField(labelText, true)
    }
  }
  return (
    <Input labelText={labelText} errorMessage={message} validateInput={validateInput} />
  )
}
export function InputNumber () {
  return (
    <h1>Hola</h1>
  )
}
export function InputDomain ({ initialValue }) {
  const labelText = 'Dominio'
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')

  function tieneDosNumeros (cadena) {
    const numeros = cadena.match(/\d/g) // Busca todos los dígitos
    return numeros && numeros.length >= 2 // Verifica si hay al menos 2 dígitos
  }

  function tieneDosLetras (cadena) {
    const letras = cadena.match(/[A-Za-z]/g) // Busca todas las letras mayúsculas y minúsculas
    return letras && letras.length >= 2 // Verifica si hay al menos 2 letras
  }
  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(labelText, false)
    } else if (value.includes(' ')) {
      setMessage('No puede incluir espacios')
      validateField(labelText, false)
    } else if (value.length < 6) {
      setMessage('Debe incluir almenos 6 caracteres')
      validateField(labelText, false)
    } else if (value.length > 7) {
      setMessage('Como maximo se admiten 7 caracteres')
      validateField(labelText, false)
    } else if (!tieneDosLetras(value)) {
      setMessage('Debe tener como minimo 2 letras')
      validateField(labelText, false)
    } else if (!tieneDosNumeros(value)) {
      setMessage('Debe tener como minimo 2 numeros')
      validateField(labelText, false)
    } else {
      setMessage('¡Correcto!')
      validateField(labelText, true)
    }
  }
  return (
    <Input labelText={labelText} errorMessage={message} validateInput={validateInput} initialValue={initialValue} />
  )
}

/* export function Input ({ text, type, message, inputProps }) {
  return (
    <label className='w-60 flex flex-col'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>{text}</span>
      <input {...inputProps} className='peer w-full p-2 bg-gray-200 border-b-4 border-gray-400 rounded-sm focus:border-black invalid:border-red-600 correct:border-green-500' placeholder={'Ingrese su ' + text} name={text} type={type} />
      <p className='mt-1 invisible peer-invalid:visible text-red-600 text-sm'>
        {message}.
      </p>
    </label>
  )
} */
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

export function VehicleTypeDropDown ({ initialValue = '' }) {
  const vehiclesTypes = useAllTypeOfVehicles()
  const { fields, addField, validateField } = useContext(InputContext)
  const [dropdown, setDropdown] = useState(false)

  const fieldName = 'Tipo'

  const handleClick = () => {
    setDropdown(!dropdown)
  }
  const handleSelect = (option) => {
    addField(fieldName, option)
    validateField(fieldName, true)
    setDropdown(!dropdown)
  }

  useEffect(() => {
    if (initialValue !== '') {
      validateField(fieldName, true)
      addField(fieldName, initialValue)
    } else {
      validateField(fieldName, false)
      addField(fieldName, '')
    }
  }, [initialValue])

  const openClose = dropdown ? 'block' : 'hidden'
  const inputStyle = dropdown ? 'bg-gray-300' : 'bg-gray-200'
  const ArrowStyle = dropdown ? 'text-gray-500' : 'text-gray-400'

  const value = fields[fieldName] ? fields[fieldName] : ''

  return (
    <div className='relative'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>Tipo</span>
      <div onClick={handleClick} className='relative flex gap-2 w-60 justify-center items-center'>
        <input name='Tipo' className={'w-full p-2 border-b-4 border-gray-400 rounded-sm cursor-pointer uppercase ' + inputStyle} type='text' value={value} readOnly />
        <button className='w-fit h-fit absolute right-2 top-1' type='button'>
          <ArrowDownCircleIcon className={'w-8 h-8 ' + ArrowStyle} />
        </button>
      </div>
      <div className={'absolute top-[80%] bg-gray-200 w-60 h-fit min-h-5 rounded-sm ' + openClose}>
        {vehiclesTypes.map(type => (
          <p key={type.id} className='p-1 px-2 uppercase border-gray-400 hover:bg-gray-300 cursor-pointer' onClick={() => { handleSelect(type.description) }}>{type.description}</p>
        ))}
      </div>
    </div>
  )
}
function Input ({ labelText, errorMessage, validateInput, initialValue = '', type = 'text' }) {
  const input = useRef()
  const { fieldValidationStatus, addField, fields, validateField } = useContext(InputContext)
  const [inputStyle, setInputStyle] = useState()
  const [messageStyle, setMessageStyle] = useState()
  const [inputText, setInputText] = useState(initialValue)

  useEffect(() => {
    if (initialValue !== '') {
      validateField(labelText, true)
      addField(labelText, inputText)
    } else {
      validateField(labelText, false)
      setInputText(initialValue || '')
    }
  }, [initialValue])

  useEffect(() => { // cambia los estilos dependiendo si el input es valido o no
    switch (fieldValidationStatus[labelText]) {
      case true:
        setInputStyle('border-b-green-700')
        setMessageStyle('text-green-700')
        break
      case false:
        setInputStyle('border-b-red-700')
        setMessageStyle('text-red-700')
        break

      default:
        setInputStyle('border-b-gray-400')
        setMessageStyle('text-gray-400')
        break
    }
  }, [fields[labelText]])

  useEffect(() => {
    setInputText(initialValue || '')
  }, [initialValue])

  const handleChange = () => {
    const value = input.current.value
    setInputText(value)
    addField(labelText, value)
    validateInput(value)
  }

  return (
    <label className='w-60 flex flex-col'>
      <span className='text-lg text-gray-950 font-semibold'>{labelText}</span>
      <input
        autoComplete='off'
        onChange={handleChange}
        ref={input}
        value={inputText}
        className={
            'w-full p-2 bg-gray-200 focus:bg-gray-300 border-b-4 border-gray rounded-sm ' + inputStyle
        }
        type={type}
        placeholder={'Ingrese su ' + labelText}
      />
      <p className={'mt-1 h-6 text-sm ' + messageStyle}>{errorMessage}</p>
    </label>
  )
}
