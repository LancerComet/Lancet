import { defineComponent } from 'vue'

import { LctBtn, LctCard, LancetColorScheme, useToast } from '../../lib'

const ToastShowcase = defineComponent({
  setup () {
    const { createToast } = useToast()

    return () => (
      <LctCard title='Toast' elevated withMargin>
        <LctBtn onClick={() => createToast('Info')}>Info</LctBtn>
        <LctBtn onClick={() => createToast('Warning', 'warning')} color={LancetColorScheme.Warning}>Warning</LctBtn>
        <LctBtn onClick={() => createToast('Error', 'error')} color={LancetColorScheme.Error}>Error</LctBtn>
        <LctBtn onClick={() => createToast('Success', 'success')} color={LancetColorScheme.Success}>Success</LctBtn>
      </LctCard>
    )
  }
})

export {
  ToastShowcase
}
