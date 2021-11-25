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
      primary: '#70afd1',
      warning: '#eb9253',
      error: '#e33422',
      success: '#75b97d'
    }
  }
}

export {
  LancetColorScheme,
  LancetColorConfig,
  createDefaultColorConfig
}
