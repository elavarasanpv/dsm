import { FNotification, FButton, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/Notification',
  component: { FNotification, FButton },
  argTypes: {
    intent: {
      options: ['success', 'warning', 'information', 'critical'],
      control: { type: 'radio' },
      defaultValue: 'success',
    },
    menuType: {
      options: ['toast', 'alerts'],
      control: { type: 'radio' },
      defaultValue: 'toast',
    },
    description: {
      control: 'text',
      defaultValue: 'This is a sample description',
    },
    title: { control: 'text', defaultValue: 'Sample Title' },
    rounded: { control: 'boolean', defaultValue: true },
    hideCloseIcon: { control: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FNotification, FButton, FContainer },
  template: `<FNotification :intent="intent" :menuType="menuType" :title="title" :rounded="rounded" :description="description" :hideCloseIcon="hideCloseIcon"> 
  <FContainer display="flex" gap="containerLarge" padding="containerNone containerLarge"><FButton appearance="secondary">Approve</FButton>
  <FButton appearance="tertiary">Reject</FButton></FContainer>
  </FNotification>`,
})

export const Default = Template.bind({})
