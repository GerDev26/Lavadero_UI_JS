import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { UserTable } from '../components/CRUD/Table'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { UsersProvider } from '../context/UserContext'
import { useContext } from 'react'
import { ModalContext, ModalProvider } from '../context/ModalContext'

export function AdminCrud () {
  return (
    <ModalProvider>

      <UsersProvider>
        <Navbar />

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
  const { setCreateModal } = useContext(ModalContext)

  const handleOpenModal = () => {
    setCreateModal(true)
  }

  return (
    <button onClick={handleOpenModal} className='px-2 rounded-sm text-white rounded-s bg-gray-700 flex justify-center items-center h-12 gap-2'>
      <p>{text}</p>
      <PlusCircleIcon className='w-6' />
    </button>
  )
}
