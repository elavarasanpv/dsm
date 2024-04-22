import { FInlineEdit } from '../../index.js'

export default {
  title: 'Components/Inputs/InlineEdit',
  component: FInlineEdit,
  argTypes: {
    placeholder: { control: 'text', defaultValue: 'Enter a name' },
    appearance: { control: 'text', defaultValue: 'headingMed20' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FInlineEdit },
  data: () => ({ val: '' }),
  methods: {
    changeInput() {
      console.log('changed')
    },
  },
  template: `<FInlineEdit @change="changeInput" v-model="val"  :appearance="appearance" :placeholder="placeholder"/>`,
})

export const Default = Template.bind({})
