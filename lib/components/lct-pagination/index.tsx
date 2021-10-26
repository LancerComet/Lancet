import { computed, defineComponent } from 'vue'
import { LancetColorScheme } from '../../config/color'
import { isNumber } from '../../utils/type'
import { LctBtn } from '../lct-btn'
import { LctIcon } from '../lct-icon'
import { LctTextfield } from '../lct-textfield'

import './index.styl'

const ComponentName = 'LctPagination'

const LctPagination = defineComponent({
  name: ComponentName,

  props: {
    modelValue: { type: Number, default: 1 },
    total: { type: Number, default: 1 },
    displayCount: { type: Number, default: 2 },
    disabled: { type: Boolean, default: false }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const goPrev = () => {
      if (props.modelValue > 1) {
        setValue(props.modelValue - 1)
      }
    }

    const goNext = () => {
      if (props.modelValue < props.total) {
        setValue(props.modelValue + 1)
      }
    }

    const goTargetPage = (page: number | string) => {
      if (typeof page === 'number' && page > 0 && page <= props.total) {
        setValue(page)
      }
    }

    const customPageRule = [
      (v: number) => (!v && (v < 1)) || '页码取值最低为 1.',
      (v: number) => v > props.total || `页码取值不能超过 ${props.total}.`
    ]

    const emitPaging = (event: KeyboardEvent) => {
      const newPage = parseInt((event.target as HTMLInputElement).value)

      if ((!newPage && newPage < 1) || newPage > props.total) {
        return
      }
      if (event.key === 'Enter' && isNumber(newPage) && !isNaN(newPage)) {
        setValue(newPage)
      }
    }

    const setValue = (value: number) => {
      const isPageChanged = value !== props.modelValue
      isPageChanged && emit('update:modelValue', value)
    }

    const updateList = computed(() => {
      const pageList = []
      let isLeftDotAppend = false
      let isRightDotAppended = false

      const displayCount = props.displayCount

      for (let i = 1; i < props.total + 1; i++) {
        if (
          i < displayCount ||
          Math.abs(i - props.total) < 1 ||
          Math.abs(i - props.modelValue) < displayCount
        ) {
          pageList.push(i)
        } else if (
          (i >= displayCount && Math.abs(i - props.modelValue) >= displayCount) ||
          (Math.abs(i - props.modelValue) >= displayCount && Math.abs(i - props.total) >= displayCount + 1)
        ) {
          if (!isLeftDotAppend && i < props.modelValue) {
            pageList.push('...')
            isLeftDotAppend = true
          }

          if (!isRightDotAppended && i > props.modelValue) {
            pageList.push('...')
            isRightDotAppended = true
          }
        }
      }
      return pageList
    })

    return () => (
      <div class='lct-pagination'>
        <LctBtn transparent onClick={goPrev} class={['pagination-change', 'pagination-btn']} minWidth={0}>
          <LctIcon>keyboard_arrow_left</LctIcon>
        </LctBtn>
        {updateList.value.map((item: string | number) => (
          <LctBtn class='pagination-btn'
            color={LancetColorScheme.Primary}
            outlined ={!(item === props.modelValue)}
            onClick={() => goTargetPage(item)}
            minWidth={0}
          >{item}</LctBtn>
        ))}
        <LctBtn transparent onClick={goNext} class={['pagination-change', 'pagination-btn']} minWidth={0}>
          <LctIcon>keyboard_arrow_right</LctIcon>
        </LctBtn>
        <LctTextfield
          class='pagination-input'
          type='number'
          placeholder='页码'
          label='输入后回车'
          width={80}
          rules={customPageRule}
          onKeyup={emitPaging}
        />
      </div>
    )
  }
})

export {
  LctPagination,
  ComponentName
}
