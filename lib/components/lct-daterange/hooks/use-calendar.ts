import dayjs, { Dayjs } from 'dayjs'
import { computed } from 'vue'

import { resetHour } from '../../../utils/date'

const useCalendar = (
  year: number,
  month: number
) => {
  const daysInMonth = computed<Dayjs[]>(() => {
    const result: Dayjs[] = []
    const date = dayjs()
      .set('year', year)
      .set('month', month)
    const dayCount = date.daysInMonth()

    for (let i = 0; i < dayCount; i++) {
      const dayDate = resetHour(
        dayjs()
          .set('year', year)
          .set('month', month)
          .set('date', i + 1)
      )
      result.push(dayDate)
    }

    return result
  })

  return {
    daysInMonth
  }
}

export {
  useCalendar
}
