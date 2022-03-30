import { computed, defineComponent, onBeforeUnmount, PropType, Transition } from 'vue'

import './index.styl'
import { stopClick } from '../../utils/inputs'

const LctMenu = defineComponent({
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    fullScreen: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { slots, emit }) {
    const isOpen = computed(() => props.modelValue)

    const setOpenStatus = (openStatus: boolean) => {
      emit('update:modelValue', openStatus)
    }

    const toggleOpen = () => {
      const openStatus = !isOpen.value
      setOpenStatus(openStatus)
    }

    const onActivatorClick = (event: Event) => {
      if (props.disabled) {
        return
      }
      event.stopPropagation()
      toggleOpen()
    }

    const onSlotClick = (event: Event) => {
      stopClick(event)
    }

    const registerGlobalClickEvent = () => {
      const handleGlobalClick = () => {
        setOpenStatus(false)
      }
      window.addEventListener('click', handleGlobalClick)
      return () => window.removeEventListener('click', handleGlobalClick)
    }

    const destroyGlobalClickEvent = registerGlobalClickEvent()

    onBeforeUnmount(() => {
      destroyGlobalClickEvent()
    })

    return () => (
      <div class='lct-menu'>
        <div class='menu-activator' onClick={onActivatorClick}>{slots.activator?.()}</div>
        <div class={['position-setter', props.fullScreen ? 'full-screen' : '']}>
          <Transition enterActiveClass='lct-menu-entry-animation' leaveActiveClass='lct-menu-close-animation'>{
            isOpen.value && (<div class='menu-slot' onClick={onSlotClick}>{slots.default?.()}</div>)
          }</Transition>
        </div>
      </div>
    )
  }
})

export {
  LctMenu
}
