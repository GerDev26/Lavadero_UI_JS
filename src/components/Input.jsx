/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAllTypeOfVehicles } from '../hooks/useTypeOfVehicles'
import { InputContext } from '../context/InputContext'
import { CheckIcon } from '@heroicons/react/16/solid'
import { useAllServices } from '../hooks/useServices'
import { firstLetterMayus } from '../helpers/stringHelpers'

export function InputEmail ({ initialValue }) {
  const labelText = 'Email'
  const name = 'email'
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')

  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(name, false)
    } else if (!value.includes('@')) {
      setMessage('Tu email debe incluir @')
      validateField(name, false)
    } else if (value.includes(' ')) {
      setMessage('Tu email no puede contener espacios')
      validateField(name, false)
    } else if (!value.includes('.com')) {
      setMessage('Debe incluir .com')
      validateField(name, false)
    } else {
      setMessage('¡Correcto!')
      validateField(name, true)
    }
  }
  return (
    <Input labelText={labelText} name={name} errorMessage={message} validateInput={validateInput} initialValue={initialValue} />
  )
}
export function InputPassword ({ initialValue }) {
  const labelText = 'Contraseña'
  const name = 'password'
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')

  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(name, false)
    } else if (value.length < 8) {
      setMessage('Ingrese almenos 8 caracteres')
      validateField(name, false)
    } else {
      setMessage('¡Correcto!')
      validateField(name, true)
    }
  }
  return (
    <Input labelText={labelText} name={name} errorMessage={message} validateInput={validateInput} type='password' initialValue={initialValue} />
  )
}
export function InputText ({ labelText, name = '' }) {
  name = name === '' ? labelText : name
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo esta vacio')
      validateField(name, false)
    } else if (value.includes(' ')) {
      setMessage('No puede incluir espacios')
      validateField(name, false)
    } else if (numbers.some(char => value.includes(char))) {
      setMessage('No puede incluir numeros')
      validateField(name, false)
    } else {
      setMessage('¡Correcto!')
      validateField(name, true)
    }
  }
  return (
    <Input labelText={labelText} name={name} errorMessage={message} validateInput={validateInput} />
  )
}

export function InputNumber ({ labelText, name = '', className = '' }) {
  name = name === '' ? labelText : name
  const { validateField } = useContext(InputContext)
  const [message, setMessage] = useState('')

  const validateInput = (value) => {
    if (value.length === 0) {
      setMessage('El campo está vacío')
      validateField(name, false)
    } else if (!/^\d+$/.test(value)) {
      setMessage('Solo se permiten números')
      validateField(name, false)
    } else {
      setMessage('¡Correcto!')
      validateField(name, true)
    }
  }

  return (
    <Input className={className} labelText={labelText} name={name} errorMessage={message} validateInput={validateInput} />
  )
}

export function InputDomain ({ initialValue }) {
  const name = 'vehicleDomain'
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
      validateField(name, false)
    } else if (value.includes(' ')) {
      setMessage('No puede incluir espacios')
      validateField(name, false)
    } else if (value.length < 6) {
      setMessage('Debe incluir almenos 6 caracteres')
      validateField(name, false)
    } else if (value.length > 7) {
      setMessage('Como maximo se admiten 7 caracteres')
      validateField(name, false)
    } else if (!tieneDosLetras(value)) {
      setMessage('Debe tener como minimo 2 letras')
      validateField(name, false)
    } else if (!tieneDosNumeros(value)) {
      setMessage('Debe tener como minimo 2 numeros')
      validateField(name, false)
    } else {
      setMessage('¡Correcto!')
      validateField(name, true)
    }
  }
  return (
    <Input labelText='Dominio' errorMessage={message} validateInput={validateInput} initialValue={initialValue} name={name} />
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

export function VehicleTypeDropDown ({ initialValue = '' }) {
  const name = 'vehicleType'
  const vehiclesTypes = useAllTypeOfVehicles()
  const { fields, addField, validateField } = useContext(InputContext)
  const [dropdown, setDropdown] = useState(false)

  const handleClick = () => {
    setDropdown(!dropdown)
  }
  const handleSelect = (option) => {
    addField(name, option)
    validateField(name, true)
    setDropdown(!dropdown)
  }

  useEffect(() => {
    if (initialValue !== '') {
      validateField(name, true)
      addField(name, initialValue)
    } else {
      validateField(name, false)
      addField(name, '')
    }
  }, [initialValue])

  const openClose = dropdown ? 'block' : 'hidden'
  const inputStyle = dropdown ? 'bg-gray-300' : 'bg-gray-200'
  const ArrowStyle = dropdown ? 'text-gray-500' : 'text-gray-400'

  const value = fields[name] ? fields[name] : ''

  return (
    <div className='relative'>
      <span className='text-lg text-gray-950 font-semibold capitalize'>Tipo</span>
      <div onClick={handleClick} className='relative flex gap-2 w-60 justify-center items-center'>
        <input name={name} className={'w-full p-2 border-b-4 border-gray-400 rounded-sm cursor-pointer uppercase ' + inputStyle} type='text' value={value} readOnly />
        <button className='w-fit h-fit absolute right-2 top-1' type='button'>
          <ArrowDownCircleIcon className={'w-8 h-8 ' + ArrowStyle} />
        </button>
      </div>
      <div className={'absolute top-[80px] bg-gray-200 w-60 h-fit min-h-5 rounded-sm ' + openClose}>
        {vehiclesTypes.map(type => (
          <p key={type.id} className='p-1 px-2 uppercase border-gray-400 hover:bg-gray-300 cursor-pointer' onClick={() => { handleSelect(type.description) }}>{type.description}</p>
        ))}
      </div>
    </div>
  )
}
function Input ({ className = '', labelText, errorMessage, validateInput, initialValue, type = 'text', name = labelText }) {
  const input = useRef()
  const { fieldValidationStatus, addField, fields, validateField } = useContext(InputContext)
  const [inputStyle, setInputStyle] = useState()
  const [messageStyle, setMessageStyle] = useState()

  useEffect(() => {
    if (initialValue) {
      validateField(name, true)
      addField(name, initialValue)
    } else {
      validateField(name, false)
    }
  }, [initialValue])

  useEffect(() => { // cambia los estilos dependiendo si el input es valido o no
    switch (fieldValidationStatus[name]) {
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
        setMessageStyle('text-gray-400 opacity-0')
        break
    }
  }, [fields[name]])

  const handleChange = () => {
    const value = input.current.value
    addField(name, value)
    validateInput(value)
  }

  return (
    <label className='w-60 flex flex-col'>
      <span className='text-lg text-gray-950 font-semibold'>{labelText}</span>
      <input
        autoComplete='off'
        onChange={handleChange}
        ref={input}
        value={fields[name] || ''}
        className={
            'w-full p-2 bg-gray-200 focus:bg-gray-300 border-b-4 border-gray rounded-sm ' + inputStyle + ' ' + className
        }
        type={type}
        placeholder={'Ingrese su ' + labelText}
      />
      <p className={'mt-1 h-6 text-sm ' + messageStyle}>{errorMessage}</p>
    </label>
  )
}

export function ServiceDropdown ({ initialValue }) {
  const services = useAllServices()
  const values = services.map(vehicle => vehicle.service_name)

  return (
    <Dropdown initialValue={initialValue} options={values} labelText='Servicio' name='service' />
  )
}
export function TypeDropdown ({ initialValue }) {
  const vehicles = useAllTypeOfVehicles()
  const values = vehicles.map(vehicle => vehicle.description)

  return (
    <Dropdown initialValue={initialValue} options={values} labelText='Tipo' name='vehicleType' />
  )
}

export function Dropdown ({ initialValue = '', labelText, options, name }) {
  const { fields, addField, validateField } = useContext(InputContext)

  // states
  const [isActive, setIsActive] = useState(false)

  // styles
  const listHeightStyle = isActive ? 'max-h-96' : 'max-h-0'
  const valueStyle = isActive ? 'bg-gray-700' : 'bg-gray-800'
  const arrowValueStyle = isActive ? 'rotate-180' : 'rotate-0'

  // logica
  const handleSelect = (v) => {
    setIsActive(false)
    addField(name, v)
  }

  useEffect(() => {
    if (initialValue !== '') {
      validateField(name, true)
      addField(name, initialValue)
    } else {
      validateField(name, false)
      addField(name, 'Opcion')
    }
  }, [initialValue])

  return (
    <div className='w-44 bg-blue-300'>
      <div className='h-12 overflow-hidden'>
        <ul
          onClick={() => setIsActive(!isActive)}
          className={`absolute z-20 transition-all duration-300 flex flex-col w-fit min-w-44 p-1 gap-1 min-h-12 bg-gray-800 overflow-hidden text-white rounded-sm ${listHeightStyle}`}
        >
          <div
            className={`transition-all flex-shrink-0 h-[40px] w-full flex justify-between px-2 items-center rounded-sm cursor-pointer hover:bg-gray-700 ${valueStyle}`}
            type='text'
            value='lenguaje'
          >
            <p className=' cursor-pointer'>{fields[name]}</p>
            <ChevronDownIcon className={`transition-all w-6 text-white ${arrowValueStyle}`} />
          </div>
          {
        options.map((option, index) => <Option key={index} optionName={firstLetterMayus(option)} callback={handleSelect} actualValue={fields[name]} />)
      }
        </ul>
      </div>
    </div>
  )
}

function Option ({ optionName, callback, actualValue }) {
  const iconStyle = optionName === actualValue ? 'opacity-100' : 'opacity-10'

  return (
    <li
      onClick={() => callback(optionName)}
      className='flex-shrink-0 h-[40px] w-full flex justify-between px-2 items-center bg-gray-800 hover:bg-gray-700 hover:text-blue-500 rounded-sm cursor-pointer'
    >
      <p className='cursor-pointer'>{optionName}</p>
      <CheckIcon className={`text-green-600 w-4 ${iconStyle}`} />
    </li>
  )
}
