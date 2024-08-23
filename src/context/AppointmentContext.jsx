import { createContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import { deleteAppointment } from '../services/appointmentServices'

const initialState = {
  appointments: []
}

export const AppointmentContext = createContext({
  appointments: initialState.appointments,
  removeAppointment: async () => {},
  setAppointments: () => {}
})

export const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

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

  const setAppointments = (newAppointmentList) => {
    dispatch({ type: 'SET_ITEMS', itemType: 'appointments', itemList: newAppointmentList })
  }

  return (
    <AppointmentContext.Provider value={{ appointments: state.appointments, removeAppointment, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  )
}
