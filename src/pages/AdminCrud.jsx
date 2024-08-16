import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { UserTable } from '../components/CRUD/Table'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { UsersProvider } from '../context/UserContext'
import { useContext } from 'react'
import { UserModal } from '../components/CRUD/Modal'
import { ModalContext, ModalProvider } from '../context/ModalContext'

export function AdminCrud () {
  return (
    <ModalProvider>

      <UsersProvider>
        <Navbar />
        <UserModal />

        <div className='m-auto w-fit'>
          <OpenModalBtn text='Añadir Usuario' />
          <UserTable />
        </div>
        <Footer />
      </UsersProvider>
    </ModalProvider>
  )
}

export function OpenModalBtn ({ text }) {
  const { setModal } = useContext(ModalContext)

  const handleOpenModal = () => {
    setModal(true)
  }

  return (
    <button onClick={handleOpenModal} className='p-2 text-white rounded-s bg-green-700 flex gap-2'>
      <p>{text}</p>
      <PlusCircleIcon className='w-6' />
    </button>
  )
}
