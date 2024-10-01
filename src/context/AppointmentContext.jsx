import { createContext, useEffect, useReducer, useState } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import { completeAppointment, deleteAppointment, releaseAppointment } from '../services/appointmentServices'

const initialState = {
  appointments: []
}

export const AppointmentContext = createContext({})

export const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)
  const [completedAppointments, setCompletedAppointments] = useState([])
  const [reservedAppointments, setReservedAppointments] = useState([])
  const [avaibleAppointments, setAvaibleAppointments] = useState([])

  function convertirAFechaCompleta (cita) {
    // Convertir la fecha al formato correcto para que JavaScript la entienda (YYYY-MM-DD)
    const [dia, mes, año] = cita.date.split('-')
    // Combinar fecha y hora para crear un objeto Date
    return new Date(`${año}-${mes}-${dia}T${cita.hour}`)
  }

  useEffect(() => {
    const sortAppointments = state.appointments.sort((a, b) => convertirAFechaCompleta(b) - convertirAFechaCompleta(a))
    setAppointments(sortAppointments)
    setCompletedAppointments(state.appointments.filter(appointment => appointment.state === 'Completo'))
    setReservedAppointments(state.appointments.filter(appointment => appointment.state === 'Reservado'))
    setAvaibleAppointments(state.appointments.filter(appointment => appointment.state === 'Disponible'))
  }, [state.appointments])

  const removeAppointment = async (selectedAppointment) => {
    const prevAppointmentState = [...state.appointments]
    dispatch({ type: 'DELETE_ITEM', itemType: 'appointments', item: selectedAppointment })
    try {
      await deleteAppointment(selectedAppointment.id)
    } catch (error) {
      console.error('Error deleting appointment:', error)
      dispatch({ type: 'SET_ITEMS', itemType: 'appointments', itemList: prevAppointmentState })
    }
  }

  const releaseReservedAppointment = async (selectedAppointment) => {
    const prevAppointmentState = [...state.appointments]
    const newAppointment = { ...selectedAppointment }

    if (newAppointment.state === 'Reservado') {
      newAppointment.state = 'Disponible'
    }
    if (newAppointment.state === 'Completo') {
      newAppointment.state = 'Reservado'
      console.log('Completo a reservado')
    }
    console.log('Hola')
    dispatch({ type: 'UPDATE_ITEM', itemType: 'appointments', item: selectedAppointment, modifyItem: newAppointment })
    try {
      releaseAppointment(selectedAppointment.id)
    } catch {
      dispatch({ type: 'SET_ITEMS', itemType: 'appointments', itemList: prevAppointmentState })
    }
  }
  const completeReservedAppointment = async (selectedAppointment) => {
    const prevAppointmentState = [...state.appointments]
    const newAppointment = { ...selectedAppointment }
    newAppointment.state = 'Completo'
    dispatch({ type: 'UPDATE_ITEM', itemType: 'appointments', item: selectedAppointment, modifyItem: newAppointment })
    try {
      completeAppointment(selectedAppointment.id)
    } catch {
      dispatch({ type: 'SET_ITEMS', itemType: 'appointments', itemList: prevAppointmentState })
    }
  }
  const setAppointments = (newAppointmentList) => {
    dispatch({ type: 'SET_ITEMS', itemType: 'appointments', itemList: newAppointmentList })
  }

  return (
    <AppointmentContext.Provider value={{ appointments: state.appointments, removeAppointment, releaseReservedAppointment, completeReservedAppointment, setAppointments, releaseAppointment, completedAppointments, reservedAppointments, avaibleAppointments }}>
      {children}
    </AppointmentContext.Provider>
  )
}
