import { createDefaultColorConfig, LancetColorConfig } from './color'
import { createDefaultTheme, LancetTheme } from './theme'

/**
 * 程序全局配置.
 */
interface LancetAppConfig {
  /**
   * 当前主题.
   */
  theme: LancetTheme

  /**
   * 主题色设置.
   */
  colors: LancetColorConfig
}

const createDefaultAppConfig = (): LancetAppConfig => {
  return {
    theme: createDefaultTheme(),
    colors: createDefaultColorConfig()
  } as LancetAppConfig
}

export {
  LancetAppConfig,
  createDefaultAppConfig
}
