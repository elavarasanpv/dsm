import {
  FTimelineFilter,
  FButton,
  FContainer,
  FSegmentedControl,
  FTabs,
} from '../../index.js'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

export default {
  title: 'Components/Navigation/TimelineFilter',
  component: FTimelineFilter,
  argTypes: {
    operatorId: { control: 'number' },
    offset: { control: 'number' },
    timeZone: { dataType: 'string', defaultValue: 'Asia/Tokyo' },
    emitOnInitialLoad: { type: 'boolean', defaultValue: true },
    selectType: {
      options: ['range', 'single'],
      control: { type: 'radio' },
      defaultValue: 'range',
    },
    dateType: {
      options: ['year', 'quater', 'month', 'week', 'day'],
      control: { type: 'radio' },
      defaultValue: 'day',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    FTimelineFilter,
    FButton,
    FContainer,
    FSegmentedControl,
    FTabs,
  },
  data: () => ({
    // val: [1702425600000, 1702511999000],
    val: [],
    time: {
      is12Hour: true,
    },
    dateTyp: 'day',
    start: 0,
    tabsLists: [
      // { label: 'H', value: 'day-time' },
      { label: 'D', value: 'day' },
      { label: 'W', value: 'week' },
      { label: 'M', value: 'month' },
      { label: 'Q', value: 'quarter' },
      { label: 'Y', value: 'year' },
    ],
    vales: 'day',
  }),
  created() {
    // setTimeout(() => {
    //   this.val = [1696098600000, 1698776999999]
    //   this.dateTyp = 'week'
    // }, 5000)
  },
  methods: {
    changeHandler(value, quick, dateType) {
      console.log(value, quick, dateType, '@change')
      console.log(
        dayjs.tz(value[0], this.timeZone).format(),
        dayjs.tz(value[1], this.timeZone).format()
      )
    },
    validates(val, dateType) {
      if (val.getDate() === 1 && dateType === 'day') return true
      else return false
    },
    updateDateType(val) {
      this.dateTyp = val
      console.log(val, 'hey ko')
    },
    changeHand() {
      this.dateType = this.vales
    },
  },
  template: `
  <FContainer display="flex">
  <FTimelineFilter
    v-model="val"
    :emitOnInitialLoad="emitOnInitialLoad"
    :operatorId="operatorId"
    :offset="offset"
    :timeFormat="time"
    :dateType="dateType"
    :startingDay="start"
    :timeZone="timeZone"
    :selectType="selectType"
    @change="changeHandler"
    @dateType="updateDateType"
  />   
  <FTabs
  v-model='vales'
  :tabsList='tabsLists'
  appearance="button"
  @change="changeHand"
></FTabs></FContainer>
  `,
})

export const Default = Template.bind({})
