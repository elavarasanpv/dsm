import { FWidgetCard, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/WidgetCard',
  component: FWidgetCard,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FWidgetCard, FContainer },
  template: `<FContainer height="400px" padding="containerXLarge" width="300px"><FWidgetCard :size="size">Widget card</FWidgetCard></FContainer>`,
})

export const Default = Template.bind({})
