import { createContext, useReducer } from 'react'
import { userReducer } from '../reducers/UserReducer'
import { CreateUser, DeleteUser } from '../services/userService'

const initialState = [{}]

export const UsersContext = createContext({
  users: initialState.users,
  addUser: async () => {},
  setUsers: () => {},
  deleteUser: async () => {},
  updateUser: () => {}
})

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const addUser = async (newUser) => {
    dispatch({ type: 'ADD_USER', user: newUser })
    try {
      const modifyUser = await CreateUser(newUser)
      dispatch({ type: 'UPDATE_USER', user: newUser, modifyUser })
    } catch (error) {
      console.error('Error adding user:', error)
      dispatch({ type: 'DELETE_USER', user: newUser })
    }
  }

  const setUsers = (newUserlist) => {
    dispatch({ type: 'SET_USERS', userList: newUserlist })
  }

  const deleteUser = async (selectedUser) => {
    const prevUserState = [...state.users]
    dispatch({ type: 'DELETE_USER', user: selectedUser })
    try {
      await DeleteUser(selectedUser.id)
    } catch (error) {
      console.error('Error deleting user:', error)
      dispatch({ type: 'SET_USERS', userList: prevUserState })
    }
  }

  const updateUser = (selectedUser, modifyUser) => {
    dispatch({ type: 'UPDATE_USER', user: selectedUser, modifyUser })
  }

  return (
    <UsersContext.Provider value={{ users: state.users, addUser, setUsers, deleteUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  )
}
