import { XMarkIcon } from '@heroicons/react/20/solid'
import { InputDomain, InputEmail, InputPassword, InputText, VehicleTypeDropDown } from '../Input'
import { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { UsersContext } from '../../context/UserContext'
import { getFormFields, mapFields } from '../../helpers/formHelpers'
import { VehicleContext } from '../../context/VehicleContext'
import { getTypeIdByDescription } from '../../helpers/vehicleHelper'
import { InputContext } from '../../context/InputContext'
import { GreenSubmitButton } from '../Buttons'

export function CreateModal ({ callback, nameOfModal, children }) {
  const { createModal, setCreateModal } = useContext(ModalContext)

  const handleClose = () => {
    setCreateModal(false)
  }

  const className = createModal ? 'flex' : 'hidden'
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-40 items-center justify-center ${className}`}>
      <div className='absolute w-full h-full bg-black opacity-55' />
      <form onSubmit={callback} className='relative m-auto w-fit px-24 py-10 bg-white'>
        <button type='button' onClick={handleClose} className='transition duration-150 group w-8 h-6 absolute top-0 right-0 hover:bg-red-700'><XMarkIcon className='w-6 text-red-600 m-auto group-hover:text-white' /></button>
        <h1 className='mb-2 uppercase text-3xl font-semibold'>{nameOfModal}</h1>
        <div className='grid grid-cols-2 grid-rows-3 w-fit gap-4'>
          {children}
        </div>
        <GreenSubmitButton text='Crear' />
      </form>
    </div>
  )
}
export function UpdateModal ({ callback, nameOfModal, children }) {
  const { updateModal, setUpdateModal } = useContext(ModalContext)

  const handleClose = () => {
    setUpdateModal(false)
  }

  const className = updateModal ? 'flex' : 'hidden'
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-40 items-center justify-center ${className}`}>
      <div className='absolute w-full h-full bg-black opacity-55' />
      <form onSubmit={callback} className='relative m-auto w-fit px-24 py-10 bg-white'>
        <button type='button' onClick={handleClose} className='transition duration-150 group w-8 h-6 absolute top-0 right-0 hover:bg-red-700'><XMarkIcon className='w-6 text-red-600 m-auto group-hover:text-white' /></button>
        <h1 className='mb-2 uppercase text-3xl font-semibold'>{nameOfModal}</h1>
        <div className='grid grid-cols-2 grid-rows-3 w-fit gap-4'>
          {children}
        </div>
        <GreenSubmitButton text='Actualizar' />
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
    <CreateModal callback={handleSubmit} nameOfModal='Crear Usuario'>
      <InputEmail text='Email' />
      <InputPassword text='Contraseña' />
      <InputText text='Nombre' />
      <InputText text='Apellido' />
      <InputText text='Telefono' />
      <InputText text='Rol' />
    </CreateModal>
  )
}
export function CreateVehicleModal () {
  const { setCreateModal } = useContext(ModalContext)
  const { addVehicle } = useContext(VehicleContext)
  const { fields } = useContext(InputContext)

  const newStructure = {
    Dominio: 'vehicleDomain',
    Tipo: 'vehicleType'
  }

  const handleSubmit = async (formEvent) => {
    setCreateModal(false)
    formEvent.preventDefault()
    const newVehicle = mapFields({ formFields: fields, newStructure })
    newVehicle.vehicleType = getTypeIdByDescription(newVehicle.vehicleType)
    try {
      await addVehicle(newVehicle)
      setCreateModal(false)
    } catch {
      console.log('error')
    }
  }
  return (
    <CreateModal callback={handleSubmit} nameOfModal='Crear vehiculo'>
      <InputDomain />
      <VehicleTypeDropDown />
    </CreateModal>
  )
}
export function UpdateVehicleModal () {
  const { modVehicle } = useContext(VehicleContext)
  const { updateValues, setUpdateModal } = useContext(ModalContext)
  const { fields } = useContext(InputContext)

  const newStructure = {
    Dominio: 'vehicleDomain',
    Tipo: 'vehicleType'
  }

  const handleSubmit = async (formEvent) => {
    formEvent.preventDefault()
    console.log(fields)
    const modifyVehicle = mapFields({ formFields: fields, newStructure })
    modifyVehicle.vehicleType = getTypeIdByDescription(modifyVehicle.vehicleType)
    console.log(modifyVehicle.vehicleDomain.length)
    console.log(updateValues)
    setUpdateModal(false)
    try {
      await modVehicle(updateValues, modifyVehicle)
    } catch {
      console.log('error')
    }
  }
  return (
    <UpdateModal callback={handleSubmit} nameOfModal='Modificar vehiculo'>
      <InputDomain initialValue={updateValues.vehicleDomain} />
      <VehicleTypeDropDown initialValue={updateValues.vehicleType} />
    </UpdateModal>
  )
}
