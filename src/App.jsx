import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { AdminCrud } from './pages/AdminCrud'
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
          <Route path='/misvehiculos' element={<ClientVehicles />} />
          <Route path='/misturnos' element={<ClientAppointments />} />
          <Route path='/turno/:service' element={<AppointmentReserve />} />
          <Route path='/precios' element={<EmployPrices />} />
        </Route>

        <Route element={<SimpleLayout />}>
          <Route path='/CRUD' element={<AdminCrud />} />
          <Route path='/turnos' element={<EmployAppointments />} />
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
