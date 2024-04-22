import { FContactWidget, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/ContactWidget',
  component: FContactWidget,
  argTypes: {
    size: {
      options: ['small', 'medium'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    title: {
      control: 'text',
      defaultValue: 'Contact',
    },
    contactDetails: {
      type: 'object',
      defaultValue: {
        userName: 'Mark Stonies Denmark',
        avatarUrl: 'https://placebear.com/g/200/200',
        email: 'system+altayer@facilio.com',
        phone: '+191-123-456-789',
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FContactWidget, FContainer },
  template: `<FContainer width='240px'><FContactWidget :size="size" :title="title" :contactDetails="contactDetails"/></FContainer>`,
})

export const Default = Template.bind({})
