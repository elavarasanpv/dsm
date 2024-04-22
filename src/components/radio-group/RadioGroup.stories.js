import { FRadioGroup } from '../../index.js'

export default {
  title: 'Components/Inputs/RadioGroup',
  component: FRadioGroup,
  argTypes: {
    alignment: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
      defaultValue: 'vertical',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FRadioGroup },
  data: () => ({ val: [] }),
  methods: {
    onChange(value) {
      console.log(value)
    },
  },
  template: `<FRadioGroup :alignment="alignment" v-model="val" :options="[
    { label: 'Choice 1', value: 1 },
    { label: 'Choice 2', value: 2 },
    { label: 'Choice 3', value: 3 },
    { label: 'Choice 4', value: 4,disabled:true },
    { label: 'Choice 4', value: 5 },
    { label: 'Choice 4', value: 6 },
    { label: 'Choice 4', value: 7 },
    { label: 'Choice 4', value: 8 },
  ]" />`,
})

export const Default = Template.bind({})
