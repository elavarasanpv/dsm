import { FDivider } from '../../index.js'

export default {
  title: 'Components/Display/Divider',
  component: FDivider,
  argTypes: {
    height: { control: 'text', defaultValue: '100px' },
    width: { control: 'text', defaultValue: '0px' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDivider },
  template: `<div><div style="padding:30px"><FDivider :height="height" :width="width"/><div>
  <div style="padding:30px"><FDivider width="100px" /><div><div>`,
})

export const Default = Template.bind({})
