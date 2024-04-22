import { FTimeline, FText, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/Timeline',
  component: FTimeline,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTimeline, FText, FContainer },
  data: () => ({
    tabsLists: [
      { id: 1, label: 'Timeline' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
    ],
  }),
  template: `<FTimeline :records="tabsLists">
  <template #default="data"><FContainer><FText>{{data.id}}{{data.label}}</FText></FContainer>
  </template></FTimeline>`,
})

export const Default = Template.bind({})
