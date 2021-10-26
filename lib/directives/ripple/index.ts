/**
 * V-Ripple directive.
 * From Vuetify.
 * https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/directives/ripple
 */

// Styles
import './index.styl'

// Types
import { DirectiveBinding } from 'vue'

const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
})

type RippleEvent = MouseEvent | TouchEvent | KeyboardEvent

type RippledHTMLElement = HTMLElement & {
  _ripple?: {
    enabled: boolean
    circle: unknown
    touched: boolean
    isTouch: boolean
    centered: boolean
    class: string
  }
}

function transform (el: HTMLElement, value: string) {
  el.style.transform = value
  el.style.webkitTransform = value
}

function opacity (el: HTMLElement, value: number) {
  el.style.opacity = value.toString()
}

export interface RippleOptions {
  class?: string
  center?: boolean
  circle?: boolean
  ios?: boolean
  stop?: boolean
}

let _stopPropagation = true

function isTouchEvent (e: RippleEvent): e is TouchEvent {
  return e.constructor.name === 'TouchEvent'
}

function isKeyboardEvent (e: RippleEvent): e is KeyboardEvent {
  return e.constructor.name === 'KeyboardEvent'
}

function getBrowerInfo () {
  const ua = window.navigator.userAgent
  const isAndroid = /Android/i.test(ua)
  const isIOS = /iPhone|iPad|iPod/i.test(ua)

  let versionArr: string[] = []
  if (isIOS) versionArr = ua.match(/OS\s([0-9_]*)/i) || []
  if (isAndroid) versionArr = ua.match(/Android\s([0-9.]*)/i) || []
  const version = (versionArr && versionArr.length) ? versionArr[1].replace(/_/g, '.') : ''

  return {
    isIOS,
    isAndroid,
    version
  }
}

function isSupport () {
  const { isIOS, version, isAndroid } = getBrowerInfo()
  const resVersion = window.parseInt(version)
  return (isIOS && resVersion >= 10) || (isAndroid && resVersion >= 5) || (!isAndroid && !isIOS)
}

function isEmpty (str: unknown) {
  return typeof str === 'undefined' || str === null || str === ''
}

const calculate = (
  e: RippleEvent,
  el: RippledHTMLElement,
  value: RippleOptions = {}
) => {
  let localX = 0
  let localY = 0

  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect()
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e

    localX = target.clientX - offset.left
    localY = target.clientY - offset.top
  }

  let radius = 0
  let scale = 0.3
  if (el._ripple && el._ripple.circle) {
    scale = 0.15
    radius = el.clientWidth / 2
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2
  }

  const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`
  const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`

  const x = value.center ? centerX : `${localX - radius}px`
  const y = value.center ? centerY : `${localY - radius}px`

  return { radius, scale, x, y, centerX, centerY }
}

const ripples = {
  /* eslint-disable max-statements */
  show (
    e: RippleEvent,
    el: RippledHTMLElement,
    value: RippleOptions = {}
  ) {
    if (!el._ripple || !el._ripple.enabled) {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'v-ripple__container'

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value)

    const size = `${radius * 2}px`
    animation.className = 'v-ripple__animation'
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    const computed = window.getComputedStyle(el)
    if (computed && computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('v-ripple__animation--enter')
    animation.classList.add('v-ripple__animation--visible')
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`)
    opacity(animation, 0)
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter')
      animation.classList.add('v-ripple__animation--in')
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
      opacity(animation, 0.25)
    }, 0)
  },

  hide (el: RippledHTMLElement | null) {
    if (!el || !el._ripple || !el._ripple.enabled) return

    const ripples = el.getElementsByClassName('v-ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1] as HTMLElement

    if (animation.dataset.isHiding) return
    else animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in')
      animation.classList.add('v-ripple__animation--out')
      opacity(animation, 0)

      setTimeout(() => {
        const ripples = el.getElementsByClassName('v-ripple__animation')
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }
        animation.parentNode && el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  }
}

function isRippleEnabled (value: unknown): value is true {
  return typeof value === 'undefined' || !!value
}

function rippleShow (e: RippleEvent) {
  if (_stopPropagation) e.stopPropagation()
  const value: RippleOptions = {}
  const element = e.currentTarget as RippledHTMLElement
  if (!element || !element._ripple || element._ripple.touched) return
  if (isTouchEvent(e)) {
    element._ripple.touched = true
    element._ripple.isTouch = true
  } else {
    // It's possible for touch events to fire
    // as mouse events on Android/iOS, this
    // will skip the event call if it has
    // already been registered as touch
    if (element._ripple.isTouch) return
  }
  value.center = element._ripple.centered || isKeyboardEvent(e)
  if (element._ripple.class) {
    value.class = element._ripple.class
  }
  ripples.show(e, element, value)
}

function rippleHide (e: Event) {
  if (_stopPropagation) e.stopPropagation()
  const element = e.currentTarget as RippledHTMLElement | null
  if (!element || !element._ripple) return

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false
    }
  })
  ripples.hide(element)
}

function rippleCancelShow (e: MouseEvent | TouchEvent) {
  const element = e.currentTarget as RippledHTMLElement | undefined
  if (!element || !element._ripple || !isTouchEvent(e)) return

  const offset = element.getBoundingClientRect()
  const target = e.touches[e.touches.length - 1]
  const minX = offset.left
  const minY = offset.top
  const maxX = offset.left + offset.width
  const maxY = offset.top + offset.height
  if (target.clientX < minX || target.clientX > maxX || target.clientY < minY || target.clientY > maxY) {
    rippleHide(e)
  }
}

let keyboardRipple = false

function keyboardRippleShow (e: KeyboardEvent) {
  if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
    keyboardRipple = true
    rippleShow(e)
  }
}

function keyboardRippleHide (e: KeyboardEvent) {
  keyboardRipple = false
  rippleHide(e)
}

function updateRipple (el: RippledHTMLElement, binding: DirectiveBinding, wasEnabled: boolean) {
  const enabled = isRippleEnabled(binding.value)
  if (!enabled) {
    ripples.hide(el)
  }

  const ripple = el._ripple || Object.create(null)
  ripple.enabled = enabled
  const value = binding.value || {}
  if (value.center) {
    ripple.centered = true
  }
  if (value.class) {
    ripple.class = binding.value.class
  }
  if (value.circle) {
    ripple.circle = value.circle
  }
  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', rippleShow, { passive: true })
    el.addEventListener('touchend', rippleHide, { passive: true })
    el.addEventListener('touchmove', rippleCancelShow, { passive: true })
    el.addEventListener('touchcancel', rippleHide)

    el.addEventListener('mousedown', rippleShow)
    el.addEventListener('mouseup', rippleHide)
    el.addEventListener('mouseleave', rippleHide)

    el.addEventListener('keydown', keyboardRippleShow)
    el.addEventListener('keyup', keyboardRippleHide)

    // Anchor tags can be dragged, causes other hides to fail - #1537
    el.addEventListener('dragstart', rippleHide, { passive: true })
  } else if (!enabled && wasEnabled) {
    removeListeners(el)
  }
  el._ripple = ripple
}

function removeListeners (el: HTMLElement) {
  el.removeEventListener('mousedown', rippleShow)
  el.removeEventListener('touchstart', rippleShow)
  el.removeEventListener('touchend', rippleHide)
  el.removeEventListener('touchmove', rippleCancelShow)
  el.removeEventListener('touchcancel', rippleHide)
  el.removeEventListener('mouseup', rippleHide)
  el.removeEventListener('mouseleave', rippleHide)
  el.removeEventListener('keydown', keyboardRippleShow)
  el.removeEventListener('keyup', keyboardRippleHide)
  el.removeEventListener('dragstart', rippleHide)
}

function directive (el: RippledHTMLElement, binding: DirectiveBinding) {
  const { isIOS } = getBrowerInfo()
  const value = binding.value || {}
  if (!value.ios && isIOS) return
  if (!isSupport()) return

  _stopPropagation = isEmpty(value.stop) ? true : value.stop

  updateRipple(el, binding, false)

  // if (process.env.NODE_ENV === 'development') {
  //   // warn if an inline element is used, waiting for el to be in the DOM first
  //   node.context && node.context.$nextTick(() => {
  //     const computed = window.getComputedStyle(el)
  //     if (computed && computed.display === 'inline') {
  //       const context = (node as any).fnOptions ? [(node as any).fnOptions, node.context] : [node.componentInstance]
  //       console.warn('v-ripple can only be used on block-level elements', ...context)
  //     }
  //   })
  // }
}

function unbind (el: RippledHTMLElement) {
  delete el._ripple
  removeListeners(el)
}

function updated (el: RippledHTMLElement, binding: DirectiveBinding) {
  if (binding.value === binding.oldValue) {
    return
  }

  const wasEnabled = isRippleEnabled(binding.oldValue)
  updateRipple(el, binding, wasEnabled)
}

const Ripple = {
  beforeMount: directive,
  unmounted: unbind,
  updated
}

export {
  Ripple
}
