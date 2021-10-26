import { defineComponent, onMounted, PropType, ref } from 'vue'
import { isUndefined } from '../../utils/type'

import './index.styl'

const LctTooltips = defineComponent({
  props: {
    position: {
      type: String as PropType<'top' | 'left' | 'right' | 'bottom'>,
      default: 'top'
    },
    tips: {
      type: String || Number as PropType<string |number>
    }
  },

  setup (props, { slots }) {
    const componentRef = ref<HTMLElement>()

    const tooltipsStyle = ref({
      top: '0',
      left: '0'
    })

    const updateTooltipsStyle = () => {
      const element = componentRef.value
      const rect = element?.getBoundingClientRect()
      if (rect) {
        switch (props.position) {
          case 'top':
            tooltipsStyle.value.top = rect.top + 'px'
            tooltipsStyle.value.left = rect.left + rect.width / 2 + 'px'
            break
          case 'bottom':
            tooltipsStyle.value.top = rect.top + rect.height + 'px'
            tooltipsStyle.value.left = rect.left + rect.width / 2 + 'px'
            break
          case 'left':
            tooltipsStyle.value.top = rect.top + rect.height / 2 + 'px'
            tooltipsStyle.value.left = rect.left + 'px'
            break
          case 'right':
            tooltipsStyle.value.top = rect.top + rect.height / 2 + 'px'
            tooltipsStyle.value.left = rect.left + rect.width + 'px'
            break
        }
      }
    }

    onMounted(() => {
      componentRef.value?.addEventListener('mouseenter', updateTooltipsStyle)
    })

    return () => (
      <div class='lct-tooltips' ref={componentRef}>
        {slots.default?.()}
        <div class={['tooltips', props.position]} style={tooltipsStyle.value}>
          <div class='tooltips-content'>
            {isUndefined(props.tips) ? slots.tips?.() : props.tips }
          </div>
        </div>
      </div>
    )
  }
})

export {
  LctTooltips
}
