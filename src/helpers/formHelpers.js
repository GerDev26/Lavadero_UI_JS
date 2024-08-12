export function mapFields ({ formFields, newStructure }) {
  const mappedFields = Object.fromEntries(
    Object.entries(formFields).map(([key, value]) => {
      return [newStructure[key], value]
    })
  )
  return mappedFields
}

export function getFormFields ({ formEvent }) {
  formEvent.preventDefault()
  return Object.fromEntries(
    new window.FormData(formEvent.currentTarget)
  )
}
