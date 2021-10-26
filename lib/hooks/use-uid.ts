import { getCurrentInstance } from 'vue'

const useUid = () => {
  const uid = getCurrentInstance()?.uid ?? -1
  return {
    uid
  }
}

export {
  useUid
}
