import { createContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'
import { updatePrice } from '../services/priceService'

const initialState = {
  prices: []
}

export const PricesContext = createContext({
  prices: initialState.prices,
  addPrice: async () => {},
  setPrices: () => {},
  deletePrice: async () => {},
  UpdatePrice: async () => {}
})

export const PricesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  const setPrices = (newPriceList) => {
    dispatch({ type: 'SET_ITEMS', itemType: 'prices', itemList: newPriceList })
  }

  const UpdatePrice = async (selectedPrice, modifyPrice) => {
    dispatch({ type: 'UPDATE_ITEM', itemType: 'prices', item: selectedPrice, modifyItem: modifyPrice })

    const prevPricesState = [...state.prices]
    console.log(selectedPrice)
    console.log(modifyPrice)
    try {
      const newPrice = await updatePrice(selectedPrice.id, modifyPrice)
      dispatch({ type: 'UPDATE_ITEM', itemType: 'prices', item: selectedPrice, modifyItem: newPrice })
    } catch (error) {
      console.error('Error updating price:', error)
      dispatch({ type: 'SET_ITEMS', itemType: 'prices', itemList: prevPricesState })
    }
  }

  return (
    <PricesContext.Provider
      value={{
        prices: state.prices,
        setPrices,
        UpdatePrice
      }}
    >
      {children}
    </PricesContext.Provider>
  )
}
