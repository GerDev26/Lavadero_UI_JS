import { createContext, useEffect, useState } from 'react'

export const InputContext = createContext({
  fields: {},
  fieldValidationStatus: {},
  clearFields: () => {}
})

export const InputContextProvider = ({ children }) => {
  const [fields, setFields] = useState({})
  const [fieldValidationStatus, setFieldValidationStatus] = useState({})
  const [invalidForm, setInvalidForm] = useState(false)

  useEffect(() => {
    console.log(fieldValidationStatus)
    const okValues = Object.values(fieldValidationStatus)
    setInvalidForm(() => {
      if (okValues.length === 0) { // Si el array esta vacio devuelvo true
        return true
      }
      return okValues.some((value) => value === false) // Si encuentro en el array un false, devuelve true
    })
  }, [fieldValidationStatus])

  const clearFields = (defaultValue = '') => {
    setFields(prevFields => {
      const emptyFields = Object.keys(prevFields).reduce((acc, key) => {
        acc[key] = defaultValue
        return acc
      }, {})

      return emptyFields
    })

    // Actualizar el estado de validación
    setFieldValidationStatus({})
  }

  const validateField = (field, booleanValue) => {
    setFieldValidationStatus((prevValidations) => ({
      ...prevValidations,
      [field]: booleanValue
    }))
  }
  const addField = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value
    }))
  }

  return (
    <InputContext.Provider value={{ fields, addField, fieldValidationStatus, validateField, invalidForm, setInvalidForm, clearFields }}>
      {children}
    </InputContext.Provider>
  )
}
