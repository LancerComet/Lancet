function preventDefault (event: Event) {
  event.preventDefault()
}

function stopPropagation (event: Event) {
  event.stopPropagation()
}

function preventKeys (...keys: string[]) {
  return (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      event.preventDefault()
    }
  }
}

export {
  preventDefault,
  stopPropagation,
  preventKeys
}
