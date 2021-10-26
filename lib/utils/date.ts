import dayjs, { Dayjs } from 'dayjs'

const getWeekLabel = (index: number): string => {
  return dayjs().set('day', index).format('dd')
}

const resetHour = (date: Dayjs) => {
  return date.set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
}

const isToday = (date: Dayjs) => {
  return date.isSame(new Date(), 'date')
}

export {
  getWeekLabel,
  resetHour,
  isToday
}
