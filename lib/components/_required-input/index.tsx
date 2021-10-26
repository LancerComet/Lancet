import { defineComponent, StyleValue } from 'vue'

const style: StyleValue = {
  width: '0',
  height: '0',
  opacity: '0',
  position: 'absolute',
  left: '50%',
  top: '100%',
  transform: 'translate(-50%, 0)'
}

const RequiredInput = defineComponent({
  props: ['value'],

  setup (props) {
    return () => (
      <input
        value={props.value}
        style={style}
        required
        tabindex='-1'
      />
    )
  }
})

export {
  RequiredInput
}
