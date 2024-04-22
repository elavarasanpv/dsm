<script>
import { FTimePicker, FText } from '../../../index'
import styled from 'vue-emotion'
import { format } from 'date-format-parse'
import { isEmpty } from '../../../utils/validation'
export default {
  name: 'TimePickerBox',
  components: { FTimePicker },
  props: {
    getStyle: {
      type: Function,
      default: () => {},
    },
    timeFormat: {
      type: Object,
    },
    value: {
      type: undefined,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    meridian: '',
  }),
  computed: {
    modelValue: {
      get() {
        let { value } = this
        return value
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('referenceTimeChange', val)
      },
    },

    displayFormat() {
      let { timeFormat } = this
      let { is12Hour } = timeFormat || {}
      if (is12Hour) {
        return `hh:mm A`
      } else {
        return `HH:mm`
      }
    },
    formattedDate() {
      let { modelValue, displayFormat } = this
      return format(modelValue, displayFormat)
    },
  },
  watch: {
    meridian(newVal) {
      let { modelValue, displayFormat } = this
      let date = format(modelValue, displayFormat)
      let meridianRegex = /^(0?[0-9]|1[0-9]|2[0-4]):([0-5][0-9]) ([AaPp][Mm])$/
      let meridianValues = date.match(meridianRegex)
      if (newVal === 'PM' && meridianValues[3] !== 'PM') {
        let hours =
          meridianValues[1] != 12 ? parseInt(meridianValues[1]) + 12 : 12
        let mins = parseInt(meridianValues[2])
        let dateInMS = new Date(modelValue).setHours(hours, mins, 0)
        let date = new Date(dateInMS)
        this.$emit('input', date)
      } else if (newVal === 'AM' && meridianValues[3] !== 'AM') {
        let hours = (parseInt(meridianValues[1]) + 12) % 12
        let mins = parseInt(meridianValues[2])
        let dateInMS = new Date(modelValue).setHours(hours, mins, 0)
        let date = new Date(dateInMS)
        this.$emit('input', date)
      }
    },
    formattedDate(newVal) {
      let [, meridian] = newVal.split(' ') || []
      if (!isEmpty(meridian)) this.meridian = meridian
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let { timeFormat } = this
      let { is12Hour } = timeFormat || {}
      if (is12Hour) {
        let { formattedDate } = this
        let timeValues = formattedDate.split(' ')
        this.meridian = timeValues[1]
      }
    },
    setMeridian(meridian) {
      this.meridian = meridian
    },
  },
  render() {
    let { timeFormat } = this
    let { is12Hour, interval } = timeFormat || {}

    const AmMeridianContainer = styled('div')`
      ${this.getStyle('amMeridianContainer')}
    `
    const PmMeridianContainer = styled('div')`
      ${this.getStyle('pmMeridianContainer')}
    `

    const TimePicker = styled(FTimePicker)`
      width: ${is12Hour ? '176px' : '100%'};
    `
    const TimePickerContainer = styled('div')`
      ${this.getStyle('timePickerContainer')}
    `
    return (
      <TimePickerContainer>
        <TimePicker
          is12Hour={is12Hour}
          interval={interval}
          v-model={this.modelValue}
          readOnly={false}
          disabled={this.disabled}
        />
        {is12Hour && (
          <AmMeridianContainer onClick={() => this.setMeridian('AM')}>
            <FText>AM</FText>
          </AmMeridianContainer>
        )}
        {is12Hour && (
          <PmMeridianContainer onClick={() => this.setMeridian('PM')}>
            <FText>PM</FText>
          </PmMeridianContainer>
        )}
      </TimePickerContainer>
    )
  },
}
</script>
