function isEqual (v1: unknown, v2: unknown): boolean {
  if (typeof v1 !== typeof v2) {
    return false
  }

  // Array.
  if (Array.isArray(v1) && Array.isArray(v2)) {
    if (v1.length !== v2.length) {
      return false
    }

    for (let i = 0, length = v1.length; i < length; i++) {
      const item1 = v1[i]
      const item2 = v2[i]
      if (!isEqual(item1, item2)) {
        return false
      }
    }

    return true
  }

  // Object.
  if (isObject(v1) && isObject(v2)) {
    const keys1 = Object.keys(v1)
    const keys2 = Object.keys(v2)
    if (!isEqual(keys1, keys2)) {
      return false
    }

    const values1 = Object.values(v1)
    const values2 = Object.values(v2)

    return isEqual(values1, values2)
  }

  // Number, Boolean, String.
  return v1 === v2
}

function isObject (v: unknown): v is Record<string, unknown> {
  return Object.prototype.toString.call(v) === '[object Object]'
}

export {
  isEqual
}
