import { defineComponent, inject, onMounted, PropType, provide } from 'vue'

import { useUid } from '../../hooks/use-uid'
import { randomString } from '../../utils/random'
import { isFunction, isUndefined } from '../../utils/type'

type FormEmitFunction = (uid: number, isPassed: boolean) => void
type ValidateAssignFunc = (uid: number, validateFunc: () => void) => void
type ValidateRemoveFunc = (uid: number) => void

const ComponentName = 'LctForm'
const EmitFormProvideKey = '__form_emitForm_' + randomString()
const ValidateFuncAssignProvideKey = '__form_validate_assign_' + randomString()
const ValidateFuncRemoveProvideKey = '__form_validate_remove_' + randomString()

const nullFunc = () => {
  // Empty.
}

const LctForm = defineComponent({
  name: ComponentName,

  props: {
    onSubmit: {
      type: Function as PropType<(event: Event) => void>
    },

    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    immediate: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['submit', 'update:modelValue'],

  render () {
    return (
      <form class='lct-form' onSubmit={this.submitExec}>{
        this.$slots.default?.()
      }</form>
    )
  },

  setup (props, { emit }) {
    const validationResultPool: { [uid: string]: boolean } = {}
    const validationFuncPool: { [uid: string]: () => void } = {}

    const submitExec = (event: Event) => {
      event.preventDefault()
      emit('submit', event)
    }

    const emitValue = () => {
      for (const uid of Object.keys(validationResultPool)) {
        const value = validationResultPool[uid]
        if (!value) {
          emit('update:modelValue', false)
          return
        }
      }
      emit('update:modelValue', true)
    }

    provide<FormEmitFunction>(EmitFormProvideKey, (uid: number, isPassed: boolean) => {
      if (uid < 0) {
        return
      }
      validationResultPool[uid] = isPassed
      emitValue()
    })

    provide<ValidateAssignFunc>(ValidateFuncAssignProvideKey, (uid: number, validateFunc: () => void) => {
      if (uid < 0) {
        return
      }
      validationFuncPool[uid] = validateFunc
    })

    provide<ValidateRemoveFunc>(ValidateFuncRemoveProvideKey, (uid: number) => {
      if (!isUndefined(validationFuncPool[uid])) {
        delete validationFuncPool[uid]
      }
      if (!isUndefined(validationResultPool[uid])) {
        delete validationResultPool[uid]
      }
      emitValue()
    })

    const validate = () => {
      Object.values(validationFuncPool).forEach(item => {
        isFunction(item) && item()
      })
    }

    if (props.immediate) {
      onMounted(() => {
        validate()
      })
    }

    return {
      submitExec,
      validate
    }
  }
})

/**
 * 为组件加上使用 LctForm 的功能.
 * 请注意, 这是一个内部方法.
 *
 * @param validateFunc
 */
const _useLctForm = (validateFunc: () => void) => {
  const { uid } = useUid()
  const emitForm = inject<FormEmitFunction>(EmitFormProvideKey, nullFunc)
  const validateFuncAssign = inject<ValidateAssignFunc>(ValidateFuncAssignProvideKey, nullFunc)
  const validateFuncRemove = inject<ValidateRemoveFunc>(ValidateFuncRemoveProvideKey, nullFunc)
  validateFuncAssign(uid, validateFunc)
  return {
    setValidationResult: (isPassed: boolean) => {
      return emitForm(uid, isPassed)
    },
    removeValidation: () => {
      validateFuncRemove(uid)
    }
  }
}

export {
  LctForm,
  _useLctForm,
  ComponentName,
  FormEmitFunction
}
