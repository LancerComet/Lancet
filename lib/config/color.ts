enum LancetColorScheme {
  Primary = 'primary',
  Warning = 'warning',
  Error = 'error',
  Success = 'success'
}

interface LancetColorConfig {
  color: {
    primary: string
    error: string
    success: string
    warning: string
  }
  text: {
    primary: string
    error: string
    success: string
    warning: string
  }
}

function createDefaultColorConfig (): LancetColorConfig {
  return {
    color: {
      primary: '#C3E8FD',
      warning: '#ffefcc',
      error: '#ffcabe',
      success: '#d8f3d8'
    },
    text: {
      primary: '#3f97c7',
      warning: '#eb9253',
      error: '#e33422',
      success: '#25932c'
    }
  }
}

export {
  LancetColorScheme,
  LancetColorConfig,
  createDefaultColorConfig
}
