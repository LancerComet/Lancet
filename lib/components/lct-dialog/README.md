# LctDialog

LctDialog 是弹窗组件.

## Quick start

```tsx
const MyComponent = defineComponent({
  setup () {
    const isDisplay = ref(false)

    return () => (
      <div>
        <LctDialog v-model={isDisplay}/>
      </div>
    )
  }
})
```

## 使用回调事件

可以通过 onConfirm 与 onCancel 来注册回调事件.

当注册事件后, 用户点击按钮不会主动关闭弹窗, 需要手动调取事件参数中的 close 方法来关闭弹窗.

未注册事件时, 用户点击按钮将直接关闭弹窗.

```tsx
// 向 onConfirm 注册事件.

const MyComponent = defineComponent({
  setup () {
    const isDisplay = ref(false)
    
    const onConfirm = async dialog => {
      await submitData()
      dialog.close()
    }
    
    return () => (
      <div>
        <LctDialog v-model={isDisplay} onConfirm={onConfirm} />
      </div>
    )
  }
})
```

## 锁定弹窗

可以使用事件参数中的 `setLockStatus` 可以锁定 / 解锁弹窗按钮状态.

默认情况下, 当用户点击按钮后, 弹窗将自动锁定并等待回调函数执行完毕后解锁, 不过您可以使用此方法手动操作.

```tsx
const MyComponent = defineComponent({
  setup () {
    const isDisplay = ref(false)
    
    const onConfirm = async dialog => {
      dialog.setLockStatus(true)
      await doSomething()
      dialog.setLockStatus(false)
      dialog.close()
    }
    
    return () => (
      <div>
        <LctDialog v-model={isDisplay} onConfirm={onConfirm} />
      </div>
    )
  }
})
```
