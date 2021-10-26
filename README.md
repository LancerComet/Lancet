# Lancet

A little tiny Vue 3 UI component library.

## Quick start

```tsx
import { defineComponent, createApp } from 'vue'
import { Lancet, LctApp, LctBtn } from 'lancet'

// Lancet uses Material Icons as its iconpack.
import 'material-icons/iconfont/material-icons.css'

const MyApp = defineComponent({
  setup () {
    return () => (
      <LctApp>
        <h1>My Awesome App</h1>
        <div>
          <LctBtn>Submit</LctBtn>
        </div>
      </LctApp>
    )
  }
})

const app = createApp(TestPage)
app.use(Lancet)
app.mount('#app')
```

## Components

Please check `lib/components` folder to see what kind of components we provide.

## Showcase

The showcase code is located in `dev` folder.

Checkout how the components work by launching the project with `npm run dev`.
