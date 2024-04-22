import { FMenuItem } from '../../index.js'

export default {
  title: 'Components/Navigation/MenuItem',
  component: FMenuItem,
  argTypes: {
    isSelected: { type: 'boolean' },
    unselectable: { type: 'boolean' },
    isMultiSelect: { type: 'boolean' },
    childrenAvailable: { type: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FMenuItem },
  template: `
  <FMenuItem
    :isSelected="isSelected"
    :unselectable="unselectable"
    :isMultiSelect="isMultiSelect"
    :childrenAvailable="childrenAvailable"
  >
   Menu Item
  </FMenuItem>
  `,
})

export const Default = Template.bind({})
