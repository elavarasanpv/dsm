import { FContainer, FText } from '../../index.js'

export default {
  title: 'Components/Surfaces/Container',
  component: FContainer,
  parameters: {
    docs: {
      description: {
        component:
          'FContainer is a low level html element, which provides all the design system tokens as attributes. Only a few attributes are defined as an example below, but in practice we can use all the css styles as attributes. Also we have pseudo selectors like `hover` & `focus`, which can be provided as an attribute like `hover-color`, this changes the color of the FContainer on hover.',
      },
    },
  },
  argTypes: {
    tag: {
      control: 'text',
      description: 'Any html tag name, like `a`, `img`, `div`, `label`',
    },
    backgroundColor: {
      control: 'text',
      defaultValue: 'backgroundSemanticRedSubtle',
    },
    border: { control: 'text', defaultValue: 'none' },
    borderColor: { control: 'text', defaultValue: 'white' },
    borderRadius: { control: 'text', defaultValue: 'medium' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FContainer, FText },
  template: `
  <FContainer
  :tag="tag"
    gradient="grey"
    :backgroundColor="backgroundColor"
    :border="border"
    :borderColor="borderColor"
    :borderRadius="borderRadius"
    hover-backgroundColor="backgroundMidgroundDark"
    padding="containerLarge containerXxLarge"
    margin="containerSmall containerXxLarge"
    rowGap="containerLarge"
    columnGap="containerXxLarge"
  >
    <FText>FContainer Box</FText>
  </FContainer>
  `,
})

export const Default = Template.bind({})
