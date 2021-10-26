import { defineComponent, PropType } from 'vue'

import './index.styl'

const LctChip = defineComponent({
  props: {
    close: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onClickClose: {
      type: Function as PropType<(event: Event) => void>
    }
  },

  emits: ['clickClose'],

  setup (props, { emit, slots }) {
    const onCloseClick = (event: Event) => {
      event.stopPropagation()
      emit('clickClose', event)
    }

    return () => (
      <div class='lct-chip'>
        <div class='content-container'>
          <span class='icon-text'>{slots.default?.()}</span>
          {
            props.close
              ? <button type='button' class='close-btn' onClick={onCloseClick}>{createCloseIcon()}</button>
              : null
          }
        </div>
      </div>
    )
  }
})

export {
  LctChip
}

function createCloseIcon () {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' role='img' aria-hidden='true' class='v-icon__svg'
      style='font-size: 18px; height: 18px; width: 18px;'>
      <path
        d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z'
      />
    </svg>
  )
}
