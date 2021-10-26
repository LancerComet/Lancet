enum LancetColorScheme {
  Primary = 'primary',
  Warning = 'warning',
  Error = 'error',
  Success = 'success'
}

interface LancetColorConfig {
  primary?: string
  error?: string
  success?: string
  warning?: string
}

function createDefaultColorConfig (): LancetColorConfig {
  return {
    primary: '#32aaff',
    warning: '#fb8c00',
    error: '#fa5a57',
    success: '#4caf50'
  }
}

export {
  LancetColorScheme,
  LancetColorConfig,
  createDefaultColorConfig
}
