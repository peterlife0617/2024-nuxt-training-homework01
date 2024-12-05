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

// 取得日期字串 yyyy-mm-dd
export function getDateString(date: Date | string) {
  return new Date(date).toISOString().split('T')[0]
}

// 計算天數
export function countDateDiffs({ start, end }: { start: string, end: string }) {
  const startDate = new Date(start).getTime()
  const endDate = new Date(end).getTime()
  return Number.parseInt(`${Math.abs(startDate - endDate) / 1000 / 60 / 60 / 24}`)
}
