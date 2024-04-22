<script>
import {
  setMonth,
  setTimeForDate,
  setRefsDate,
  millisecondsToTime,
} from '../utils/date'
import styled from 'vue-emotion'
import { isEmpty, isDateEmpty } from '../../../utils/validation'
import {
  FButton,
  FContainer,
  FSegmentedControl,
  FText,
  FDatePanel,
} from '../../../index'
import { format } from 'date-format-parse'
const TOLGEE_CONFIG = Symbol.for('@facilio/tolgee')
let $t
if (window[TOLGEE_CONFIG]) {
  $t = window[TOLGEE_CONFIG].t
} else {
  $t = (_, defaultValue) => defaultValue
}
export default {
  name: 'RangePanel',
  props: {
    getStyle: {
      type: Function,
      default: () => {},
    },
    value: {
      type: undefined,
      default: [],
    },
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date-range', 'date-time-range'].includes(value),
    },
    timeFormat: {
      type: Object,
      default: undefined,
    },
    initialDate: {
      type: undefined,
      default: undefined,
    },
    dateView: {
      type: String,
      default: 'day',
    },
    validateDate: {
      type: Function,
      default: undefined,
    },
  },
  data: () => ({
    referenceDates: [],
    referenceTimes: [],
    selectedValues: [],
    val: '0',
    tabsLists: [
      { label: $t('dsm.date_time.start', 'Start'), value: '0' },
      { label: $t('dsm.date_time.end', 'End'), value: '1' },
    ],
    showTimePicker: false,
    selectedTime: [[], []],
    disabelSubmit: false,
  }),
  computed: {
    isTimePickerDisabled() {
      let { selectedValues = [] } = this
      if (isEmpty(selectedValues)) return true
      if (selectedValues.length >= 2) {
        return !selectedValues.every((value) => !isDateEmpty(value))
      }
      return false
    },
    formattedTimes() {
      let { referenceTimes, displayFormat, timeFormat } = this
      let { is12Hour } = timeFormat || {}
      let formattedTimes = []

      formattedTimes = referenceTimes.map((time) => {
        let formatTime = format(time, displayFormat)
        let convertedTime = is12Hour
          ? this.convertTime12to24(formatTime)
          : formatTime.split(':')
        return convertedTime
      })
      return formattedTimes
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
  },
  watch: {
    modelValue: {
      handler(value) {
        this.setReferenceDates(value)
      },
      immediate: true,
      deep: true,
    },
    value: {
      handler(val) {
        if (Array.isArray(val)) {
          let [value0, value1] = val || {}
          if (!isDateEmpty(value0) && !isDateEmpty(value1)) {
            this.selectedValues = undefined
          } else {
            this.setCurrentdate()
          }
        }
      },
    },
    type(newVal, oldVal) {
      if (newVal !== oldVal && newVal === 'date-time-range') {
        this.showTimePicker = true
      }
    },
  },
  created() {
    let { modelValue } = this
    this.selectedValues = modelValue
    if (this.type === 'date-time-range') {
      this.showTimePicker = true
    }
    this.setCurrentdate()
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

      return [parseInt(hours), parseInt(minutes)]
    },
    setCurrentdate() {
      let { value, timeFormat } = this || undefined
      let { is12Hour = false } = timeFormat || {}
      if (Array.isArray(value) && !isEmpty(value)) {
        let dateArr = setRefsDate('day', value)
        if (this.type === 'date-time-range') {
          let [val1, val2] = value || []
          this.selectedTime[0] = millisecondsToTime(val1, is12Hour)
          this.selectedTime[1] = millisecondsToTime(val2, is12Hour)
        }
        console.log('open', value, dateArr, this.selectedTime)
        this.setReferenceDates([new Date(dateArr[0]), new Date(dateArr[1])])
        this.selectedValues = [new Date(dateArr[0]), new Date(dateArr[1])]
      }
      // if (isEmpty(value)) {
      //   let newVal = this.defaultValue()
      //   let dateArr = setRefsDate(this.currentView, newVal)
      //   console.log('open', value, dateArr)
      //   this.setReferenceDates([new Date(dateArr[0]), new Date(dateArr[1])])
      //   this.selectedValues = [new Date(dateArr[0]), new Date(dateArr[1])]
      // }
    },
    setReferenceDates(value) {
      if (isEmpty(value)) {
        this.referenceDates = [new Date(), setMonth(new Date(), (v) => v + 0)]
        this.referenceTimes = [new Date(), setMonth(new Date(), (v) => v + 0)]
      } else {
        let [value0, value1] = value || {}
        if (isDateEmpty(value0) && isDateEmpty(value1)) {
          // both empty set consecutive months from current date
          this.referenceDates = [new Date(), setMonth(new Date(), (v) => v + 1)]
        } else if (
          !isDateEmpty(value0) &&
          !isDateEmpty(value1) &&
          value0.getMonth() === value1.getMonth()
        ) {
          // both not empty and same month then the right should be the same month calendar and the
          // next one should be the next month calendar
          this.referenceDates = [value0, value1]
          console.log(this.referenceDates)
        } else {
          value0 = !isDateEmpty(value0) ? value0 : new Date()
          value1 = !isDateEmpty(value1) ? value1 : new Date()
          if (value0.getMonth() === value1.getMonth()) {
            this.referenceDates = [value0, setMonth(value0, (v) => v + 1)]
          } else {
            this.referenceDates = [value0, value1]
          }
        }
      }
    },

    selectDateValue(value) {
      if (
        this.val === '0' &&
        !isEmpty(this.selectedTime[0]) &&
        this.type === 'date-time-range'
      ) {
        this.val = '1'
      }
      if (
        this.val === '1' &&
        value.getTime() < this.selectedValues[0].getTime()
      ) {
        this.val = '0'
      }
      let { selectedValues, val } = this || {}

      if (isEmpty(selectedValues)) selectedValues = ['', '']

      let [value0, value1] = selectedValues || []

      if (isDateEmpty(value0) && isDateEmpty(value1)) {
        // both empty the value is the start date
        selectedValues[0] = value
      } else if (!isDateEmpty(value0) && !isDateEmpty(value1)) {
        // both not empty then value is the start date and the end
        // date should be empty
        if (val === '1') {
          selectedValues[1] = value
        } else {
          selectedValues[0] = value
          selectedValues[1] = ''
        }
      } else if (!isDateEmpty(value0) && val === '0') {
        selectedValues[0] = value
        selectedValues[1] = ''
      } else if (isDateEmpty(value1)) {
        if (value.getTime() < value0.getTime()) {
          // if the value selected is less than the start date, then replace start and end
          selectedValues = [value, value0]
        } else {
          // else set it as the end date
          selectedValues[1] = value
        }
      }
      this.selectedValues = [...selectedValues]
      if (this.val === '0' && this.type === 'date-range') {
        this.val = '1'
      }
    },
    changeRefDate(value, index) {
      // console.log('chenagerefs')
      let { referenceDates, selectedValues } = this || {}
      referenceDates = referenceDates.map((ref, refIndex) => {
        if (refIndex === index) {
          return value
        } else {
          return ref
        }
      })
      let [ref0, ref1] = referenceDates || []
      if (ref0.getTime() === ref1.getTime())
        this.referenceDates = [ref0, setMonth(ref1, (v) => v + 0)]
      else if (isEmpty(selectedValues))
        this.referenceDates = [ref0, setMonth(ref0, (v) => v + 1)]
      else this.referenceDates = referenceDates
      // console.log(this.referenceDates, 'refsdates')
    },
    onSubmit() {
      let {
        formattedTimes,
        selectedValues,
        selectedTime,
        timeFormat,
        showTimePicker,
      } = this
      let { is12Hour } = timeFormat || {}
      let [value0, value1] = selectedValues || {}
      let [time0, time1] = formattedTimes || []
      if (!isDateEmpty(value0) && !isDateEmpty(value1)) {
        let [hours0, mins0] = time0
        let [hours1, mins1] = time1
        let [time2, time3] = selectedTime || []
        let start = setTimeForDate(value0, time2, is12Hour)
        let end = setTimeForDate(value1, time3, is12Hour)
        console.log(start, end, 'time')
        let date0Ms = new Date(value0).setHours(hours0, mins0, 0)
        let date0 = new Date(date0Ms)
        let date1Ms = new Date(value1).setHours(hours1, mins1, 0)
        let date1 = new Date(date1Ms)
        if (showTimePicker) {
          date0 = new Date(start)
          date1 = new Date(end)
        }
        this.$emit('input', [date0, date1])
        this.$emit('change', [date0, date1])
        this.closePopover()
      }
    },
    closePopover() {
      this.$emit('close')
    },
    changeRefTime(val, index) {
      this.referenceTimes[index] = val
    },
    hideApply(val) {
      let currentType = 'day'
      if (this.showTimePicker) {
        currentType = 'day-time'
      }
      this.disabelSubmit = val !== currentType
    },
    selectTimeValue(value) {
      let { val } = this
      if (val === '0') {
        this.selectedTime[0] = value
        if (isEmpty(this.selectedTime[1])) {
          this.selectedTime[1] = []
        }
      } else if (val === '1' && isEmpty(this.selectedTime[0])) {
        this.selectedTime[0] = []
        this.selectedTime[1] = value
      } else {
        this.selectedTime[1] = value
      }
      // console.log(this.selectedTime)
    },
    resetDate() {
      this.selectedValues = undefined
      this.selectedTime = []
      this.$emit('input', [])
      this.$emit('change', [])
      this.closePopover()
      // this.onSubmit()
    },
    getTab(prop) {
      let { dateView } = this
      let { value } = prop
      let date = '',
        getMonth,
        day,
        year,
        displayTitle,
        isDatepresent = ''
      if (!isEmpty(this.selectedValues) && value === '0') {
        date = this.selectedValues[0]
      }
      if (!isEmpty(this.selectedValues) && value === '1') {
        date = this.selectedValues[1]
      }
      isDatepresent = `${date}`
      if (!isEmpty(isDatepresent)) {
        getMonth = date.toLocaleString('default', {
          month: 'short',
        })
        day = date.getDate()
        year = date.getFullYear()
        displayTitle = `${day} ${getMonth} ${year}`
      }
      const Container = styled(FContainer)`
        ${this.getStyle('segment')}
      `
      let displayName = dateView
      if (dateView === 'day') {
        displayName = 'date'
      }
      return (
        <Container>
          <FContainer
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            gap="containerSmall"
          >
            <FText appearance="captionMed12">
              {prop.label}{' '}
              {this.$t(`dsm.date_time.${displayName}`, `${displayName}`)}
            </FText>
            {isEmpty(isDatepresent) ? (
              <FText appearance="captionReg12" color="textCaption">
                {this.$t('dsm.date_time.select', 'Select')}
              </FText>
            ) : (
              <FText appearance="captionReg12" color="textMain">
                {displayTitle}
              </FText>
            )}
          </FContainer>
        </Container>
      )
    },
  },
  render() {
    // let { referenceDates } = this || {}
    let index = parseInt(this.val)

    const PanelContainer = styled('div')`
      ${this.getStyle('rangePanelContainer')}
    `
    const PickerContainer = styled('div')`
      ${this.getStyle('rangePickerContainer')}
    `
    const PickerFooter = styled('div')`
      ${this.getStyle('footer')}
    `
    const Container = styled('div')`
      ${this.getStyle('container')}
    `
    // const DatePicker = styled(BaseDatePicker)`
    //   padding: 12px;
    //   border-radius: 0;
    // `
    return (
      <Container>
        <FContainer
          padding="containerLarge"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <FSegmentedControl
            v-model={this.val}
            tabsList={this.tabsLists}
            vOn:change={(val) => (this.val = val)}
            tabWidth="100%"
            {...{
              scopedSlots: {
                ['tab.0']: (prop) => this.getTab(prop),
                ['tab.1']: (prop) => this.getTab(prop),
              },
            }}
          ></FSegmentedControl>
        </FContainer>
        <PanelContainer>
          <PickerContainer>
            <FDatePanel
              getStyle={this.getStyle}
              tab={this.val}
              showTime={this.showTimePicker}
              referenceDate={this.referenceDates[index]}
              dateView={this.dateView}
              dateType={this.showTimePicker ? 'day-time' : 'day'}
              selectDate={(val) => this.selectDateValue(val)}
              selectTime={(val) => this.selectTimeValue(val)}
              timeFormat={this.timeFormat}
              selectedTime={this.selectedTime[this.val]}
              selectedDate={this.selectedValues}
              vOn:changeRefDate={(val) => this.changeRefDate(val, index)}
              validateDate={this.validateDate}
              isDatePicker={true}
              vOn:changeType={(val) =>
                setTimeout(() => {
                  this.hideApply(val)
                }, 5)
              }
            />
          </PickerContainer>
        </PanelContainer>
        <PickerFooter>
          <FButton
            vOn:click={this.onSubmit}
            disabled={this.isTimePickerDisabled || this.disabelSubmit}
          >
            {this.$t('dsm.date_time.submit', 'Submit')}
          </FButton>
          <FContainer marginLeft="containerLarge" />
          <FButton
            appearance="secondary"
            vOn:click={this.resetDate}
            disabled={isEmpty(this.value) || this.disabelSubmit}
          >
            {this.$t('dsm.date_time.reset', 'Reset')}
          </FButton>
        </PickerFooter>
      </Container>
    )
  },
}
</script>

<style scoped></style>
