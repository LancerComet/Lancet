import { computed, defineComponent, onMounted, PropType, ref } from 'vue'

import { LancetColorScheme } from '../../config/color'
import { isFunction, isEmptyString, isString, isNumber } from '../../utils/type'
import { LctBtn } from '../lct-btn'
import { LctCard } from '../lct-card/lct-card'
import { LctIcon } from '../lct-icon'

import './index.styl'

/**
 * 弹窗回调函数参数.
 */
type CreateDialogCallbackParam = {
  /**
   * 设置弹窗锁定状态.
   */
  setLockStatus: (isLock: boolean) => void

  /**
   * 关闭弹窗.
   */
  close: () => void
}

/**
 * 弹窗回调函数类型.
 */
type CreateDialogCallback = (dialog: CreateDialogCallbackParam) => void | Promise<void>

/**
 * 弹窗组件.
 */
const LctDialog = defineComponent({
  name: 'LctDialog',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    title: {
      type: String as PropType<string>,
      default: ''
    },

    content: {
      type: String as PropType<string>,
      default: ''
    },

    confirmBtnText: {
      type: String as PropType<string>,
      default: null
    },

    cancelBtnText: {
      type: String as PropType<string>,
      default: null
    },

    onConfirm: {
      type: Function as PropType<CreateDialogCallback>
    },

    onCancel: {
      type: Function as PropType<CreateDialogCallback>
    },

    onMounted: {
      type: Function as PropType<CreateDialogCallback>
    },

    hideConfirmBtn: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    hideCancelBtn: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    hideCloseBtn: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    width: {
      type: [Number, String] as PropType<number | string>
    }
  },

  emits: ['update:modelValue'],

  setup (props, { slots, emit }) {
    const isLocked = ref(false)

    const confirmBtnText = computed(() => {
      return isString(props.confirmBtnText)
        ? props.confirmBtnText
        : 'Confirm'
    })

    const cancelBtnText = computed(() => {
      return isString(props.cancelBtnText)
        ? props.cancelBtnText
        : 'Cancel'
    })

    const setLockStatus = (status: boolean) => {
      isLocked.value = status
    }

    const close = () => {
      emit('update:modelValue', false)
    }

    const createDialogCallbackParam: CreateDialogCallbackParam = {
      setLockStatus,
      close
    }

    const onConfirmButtonClick = async () => {
      const onConfirm = props.onConfirm
      if (isFunction(onConfirm)) {
        setLockStatus(true)
        await onConfirm(createDialogCallbackParam)
        setLockStatus(false)
        return
      }
      close()
    }

    const onCancelButtonClick = async () => {
      const onCancel = props.onCancel
      if (isFunction(onCancel)) {
        setLockStatus(true)
        await onCancel(createDialogCallbackParam)
        setLockStatus(false)
        return
      }
      close()
    }

    const dialogBodyStyle = computed(() => {
      return {
        width: isNumber(props.width)
          ? props.width + 'px'
          : props.width
      }
    })

    const DialogComponent = () => {
      const ConfirmBtn = () => (
        props.hideConfirmBtn
          ? null
          : <LctBtn
              class='confirm-btn'
              disabled={isLocked.value}
              loading={isLocked.value}
              onClick={onConfirmButtonClick}
              color={LancetColorScheme.Primary}
            >{confirmBtnText.value}</LctBtn>
      )

      const CancelBtn = () => (
        props.hideCancelBtn
          ? null
          : <LctBtn
              class='cancel-btn'
              disabled={isLocked.value} onClick={onCancelButtonClick}
              color={LancetColorScheme.Primary} outlined
            >{cancelBtnText.value}</LctBtn>
      )

      const CloseBtn = () => (
        props.hideCloseBtn
          ? null
          : <LctBtn class='close-button' transparent onClick={onCancelButtonClick}>
              <LctIcon>close</LctIcon>
            </LctBtn>
      )

      const DialogTitle = () => (
        isEmptyString(props.title) ? null : <h6 class='dialog-title'>{props.title}</h6>
      )

      return (
        <div class='lct-dialog'>
          <div class='background-mask'/>
          <div style={dialogBodyStyle.value}>
            <LctCard class='dialog-body' radius={28}>
              <CloseBtn />
              <DialogTitle />
              <div class='dialog-content'>{slots.default?.() ?? props.content}</div>
              <div class='btn-container'>
                <CancelBtn />
                <ConfirmBtn />
              </div>
            </LctCard>
          </div>
        </div>
      )
    }

    onMounted(async () => {
      const onMount = props.onMounted
      if (isFunction(onMount)) {
        await onMount(createDialogCallbackParam)
      }
    })

    return () => (
      props.modelValue ? <DialogComponent /> : null
    )
  }
})

export {
  LctDialog,
  CreateDialogCallback
}
