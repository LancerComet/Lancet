import { computed, defineComponent, PropType, Ref, ref } from 'vue'

import './lct-group-list.styl'
import { isBoolean, isNumber, isObject } from '../../utils/type'
import { LctBtn, LctIcon } from '../index'

const LctGroupList = defineComponent({
  name: 'LctGroupList',

  props: {
    icon: {
      type: String as PropType<string>
    },

    text: {
      type: String as PropType<string>
    },

    modelValue: {
      type: [Object, Boolean] as PropType<Ref<boolean> | boolean>
    }
  },

  emits: ['update:modelValue'],

  setup (props, { slots, emit }) {
    const listContainerElement = ref<HTMLElement>()
    const isOpen = computed(() => {
      return isBoolean(props.modelValue)
        ? props.modelValue
        : props.modelValue?.value ?? false
    })

    const listStyle = computed(() => {
      const result = {
        height: '0'
      }
      if (isOpen.value) {
        const height = listContainerElement.value?.offsetHeight
        result.height = isNumber(height) ? height + 'px' : 'auto'
      }
      return result
    })

    const toggleExpansion = () => {
      const newStatus = !isOpen.value
      const isModelRef = isObject(props.modelValue)
      if (isModelRef) {
        // eslint-disable-next-line vue/no-mutating-props
        props.modelValue.value = newStatus
      } else {
        emit('update:modelValue', newStatus)
      }
    }

    return () => (
      <div class='lct-group-list'>
        <LctBtn class='lct-group-list-activator' onClick={toggleExpansion} text>
          <div class='content'>
            <div>
              <LctIcon>{props.icon}</LctIcon>
              <span>{props.text}</span>
            </div>

            <LctIcon class={[
              'lct-group-list-drop-icon',
              isOpen.value ? 'open' : null
            ]}>arrow_drop_down</LctIcon>
          </div>
        </LctBtn>

        <div class='lct-group-list-list' style={listStyle.value}>
          <div class='lct-group-list-list-container' role='list' ref={listContainerElement}>{
            slots.default?.()
          }</div>
        </div>
      </div>
    )
  }
})

export {
  LctGroupList
}
