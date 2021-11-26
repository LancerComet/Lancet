import { defineComponent } from 'vue'

import { LctBtn, LctCard, LctCardContent, LctCardTitle, useDialog } from '../../lib'

const DialogShowcase = defineComponent({
  setup () {
    const { createDialog } = useDialog()
    const createNormalDialog = () => createDialog({
      title: 'Basic dialog title',
      content: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.',
      hideCancelBtn: true,
      width: 320
    })

    const createComponentDialog = () => createDialog({
      title: '组件弹窗',
      component: () => {
        return (
          <div style='padding: 10px; text-align: center'>
            <LctBtn onClick={createComponentDialog}>人生是一个轮回</LctBtn>
          </div>
        )
      },
      onConfirm: async dialog => {
        await new Promise(resolve => setTimeout(resolve, 500))
        dialog.close()
      }
    })

    const createSelfDestroyDialog = () => createDialog({
      title: '自毁弹窗',
      component: () => (
        <div style='text-align: center'>
          <h3>呵.</h3>
        </div>
      ),
      width: 200,
      hideConfirmBtn: true,
      hideCancelBtn: true,
      hideCloseBtn: true,
      onMounted: dialog => {
        setTimeout(dialog.close, 1000)
      }
    })

    return () => (
      <LctCard withMargin elevated>
        <LctCardTitle>Dialogs</LctCardTitle>
        <LctCardContent>
          <LctBtn onClick={createNormalDialog}>普通弹窗</LctBtn>
          <LctBtn onClick={createComponentDialog}>组件弹窗</LctBtn>
          <LctBtn onClick={createSelfDestroyDialog}>自毁弹窗</LctBtn>
        </LctCardContent>
      </LctCard>
    )
  }
})

export {
  DialogShowcase
}
