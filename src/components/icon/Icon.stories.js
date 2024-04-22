import { FIcon } from '../../index.js'

export default {
  title: 'Components/Display/Icon',
  component: FIcon,
  argTypes: {
    pressable: { type: 'boolean', defaultValue: true },
    size: { control: 'text', defaultValue: '20' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FIcon },
  template: `<FIcon group="alert" name="circle-warning-filled" :size="size" :pressable="pressable"  color="textCaption"/>`,
})

export const Default = Template.bind({})
