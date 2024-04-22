import { FBulkToolbar, FButton, FContainer } from '../../index.js'

export default {
  title: 'Components/Navigation/BulkToolbar',
  component: FBulkToolbar,
  argTypes: {
    recordCount: { control: 'number', defaultValue: 20 },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FBulkToolbar, FButton, FContainer },
  template: `
  <FContainer margin="containerXxLarge">
  <FBulkToolbar :recordCount="recordCount">
    <FButton size="small" appearance="secondary">Delete</FButton>
  </FBulkToolbar>
  </FContainer>
`,
})

export const Default = Template.bind({})
