export function mapFields ({ formFields, newStructure }) {
  const mappedFields = Object.fromEntries(
    Object.entries(formFields)
      .map(([key, value]) => {
        const newKey = newStructure[key]
        if (newKey && value) {
          return [newKey, value]
        }
        return null
      })
      .filter(entry => entry !== null) // Filtra las entradas nulas
  )
  return mappedFields
}

export function getFormFields ({ formEvent }) {
  formEvent.preventDefault()
  return Object.fromEntries(
    new window.FormData(formEvent.currentTarget)
  )
}
export function getVehicleData ({ formEvent }) {
  const newStructure = {
    Domain: 'vehicleDomain',
    Type: 'vehicleType'
  }
  const formFields = getFormFields({ formEvent })
  const mappedVehicle = mapFields({ formFields, newStructure })
  return mappedVehicle
}
