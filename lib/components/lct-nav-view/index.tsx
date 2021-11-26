import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'

import './index.styl'
import { LctBtn, LctCard, LctIcon, LctMica } from '../index'

const LctNavView = defineComponent({
  props: {
    micaBrightness: {
      type: Number as PropType<number>,
      default: 0.7
    }
  },

  setup (props, { slots }) {
    const pcBoundary = 900
    const element = ref<HTMLElement>()
    const isDrawerOpen = ref(false)

    const toggleOpen = () => {
      isDrawerOpen.value = !isDrawerOpen.value
    }

    let lastElementWidth = -1
    const onResize = () => {
      const width = element.value?.offsetWidth ?? 0
      if (lastElementWidth < 0) {
        lastElementWidth = width
      }

      const isGoingToPcMode = width >= pcBoundary && lastElementWidth < pcBoundary
      if (isGoingToPcMode) {
        isDrawerOpen.value = true
      }

      const isGoingToMobileMode = width < pcBoundary && lastElementWidth >= pcBoundary
      if (isGoingToMobileMode) {
        isDrawerOpen.value = false
      }

      lastElementWidth = width
    }

    const setInitialOpenStatus = () => {
      const width = element.value?.offsetWidth ?? 0
      isDrawerOpen.value = width >= pcBoundary
    }

    onMounted(() => {
      setInitialOpenStatus()
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    return () => (
      <div class='lct-nav-view' ref={element}>
        <LctCard class='lct-nav-view-action-bar' radius={0}>
          <div class='lct-nav-view-action-bar-content'>
            <LctBtn
              class='lct-nav-drawer-button' transparent onClick={toggleOpen}
              circle={50}
            >
              <LctIcon>menu</LctIcon>
            </LctBtn>
            { slots.actionBar?.() }
          </div>
        </LctCard>

        <LctCard class='lct-nav-view-content' radius={0}>
          {
            isDrawerOpen.value
              ? <div class='lct-nav-view-drawer-backdrop' onClick={toggleOpen}/>
              : null
          }

          <div class={['lct-nav-view-drawer', isDrawerOpen.value ? 'open' : 'closed']}>
            <LctMica
              class='lct-nav-view-drawer-content'
              brightness={props.micaBrightness}
            >{slots.drawer?.()}</LctMica>
          </div>

          <div class={['lct-nav-view-frame', isDrawerOpen.value ? 'drawer-open' : null]}>{
            slots.frame?.()
          }</div>
        </LctCard>
      </div>
    )
  }
})

export {
  LctNavView
}
