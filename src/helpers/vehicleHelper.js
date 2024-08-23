export function getTypeIdByDescription (description) {
  switch (description) {
    case 'auto':
      return 1
    case 'moto':
      return 2
    case 'camioneta':
      return 3

    default:
      throw new Error('Tipo de vehiculo no definido')
  }
}
export function getTypeDescriptionById (id) {
  switch (Number(id)) {
    case 1:
      return 'auto'
    case 2:
      return 'moto'
    case 3:
      return 'camioneta'

    default:
      throw new Error('Tipo de vehiculo no definido')
  }
}
