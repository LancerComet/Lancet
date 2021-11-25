import 'reflect-metadata'

import { defineComponent, createApp } from 'vue'

import 'material-icons/iconfont/material-icons.css'

import { Lancet, LctApp } from '../lib'
import { ButtonShowcase } from './components/button-showcase'
import { DialogShowcase } from './components/dialog-showcase'
import { DynamicThemeShowcase } from './components/dynamic-theme.showcase'
import { FormShowcase } from './components/form-showcase'
import { ProgressShowcase } from './components/progress-showcase'
import { SwitcherShowcase } from './components/switcher-showcase'
import { TableShowcase } from './components/table-showcase'
import { TabsShowcase } from './components/tabs-showcase'
import { ToastShowcase } from './components/toast-showcase'
import { TooltipShowcase } from './components/tooltip-showcase'
import { TypographyShowcase } from './components/typography-showcase'
import style from './index.module.styl'

const TestPage = defineComponent({
  setup () {
    return () => (
      <div class={style.testPage}>
        <div class={[style.background, 'primary-background']}/>

        <div class={style.contentContainer}>
          <h4>
            <span>Lancet</span>
            <br/>
            <small>A little tiny, Material 3 style Vue 3 UI component library.</small>
          </h4>

          <DynamicThemeShowcase />
          <TypographyShowcase />
          <ButtonShowcase />
          <SwitcherShowcase />
          <TabsShowcase />
          <FormShowcase />
          <TableShowcase />
          <DialogShowcase />
          <ToastShowcase />
          <ProgressShowcase />
          <TooltipShowcase />
        </div>
      </div>
    )
  }
})

const Layout = defineComponent({
  name: 'TestPage',
  setup () {
    return () => (
      <LctApp>
        <TestPage />
      </LctApp>
    )
  }
})

const app = createApp(Layout)
app.use(Lancet)
app.mount('#app')
