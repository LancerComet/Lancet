import dayjs, { Dayjs } from 'dayjs'
import { computed, defineComponent, onBeforeUnmount, PropType, ref, toRef, Transition } from 'vue'

import { useRules } from '../../hooks/use-rules'
import { resetHour } from '../../utils/date'
import { Rule } from '../../utils/validator'
import { LctCard } from '../lct-card/lct-card'
import { LctInput } from '../lct-input'
import { LctMenu } from '../lct-menu'
import { LctTextfield } from '../lct-textfield'
import { CalendarBody } from './components/calendar-body'

import './index.styl'

const isoDateFormat = 'YYYY-MM-DDTHH:mm:ssZ'

const LctDatepicker = defineComponent({
  props: {
    format: {
      type: String as PropType<string>,
      default: isoDateFormat
    },

    modelValue: {
      type: String as PropType<string>,
      default: resetHour(dayjs()).format(isoDateFormat)
    },

    displayFormat: {
      type: String as PropType<string>,
      default: 'YYYY-MM-DD HH:mm:ss'
    },

    label: {
      type: String as PropType<string>
    },

    icon: {
      type: String as PropType<string>
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
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const isOpen = ref(false)

    const { errorMessage, validate, unregister } = useRules(
      toRef(props, 'modelValue'),
      props.rules
    )

    const userInputDate = computed<Dayjs | null>(() => {
      const date = dayjs(props.modelValue)
      return date.isValid()
        ? date
        : null
    })

    const setExpansionStatus = (openStatus: boolean) => {
      isOpen.value = openStatus
    }

    const onDateSelected = (newDate: string) => {
      emit('update:modelValue', newDate)
      validate()
    }

    const displayDate = computed(() => {
      const date = dayjs(props.modelValue)
      return date.isValid()
        ? date.format(props.displayFormat)
        : '--'
    })

    const slots = {
      activator: () => (
        <LctTextfield
          class='calendar-textfield'
          modelValue={displayDate.value}
          readonly disabled={props.disabled}
        />
      ),
      default: () => (
        <LctCard class='calendar-card' elevated withMargin>
          <CalendarBody
            format={props.format}
            modelValue={userInputDate.value}
            onSelectDate={onDateSelected}
            yearRange={props.yearRange}
            onClose={() => setExpansionStatus(false)}
            displayFormat={props.displayFormat}
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
              class='lct-datepicker'
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
  LctDatepicker
}
