import { defineComponent, ref } from 'vue'
import { LctCard, LctCheckbox, LctProgressCircular, LctProgressLinear } from '../../lib'

const style = {
  circularProgress: {
    margin: '0 10px'
  },
  linearProgress: {
    margin: '15px 0'
  }
}

const ProgressShowcase = defineComponent({
  setup () {
    const isIndeterminate = ref(true)

    return () => (
      <LctCard title='Progress' withMargin>
        <div>
          <LctProgressCircular style={style.circularProgress} />
          <LctProgressCircular class='primary-text' style={style.circularProgress} size={30} />
          <LctProgressCircular class='warning-text' style={style.circularProgress} size={40} />
          <LctProgressCircular class='error-text' style={style.circularProgress} size={50} />
          <LctProgressCircular class='success-text' style={style.circularProgress} size={60} />
        </div>

        <div style='margin-top: 50px'>
          <div>
            <LctCheckbox v-model={isIndeterminate.value} label='Loading' value={true}/>
          </div>

          <div>
            <LctProgressLinear style={style.linearProgress} indeterminate={isIndeterminate.value} />
            <LctProgressLinear class='primary-text' style={style.linearProgress} indeterminate={isIndeterminate.value} />
            <LctProgressLinear class='warning-text' style={style.linearProgress} height={5} indeterminate={isIndeterminate.value} />
            <LctProgressLinear class='error-text' style={style.linearProgress} height={10} indeterminate={isIndeterminate.value} />
            <LctProgressLinear class='success-text' style={style.linearProgress} height={20} indeterminate={isIndeterminate.value} />
          </div>
        </div>
      </LctCard>
    )
  }
})

export {
  ProgressShowcase
}
