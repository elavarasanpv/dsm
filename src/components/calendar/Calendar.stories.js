import { FCalendar, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/Calendar',
  component: FCalendar,
  argTypes: {
    views: {
      options: ['month', 'week', 'day'],
      control: { type: 'radio' },
      defaultValue: 'month',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FCalendar, FContainer },
  data: () => ({
    availableView: ['month', 'week', 'day'],
    events: [
      {
        start: '2023-08-03 01:00',
        end: '2023-08-03 12:37',
        title: 'WO 1 hgjg ,vutyyguyiihlkhguy',
        bgColor: 'backgroundAccentBlueLight',
        displayStartTime: '01:06 AM',
        displayEndTime: '12:00 AM',
        class: 'eventClass0',
        isBorder: true,
        borderColor: 'backgroundAccentBlueMedium',
      },
      {
        start: '2023-06-26',
        end: '2023-06-26',
        title: 'Wo 11 new testinghjjgjhfgfh event',
        bgColor: 'backgroundAccentBlueLight',
        displayStartTime: '01:06 AM',
        displayEndTime: '12:00 AM',
        class: 'eventClass1',
      },
      {
        start: '2023-06-27',
        end: '2023-06-27',
        title: 'Wo 11 new testinghjjgjhfgfh ',
        bgColor: 'backgroundAccentBlueLight',
        displayStartTime: '01:06 AM',
        displayEndTime: '12:00 AM',
        class: 'eventClass1',
      },
      {
        start: '2023-06-17',
        end: '2023-06-17',
        title: 'more',
        totalEvent: 7,
        startDate: 1676576200000,
      },
      {
        start: '2023-06-18',
        end: '2023-06-18',
        title: 'more',
        totalEvent: 6,
        startDate: 1676658600000,
      },
      {
        start: '2023-06-22',
        end: '2023-06-27',
        title: 'Wo 2',
        bgColor: 'backgroundAccentBlueLight',
        displayStartTime: '12:00 AM',
        displayEndTime: '12:00 AM',
        class: 'eventClass4',
      },
      {
        start: '2023-06-03',
        end: '2023-06-03',
        title: 'Wo 98687',
        bgColor: 'backgroundAccentBlueLight',
        displayStartTime: '12:00 AM',
        displayEndTime: '12:00 AM',
        class: 'eventClass546535',
      },
      {
        start: '2023-06-22',
        end: '2023-06-22',
        title: 'more',
        totalEvent: 6,
        startDate: 1677004200000,
      },
    ],
  }),
  template: `<FContainer height=' calc(100vh - 30px)'><FCalendar :calendarView="views" :availableViews="availableView" :calendarEvents="events">
  <template #event="eve">
        <fc-icon group="user" name="user" size="12"></fc-icon>{{eve.title}}
      </template></FCalendar></FContainer>`,
})

export const Default = Template.bind({})
