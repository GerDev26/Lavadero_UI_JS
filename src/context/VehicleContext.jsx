import { createContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import { CreateVehicle, deleteVehicle, updateVehicle } from '../services/vehicleServices'
import { mapFields } from '../helpers/formHelpers'

const initialState = {
  vehicles: []
}

export const VehicleContext = createContext({
  vehicles: initialState.vehicles,
  addVehicle: async () => {},
  setVehicles: async () => {},
  removeVehicle: async () => {},
  modVehicle: async () => {}
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

  const modVehicle = async (selectedVehicle, modifyVehicle) => {
    const prevVehicleState = [...state.vehicles]
    try {
      const newVehicle = await updateVehicle(selectedVehicle.id, modifyVehicle)
      const newStructure = {
        id: 'id',
        domain: 'vehicleDomain',
        type_id: 'vehicleType'
      }
      const mappedVehicle = mapFields({ formFields: selectedVehicle, newStructure })
      dispatch({ type: 'UPDATE_ITEM', itemType: 'vehicles', item: mappedVehicle, modifyItem: newVehicle })
    } catch (error) {
      console.error('Error updating vehicle:', error)
      dispatch({ type: 'SET_ITEMS', itemType: 'vehicles', itemList: prevVehicleState })
    }
  }

  return (
    <VehicleContext.Provider value={{ vehicles: state.vehicles, addVehicle, setVehicles, removeVehicle, modVehicle }}>
      {children}
    </VehicleContext.Provider>
  )
}
