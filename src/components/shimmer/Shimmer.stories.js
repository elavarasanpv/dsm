import { FShimmer } from '../../index.js'

export default {
  title: 'Components/Display/Shimmer',
  component: FShimmer,
  argTypes: {
    rounded: { type: 'boolean', defaultValue: false },
    height: { type: 'number', defaultValue: 40 },
    width: { type: 'number', defaultValue: 800 },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FShimmer },
  template: `<FShimmer :rounded="rounded" :height="height" :width="width"/>`,
})

export const Default = Template.bind({})
