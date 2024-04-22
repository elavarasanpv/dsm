import { FDuration } from '../../index.js'

export default {
  title: 'Components/Inputs/Duration',
  component: FDuration,
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'large',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDuration },
  data: () => ({ val: 8640000 }),
  template: `<FDuration v-model="val" :disabled="disabled" :size="size"/>`,
})

export const Default = Template.bind({})
