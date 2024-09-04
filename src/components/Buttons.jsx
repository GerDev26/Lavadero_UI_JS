import { useContext } from 'react'
import { InputContext } from '../context/InputContext'

export function BlackSubmitButton ({ text }) {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-gray-500' : 'hover:scale-105 bg-black'
  return (
    <button type='submit' disabled={invalidForm} className={'transition duration-50  w-full h-10 font-semibold text-white text-lg rounded-sm ' + buttonStyle}> {text} </button>
  )
}
export function GreenSubmitButton ({ text }) {
  const { invalidForm } = useContext(InputContext)
  const buttonStyle = invalidForm ? 'bg-green-900 text-gray-200' : 'hover:scale-105 text-white bg-green-600'
  return (
    <button className={'absolute bottom-2 right-2 uppercase   p-2 rounded-md font-semibold ' + buttonStyle} disabled={invalidForm}> {text} </button>
  )
}
