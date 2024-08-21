import { createContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import { CreateVehicle, deleteVehicle } from '../services/vehicleServices'

const initialState = {
  vehicles: []
}

export const VehicleContext = createContext({
  vehicles: initialState.vehicles,
  addVehicle: async () => {},
  setVehicles: async () => {},
  removeVehicle: async () => {}
})

export const VehicleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  const addVehicle = async (newVehicle) => {
    dispatch({ type: 'ADD_ITEM', itemType: 'vehicles', item: newVehicle })
    try {
      const modifyVehicle = await CreateVehicle(newVehicle)
      dispatch({ type: 'UPDATE_ITEM', itemType: 'vehicles', item: newVehicle, modifyItem: modifyVehicle })
    } catch (error) {
      console.error('Error adding user:', error)
      alert(error)
      dispatch({ type: 'DELETE_ITEM', itemType: 'vehicles', item: newVehicle })
    }
  }

  const setVehicles = (newVehicleList) => {
    dispatch({ type: 'SET_ITEMS', itemType: 'vehicles', itemList: newVehicleList })
  }

  const removeVehicle = async (selectedVehicle) => {
    const prevVehicleState = [...state.vehicles]
    dispatch({ type: 'DELETE_ITEM', itemType: 'vehicles', item: selectedVehicle })
    try {
      await deleteVehicle(selectedVehicle.id)
    } catch (error) {
      console.error('Error deleting user:', error)
      dispatch({ type: 'SET_ITEMS', itemType: 'vehicles', itemList: prevVehicleState })
    }
  }

  /*   const updateUser = (selectedUser, modifyUser) => {
    dispatch({ type: 'UPDATE_ITEM', itemType: 'users', item: selectedUser, modifyItem: modifyUser })
  } */

  return (
    <VehicleContext.Provider value={{ vehicles: state.vehicles, addVehicle, setVehicles, removeVehicle }}>
      {children}
    </VehicleContext.Provider>
  )
}
