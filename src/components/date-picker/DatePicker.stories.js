import { FDatePicker, FContainer } from '../../index.js'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

export default {
  title: 'Components/Inputs/DatePicker',
  component: FDatePicker,
  argTypes: {
    displayFormat: { control: 'text' },
    type: {
      options: ['date', 'date-time', 'date-range', 'date-time-range'],
      control: { type: 'radio' },
      defaultValue: 'date-time',
    },
    placement: {
      options: [
        'top',
        'bottom',
        'right',
        'left',
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
      ],
      control: { type: 'radio' },
      defaultValue: 'bottom-start',
    },
    dateView: {
      options: ['year', 'quater', 'month', 'week', 'day'],
      control: { type: 'radio' },
      defaultValue: 'day',
      description:
        'As far its only supported for single date select not for range select and also it your need to include time then default it will day picker',
    },
    placeholder: { control: 'text', defaultValue: 'Select a date' },
    disabled: { type: 'boolean', defaultValue: false },
    timeZone: { type: 'string', defaultValue: 'Europe/London' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDatePicker, FContainer },
  data: () => ({ date: 1701777600000 }),
  mounted() {
    // setTimeout(() => {
    //   // this.date = [1693910580000, 1696329780000]
    //   this.date = 1694649600000
    // }, 3000)
  },
  methods: {
    changeInput(val) {
      console.log(val, 'changed')
      if (val) {
        if (typeof val == 'object') {
          console.log(
            dayjs.tz(val[0], this.timeZone).format(),
            dayjs.tz(val[1], this.timeZone).format()
          )
        } else {
          console.log(dayjs.tz(val, this.timeZone).format())
        }
      }
    },
    validates(val) {
      if (val.getDate() === 20) return true
      else return false
    },
  },
  template: `<FContainer><FDatePicker v-model="date" :timeZone="timeZone" :validateDate='validates'  :dateView="dateView" @change="changeInput" :displayFormat="displayFormat" :type="type" :placeholder="placeholder" :timeFormat="{ is12Hour: true, interval: 15 }" :disabled="disabled"/></FContainer>`,
})

export const Default = Template.bind({})
