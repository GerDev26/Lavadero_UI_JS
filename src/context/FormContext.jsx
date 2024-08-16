import { createContext, useState } from 'react'

export const FormContext = createContext({
  values: [],
  setModal: () => {}
})

export function FormProvider ({ children }) {
  const [values, setValues] = useState({})
  const setValue = ({ key, value }) => {
    const newState = { ...values }
    newState[key] = value
    setValues(newState)
  }
  return (
    <FormContext.Provider value={{ values, setValue }}>
      {children}
    </FormContext.Provider>
  )
}
