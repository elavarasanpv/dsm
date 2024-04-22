import { FCard, FContainer, FText } from '../../index.js'

export default {
  title: 'Components/Display/Card',
  component: FCard,
  argTypes: {
    header: { control: 'text', defaultValue: 'Workorder Details' },
    footer: { control: 'text', defaultValue: '' },
    hideBorder: { control: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FCard, FContainer, FText },
  template: `
  <FCard :header="header" :footer="footer" :hideBorder="hideBorder">
    <FContainer padding="containerXLarge">
      <FText>This is a sample card content</FText>
    </FContainer>
  </FCard>

  `,
})

export const Default = Template.bind({})
