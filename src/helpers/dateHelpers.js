export function sevenDays () {
  const now = new Date()
  const dates = []

  for (let index = 0; index < 7; index++) {
    const futureDate = new Date()
    futureDate.setDate(now.getDate() + index) // Añade los días al objeto Date actual

    const day = String(futureDate.getDate()).padStart(2, '0')
    const month = String(futureDate.getMonth() + 1).padStart(2, '0')
    const year = futureDate.getFullYear()

    dates[index] = {
      date: `${day}-${month}-${year}`,
      formattedDate: `${day}/${month}`,
      weekday: getWeekday(futureDate).toUpperCase()
    }
  }
  dates[0].weekday = 'HOY'
  dates[1].weekday = 'MAÑANA'
  return dates
}

export function getWeekday (date) {
  const options = { weekday: 'long' }
  const dayName = new Intl.DateTimeFormat('es-ES', options).format(date)
  return dayName
}

export function getActualDate () {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
