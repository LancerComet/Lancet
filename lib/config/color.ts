enum LctColorScheme {
  Primary = 'primary',
  Warning = 'warning',
  Error = 'error',
  Success = 'success'
}

interface LctColorConfig {
  tonal: {
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

function createDefaultColorConfig (): LctColorConfig {
  return {
    tonal: {
      primary: '#C3E8FD',
      warning: '#ffefcc',
      error: '#ffcabe',
      success: '#d8f3d8'
    },
    text: {
      primary: '#62889d',
      warning: '#eb9253',
      error: '#e33422',
      success: '#75b97d'
    }
  }
}

export {
  LctColorScheme,
  LctColorConfig,
  createDefaultColorConfig
}
