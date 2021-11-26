import { computed, defineComponent, PropType } from 'vue'
import { useAppConfig } from '../../providers/app-config-provider'
import { setBrightness } from '../../utils/color'

import './index.styl'
import { LctCard } from '../lct-card/lct-card'

const LctMica = defineComponent({
  name: 'LctMica',

  props: {
    opacity: {
      type: Number as PropType<number>,
      default: 1
    }
  },

  emits: ['click'],

  setup (props, { emit, slots }) {
    const { appConfig } = useAppConfig()
    const style = computed(() => {
      const color = appConfig.value.colors.color.primary
      return {
        backgroundColor: color,
        opacity: props.opacity
      }
    })

    const onClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return () => (
      <LctCard class='lct-mica' radius={0}>
        <div
          class='lct-mica-color'
          style={style.value}
          onClick={onClick}
        >{slots.default?.()}</div>
      </LctCard>
    )
  }
})

export {
  LctMica
}
