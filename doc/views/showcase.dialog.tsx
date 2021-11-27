import { defineComponent } from 'vue'

import { LctBtn, LctCard, LctCardContent, LctMica, useDialog } from '../../lib'
import style from './showcase.dialog.module.styl'

const DialogShowcase = defineComponent({
  setup () {
    const { createDialog } = useDialog()
    const createBasicDialog = () => createDialog({
      title: 'Basic dialog title',
      content: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.',
      hideCancelBtn: true,
      width: 320
    })

    const createComponentDialog = () => createDialog({
      title: 'Custom component',
      width: 500,
      component: () => {
        return (
          <LctCard>
            <div>
              <p>Maybe you want to check this out.</p>
            </div>

            <LctCard>
              <LctBtn onClick={createBasicDialog}>Hit this</LctBtn>
            </LctCard>
          </LctCard>
        )
      },
      onConfirm: async dialog => {
        await new Promise(resolve => setTimeout(resolve, 500))
        dialog.close()
      }
    })

    const createSelfDestroyDialog = () => createDialog({
      title: 'Self closing',
      component: () => (
        <div style='text-align: center'>
          <h3>💣💣🎃🎃</h3>
          <p>See you next time.</p>
        </div>
      ),
      hideConfirmBtn: true,
      hideCancelBtn: true,
      hideCloseBtn: true,
      onMounted: dialog => {
        setTimeout(dialog.close, 1500)
      }
    })

    return () => (
      <div class={style.dialogShowcase}>
        <LctCard overHidden radius={28} withMargin>
          <LctMica>
            <LctCardContent>
              <h1>Dialog</h1>
              <p>Dialog components.</p>
            </LctCardContent>
          </LctMica>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent class={style.buttonList}>
            <LctBtn onClick={createBasicDialog}>Basic Dialog</LctBtn>
            <LctBtn onClick={createComponentDialog} outlined>Dialog using Component</LctBtn>
            <LctBtn onClick={createSelfDestroyDialog} outlined>Self closing</LctBtn>
          </LctCardContent>
        </LctCard>
      </div>
    )
  }
})

export {
  DialogShowcase
}
