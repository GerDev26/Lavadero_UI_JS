export function firstLetterMayus (text) {
  const modifyText = text
  const firstLetter = modifyText.slice(0, 1)
  return firstLetter.toUpperCase() + modifyText.slice(1)
}
