import { ComponentPublicInstance, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'

import './index.styl'
import { LctBtn, LctCard, LctIcon, LctMica } from '../index'

const LctNavView = defineComponent({
  props: {
    micaOpacity: {
      type: Number as PropType<number>,
      default: 0.3
    }
  },

  setup (props, { slots }) {
    const pcBoundary = 900
    const element = ref<HTMLElement>()
    const frameElement = ref<HTMLElement>()
    const actionBarRef = ref<ComponentPublicInstance>()
    const isDrawerOpen = ref(false)
    const isDisplayActionBarMica = ref(false)

    const toggleOpen = () => {
      isDrawerOpen.value = !isDrawerOpen.value
    }

    let lastElementWidth = -1
    const setDrawerOpenStatus = () => {
      const width = element.value?.offsetWidth ?? 0

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

    const onResize = () => {
      setDrawerOpenStatus()
    }

    const setActionBarMica = () => {
      const scrollTop = frameElement.value?.scrollTop ?? 0
      const height = actionBarRef.value?.$el?.offsetHeight ?? 0
      isDisplayActionBarMica.value = scrollTop > height
    }

    const onContentScroll = () => {
      setActionBarMica()
    }

    onMounted(() => {
      setDrawerOpenStatus()
      setActionBarMica()
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    return () => (
      <div class='lct-nav-view' ref={element}>
        <LctCard class='lct-nav-view-action-bar' radius={0} ref={actionBarRef}>
          <LctMica class={[
            'lct-nav-view-mica',
            isDisplayActionBarMica.value ? 'show' : 'hidden'
          ]}/>
          <div class='lct-nav-view-action-bar-content'>
            <LctBtn
              class='lct-nav-drawer-button' transparent onClick={toggleOpen}
              circle={50}
            >
              <LctIcon>{
                isDrawerOpen.value
                  ? 'menu_open'
                  : 'menu'
              }</LctIcon>
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
            <div class='lct-nav-view-drawer-content'>
              <LctMica
                class='lct-nav-view-mica drawer-mica'
                opacity={props.micaOpacity}
              />
              <div class='drawer-content'>{slots.drawer?.()}</div>
            </div>
          </div>

          <div
            class={['lct-nav-view-frame', isDrawerOpen.value ? 'drawer-open' : null]}
            onScroll={onContentScroll}
            ref={frameElement}
          >{
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
