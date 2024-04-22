import { FCheckboxGroup } from '../../index.js'

export default {
  title: 'Components/Inputs/CheckboxGroup',
  component: FCheckboxGroup,
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
  components: { FCheckboxGroup },
  data: () => ({ val: ['461'] }),
  mounted() {
    this.val = ['461', '2']
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
  },
  template: `<FCheckboxGroup @change="onChange" v-model="val" :alignment="alignment"  :options="[
    { label: 'Choice 1', value: 461 },
    { label: 'Choice 2', value: 2 },
    { label: 'Choice 3', value: 3 },
    { label: 'Choice 4', value: 4,disabled:true },
    { label: 'Choice 4', value: 5 },
    { label: 'Choice 4', value: 6 },
    { label: 'Choice 4', value: 7 },
    { label: 'Choice 4', value: 8 },
  ]"/>`,
})

export const Default = Template.bind({})
