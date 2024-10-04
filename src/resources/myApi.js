const API = {
  local: 'http://192.168.100.143:8000/api',
  production: 'https://lavaderoapi-production.up.railway.app/api'
}

export const API_URL = API.local

export const APPOINTMENTS_ENDPOINT = API_URL + '/appointments/'
export const APPOINTMENTS_WEEK = API_URL + '/appointmentsWeek'
export const APPOINTMENTS_DATES = API_URL + '/dates/'
export const APPOINTMENTS_RESERVE = API_URL + '/appointments/reserve'
export const APPOINTMENTS_RELEASE = API_URL + '/appointments/release/'
export const APPOINTMENTS_COMPLETE = API_URL + '/appointments/complete/'

export const USERS_ENDPOINT = API_URL + '/users/'
export const USER_VEHICLES = API_URL + '/users/vehicles/'
export const USER_NEW_VEHICLE = API_URL + '/users/newVehicle/'
export const USER_ROLE = API_URL + '/users/role'
export const USER_APPOINTMENTS = USERS_ENDPOINT + 'appointments'

export const PRICES_ENDPOINT = API_URL + '/prices/'

export const SERVICE_ENDPOINT = API_URL + '/services/'

export const TYPE_OF_VEHICLE_ENDPOINT = API_URL + '/typeOfVehicles/'
export const VEHICLE_ENDPOINT = API_URL + '/vehicles/'

export const RESET_PASSWORD = API_URL + '/resetPassword/'
export const SEND_PASSWORD_TOKEN = API_URL + '/getPasswordToken/'
export const REGISTER = API_URL + '/register/'
export const LOGIN = API_URL + '/login/'
export const LOGOUT = API_URL + '/logout/'
