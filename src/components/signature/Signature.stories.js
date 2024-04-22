import { FSignature } from '../../index.js'

export default {
  title: 'Components/Inputs/Signature',
  component: FSignature,
  argTypes: {
    saving: { type: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSignature },
  methods: {
    changes(value) {
      console.log(value)
    },
  },
  template: `<FSignature @change='changes' :saving="saving" />`,
})

export const Default = Template.bind({})
