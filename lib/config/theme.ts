enum LancetTheme {
  Light = 'light',
  Dark = 'dark'
}

function createDefaultTheme (): LancetTheme {
  return LancetTheme.Light
}

export {
  LancetTheme,
  createDefaultTheme
}
