import { defineComponent, ref } from 'vue'
import {
  LctBtn, LctCard, LctCheckbox, LctDatepicker, LctForm,
  LctInput, LctRadio, LctRadioGroup, LctSelect,
  LctTextfield, LctColorScheme, useDialog,
  useToast
} from '../../lib'
import { isString } from '../../lib/utils/type'
import { Rule } from '../../lib/utils/validator'
import { User, UserGender } from './form-showcase.model'

const FormShowcase = defineComponent({
  setup () {
    const userInput = ref(new User())
    const isDataValid = ref(false)
    const formRef = ref<InstanceType<typeof LctForm>>()

    const { createDialog } = useDialog()
    const { createToast } = useToast()

    const validator: {
      [key: string]: Rule[]
    } = {
      username: [
        v => (isString(v) && v.length > 0 && v.length <= 10) || '用户名长度为 1-10.'
      ],
      password: [
        v => (isString(v) && v.length > 0 && v.length <= 10) || '密码长度为 1-10.'
      ],
      gender: [
        v => (isString(v) && Object.values(UserGender).includes(v)) || '请选择正确的选项'
      ],
      country: [
        v => (isString(v) && v.length > 0) || '请选择一个国家.'
      ]
    }

    const onSubmit = () => {
      createDialog({
        title: '测试弹窗',
        component: () => (
          <div>
            <h2 style='margin: 0 0 10px 0'>准备提交</h2>
            <div>请点击确定提交数据.</div>
          </div>
        ),
        onConfirm: async dialog => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          dialog.close()
          createToast('操作成功.', LctColorScheme.Success)
        }
      })
    }

    const countryOptions = [
      { text: '美国', value: 'us' },
      { text: '日本', value: 'jp' }
    ]

    const onValidateButtonClick = () => {
      formRef.value?.validate()
    }

    return () => (
      <LctCard title='表单' withMargin>
        <LctForm v-model={isDataValid.value} onSubmit={onSubmit} ref={formRef}>
          <LctTextfield
            v-model={userInput.value.username}
            placeholder='用户名是登录使用的凭据.'
            label='用户名'
            rules={validator.username}
            icon='person' required
          />

          <LctTextfield
            v-model={userInput.value.password}
            type='password' icon='vpn_key'
            placeholder='密码是登录使用的凭据.' label='密码'
            rules={validator.password}
            required
          />

          <LctRadioGroup
            v-model={userInput.value.gender}
            rules={validator.gender}
            icon='face' label='性别' required
          >
            <LctRadio value={UserGender.Male} label={User.getGenderLabel(UserGender.Male)} color={LctColorScheme.Primary} />
            <LctRadio value={UserGender.Female} label={User.getGenderLabel(UserGender.Female)} />
            <LctRadio value={UserGender.Unknown} label={User.getGenderLabel(UserGender.Unknown)} />
          </LctRadioGroup>

          <LctSelect
            label='国家' icon='place'
            v-model={userInput.value.country}
            items={countryOptions}
            rules={validator.country}
            required
          />

          <div style='display: flex; align-items: center'>
            <LctDatepicker
              label='生日' icon='cake'
              v-model={userInput.value.birthday}
              disabled={userInput.value.isBirthdayUnknown}
              yearRange={[1900, 2099]}
              displayFormat='YYYY-MM-DD HH:mm'
            />
            <LctInput style='margin-left: 10px'>
              <LctCheckbox
                label='未知'
                v-model={userInput.value.isBirthdayUnknown}
                value={true}
              />
            </LctInput>
          </div>

          <div>
            <LctBtn type='submit' color={LctColorScheme.Primary}>提交</LctBtn>
            <LctBtn outlined onClick={onValidateButtonClick}>验证</LctBtn>
          </div>
        </LctForm>
      </LctCard>
    )
  }
})

export {
  FormShowcase
}
