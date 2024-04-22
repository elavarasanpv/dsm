import { FTimeWidget, FIcon, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/TimeWidget',
  component: FTimeWidget,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    title: {
      type: 'text',
      defaultValue: 'Table Name',
    },
    description: {
      type: 'text',
      defaultValue: '',
    },
    showRightAction: {
      type: 'boolean',
      defaultValue: true,
    },
    showLIcon: {
      type: 'boolean',
      defaultValue: false,
    },
    showInfoIcon: {
      type: 'boolean',
      defaultValue: false,
    },
    tooltipText: {
      type: 'text',
      defaultValue: 'Table info icon',
    },
    showTag: {
      type: 'boolean',
      defaultValue: false,
    },
    showTab: {
      type: 'boolean',
      defaultValue: false,
    },
    record: {
      type: 'array',
      defaultValue: [
        {
          title: 'Scheduled',
          rightText: '12:00 pm',
          leftText: '01:00 pm',
          linkIcon: {
            group: 'navigation',
            name: 'right',
          },
          rightSubText: '01/02/2013',
          leftSubText: '03/04/2023',
          middleText: '10h 13min',
          middleIcon: {
            group: 'time-date',
            name: 'start-time',
          },
        },
        {
          title: 'Scheduled',
          rightText: '20 KM in road',
          leftText: '35 KM',
          linkIcon: {
            group: 'navigation',
            name: 'right',
          },
          rightSubText: '01/02/2013',
          leftSubText: '03/04/2023',
          middleText: '10h 13min',
          middleIcon: {
            group: 'time-date',
            name: 'start-time',
          },
        },
        {
          title: 'Scheduled',
          rightText: '30 kWh',
          leftText: '40 kWh',
          linkIcon: {
            group: 'navigation',
            name: 'right',
          },
          rightSubText: '01/02/2013',
          leftSubText: '03/04/2023',
          middleText: '10h 13min',
          middleIcon: {
            group: 'time-date',
            name: 'start-time',
          },
        },
        {
          title: 'Scheduled',
          rightText: '15 watts',
          leftText: '45 watts',
          linkIcon: {
            group: 'navigation',
            name: 'right',
          },
          rightSubText: '01/02/2013',
          leftSubText: '03/04/2023',
          middleText: '10h 13min',
          middleIcon: {
            group: 'time-date',
            name: 'start-time',
          },
        },
      ],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTimeWidget, FIcon, FContainer },
  data: () => ({
    leftIcon: {
      group: 'default',
      name: 'contact',
    },
    tag: [{ text: 'tag label', variant: 'simple' }],
    tabsLists: [
      { label: 'Label-1', value: '1' },
      { label: 'Label-2', value: '2' },
      {
        label: 'Lab',
        value: '3',
        iconGroup: 'communication',
        iconName: 'mail',
        path: '/www.w3schools.com',
      },
      { label: 'Label-4', value: '4' },
      { value: '5', iconGroup: 'communication', iconName: 'mail' },
    ],
    selected: '4',
  }),
  template: `<FContainer width="300px"><FTimeWidget v-model="selected" :size="size" :record="record" :title="title"  :tabsList="tabsLists"  :leftIconProps="leftIcon" :tags="tag" :description="description" :showRightAction="showRightAction" :showLIcon="showLIcon" :showInfoIcon="showInfoIcon"
  :tooltipText="tooltipText" :showTag="showTag" :showTab="showTab"
  ><template #rightAction><FIcon group="dsm" name="open-window" size="16"></FIcon></template></FTimeWidget></FContainer>`,
})

export const Default = Template.bind({})
