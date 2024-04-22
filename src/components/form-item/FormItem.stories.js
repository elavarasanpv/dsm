import { FFormItem, FInput } from '../../index.js'

export default {
  title: 'Components/Inputs/FormItem',
  component: FFormItem,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FFormItem, FInput },
  data: () => ({ val: '' }),
  template: `<FFormItem label="Phone Number"><FInput v-model="val" ></FInput></FFormItem>`,
})

export const Default = Template.bind({})
