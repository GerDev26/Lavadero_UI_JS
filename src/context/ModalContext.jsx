import { createContext, useState } from 'react'

export const ModalContext = createContext({
  createModal: false,
  setCreateModal: () => {},
  updateModal: false,
  setUpdateModal: () => {},
  updateValues: {},
  setUpdateValues: () => {}
})

export function ModalProvider ({ children }) {
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [updateValues, setUpdateValues] = useState({})

  return (
    <ModalContext.Provider value={{ createModal, setCreateModal, updateModal, setUpdateModal, updateValues, setUpdateValues }}>
      {children}
    </ModalContext.Provider>
  )
}
