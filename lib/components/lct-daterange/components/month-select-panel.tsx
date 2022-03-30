import dayjs from 'dayjs'
import { defineComponent, PropType } from 'vue'

import { LctSelect, LctSelectItem } from '../../lct-select'

import './month-select-panel.styl'

const MonthSelectPanel = defineComponent({
  props: {
    year: {
      type: Number as PropType<number>,
      default: new Date().getFullYear()
    },

    month: {
      type: Number as PropType<number>,
      default: new Date().getMonth()
    },

    yearRange: {
      type: Array as PropType<number[]>,
      default: () => [1980, 2099]
    }
  },

  emits: ['yearSwitched', 'monthSelect'],

  setup (props, { emit }) {
    const updateYear = (value: number) => {
      emit('yearSwitched', value)
    }

    const selectMonth = (month: number) => {
      emit('monthSelect', month)
    }

    const onYearInput = (yearValue: number) => {
      const isValid = dayjs().set('year', yearValue).isValid()
      isValid && updateYear(yearValue)
    }

    const onMonthInput = (monthValue: number) => {
      const isValid = dayjs().set('month', monthValue).isValid()
      isValid && selectMonth(monthValue)
    }

    const yearRange = props.yearRange ?? []
    const yearOptions = createYearOptions(yearRange[0], yearRange[1])
    const monthOptions = createMonthOptions()

    return () => (
      <div class='month-select-panel'>
        <div class='control-section'>
          <LctSelect
            items={yearOptions}
            modelValue={props.year}
            onUpdate:modelValue={onYearInput}
            width={72}
          />
          <LctSelect
            items={monthOptions}
            modelValue={props.month}
            onUpdate:modelValue={onMonthInput}
            width={72}
          />
        </div>
      </div>
    )
  }
})

export {
  MonthSelectPanel
}

function createYearOptions (startYear: number, endYear: number): LctSelectItem[] {
  return new Array((endYear + 1) - startYear)
    .fill(null)
    .map((item, index) => {
      const year = startYear + index
      return {
        text: year.toString(),
        value: year
      }
    })
}

function createMonthOptions (): LctSelectItem[] {
  const startMonth = 0
  const endMonth = 11
  return new Array((endMonth + 1) - startMonth)
    .fill(null)
    .map((item, index) => {
      const month = startMonth + index
      return {
        text: (month + 1).toString(),
        value: month
      }
    })
}
