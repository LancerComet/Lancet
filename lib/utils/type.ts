function isString (target: unknown): target is string {
  return typeof target === 'string'
}

function isNumber (target: unknown): target is number {
  return typeof target === 'number'
}

function isFunction (target: unknown): target is (...args: unknown[]) => unknown {
  return typeof target === 'function'
}

function isUndefined (target: unknown): target is undefined {
  return typeof target === 'undefined'
}

function isNull (target: unknown): target is null {
  return target === null
}

function isArray (target: unknown): target is unknown[] {
  return Array.isArray(target)
}

function isEmptyString (target: unknown): target is null | '' | undefined {
  return isNull(target) || target === '' || isUndefined(target)
}

function isUnEmptyString (target: unknown): target is string {
  return isString(target) && target !== ''
}

type plainObject = { [key: string]: unknown }

function isObject (target: unknown): target is plainObject {
  return typeof target === 'object' && target !== null && !isUndefined(target) && !isArray(target)
}

export {
  isNumber,
  isString,
  isFunction,
  isUndefined,
  isNull,
  isArray,
  isObject,
  isEmptyString,
  isUnEmptyString
}
