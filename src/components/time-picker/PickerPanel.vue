<script>
import { FText } from '../../index'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'

const INTERVAL_HASH = ['00', '15', '30', '45']
export default {
  name: 'PickerPanel',
  props: {
    getStyle: {
      type: Function,
      default: () => {},
    },
    value: {
      type: undefined,
      default: () => new Date(),
    },
    is12Hour: {
      type: Boolean,
      default: false,
    },
    showSeconds: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 30,
      validator: (value) => [30, 15].includes(value),
    },
  },
  computed: {
    rows() {
      let rows = []
      let { is12Hour, interval } = this
      rows = this.generateRows(is12Hour, interval)

      return rows
    },
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },

  methods: {
    generateRows(is12Hour, interval) {
      let rows = []
      // mintuesInterval helps to decide the interval hash interval
      let minutesInterval = interval === 30 ? 2 : 4
      let startHour = is12Hour ? '12' : '00'
      let meridian = is12Hour ? 'AM' : ''
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < minutesInterval; j++) {
          let minutes =
            interval === 30 ? INTERVAL_HASH[j * 2] : INTERVAL_HASH[j]
          rows.push({
            label: `${startHour}:${minutes} ${meridian}`,
            value: this.getUnixTime(startHour, minutes, meridian),
          })
        }
        if (is12Hour) {
          startHour = (parseInt(startHour) + 1) % 12
          if (startHour === 0) {
            startHour = 12
            meridian = 'PM'
          }
        } else {
          startHour = parseInt(startHour) + 1
        }
      }
      return rows
    },
    getUnixTime(hours, minutes, meridian) {
      let { modelValue } = this
      let setHour = hours
      if (!isEmpty(meridian)) setHour = meridian === 'AM' ? hours : hours + 12
      if (meridian === 'AM' && hours == 12) {
        setHour = 0
      } else if (meridian === 'PM' && hours == 12) {
        setHour = 12
      }
      let time = new Date(modelValue).setHours(setHour, minutes, 0)
      return time
    },

    handleSelect(val) {
      this.$emit('input', new Date(val))
    },
    renderTimeRow(label, value) {
      let TimeRow = styled('div')`
        ${this.getStyle('timeRow')}
      `
      return (
        <TimeRow vOn:click={() => this.handleSelect(value)}>
          <FText>{label}</FText>
        </TimeRow>
      )
    },
  },
  render() {
    const PanelContainer = styled('div')`
      ${this.getStyle('timePanelContainer')}
      width: 100%
    `
    const ScrollableContainer = styled('div')`
      ${this.getStyle('scrollableContainer')}
    `
    return (
      <PanelContainer>
        <ScrollableContainer>
          {this.rows.map(({ label, value }) => {
            return this.renderTimeRow(label, value)
          })}
        </ScrollableContainer>
      </PanelContainer>
    )
  },
}
</script>
