import dayjs, { Dayjs } from 'dayjs'
import { computed, ComputedRef, defineComponent, PropType, ref, toRef } from 'vue'

import { LancetColorScheme } from '../../../config/color'
import { getWeekLabel, isToday } from '../../../utils/date'
import { LctBtn } from '../../lct-btn'
import { LctIcon } from '../../lct-icon'
import { LctTextfield } from '../../lct-textfield'
import { useCalendar } from '../hooks/use-calendar'

import './calendar-body.styl'
import { MonthSelectPanel } from './month-select-panel'

const daysOfWeek = 7

const CalendarBody = defineComponent({
  name: 'LctCalendarBody',

  props: {
    modelValue: {
      type: Object as PropType<Dayjs | null>
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    },

    format: {
      type: String as PropType<string>,
      default: 'YYYY-MM-DDTHH:mm:ssZ'
    },

    displayFormat: {
      type: String as PropType<string>,
      default: 'YYYY-MM-DD HH:mm:ss'
    },

    yearRange: {
      type: Array as PropType<number[]>,
      default: () => [1980, 2099]
    },

    onClose: {
      type: Function as PropType<() => void>
    }
  },

  emits: [
    'selectDate', 'close'
  ],

  setup (props, { emit }) {
    const userInputDate = toRef(props, 'modelValue')
    const currentDisplayDate = ref(dayjs(userInputDate.value ?? new Date()))
    const currentDisplayYear = computed(() => currentDisplayDate.value.get('year'))
    const currentDisplayMonth = computed(() => currentDisplayDate.value.get('month'))

    const hour = computed(() => userInputDate.value?.get('hour') ?? 0)
    const minute = computed(() => userInputDate.value?.get('minute') ?? 0)

    const dateList: ComputedRef<((Dayjs | null)[])[]> = computed(() => {
      const { daysInMonth } = useCalendar(currentDisplayYear.value, currentDisplayMonth.value)
      const dayCount = daysInMonth.value.length
      const result: ((Dayjs | null)[])[] = []
      const offset = daysInMonth.value[0].get('day')
      for (let i = 0; i < dayCount; i++) {
        const columnIndex = Math.floor((i + offset) / daysOfWeek)
        if (!result[columnIndex]) {
          result[columnIndex] = new Array(daysOfWeek).fill(null)
        }
        const dayBlock = daysInMonth.value[i]
        const week = dayBlock.get('day')
        result[columnIndex][week] = dayBlock
      }
      return result
    })

    const switchMonth = (monthOffset: number) => {
      currentDisplayDate.value = currentDisplayDate.value
        .add(monthOffset, 'month')
    }

    const emitDate = (date: Dayjs) => {
      if (!date || !date.isValid()) {
        return
      }

      const value = date.format(props.format)
      emit('selectDate', value)
    }

    const onDateBlockClick = (date: Dayjs) => {
      const payload = userInputDate.value
        ?.set('year', date.get('year'))
        .set('month', date.get('month'))
        .set('date', date.get('date'))
      payload && emitDate(payload)
    }

    // MonthSelectPanel.
    // =========================
    const onYearSwitched = (year: number) => {
      currentDisplayDate.value = currentDisplayDate.value
        .set('year', year)
    }

    const onMonthSelected = (month: number) => {
      currentDisplayDate.value = currentDisplayDate.value
        .set('month', month)
    }

    const onTimeChanged = (unit: 'hour' | 'minute', value: string) => {
      const payload = parseInt(value, 10)
      if (isNaN(payload)) {
        return
      }
      const newDate = userInputDate.value?.set(unit, payload)
      newDate && emitDate(newDate)
    }

    const timeTextFormat = computed(() => {
      return props.displayFormat.match(/HH.+/)?.[0] ?? 'HH:mm:ss'
    })

    return () => (
      <div class={['calendar-main']}>
        <div class='calendar-body'>
          <div class={['calendar-header', `${props.color}-background`]}>
            <div>
              <div class='year-text'>{userInputDate.value?.format('YYYY') ?? '0000'}</div>
              <div class='date-text'>{userInputDate.value?.format('MM-DD') ?? '--'}</div>
            </div>
            <div class='time-text'>{userInputDate.value?.format(timeTextFormat.value) ?? '--:--:--'}</div>
          </div>

          <div class='calendar-content'>
            <div>
              <div class='calendar-controls'>
                <LctBtn minWidth='0' onClick={() => switchMonth(-1)} text>
                  <LctIcon>keyboard_arrow_left</LctIcon>
                </LctBtn>

                <MonthSelectPanel
                  year={currentDisplayYear.value}
                  month={currentDisplayMonth.value}
                  onYearSwitched={onYearSwitched}
                  onMonthSelect={onMonthSelected}
                  yearRange={props.yearRange}
                />

                <LctBtn onClick={() => switchMonth(1)} text minWidth='0'>
                  <LctIcon>keyboard_arrow_right</LctIcon>
                </LctBtn>
              </div>

              <table class='date-table'>
                <thead class='list-header'>{
                  new Array(daysOfWeek).fill(null)
                    .map((_, index) => <td class='date-block'>{getWeekLabel(index)}</td>)
                }</thead>

                <tbody class='list-blocks'>{
                  dateList.value.map(row => (
                    <tr class='date-row'>{
                      row.map(date => {
                        const isSelected = date?.isSame(userInputDate.value, 'date')
                        return (
                          <td>
                            <LctBtn
                              class={[
                                'date-block',
                                isSelected ? 'selected' : null,
                                date && isToday(date) ? `today ${props.color}-text` : null
                              ]}
                              minWidth='0' color={props.color} text={!isSelected}
                              disabled={!date}
                              onClick={() => onDateBlockClick(date as Dayjs)}
                            >{date?.format('DD') ?? null}</LctBtn>
                          </td>
                        )
                      })
                    }</tr>
                  ))
                }</tbody>
              </table>
            </div>

            <div class='right-part'>
              <div class='time-input-container'>
                <LctTextfield
                  label='小时'
                  modelValue={hour.value}
                  onUpdate:modelValue={v => onTimeChanged('hour', v)}
                  style='margin-bottom: 20px'
                  maxlength={2}
                />
                <LctTextfield
                  label='分钟'
                  modelValue={minute.value}
                  onUpdate:modelValue={v => onTimeChanged('minute', v)}
                  maxlength={2}
                />
              </div>

              <div style='text-align: right'>
                <LctBtn outlined onClick={() => emit('close')}>关闭</LctBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export {
  CalendarBody
}
