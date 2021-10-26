import { defineComponent, inject, provide, ref, TransitionGroup } from 'vue'
import { LctToast } from '../../components/lct-toast'
import { LancetColorScheme } from '../../config/color'
import { randomString } from '../../utils/random'
import { isNumber } from '../../utils/type'

import './index.styl'

const CreateToastInjectKey = `toast_${randomString()}`
const DefaultTimeout = 3000

/**
 * 创建Toast函数.
 *
 * @param text Toast 文本内容.
 * @param ['info' | 'warning' | 'error' | 'success' = 'info'] color Toast 颜色主题.
 * @param [number=3000] timeout Toast 持续时间.
 */
type CreateToastFunc = (
  text: string,
  type?: 'info' | 'warning' | 'error' | 'success',
  timeout?: number
) => void

const ComponentName = 'LctToastProvider'

const LctToastProvider = defineComponent({
  name: ComponentName,

  setup (props, { slots }) {
    const toasts = ref<{
      id: string
      text: string
      color: LancetColorScheme
    }[]>([])

    const destroyToast = (id: string) => {
      const index = toasts.value.findIndex(item => item.id === id)
      toasts.value.splice(index, 1)
    }

    const createToastFunc: CreateToastFunc = (text, type, timeout) => {
      const toastId = 'toast_' + randomString()
      let color: LancetColorScheme
      switch (type) {
        case 'warning':
          color = LancetColorScheme.Warning
          break
        case 'error':
          color = LancetColorScheme.Error
          break
        case 'success':
          color = LancetColorScheme.Success
          break
        default:
          color = LancetColorScheme.Primary
          break
      }
      toasts.value.push({
        id: toastId,
        text,
        color
      })

      timeout = timeout ?? DefaultTimeout
      if (isNumber(timeout)) {
        setTimeout(() => destroyToast(toastId), timeout)
      }
    }

    provide(CreateToastInjectKey, createToastFunc)

    return () => (
      <>
        {slots.default?.()}
        <div class='lct-global-toast-container'>
          <TransitionGroup name='lct-global-toast'>
            {toasts.value.map(item => (
              <LctToast
                key={item.id}
                class={`global-${item.id}`}
                modelValue={true}
                text={item.text}
                color={item.color}
              />
            ))}
          </TransitionGroup>
        </div>
      </>
    )
  }
})

/**
 * 使用全局Toast创建 Hooks.
 *
 * @returns {{ createDialog: CreateDialogFunc }}
 */
const useToast = (): {
  /**
   * 全局弹窗创建方法.
   */
  createToast: CreateToastFunc
} => {
  return {
    createToast: inject(CreateToastInjectKey, () => {
      console.error(`You should use this function under the scope of ${ComponentName}.`)
    }) as CreateToastFunc
  }
}

export {
  LctToastProvider,
  useToast
}
