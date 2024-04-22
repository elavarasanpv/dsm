import { FRadio } from '../../index.js'

export default {
  title: 'Components/Inputs/Radio',
  component: FRadio,
  argTypes: {
    children: { control: 'text' },
    disabled: { type: 'boolean' },
    checked: { type: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FRadio },
  template: `<FRadio :disabled="disabled" v-model="checked">{{ children }}</FRadio>`,
})

export const Default = Template.bind({})
