import { FCheckbox } from '../../index.js'

export default {
  title: 'Components/Inputs/Checkbox',
  component: FCheckbox,
  argTypes: {
    children: { control: 'text' },
    disabled: { type: 'boolean' },
    checked: { type: 'boolean' },
    indeterminate: { type: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FCheckbox },
  template: `<FCheckbox :disabled="disabled" v-model="checked" :indeterminate="indeterminate">{{ children }}</FCheckbox>`,
})

export const Default = Template.bind({})
