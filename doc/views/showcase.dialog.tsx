import { defineComponent, ref } from 'vue'

import { LctBtn, LctCard, LctCardContent, LctDialog, LctMica, useDialog } from '../../lib'
import style from './showcase.dialog.module.styl'

const DialogShowcase = defineComponent({
  setup () {
    const { createDialog } = useDialog()
    const createBasicDialog = () => createDialog({
      title: 'Basic dialog',
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

    const isInlineDialogVisible = ref(false)
    const openInlineDialog = () => {
      isInlineDialogVisible.value = true
    }

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
          <LctCardContent>
            <h5>Different ways to create a dialog</h5>
            <p>There are two ways to create a dialog:</p>
            <ul>
              <li>Global hook: Calling the global function which is provided by Lancet.</li>
              <li>Inline component: Place a dialog component into your component and handle everything.</li>
            </ul>
            <p>For most situations calling the global function is the best choice. But if you want to do some advanced jobs you can use the inline component as well.</p>
          </LctCardContent>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <h5>Global hook</h5>
            <div>
              <pre>{
                '// Setup function.\n' +
                'const { createDialog } = useDialog()\n' +
                'const greeting = () => {\n' +
                '  createDialog({\n' +
                '    title: "Greeting",\n' +
                '    content: "How is doing today?"\n' +
                '  })\n' +
                '}\n' +
                '\n' +
                '// Template.\n' +
                '<LctBtn onClick={greeting}>Hello!</LctBtn>'
              }</pre>
            </div>
            <div class={style.buttonList}>
              <LctBtn onClick={createBasicDialog}>Basic Dialog</LctBtn>
              <LctBtn onClick={createComponentDialog} outlined>Dialog using Component</LctBtn>
              <LctBtn onClick={createSelfDestroyDialog} outlined>Self closing</LctBtn>
            </div>
          </LctCardContent>
        </LctCard>

        <LctCard withMargin>
          <LctCardContent>
            <h5>Inline component</h5>
            <div class={style.buttonList}>
              <LctBtn onClick={openInlineDialog}>Basic Dialog</LctBtn>
            </div>
            <LctDialog
              v-model={isInlineDialogVisible.value}
              title='Inline dialog'
            >
              <div>
                <p>This is a inline dialog.</p>
                <p>You have to control everything of this dialog, that means the state, the functions, the other stuffs that related to this job should be handled.</p>
                <p>And you might have noticed, the closing transition is gone because its your job now 🤣.</p>
              </div>
            </LctDialog>
          </LctCardContent>
        </LctCard>
      </div>
    )
  }
})

export {
  DialogShowcase
}
