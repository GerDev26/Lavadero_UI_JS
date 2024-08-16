export function sevenDays () {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = now.getDate()

  const dates = []

  for (let index = 0; index < 7; index++) {
    const newDay = String(day + index).padStart(2, '0')

    dates[index] = {
      date: `${newDay}-${month}-${year}`,
      formattedDate: `${newDay}/${month}`,
      weekday: getWeekday(day + index).toUpperCase()
    }
  }
  dates[0].weekday = 'HOY'
  dates[1].weekday = 'MAÑANA'
  return dates
}

export function getWeekday (day) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const date = new Date(year, month, day)
  const options = { weekday: 'long' }
  const dayName = new Intl.DateTimeFormat('es-ES', options).format(date)
  return dayName
}

export function getActualDate () {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${day}-${month}-${year}`
}
