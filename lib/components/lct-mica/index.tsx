import { computed, defineComponent, PropType } from 'vue'
import { useAppConfig } from '../../providers/app-config-provider'
import { setBrightness } from '../../utils/color'

import './index.styl'

const LctMica = defineComponent({
  name: 'LctMica',

  props: {
    brightness: {
      type: Number as PropType<number>,
      default: 0
    }
  },

  emits: ['click'],

  setup (props, { emit, slots }) {
    const { appConfig } = useAppConfig()
    const style = computed(() => {
      const brightness = 1 + (props.brightness / 10)
      const color = setBrightness(appConfig.value.colors.color.primary, brightness)
      return {
        backgroundColor: color
      }
    })

    const onClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return () => (
      <div
        class='lct-mica' style={style.value}
        onClick={onClick}
      >{slots.default?.()}</div>
    )
  }
})

export {
  LctMica
}
