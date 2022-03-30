import { defineComponent, PropType } from 'vue'
import { LctMica } from '../../lib'

import LancetLogoSvg from '../assets/lancet-logo.svg'

const LancetLogo = defineComponent({
  props: {
    width: {
      type: Number as PropType<number>,
      default: 100
    }
  },

  setup (props) {
    return () => (
      <LctMica
        class='lancet-logo primary-fill'
        style={`width: ${props.width}px; border-radius: ${props.width * 0.2}px; overflow: hidden; margin: 0 auto`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <LancetLogoSvg style='display: block' />
      </LctMica>
    )
  }
})

export {
  LancetLogo
}
