import { defineComponent, inject, provide, ref, TransitionGroup } from 'vue'
import { CreateDialogCallback, LctDialog } from '../../components/lct-dialog'
import { randomString } from '../../utils/random'

import style from './index.module.styl'

const CreateDialogInjectKey = `dialog_${randomString()}`

interface CreateDialogParam {
  /**
   * 弹窗标题.
   */
  title: string

  /**
   * 弹窗文本内容.
   * 当使用 component 时, 此字段不生效.
   *
   * @default ''
   */
  content?: string

  /**
   * 弹窗内组件.
   *
   * @default null
   */
  component?: () => JSX.Element

  /**
   * 确定按钮文本.
   *
   * @default '确定'
   */
  confirmBtnText?: string

  /**
   * 取消按钮文本.
   *
   * @default '取消'
   */
  cancelBtnText?: string

  /**
   * 确定按钮点击回调.
   *
   * @default null
   */
  onConfirm?: CreateDialogCallback

  /**
   * 取消按钮点击回调.
   *
   * @default null
   */
  onCancel?: CreateDialogCallback

  /**
   * 组件 Mounted 回调函数.
   */
  onMounted?: CreateDialogCallback

  /**
   * 是否隐藏确定按钮.
   *
   * @default false
   */
  hideConfirmBtn?: boolean

  /**
   * 是否隐藏取消按钮.
   *
   * @default false
   */
  hideCancelBtn?: boolean

  /**
   * 是否隐藏右上角关闭按钮.
   *
   * @default false
   */
  hideCloseBtn?: boolean

  /**
   * 弹窗宽度.
   */
  width?: number
}

/**
 * 创建弹窗函数.
 */
type CreateDialogFunc = (param: CreateDialogParam) => void

const ComponentName = 'LctDialogProvider'

const LctDialogProvider = defineComponent({
  name: ComponentName,
  setup (props, { slots }) {
    const dialogIds = ref<{ [id: string]: CreateDialogParam}>({})

    const destroyDialog = (id: string) => {
      delete dialogIds.value[id]
    }

    const createDialogFunc: CreateDialogFunc = param => {
      const dialogId = 'dialog-' + randomString(20).toLowerCase()
      dialogIds.value[dialogId] = param
    }

    provide(CreateDialogInjectKey, createDialogFunc)

    return () => (
      <>
        {slots.default?.()}
        <TransitionGroup enterActiveClass={style.lctDialogProviderEnter} leaveActiveClass={style.lctDialogProviderLeave}>{
          Object.keys(dialogIds.value).map(id => {
            const param = dialogIds.value[id]
            return (
              <LctDialog
                class={id}
                key={id}
                modelValue={true}
                v-slots={{
                  default: param.component
                }}
                {...param}
                onUpdate:modelValue={() => destroyDialog(id)}
              />
            )
          })
        }</TransitionGroup>
      </>
    )
  }
})

/**
 * 使用全局弹窗创建 Hooks.
 *
 * @returns {{ createDialog: CreateDialogFunc }}
 */
const useDialog = (): {
  /**
   * 全局弹窗创建方法.
   */
  createDialog: CreateDialogFunc
} => {
  return {
    createDialog: inject(CreateDialogInjectKey, () => {
      console.error(`You should use this function under the scope of ${ComponentName}.`)
    }) as CreateDialogFunc
  }
}

export {
  LctDialogProvider,
  useDialog
}
