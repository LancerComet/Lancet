import dayjs, { Dayjs } from 'dayjs'
import { computed, ComputedRef, defineComponent, PropType, ref, toRef } from 'vue'

import { LancetColorConfig, LctColorScheme } from '../../../config/color'
import { useAppConfig } from '../../../providers/app-config-provider'
import { lighten } from '../../../utils/color'
import { getWeekLabel, isToday } from '../../../utils/date'
import { LctBtn } from '../../lct-btn'
import { LctIcon } from '../../lct-icon'
import { useCalendar } from '../hooks/use-calendar'
import { MonthSelectPanel } from './month-select-panel'

import './date-range-component.styl'

const daysOfWeek = 7

const LctDateRangeComponent = defineComponent({
  name: 'LctDateRangeComponent',

  props: {
    modelValue: {
      type: Array as PropType<(Dayjs | null)[]>
    },

    color: {
      type: String as PropType<LctColorScheme>,
      default: LctColorScheme.Primary
    },

    format: {
      type: String as PropType<string>,
      default: 'YYYY-MM-DDTHH:mm:ssZ'
    },

    yearRange: {
      type: Array as PropType<number[]>,
      default: () => [1980, 2099]
    },

    onClose: {
      type: Function as PropType<() => void>
    },

    allowSameDay: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: [
    'selectDate',
    'close'
  ],

  setup (props, { emit }) {
    const userInputDate = toRef(props, 'modelValue')
    const appConfig = useAppConfig()
    const colorValue = appConfig.value.colors as LancetColorConfig

    const startDate = ref<Dayjs | undefined>(props.modelValue?.[0]?.clone())
    const endDate = ref<Dayjs | undefined>(props.modelValue?.[1]?.clone())

    // 当前展示时间初始值使用起始时间.
    const currentDisplayDate = ref(startDate.value?.clone() ?? dayjs())
    const currentDisplayYear = computed(() => currentDisplayDate.value.get('year'))
    const currentDisplayMonth = computed(() => currentDisplayDate.value.get('month'))

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

    const clearSelection = () => {
      startDate.value = undefined
      endDate.value = undefined
    }

    const onDateBlockClick = (date: Dayjs) => {
      const shouldClearSelection = startDate.value && endDate.value
      if (shouldClearSelection) {
        clearSelection()
      }

      if (!startDate.value) {
        startDate.value = date.clone()
      } else if (!endDate.value) {
        endDate.value = date.clone()
      }

      // 如果选择颠倒, 则颠倒过来.
      if (
        startDate.value && endDate.value &&
        startDate.value.isAfter(endDate.value)
      ) {
        const _startDate = endDate.value.clone()
        const _endDate = startDate.value.clone()
        startDate.value = _startDate
        endDate.value = _endDate
      }

      if (
        startDate.value && endDate.value &&
        !props.allowSameDay &&
        startDate.value.isSame(endDate.value)
      ) {
        clearSelection()
        return
      }

      if (startDate.value && endDate.value) {
        emitValue()
      }
    }

    const emitValue = () => {
      emit('selectDate', [startDate.value, endDate.value])
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

    return () => (
      <div class={'calendar-main'}>
        <div class='calendar-body'>
          <div class={['calendar-header', `${props.color}-background`]}>
            <div class='start-date-display'>
              <div class='year-text'>{userInputDate.value?.[0]?.format('YYYY') ?? '0000'}</div>
              <div class='date-text'>{userInputDate.value?.[0]?.format('MM-DD') ?? '--'}</div>
            </div>
            <div style='margin: 0 8px'>至</div>
            <div class='end-date-display'>
              <div class='year-text'>{userInputDate.value?.[1]?.format('YYYY') ?? '0000'}</div>
              <div class='date-text'>{userInputDate.value?.[1]?.format('MM-DD') ?? '--'}</div>
            </div>
          </div>

          <div class='calendar-content'>
            <div>
              <div class='calendar-controls'>
                <LctBtn minWidth='0' onClick={() => switchMonth(-1)} transparent>
                  <LctIcon>keyboard_arrow_left</LctIcon>
                </LctBtn>

                <MonthSelectPanel
                  year={currentDisplayYear.value}
                  month={currentDisplayMonth.value}
                  onYearSwitched={onYearSwitched}
                  onMonthSelect={onMonthSelected}
                  yearRange={props.yearRange}
                />

                <LctBtn onClick={() => switchMonth(1)} transparent minWidth='0'>
                  <LctIcon>keyboard_arrow_right</LctIcon>
                </LctBtn>
              </div>

              <table class='date-table' cellspacing={0} cellpadding={0}>
                <thead class='list-header'>{
                  new Array(daysOfWeek).fill(null)
                    .map((_, index) => <td class='date-block'>{getWeekLabel(index)}</td>)
                }</thead>

                <tbody class='list-blocks'>{
                  dateList.value.map(row => (
                    <tr class='date-row'>{
                      row.map(date => {
                        const isStartDate = startDate.value?.isSame(date, 'date') ?? false
                        const isEndDate = endDate.value?.isSame(date, 'date') ?? false
                        const isInRange = startDate?.value?.isBefore(date, 'date') && endDate.value?.isAfter(date, 'date')
                        const rangeColor = lighten(colorValue[props.color] as string, 0.5)

                        return (
                          <td class='date-block'>
                            <LctBtn
                              class={[
                                'date-block-btn',
                                isStartDate || isEndDate ? `selected ${props.color}-background` : null,
                                isInRange ? 'in-range' : null,
                                date && isToday(date) ? `today ${props.color}-text` : null
                              ]}
                              style={{
                                backgroundColor: isInRange ? rangeColor : undefined
                              }}
                              minWidth='0'
                              color={props.color}
                              transparent
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
          </div>
        </div>
      </div>
    )
  }
})

export {
  LctDateRangeComponent
}
