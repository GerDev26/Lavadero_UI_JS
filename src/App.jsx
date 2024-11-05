import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ResetPassword } from './pages/ResetPassword'
import { SendPassword } from './pages/SendPassword'
import { AppointmentReserve } from './pages/AppointmentReserve'
import { ClientVehicles } from './pages/ClientVehicles'
import { ClientAppointments } from './pages/ClientAppointments'
import { useEffect } from 'react'
import { EmployAppointments } from './pages/EmployAppointments'
import { EmployPrices } from './pages/EmployPrices'
import { SimpleLayout } from './layouts/SimpleLayout'
import { InputContextProvider } from './context/InputContext'
import { AdminUsers } from './pages/AdminUsers'
import { AdminPrices } from './pages/AdminPrices'
import { AdminAppointments } from './pages/AdminAppointments'
import { Prices } from './pages/Prices'
import { Appointments } from './pages/Appointments'
import { Users } from './pages/Users'

export default function App () {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/sendpassword' element={<SendPassword />} />

        <Route element={<SimpleLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/vehiculos' element={<ClientVehicles />} />
          <Route
            path='/reservar/:service' element={
              <InputContextProvider>
                <AppointmentReserve />
              </InputContextProvider>
            }
          />
          <Route path='/precios' element={<Prices />} />
          <Route path='/turnos' element={<Appointments />} />
          <Route path='/usuarios' element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

function ScrollToTop () {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null // No renderiza nada en el DOM
}
