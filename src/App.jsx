import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { AdminCrud } from './pages/AdminCrud'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ResetPassword } from './pages/ResetPassword'
import { SendPassword } from './pages/SendPassword'
import { AppointmentReserve } from './pages/AppointmentReserve'
import { ClientVehicles } from './pages/ClientVehicles'
import { ClientAppointments } from './pages/ClientAppointments'
export default function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CRUD' element={<AdminCrud />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/sendpassword' element={<SendPassword />} />
        <Route path='/misvehiculos' element={<ClientVehicles />} />
        <Route path='/misturnos' element={<ClientAppointments />} />
        <Route path='/turno/:service' element={<AppointmentReserve />} />
      </Routes>
    </>
  )
}
