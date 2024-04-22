import { FBadge } from '../../index.js'

export default {
  title: 'Components/Display/Badge',
  component: FBadge,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FBadge },
  template: `<FBadge :content="111" :max="11" shape="square"/>`,
})

export const Default = Template.bind({})
