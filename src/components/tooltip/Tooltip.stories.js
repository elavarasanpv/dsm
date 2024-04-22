import { FTooltip, FText, FIcon } from '../../index.js'

export default {
  title: 'Components/Display/Tooltip',
  component: FTooltip,
  argTypes: {
    title: { type: 'text' },
    placement: {
      options: [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
      control: { type: 'radio' },
      defaultValue: 'bottom',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTooltip, FText, FIcon },
  template: `<FTooltip :placement="placement" >
  <template slot="title">
  Tooltip text goes here
  </template>
  
  <FIcon
  group="default"
  name="trash-can"
  size="14"
  :pressable="false"
/>
</FTooltip>`,
})

export const Default = Template.bind({})
