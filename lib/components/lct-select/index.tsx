import {
  computed,
  defineComponent,
  onBeforeUnmount,
  PropType,
  ref,
  toRef,
  toRefs,
  Teleport,
  Transition,
  nextTick
} from 'vue'

import { LancetColorScheme } from '../../config/color'
import { Ripple } from '../../directives/ripple'
import { useRules } from '../../hooks/use-rules'
import { useOutsider } from '../../providers/outside-slot-provider'
import { isEqual } from '../../utils/equal'
import { preventKeys, stopPropagation } from '../../utils/event'
import { isArrowDown, isArrowUp, isEscKey, isKeyEnterOrSpace } from '../../utils/inputs'
import { isArray, isNumber } from '../../utils/type'
import { Rule } from '../../utils/validator'
import { RequiredInput } from '../_required-input'
import { LctChip } from '../lct-chip'
import { LctIcon } from '../lct-icon'
import { LctInput } from '../lct-input'

import './index.styl'

const ComponentName = 'LctSelect'

type LctSelectItemValue = unknown
type LctSelectItem = {
  text: string
  value: LctSelectItemValue
}

const LctSelect = defineComponent({
  name: ComponentName,

  directives: {
    ripple: Ripple
  },

  props: {
    width: {
      type: [String, Number] as PropType<string | number>
    },

    label: {
      type: String as PropType<string>,
      default: ''
    },

    icon: {
      type: String as PropType<string>
    },

    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    items: {
      type: Array as PropType<LctSelectItem[]>,
      default: () => []
    },

    modelValue: {
      type: [Array, Object, String, Number, Boolean, BigInt] as PropType<LctSelectItemValue>
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    color: {
      type: String as PropType<LancetColorScheme>,
      default: LancetColorScheme.Primary
    },

    required: {
      type: Boolean as PropType<boolean>
    },

    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit, slots: contentSlots }) {
    const { items, multiple, width, disabled, modelValue } = toRefs(props)
    const isExpanded = ref(false)
    const firstOptionElement = ref<HTMLElement>()
    const { errorMessage, validate, unregister } = useRules(
      toRef(props, 'modelValue'),
      props.rules
    )
    const componentRef = ref<HTMLElement>()
    const listItemContainer = ref<HTMLElement>()

    const checkIsMultiple = (): boolean => {
      return multiple.value === true && isArray(modelValue.value)
    }

    const checkIsDisabled = (): boolean => {
      return disabled.value === true
    }

    // 获取 modelValue 的 Text, 仅在 multiple 模式下生效.
    const modelValueText = computed(() => {
      if (!checkIsMultiple()) {
        for (const { text, value } of items.value) {
          if (isEqual(value, modelValue.value)) {
            return text
          }
        }
      }
      return '--'
    })

    const getItemText = (value: unknown): string => {
      for (const item of items.value) {
        if (isEqual(item.value, value)) {
          return item.text
        }
      }
      return '--'
    }

    const checkIsSelected = (value: LctSelectItemValue): boolean => {
      return checkIsMultiple()
        ? (modelValue.value as unknown[]).indexOf(value) > -1
        : isEqual(modelValue.value, value)
    }

    const emitValue = (newValue: LctSelectItemValue) => {
      const eventName = 'update:modelValue'
      emit(eventName, newValue)
    }

    const addOrRemoveValue = (itemValue: LctSelectItemValue) => {
      if (!checkIsMultiple()) {
        emitValue(itemValue)
        return
      }

      const newValue = [...modelValue.value as unknown[]]
      const index = newValue.indexOf(itemValue)
      if (index < 0) {
        newValue.push(itemValue)
      } else {
        newValue.splice(index, 1)
      }
      emitValue(newValue)
    }

    const toggleExpansion = () => {
      if (!checkIsDisabled()) {
        isExpanded.value === true
          ? closeExpansion()
          : openExpansion()
      }
    }

    const openExpansion = () => {
      isExpanded.value = true
      updateListItemStyle()
      nextTick(() => {
        scrollToSelectedOption()
      })
    }

    const closeExpansion = () => {
      isExpanded.value = false
    }

    const onBlur = () => {
      validate()
    }

    const widgetStyle = computed(() => {
      const widthValue = width.value
      return {
        width: isNumber(widthValue)
          ? widthValue + 'px'
          : widthValue
      }
    })

    const onChipClose = (value: LctSelectItemValue) => {
      if (checkIsMultiple()) {
        const newValue = [...modelValue.value as unknown[]]
        const index = newValue.indexOf(value)
        if (index > -1) {
          newValue.splice(index, 1)
        }
        return emitValue(newValue)
      }

      emitValue(undefined)
    }

    const createSelectionContent = () => {
      if (checkIsMultiple()) {
        return (modelValue.value as unknown[])
          .map(item => <LctChip close onClickClose={() => onChipClose(item)} style='margin-right: 5px'>{getItemText(item)}</LctChip>)
      }

      return <span class='single-selection-text'>{modelValueText.value}</span>
    }

    window.addEventListener('click', closeExpansion)
    onBeforeUnmount(() => {
      window.removeEventListener('click', closeExpansion)
      unregister()
    })

    const focusFirstOption = () => {
      firstOptionElement.value?.focus()
    }

    const selectPrevOption = () => {
      const newIndex = items.value.findIndex(item => isEqual(item.value, modelValue.value)) - 1
      if (newIndex >= 0) {
        const newValue = items.value[newIndex].value
        emitValue(newValue)
      }
    }

    const selectNextOption = () => {
      const newIndex = items.value.findIndex(item => isEqual(item.value, modelValue.value)) + 1
      if (newIndex <= items.value.length - 1) {
        const newValue = items.value[newIndex].value
        emitValue(newValue)
      }
    }

    const onComponentKeyup = (event: KeyboardEvent) => {
      const key = event.key
      if (isKeyEnterOrSpace(key)) {
        toggleExpansion()
        setTimeout(focusFirstOption, 10)
        return
      }

      if (!checkIsMultiple()) {
        if (isArrowUp(key)) {
          selectPrevOption()
        } else if (isArrowDown(key)) {
          selectNextOption()
        }
      }
    }

    const selectOption = (value: LctSelectItemValue): void => {
      if (checkIsDisabled()) {
        return
      }
      addOrRemoveValue(value)
      !checkIsMultiple() && closeExpansion()
    }

    const onItemKeyup = (value: LctSelectItemValue, event: KeyboardEvent) => {
      const key = event.key
      const optionElement = event.target as HTMLElement
      if (isKeyEnterOrSpace(key)) {
        selectOption(value)
      } else if (isEscKey(key)) {
        closeExpansion()
      } else if (isArrowUp(key)) {
        const prev = optionElement.previousElementSibling as HTMLElement
        prev?.focus()
      } else if (isArrowDown(key)) {
        const next = optionElement.nextElementSibling as HTMLElement
        next?.focus()
      }
    }

    const listItemStyle = ref({
      width: '0',
      top: '0',
      left: '0'
    })

    const updateListItemStyle = () => {
      const element = componentRef.value
      const rect = element?.getBoundingClientRect()
      if (rect) {
        listItemStyle.value.width = rect.width + 'px'
        listItemStyle.value.top = rect.top + rect.height + 'px'
        listItemStyle.value.left = rect.left + 'px'
      }
    }

    const onOptionClick = (value: LctSelectItemValue, event: Event) => {
      event.stopPropagation()
      selectOption(value)
    }

    const scrollToSelectedOption = () => {
      const selectedOptionIndex = items.value.findIndex(item => item.value === modelValue.value)
      if (selectedOptionIndex > -1) {
        const scrollHeight = (firstOptionElement.value?.offsetHeight ?? 0) * selectedOptionIndex
        listItemContainer.value?.scrollTo(0, scrollHeight)
      }
    }

    const option = (item: LctSelectItem, index: number) => (
      <div
        v-ripple
        ref={index === 0 ? firstOptionElement : undefined}
        role='option' tabindex='0'
        class={[
          'list-item',
          checkIsSelected(item.value) ? `item-selected ${props.color}-text` : null
        ]}
        onClick={onOptionClick.bind(null, item.value)}
        onFocus={stopPropagation}
        onKeydown={preventKeys(' ', 'Enter', 'ArrowUp', 'ArrowDown')}
        onKeyup={onItemKeyup.bind(null, item.value)}
      >{contentSlots.option
        ? contentSlots.option(item)
        : item.text}
      </div>
    )

    const { id: outsiderId } = useOutsider()
    const slots = {
      default: () => (
        <>
          <div
            ref={componentRef}
            class={[
              'lct-select-widget',
              disabled.value === true ? 'disabled' : null
            ]}
            style={widgetStyle.value}
            role='listbox'
            onClick={stopPropagation}
          >
            <div
              class='selection-container' tabindex='0'
              onKeydown={preventKeys(' ', 'Enter', 'ArrowUp', 'ArrowDown')}
              onKeyup={onComponentKeyup}
              onClick={toggleExpansion}
              onBlur={onBlur}
            >
              <div class='selection-content'>{createSelectionContent()}</div>
              <LctIcon class={[
                'drop-icon',
                isExpanded.value === true ? 'activated' : null
              ]}>expand_more</LctIcon>
            </div>

            <Teleport to={outsiderId}>
              <Transition enterActiveClass='lct-select-entry-animation' leaveActiveClass='lct-select-close-animation'>{
                isExpanded.value
                  ? <div
                      ref={listItemContainer}
                      class='lct-select-list-item-container'
                      style={listItemStyle.value}
                    >{ contentSlots.optionContainer ? contentSlots.optionContainer(option) : items.value.map(option) }
                    </div>
                  : null
              }</Transition>
            </Teleport>
          </div>
          { props.required ? <RequiredInput value={props.modelValue} /> : null }
        </>
      ),
      message: () => (
        errorMessage.value
          ? <div class='error-text'>{errorMessage.value}</div>
          : null
      )
    }

    return () => (
      <LctInput
        class='lct-select'
        label={props.label} icon={props.icon}
        v-slots={slots}
        value={props.modelValue}
        required={props.required}
      />
    )
  }
})

export {
  LctSelect,
  LctSelectItem,
  ComponentName
}
