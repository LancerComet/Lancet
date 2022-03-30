import dayjs, { Dayjs } from 'dayjs'
import { computed, defineComponent, onBeforeUnmount, PropType, ref, toRef, Transition } from 'vue'
import { LancetColorScheme } from '../../config/color'
import { useRules } from '../../hooks/use-rules'
import { Rule } from '../../utils/validator'
import { LctCard } from '../lct-card'
import { LctInput } from '../lct-input'
import { LctMenu } from '../lct-menu'
import { LctTextfield } from '../lct-textfield'
import { LctDateRangeComponent } from './components/date-range-component'

import './index.styl'

const isoDateFormat = 'YYYY-MM-DDTHH:mm:ssZ'

/**
 * DateRange 是日期范围选择器.
 *
 * @example
 *   const dateRange = ['2020-01-01T00:00:00Z', '2021-01-02T00:00:00Z']
 *   <LctDateRange v-model={dateRange} />
 *
 *   const dateRange = ['2020-01-01', '2021-01-02']
 *   <LctDateRange v-model={dateRange} format='YYYY-MM-DD' />
 */
const LctDateRange = defineComponent({
  name: 'LctDateRange',

  props: {
    modelValue: {
      type: Array as PropType<Array<string | undefined>>,
      default: () => []
    },

    format: {
      type: String as PropType<string>,
      default: isoDateFormat
    },

    displayFormat: {
      type: String as PropType<string>,
      default: 'YYYY-MM-DD'
    },

    label: {
      type: String as PropType<string>
    },

    icon: {
      type: String as PropType<string>
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    },

    required: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    yearRange: {
      type: Array as PropType<number[]>,
      default: () => [1980, 2099]
    },

    fullScreen: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    allowSameDay: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    textfieldWidth: {
      type: [Number, String] as PropType<number | string>
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const isOpen = ref(false)

    const { errorMessage, validate, unregister } = useRules(
      toRef(props, 'modelValue'),
      props.rules
    )

    const startDate = computed<Dayjs | null>(() => {
      const rawDate = props.modelValue[0]
      if (!rawDate) {
        return null
      }
      const date = dayjs(rawDate)
      return date.isValid()
        ? date
        : null
    })

    const endDate = computed<Dayjs | null>(() => {
      const rawDate = props.modelValue[1]
      if (!rawDate) {
        return null
      }
      const date = dayjs(rawDate)
      return date.isValid()
        ? date
        : null
    })

    const _modelValue = computed<Array<Dayjs | null>>(() => {
      return [startDate.value, endDate.value]
    })

    const setExpansionStatus = (openStatus: boolean) => {
      isOpen.value = openStatus
    }

    const onDateSelected = (newDate: Dayjs[]) => {
      const newValue = [
        newDate[0].format(props.format),
        newDate[1].format(props.format)
      ]
      emit('update:modelValue', newValue)
      validate()
    }

    const displayDate = computed<string>(() => {
      const start = startDate.value?.format(props.displayFormat) ?? '--'
      const end = endDate.value?.format(props.displayFormat) ?? '--'
      return `${start} 至 ${end}`
    })

    const slots = {
      activator: () => (
        <LctTextfield
          class='calendar-textfield'
          modelValue={displayDate.value}
          readonly disabled={props.disabled}
          width={props.textfieldWidth}
        />
      ),
      default: () => (
        <LctCard class='calendar-card' elevated withMargin>
          <LctDateRangeComponent
            format={props.format}
            modelValue={_modelValue.value}
            onSelectDate={onDateSelected}
            yearRange={props.yearRange}
            onClose={() => setExpansionStatus(false)}
            allowSameDay={props.allowSameDay}
            color={props.color}
          />
        </LctCard>
      )
    }

    onBeforeUnmount(() => {
      unregister()
    })

    return () => (
      <LctInput
        label={props.label}
        icon={props.icon}
        required={props.required}
        value={props.modelValue}
        v-slots={{
          default: () => (
            <LctMenu
              class='lct-date-range'
              modelValue={isOpen.value}
              onUpdate:modelValue={setExpansionStatus}
              v-slots={slots}
              disabled={props.disabled}
              fullScreen={props.fullScreen}
            />
          ),
          message: () => (
            <Transition enterActiveClass='entry-animation' leaveActiveClass='leave-animation'>{
              errorMessage.value
                ? <div class='error-text'>{errorMessage.value}</div>
                : null
            }</Transition>
          )
        }}>
      </LctInput>
    )
  }
})

export {
  LctDateRange
}
