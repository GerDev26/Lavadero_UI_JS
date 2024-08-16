import { createContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import { CreateUser, DeleteUser } from '../services/userService'

const initialState = {
  users: []
}

export const UsersContext = createContext({
  users: initialState.users,
  addUser: async () => {},
  setUsers: () => {},
  deleteUser: async () => {},
  updateUser: () => {}
})

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  const addUser = async (newUser) => {
    dispatch({ type: 'ADD_ITEM', itemType: 'users', item: newUser })
    try {
      const modifyUser = await CreateUser(newUser)
      dispatch({ type: 'UPDATE_ITEM', itemType: 'users', item: newUser, modifyItem: modifyUser })
    } catch (error) {
      console.error('Error adding user:', error)
      dispatch({ type: 'DELETE_ITEM', itemType: 'users', item: newUser })
    }
  }

  const setUsers = (newUserList) => {
    dispatch({ type: 'SET_ITEMS', itemType: 'users', itemList: newUserList })
  }

  const deleteUser = async (selectedUser) => {
    const prevUserState = [...state.users]
    dispatch({ type: 'DELETE_ITEM', itemType: 'users', item: selectedUser })
    try {
      await DeleteUser(selectedUser.id)
    } catch (error) {
      console.error('Error deleting user:', error)
      dispatch({ type: 'SET_ITEMS', itemType: 'users', itemList: prevUserState })
    }
  }

  const updateUser = (selectedUser, modifyUser) => {
    dispatch({ type: 'UPDATE_ITEM', itemType: 'users', item: selectedUser, modifyItem: modifyUser })
  }

  return (
    <UsersContext.Provider value={{ users: state.users, addUser, setUsers, deleteUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  )
}
