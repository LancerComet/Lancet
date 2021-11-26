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

  setup (props, { slots }) {
    const { appConfig } = useAppConfig()
    const style = computed(() => {
      const brightness = 1 + (props.brightness / 10)
      const color = setBrightness(appConfig.value.colors.color.primary, brightness)
      return {
        backgroundColor: color
      }
    })

    return () => (
      <div class='lct-mica' style={style.value}>{slots.default?.()}</div>
    )
  }
})

export {
  LctMica
}
