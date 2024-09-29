export function firstLetterMayus (text) {
  const firstLetter = text.slice(0, 1)
  return firstLetter.toUpperCase() + text.slice(1)
}
