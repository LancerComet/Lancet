import { defineComponent, PropType } from 'vue'

import { LancetColorScheme } from '../../config/color'
import { isArray, isObject } from '../../utils/type'
import { LctProgressLinear } from '../lct-progress-linear'
import { LctTh } from './table/lct-th'

import './index.styl'

interface LctHeader<T = unknown> {
  text: string,
  value?: T extends unknown[] ? number : keyof T,
  align?: 'left' | 'center' | 'right',
  width?: number
}

const LctTable = defineComponent({
  name: 'LctTable',

  props: {
    items: {
      type: Array as PropType<Array<unknown>>,
      default: () => []
    },

    headers: {
      type: Array as PropType<Array<LctHeader>>,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ['loadData'],

  setup (props, { slots }) {
    return () => (
      <div class='lct-table-container'>
        <div class='loading-indicator'>
          {
            props.loading
              ? <LctProgressLinear indeterminate color={LancetColorScheme.Primary} fullWidth />
              : null
          }
        </div>

        <table class='lct-table'>
          {
            !slots.header && (
              <thead class='lct-thead'>
              <tr>{
                props.headers.map(value => (
                  <LctTh class='lct-th' width={value.width + '%'} textAlign={value.align}>{value.text}</LctTh>
                ))
              }</tr>
              </thead>
            )
          }
          {slots.header && <thead>{slots.header?.(props.headers)}</thead>}

          <tbody class={['lct-tbody', props.loading ? 'dark' : '']}>
            {
              props.items.map((value, index) => (
                slots.items
                  ? <>{slots.items?.(value, index)}</>
                  : <tr class='lct-tr'>
                    {
                      props.headers?.map(head => (
                        <td class='lct-td'>{
                          isObject(value)
                            ? value[head.value as unknown as string]
                            : isArray(value)
                              ? value[head.value as unknown as number]
                              : value
                        }</td>
                      ))
                    }
                  </tr>
              ))
            }

            {props.items.length === 0 && (
              slots.noData?.() ?? (
                <td colspan={props.headers?.length} class='lct-no-data'>
                  <p>No data</p>
                </td>
              )
            )}
          </tbody>
        </table>
      </div>
    )
  }
})

export {
  LctTable,
  LctHeader
}
