import { readonly, Ref, ref, watch } from 'vue'
import { _useLctForm } from '../components/lct-form'
import { isArray, isEmptyString, isFunction, isString } from '../utils/type'
import { Rule } from '../utils/validator'

/**
 * 使用验证器.
 *
 * @param valueRef
 * @param rules
 * @param onChange
 */
const useRules = (valueRef: Ref<unknown>, rules: Rule[], onChange?: (isPassed: boolean) => void) => {
  rules = isArray(rules) ? rules : []
  const isValidationPassed = ref(false)
  const errorMessage = ref<string | null>(null)
  const { setValidationResult, removeValidation } = _useLctForm(() => validate())

  const emitResult = (isPassed: boolean) => {
    const isInvokeOnChange = isFunction(onChange)
    isInvokeOnChange && onChange(isPassed)
    setValidationResult(isPassed)
  }

  /**
   * 手动执行验证.
   *
   * @param [param.isUpdateErrorMessage=true] 是否更新验证结果文本, 默认为 true.
   */
  const validate = (param?: {
    isUpdateErrorMessage?: boolean
  }): boolean => {
    const isUpdateErrorMessage = param?.isUpdateErrorMessage ?? true
    for (const item of rules) {
      if (!isFunction(item)) {
        continue
      }

      const validationResult = item(valueRef.value)
      if (isString(validationResult)) {
        isValidationPassed.value = false
        if (isUpdateErrorMessage) {
          errorMessage.value = validationResult
        }
        emitResult(false)
        return false
      }
    }

    errorMessage.value = null
    isValidationPassed.value = true
    emitResult(true)
    return true
  }

  const stopWatch = watch(valueRef, validate, { deep: true })

  // 首次验证时, 如果有预设值就更新错误文案, 如果没有则不更新.
  validate({
    isUpdateErrorMessage: !isEmptyString(valueRef.value)
  })

  return {
    validate,
    errorMessage: readonly(errorMessage),
    isValidationPassed: readonly(isValidationPassed),
    unregister: () => {
      stopWatch()
      removeValidation()
    }
  }
}

export {
  useRules
}
