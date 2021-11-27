import { defineComponent } from 'vue'

import { LctBtn, LctCard, LctColorScheme, useToast, LctMica, LctCardContent } from '../../lib'

const ToastShowcase = defineComponent({
  setup () {
    const { createToast } = useToast()

    return () => (
      <div>
        <LctCard overHidden radius={28}>
          <LctMica>
            <LctCardContent>
              <h1>Toast</h1>
              <p>Make great toast messages.</p>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <LctBtn onClick={() => createToast('Dreamin Chuchu 😻')}>Info</LctBtn>
            <LctBtn onClick={() => createToast('I need to chill out ☹️', 'warning')} color={LctColorScheme.Warning}>Warning</LctBtn>
            <LctBtn onClick={() => createToast('We have trapped into the big trouble 💣', 'error')} color={LctColorScheme.Error}>Error</LctBtn>
            <LctBtn onClick={() => createToast('Have a great day and great life 🎮', 'success')} color={LctColorScheme.Success}>Success</LctBtn>
          </LctCardContent>
        </LctCard>
      </div>
    )
  }
})

export {
  ToastShowcase
}
