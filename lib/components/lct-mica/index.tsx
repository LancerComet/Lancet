import { computed, defineComponent, PropType } from 'vue'
import { useAppConfig } from '../../providers/app-config-provider'
import { setOpacity } from '../../utils/color'
import { LctCard } from '../index'

import './index.styl'

const LctMica = defineComponent({
  name: 'LctMica',

  props: {
    opacity: {
      type: Number as PropType<number>,
      default: 0.1
    }
  },

  setup (props, { slots }) {
    const { appConfig } = useAppConfig()
    const style = computed(() => {
      const color = setOpacity(appConfig.value.colors.color.primary, props.opacity)
      return {
        backgroundColor: color
      }
    })

    return () => (
      <LctCard class='lct-mica' padding={0} radius={0}>
        <div class='lct-mica-color-slot' style={style.value}>{slots.default?.()}</div>
      </LctCard>
    )
  }
})

export {
  LctMica
}
