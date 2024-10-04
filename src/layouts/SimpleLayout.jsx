import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export function SimpleLayout () {
  return (
    <>
      <Navbar />
      <main className='min-h-[80vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
