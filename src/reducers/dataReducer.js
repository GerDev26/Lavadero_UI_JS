export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, [action.itemType]: action.itemList ?? [] }
    case 'DELETE_ITEM':
      return {
        ...state,
        [action.itemType]: state[action.itemType].filter(item => item.id !== action.item?.id)
      }
    case 'ADD_ITEM':
      return {
        ...state,
        [action.itemType]: [action.item, ...state[action.itemType]]
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        [action.itemType]: state[action.itemType].map(item =>
          item.id === action.item?.id ? { ...item, ...action.modifyItem } : item
        )
      }
    default:
      return state
  }
}
