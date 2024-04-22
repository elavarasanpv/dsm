import { FSpinner } from '../../index.js'

export default {
  title: 'Components/Display/Spinner',
  component: FSpinner,
  argTypes: {
    size: { control: 'number' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSpinner },
  template: `<FSpinner :size="size" />`,
})

export const Default = Template.bind({})
