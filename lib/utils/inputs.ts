function stopClick (event: Event) {
  event.stopPropagation()
}

function isKeyEnterOrSpace (key: string) {
  return key === ' ' || key === 'Enter'
}

function isEscKey (key: string) {
  return key === 'Escape'
}

function isArrowUp (key: string) {
  return key === 'ArrowUp'
}

function isArrowDown (key: string) {
  return key === 'ArrowDown'
}

export {
  stopClick,
  isKeyEnterOrSpace,
  isEscKey,
  isArrowUp,
  isArrowDown
}
