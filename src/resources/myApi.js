const API = {
  local: 'http://127.0.0.1:8000/api',
  production: 'https://lavaderoapi-production.up.railway.app/api'
}

export const API_URL = API.local

export const APPOINTMENTS_ENDPOINT = API_URL + '/appointments/'

export const USERS_ENDPOINT = API_URL + '/users/'

export const SERVICE_ENDPOINT = API_URL + '/services/'

export const TYPE_OF_VEHICLE_ENDPOINT = API_URL + '/typeOfVehicles/'

export const USER_VEHICLES = API_URL + '/vehicles/user/'

export const RESET_PASSWORD = API_URL + '/resetPassword/'
export const SEND_PASSWORD_TOKEN = API_URL + '/getPasswordToken/'
export const REGISTER = API_URL + '/register/'
export const LOGIN = API_URL + '/login/'
export const LOGOUT = API_URL + '/logout/'
