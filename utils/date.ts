export function addDay(date: Date | string, days: number) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export function addYear(date: Date | string, years: number) {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}

export function getDateString(date: Date | string) {
  return new Date(date).toISOString().split('T')[0]
}
