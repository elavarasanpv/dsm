import { FInput } from '../../index.js'

export default {
  title: 'Components/Inputs/Input',
  component: FInput,
  argTypes: {
    appearance: {
      options: ['default', 'minimal'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'large',
    },
    placeholder: { control: 'text', defaultValue: 'Enter a name' },
    disabled: { type: 'boolean' },
    autofocus: { type: 'boolean', defaultValue: false },
    wrap: { type: 'boolean', defaultValue: true },
    showAppend: { type: 'boolean', defaultValue: false },
    showPrepend: { type: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FInput },
  data: () => ({
    val: null,
    prependDetail: {
      text: 'Meter',
      name: 'info',
      group: 'action',
      chevron: true,
    },
    appendDetail: {
      text: 'kWh',
      disable: true,
    },
    dropdownVisibl: false,
    dro: false,
  }),
  watch: {
    dropdownVisibl: {
      handler(val) {
        console.log(val)
      },
    },
  },
  methods: {
    changeInput() {
      console.log('changed')
    },
  },
  template: `
    <FInput
      @change="changeInput"
      v-model="val"
      :appearance="appearance"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :wrap="wrap"
      :autofocus="autofocus"
      :showAppend="showAppend"
      :showPrepend="showPrepend"
      :prependDetails="prependDetail"
      :appendDetails="appendDetail"
      :openPrepend.sync="dropdownVisibl"
      :openAppend.sync="dro"
    ><template #prepend>Energy Meter</template><template #append>new app</template></FInput>

  `,
})

const Template2 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FInput },
  template: `<FInput :placeholder="placeholder"><template #suffix>Suf</template><template #prefix>Pre</template></FInput>`,
})

const Template3 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FInput },
  template: `<FInput :placeholder="placeholder"><template #clickable>Suf</template></FInput>`,
})

export const Default = Template.bind({})

export const WithPrefixAndSuffix = Template2.bind({})

export const WithCickable = Template3.bind({})
