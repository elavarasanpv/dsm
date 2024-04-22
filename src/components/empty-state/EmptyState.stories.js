import { FEmptyState, FButton, FText, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/EmptyState',
  component: FEmptyState,
  argTypes: {
    title: { control: 'text', defaultValue: 'No Planned Items found.' },
    description: {
      control: 'text',
      defaultValue:
        'It seems that there are no items currently planned for this service order',
    },
    vertical: {
      control: 'boolean',
      defaultValue: true,
    },
    size: {
      options: ['S', 'M'],
      control: { type: 'radio' },
      defaultValue: 'M',
    },
    type: {
      options: ['wide', 'narrow'],
      control: { type: 'radio' },
      defaultValue: 'wide',
    },
    illustration: {
      options: [
        'add-item',
        'no-result',
        'broken-location',
        'end-of-list',
        'location',
        'no-activities',
        'no-data',
        'no-documents-found',
        'no-entries',
        'server',
        'no-data-on-dashboard',
        'enable-camera',
        'enable-location',
      ],
      control: { type: 'radio' },
      defaultValue: 'no-entries',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FEmptyState, FButton, FText, FContainer },
  template: `
  <FContainer display="flex" justifyContent="center">
    <FContainer width="800px">
      <FEmptyState :illustration="illustration" :title="title" :description="description" :vertical="vertical" :size="size" :type="type">
        <template #buttons>
          <FButton appearance='secondary'>Add Item</FButton>
        </template>
      </FEmptyState>
      </FContainer>
  </FContainer>
  `,
})

export const Default = Template.bind({})
