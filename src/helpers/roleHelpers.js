export function getRoleIdByDesc (description) {
  console.log(description)
  switch (description) {
    case 'administrador':
      return 1
    case 'empleado':
      return 2
    case 'cliente':
      return 3

    default:
      throw new Error('Tipo de usuario no definido')
  }
}
export function getDescByRoleId (id) {
  switch (Number(id)) {
    case 1:
      return 'administrador'
    case 2:
      return 'empleado'
    case 3:
      return 'cliente'

    default:
      throw new Error('Tipo de usuario no definido')
  }
}
