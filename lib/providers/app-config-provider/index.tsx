import { computed, defineComponent, inject, PropType, provide, readonly, ref, Ref } from 'vue'
import { createDefaultAppConfig, LancetAppConfig } from '../../config/app-config'
import { randomString } from '../../utils/random'

type SetAppConfigFunc = (payload: Partial<LancetAppConfig>) => void

const AppConfigInjectKey = `appConfig_${randomString()}`
const SetAppConfigInjectKey = `setAppConfig_${randomString()}`

const DEFAULT_APP_CONFIG = createDefaultAppConfig()
Object.freeze(DEFAULT_APP_CONFIG)

const AppConfigProvider = defineComponent({
  name: 'AppConfigProvider',

  props: {
    config: {
      type: Object as PropType<Partial<LancetAppConfig>>
    }
  },

  setup (props, { slots }) {
    const userDefinedAppConfig = ref({
      ...props.config
    })

    const appConfig = computed<LancetAppConfig>(() => {
      return {
        ...DEFAULT_APP_CONFIG,
        ...userDefinedAppConfig.value
      }
    })

    const setAppConfig: SetAppConfigFunc = (payload: Partial<LancetAppConfig>) => {
      userDefinedAppConfig.value = { ...payload }
    }

    provide(AppConfigInjectKey, appConfig)
    provide(SetAppConfigInjectKey, setAppConfig)

    return () => (
      <>{ slots.default?.() }</>
    )
  }
})

/**
 * Get and set app config.
 * Only available within the <LctApp />.
 */
const useAppConfig = (): {
  appConfig: Readonly<Ref<LancetAppConfig>>
  setAppConfig: SetAppConfigFunc
  resetAppConfig: () => void
} => {
  const warn = () => console.warn('[Lancet] You have to call useAppConfig under <LctApp />.')

  const appConfig = inject<Ref<LancetAppConfig>>(
    AppConfigInjectKey,
    computed(() => {
      warn()
      return DEFAULT_APP_CONFIG
    })
  )

  const setAppConfig = inject<SetAppConfigFunc>(
    SetAppConfigInjectKey,
    () => warn()
  )

  const resetAppConfig = () => setAppConfig(DEFAULT_APP_CONFIG)

  return {
    appConfig: readonly(appConfig),
    setAppConfig,
    resetAppConfig
  }
}

export {
  AppConfigProvider,
  useAppConfig
}
