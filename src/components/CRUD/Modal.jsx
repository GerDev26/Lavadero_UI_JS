import { XMarkIcon } from '@heroicons/react/20/solid'
import { DateInput, InputDomain, InputEmail, InputNumber, InputPassword, InputText, MonthInput, RoleDropdown, TimeInput, TypeDropdown, VehicleTypeDropDown } from '../Input'
import { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { UsersContext } from '../../context/UserContext'
import { getFormFields, mapFields } from '../../helpers/formHelpers'
import { VehicleContext } from '../../context/VehicleContext'
import { InputContext } from '../../context/InputContext'
import { GreenSubmitButton } from '../Buttons'
import { AppointmentContext } from '../../context/AppointmentContext'
import { PricesContext } from '../../context/PricesContext'

export function CreateModal ({ callback, nameOfModal, children }) {
  const { createModal, setCreateModal } = useContext(ModalContext)
  const { clearFields } = useContext(InputContext)

  const handleClose = () => {
    setCreateModal(false)
    clearFields()
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
  const { updateModal, setUpdateModal, setUpdateValues } = useContext(ModalContext)

  const handleClose = () => {
    setUpdateModal(false)
    setUpdateValues({})
  }

  const className = updateModal ? 'flex' : 'hidden'
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen z-40 items-center justify-center ${className}`}>
      <div className='absolute w-full h-full bg-black opacity-55' />
      <form onSubmit={callback} className='relative m-auto w-fit px-24 py-10 bg-white'>
        <button type='button' onClick={handleClose} className='transition duration-150 group w-8 h-6 absolute top-0 right-0 hover:bg-red-700'><XMarkIcon className='w-6 text-red-600 m-auto group-hover:text-white' /></button>
        <h1 className='mb-2 uppercase text-3xl font-semibold'>{nameOfModal}</h1>
        <div className='grid grid-cols-2 grid-rows-3 w-fit gap-4 place-content-center'>
          {children}
        </div>
        <GreenSubmitButton text='Actualizar' />
      </form>
    </div>
  )
}
export function UserCreateModal () {
  const { setCreateModal } = useContext(ModalContext)
  const { addUser } = useContext(UsersContext)
  const { fields, clearFields } = useContext(InputContext)

  const handleSubmit = async (formEvent) => {
    formEvent.preventDefault()
    console.log(fields)
    setCreateModal(false)
    clearFields()
    try {
      await addUser(fields)
    } catch {
      console.log('error')
    }
  }
  return (
    <CreateModal callback={handleSubmit} nameOfModal='Crear Usuario'>
      <InputEmail />
      <InputPassword />
      <InputText labelText='Nombre' name='name' />
      <InputText labelText='Apellido' name='surname' />
      <InputNumber labelText='Telefono' name='phone_number' />
      <RoleDropdown initialValue='cliente' />
    </CreateModal>
  )
}
export function UserUpdateModal () {
  const { updateUser } = useContext(UsersContext)
  const { updateValues, setUpdateModal, setUpdateValues } = useContext(ModalContext)
  const { fields } = useContext(InputContext)

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault()
    setUpdateModal(false)
    try {
      updateUser(updateValues, fields)
    } catch {
      console.log('error')
    }
    setUpdateValues({})
  }

  return (
    <UpdateModal callback={handleSubmit} nameOfModal='Modificar Usuarios'>
      <InputEmail initialValue={updateValues.email} />
      <InputText initialValue={updateValues.name} labelText='Nombre' name='name' />
      <InputText initialValue={updateValues.surname} labelText='Apellido' name='surname' />
      <InputNumber initialValue={updateValues.phone_number} labelText='Telefono' name='phone_number' />
      <RoleDropdown initialValue={updateValues.role?.description} />
    </UpdateModal>
  )
}
export function CreateVehicleModal () {
  const { setCreateModal } = useContext(ModalContext)
  const { addVehicle } = useContext(VehicleContext)
  const { fields } = useContext(InputContext)

  const handleSubmit = async (formEvent) => {
    setCreateModal(false)
    formEvent.preventDefault()
    try {
      await addVehicle(fields)
    } catch {
      console.log('error')
    }
  }
  return (
    <CreateModal callback={handleSubmit} nameOfModal='Crear vehiculo'>
      <InputDomain />
      <TypeDropdown initialValue='auto' />
    </CreateModal>
  )
}
export function UpdateVehicleModal () {
  const { modVehicle } = useContext(VehicleContext)
  const { updateValues, setUpdateModal, setUpdateValues } = useContext(ModalContext)
  const { fields } = useContext(InputContext)

  const handleSubmit = async (formEvent) => {
    formEvent.preventDefault()
    setUpdateModal(false)
    try {
      await modVehicle(updateValues, fields)
    } catch {
      console.log('error')
    }
    setUpdateValues({})
  }
  return (
    <UpdateModal callback={handleSubmit} nameOfModal='Modificar vehiculo'>
      <InputDomain initialValue={updateValues.vehicleDomain} />
      <TypeDropdown initialValue={updateValues.vehicleType} />
    </UpdateModal>
  )
}
export function CreateAppointmentModal () {
  const { setCreateModal } = useContext(ModalContext)
  const { fields } = useContext(InputContext)
  const { createNewAppointment } = useContext(AppointmentContext)

  const handleSubmit = async (formEvent) => {
    setCreateModal(false)
    formEvent.preventDefault()
    try {
      createNewAppointment(fields)
      console.log('hola')
    } catch {
      console.log('error')
    }
  }

  return (
    <CreateModal callback={handleSubmit} nameOfModal='Crear turno'>
      <DateInput name='date' labelText='Fecha' />
      <TimeInput name='hour' labelText='Horario' />
    </CreateModal>
  )
}
export function PriceUpdateModal () {
  const { updateValues, setUpdateModal, setUpdateValues } = useContext(ModalContext)
  const { fields } = useContext(InputContext)
  const { UpdatePrice } = useContext(PricesContext)

  const handleSubmit = async (formEvent) => {
    formEvent.preventDefault()
    setUpdateModal(false)
    try {
      await UpdatePrice(updateValues, fields)
    } catch {
      console.log('Error al actualizar el precio')
    }
    setUpdateValues({})
  }

  return (
    <UpdateModal callback={handleSubmit} nameOfModal='Modificar Precio'>
      <InputNumber
        labelText='Valor'
        name='value'
        initialValue={updateValues.value}
      />
    </UpdateModal>
  )
}
