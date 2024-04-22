import { FSwitch } from '../../index.js'

export default {
  title: 'Components/Inputs/Switch',
  component: FSwitch,
  argTypes: {
    size: {
      options: ['default', 'small'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
    disabled: { type: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSwitch },
  data: () => ({ val: false }),
  methods: {
    onChange(value) {
      console.log(value)
    },
  },
  template: `<FSwitch v-model="val" :disabled="disabled" @change="onChange" :size="size" />`,
})

export const Default = Template.bind({})
