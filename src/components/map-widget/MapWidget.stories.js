import { FMapWidget, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/MapWidget',
  component: FMapWidget,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    title: {
      control: 'text',
      defaultValue:
        'DSM provides plenty of UI components to enrich your web applications',
    },
    description: {
      control: 'text',
      defaultValue: 'This is a sample description ',
    },
    moreDetails: {
      type: 'boolean',
      default: false,
    },
    showRightIcon: {
      type: 'boolean',
      default: false,
    },
  },
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FMapWidget, FContainer },
  methods: {
    selectedColors() {
      console.log('direction')
    },
  },
  template: `<FContainer width="300px"><FMapWidget :size="size" :title="title" :description="description" :showRightIcon="showRightIcon" :moreDetails="moreDetails" @onDirectionClick="selectedColors"/></FContainer>`,
})

export const Default = Template.bind({})
