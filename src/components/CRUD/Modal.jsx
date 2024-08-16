import { XMarkIcon } from '@heroicons/react/20/solid'
import { InputEmail, InputPassword, InputText } from '../Input'
import { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { UsersContext } from '../../context/UserContext'
import { getFormFields, mapFields } from '../../helpers/formHelpers'
import { VehicleContext } from '../../context/VehicleContext'

export function Modal ({ callback, children }) {
  const { modal, setModal } = useContext(ModalContext)

  const handleClose = () => {
    setModal(false)
  }

  const className = modal ? 'flex' : 'hidden'
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-40 items-center justify-center ${className}`}>
      <div className='absolute w-full h-full bg-black opacity-55' />
      <form onSubmit={callback} className='relative m-auto w-fit px-24 py-10 bg-white'>
        <button type='button' onClick={handleClose} className='transition duration-150 group w-8 h-6 absolute top-0 right-0 hover:bg-red-700'><XMarkIcon className='w-6 text-red-600 m-auto group-hover:text-white' /></button>
        <h1 className='mb-2 uppercase text-3xl font-semibold'>Crear usuario</h1>
        <div className='grid grid-cols-2 grid-rows-3 w-fit gap-4'>
          {children}
        </div>
        <button className='absolute bottom-2 right-2 uppercase bg-green-600 text-white p-2 rounded-md font-semibold'> Crear usuario </button>
      </form>
    </div>
  )
}
export function UserModal () {
  const { addUser } = useContext(UsersContext)
  const newStructure = {
    id: 'id',
    Nombre: 'name',
    Apellido: 'surname',
    Contraseña: 'password',
    Telefono: 'phone_number',
    Email: 'email'
  }

  const handleSubmit = async (formEvent) => {
    const formFields = getFormFields({ formEvent })
    const newUser = mapFields({ formFields, newStructure })
    console.log(newUser)
    try {
      await addUser(newUser)
    } catch {
      console.log('error')
    }
  }
  return (
    <Modal callback={handleSubmit}>
      <InputEmail text='Email' />
      <InputPassword text='Contraseña' />
      <InputText text='Nombre' />
      <InputText text='Apellido' />
      <InputText text='Telefono' />
      <InputText text='Rol' />
    </Modal>
  )
}
export function VehicleModal () {
  const { addVehicle } = useContext(VehicleContext)

  const newStructure = {
    Dominio: 'domain',
    Tipo: 'type_id'
  }

  const handleSubmit = async (formEvent) => {
    const formFields = getFormFields({ formEvent })
    const newVehicle = mapFields({ formFields, newStructure })
    console.log(newVehicle)
    try {
      await addVehicle(newVehicle)
    } catch {
      console.log('error')
    }
  }
  return (
    <Modal callback={handleSubmit}>
      <InputText text='Dominio' />
      <InputText text='Tipo' />
    </Modal>
  )
}
