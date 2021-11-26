import { defineComponent } from 'vue'
import { LctBtn, LctCard, LctCardContent, LctNavView } from '../../lib'

import { ActionBar } from '../components/action-bar'
import { ButtonShowcase } from '../components/button-showcase'
import { DialogShowcase } from '../components/dialog-showcase'
import { DynamicThemeShowcase } from '../components/dynamic-theme.showcase'
import { FormShowcase } from '../components/form-showcase'
import { ProgressShowcase } from '../components/progress-showcase'
import { SwitcherShowcase } from '../components/switcher-showcase'
import { TableShowcase } from '../components/table-showcase'
import { TabsShowcase } from '../components/tabs-showcase'
import { ToastShowcase } from '../components/toast-showcase'
import { TooltipShowcase } from '../components/tooltip-showcase'
import { TypographyShowcase } from '../components/typography-showcase'

import style from './index.module.styl'

const AppLayout = defineComponent({
  setup () {
    const AppContent = () => (
      <LctCard>
        <LctCardContent>
          <h4>
            <span>Lancet</span>
            <br/>
            <small>A little tiny, Material 3 style Vue 3 UI component library.</small>
          </h4>

          <DynamicThemeShowcase />
          <ButtonShowcase />
          <SwitcherShowcase />
          <TypographyShowcase />
          <TabsShowcase />
          <FormShowcase />
          <TableShowcase />
          <DialogShowcase />
          <ToastShowcase />
          <ProgressShowcase />
          <TooltipShowcase />
        </LctCardContent>
      </LctCard>
    )

    const AppDrawer = () => (
      <div>
      </div>
    )

    return () => (
      <LctNavView
        class={style.appLayout}
        v-slots={{
          frame: AppContent,
          drawer: AppDrawer,
          actionBar: () => <ActionBar />
        }}
      />
    )
  }
})

export {
  AppLayout
}
