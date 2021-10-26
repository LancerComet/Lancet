import { randomString } from './random'

function getStyleElement (id: string) {
  return document.getElementById(id) as HTMLStyleElement | null
}

function injectCssStyle (cssString: string): string {
  const id = `lct-style-${randomString(10).toLowerCase()}`
  const element = document.createElement('style')
  element.id = id
  element.innerHTML = cssString.trim()
  document.head.appendChild(element)
  return id
}

function updateCssStyle (id: string, cssString: string) {
  const element = getStyleElement(id)
  if (element) {
    element.innerHTML = cssString
  }
}

function removeCssStyle (id: string) {
  const element = getStyleElement(id)
  if (element) {
    document.head.removeChild(element)
  }
}

export {
  injectCssStyle,
  updateCssStyle,
  removeCssStyle
}
