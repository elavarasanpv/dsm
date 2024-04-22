<script>
import styled from 'vue-emotion'
import { FButton, FDatePanel, FContainer } from '../../../index'
import { millisecondsToTime, setTimeForDate } from '../utils/date'
import { format } from 'date-format-parse'
import { isEmpty, isDateEmpty } from '../../../utils/validation'
export default {
  name: 'DatePanel',
  props: {
    getStyle: {
      type: Function,
      default: () => {},
    },
    value: {
      type: undefined,
      default: '',
    },
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'date-time'].includes(value),
    },
    timeFormat: {
      type: Object,
    },
    initialDate: {
      type: undefined,
      default: '',
    },
    validateDate: {
      type: Function,
      default: undefined,
    },
    dateView: {
      type: String,
      default: 'day',
      validator: (value) => {
        return ['year', 'quater', 'month', 'week', 'day'].includes(value)
      },
    },
  },
  data: () => ({
    referenceDate: new Date(),
    referenceTime: new Date(),
    selectedValue: '',
    showTimePicker: false,
    selectedTime: [],
    disabelSubmit: false,
  }),
  computed: {
    isSubmitDisabled() {
      let { selectedValue } = this
      return !isEmpty(selectedValue)
    },
    modelValue() {
      return this.value
    },
    formattedTime() {
      let { referenceTime, displayFormat, timeFormat } = this
      let { is12Hour } = timeFormat || {}
      let time
      let timeValues
      if (is12Hour) {
        time = format(referenceTime, displayFormat)
        timeValues = this.convertTime12to24(time)
      } else {
        time = format(referenceTime, displayFormat)
        timeValues = time.split(':')
      }
      return timeValues
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
    isResetDiabled() {
      let ckeck = isEmpty(this.selectedValue)
      if (typeof this.selectedValue === 'object' && !isEmpty(this.value)) {
        ckeck = isDateEmpty(this.selectedValue)
      }
      return ckeck
    },
  },
  watch: {
    initialDate(newVal) {
      if (!isEmpty(newVal)) {
        let { initialDate } = this
        this.referenceDate = new Date(initialDate)
        this.setCurrentdate()
      }
    },
  },
  created() {
    if (this.type === 'date-time') {
      this.showTimePicker = true
    }
    this.setCurrentdate()
  },
  mounted() {
    this.selectedValue = this.value
    // this.referenceDate = new Date(this.value)
    if (!isEmpty(this.value)) {
      this.referenceDate = new Date(this.value)
    } else this.referenceDate = new Date()
  },
  methods: {
    convertTime12to24(time12h) {
      const [time, modifier] = String(time12h).split(' ')

      let [hours, minutes] = time.split(':')

      if (hours === '12') {
        hours = '00'
      }

      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12
      }

      return [hours, minutes]
    },
    setCurrentdate() {
      let { value, timeFormat, initialDate } = this || undefined
      let { is12Hour = false } = timeFormat || {}
      if (
        !isEmpty(value) ||
        (!isDateEmpty(new Date(value)) && value !== null)
      ) {
        if (this.type === 'date-time') {
          let val1 =
            !isEmpty(value) || !isDateEmpty(new Date(value))
              ? value
              : initialDate
          this.selectedTime = millisecondsToTime(val1, is12Hour) || []
        }
        console.log('open', value, this.selectedTime)
      }
    },
    selectDateValue(value) {
      let { type } = this
      if (type === 'date') {
        this.$emit('input', value)
        this.$emit('change', value)
        this.closePopover()
      }
      this.selectedValue = value
    },
    changeRefDate(value) {
      this.referenceDate = value
    },
    closePopover() {
      this.$emit('close')
    },
    changeRefTime(value) {
      this.referenceTime = value
    },
    resetDate() {
      this.selectedValue = ''
      this.selectedTime = []
      this.onSubmit()
      // this.closePopover()
    },
    selectTimeValue(val) {
      this.selectedTime = val
    },
    onSubmit() {
      let { selectedValue, timeFormat, selectedTime } = this
      let { is12Hour = false } = timeFormat || {}
      let dateInMs = setTimeForDate(
        new Date(selectedValue),
        selectedTime,
        is12Hour
      )
      let date = new Date(dateInMs)
      console.log(date, 'submit')
      this.$emit('input', date)
      this.$emit('change', date)
      this.closePopover()
    },
    hideApply(val) {
      let currentType = this.dateView
      if (this.showTimePicker) {
        currentType = 'day-time'
      }
      this.disabelSubmit = val !== currentType
    },
  },
  render() {
    let { type } = this
    let PanelContainer
    if (type === 'date-time') {
      PanelContainer = styled('div')`
        ${this.getStyle('dateTimePanelContainer')}
      `
    } else {
      PanelContainer = styled('div')`
        ${this.getStyle('datePanelContainer')}
      `
    }
    const PickerFooter = styled('div')`
      ${this.getStyle('footer')}
    `
    return (
      <PanelContainer>
        <FDatePanel
          getStyle={this.getStyle}
          referenceDate={this.referenceDate}
          selectDate={(val) => this.selectDateValue(val)}
          selectedDate={this.selectedValue}
          selectedTime={this.selectedTime}
          selectTime={(val) => this.selectTimeValue(val)}
          vOn:changeRefDate={this.changeRefDate}
          dateType={this.showTimePicker ? 'day-time' : this.dateView}
          showTime={this.showTimePicker}
          timeFormat={this.timeFormat}
          validateDate={this.validateDate}
          isDatePicker={true}
          vOn:changeType={(val) =>
            setTimeout(() => {
              this.hideApply(val)
            }, 5)
          }
        />
        {this.type === 'date-time' && (
          <PickerFooter>
            <FButton
              vOn:click={this.onSubmit}
              disabled={this.isSubmitDisabled || this.disabelSubmit}
            >
              {this.$t('dsm.date_time.submit', 'Submit')}
            </FButton>
            <FContainer marginLeft="containerLarge" />
            <FButton
              appearance="secondary"
              vOn:click={this.resetDate}
              disabled={this.isResetDiabled || this.disabelSubmit}
            >
              {this.$t('dsm.date_time.reset', 'Reset')}
            </FButton>
          </PickerFooter>
        )}
      </PanelContainer>
    )
  },
}
</script>

<style scoped></style>
