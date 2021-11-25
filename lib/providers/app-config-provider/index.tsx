import { computed, defineComponent, inject, PropType, provide, Ref } from 'vue'
import { createDefaultAppConfig, LancetAppConfig } from '../../config/app-config'
import { randomString } from '../../utils/random'

const AppConfigInjectKey = `appConfig_${randomString()}`
const DEFAULT_APP_CONFIG = createDefaultAppConfig()

const AppConfigProvider = defineComponent({
  name: 'AppConfigProvider',

  props: {
    config: {
      type: Object as PropType<Partial<LancetAppConfig>>
    }
  },

  setup (props, { slots }) {
    const appConfig = computed<LancetAppConfig>(() => {
      return {
        ...DEFAULT_APP_CONFIG,
        ...props.config
      }
    })

    provide(AppConfigInjectKey, appConfig)

    return () => (
      <>{ slots.default?.() }</>
    )
  }
})

/**
 * 获取全局 App 配置.
 * 仅在 <LctApp /> 包含的组件内可用.
 *
 * @returns {Ref<LancetAppConfig>} 全局配置响应对象.
 */
const useAppConfig = (): Ref<LancetAppConfig> => {
  return inject<Ref<LancetAppConfig>>(
    AppConfigInjectKey, computed(() => {
      console.warn('[Lancet] You have to call useAppConfig under <LctApp />.')
      return DEFAULT_APP_CONFIG
    })
  )
}

export {
  AppConfigProvider,
  useAppConfig
}
