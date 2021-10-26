import { computed, defineComponent, inject, PropType, provide, Ref } from 'vue'
import { createDefaultConfig, LancetAppConfig } from '../../config/app-config'
import { createDefaultColorConfig } from '../../config/color'
import { createDefaultTheme } from '../../config/theme'
import { randomString } from '../../utils/random'

const AppConfigInjectKey = `appConfig_${randomString()}`

const AppConfigProvider = defineComponent({
  name: 'AppConfigProvider',

  props: {
    config: {
      type: Object as PropType<Partial<LancetAppConfig>>,
      default: createDefaultConfig()
    }
  },

  setup (props, { slots }) {
    const config = computed<LancetAppConfig>(() => {
      const defaultTheme = createDefaultTheme()
      const defaultColorConfig = createDefaultColorConfig()
      return {
        theme: props.config?.theme ?? defaultTheme,
        colors: {
          ...defaultColorConfig,
          ...props.config?.colors
        }
      }
    })

    provide(AppConfigInjectKey, config)

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
    AppConfigInjectKey, computed(() => createDefaultConfig())
  )
}

export {
  AppConfigProvider,
  useAppConfig
}
