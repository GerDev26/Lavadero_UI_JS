export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.userList ?? [] }
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(user => user.id !== action.user?.id) }
    case 'ADD_USER':
      return { ...state, users: [action.user, ...state.users] }
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.user?.id ? { ...user, ...action.modifyUser } : user
        )
      }
    default:
      return state
  }
}
