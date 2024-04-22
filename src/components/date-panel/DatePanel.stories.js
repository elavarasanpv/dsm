import { FDatePanel, FContainer } from '../../index.js'

export default {
  title: 'Components/Inputs/DatePanel',
  component: FDatePanel,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDatePanel, FContainer },
  template: `
  <FContainer width="300px" boxShadow="lightMed" borderRadius="high">
    <FDatePanel :referenceDate="new Date()" />
  </FContainer>

  `,
})

export const Default = Template.bind({})
