import { FTimePicker } from '../../index.js'
export default {
  title: 'Components/Inputs/TimePicker',
  component: FTimePicker,
  argTypes: {
    placeholder: { control: 'text', defaultValue: 'Select time' },
    is12Hour: { type: 'boolean', defaultValue: false },
    showSeconds: { type: 'boolean', defaultValue: false },
    disabled: { type: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTimePicker },
  data: () => ({
    date: null,
  }),
  computed: {
    selectableRangeList() {
      return {
        from: 7200000,
        // to: 57600000,
        to: 18000000,
      }
    },
  },
  methods: {
    changeHandler(value) {
      console.log(value, 'story')
    },
  },
  template: `<FTimePicker :placeholder="placeholder" v-model="date" @change="changeHandler" :selectableRange="selectableRangeList" :is12Hour="is12Hour" :showSeconds="showSeconds"  :disabled="disabled" />`,
})

export const Default = Template.bind({})
