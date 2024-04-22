<script>
import { FIcon, FInput, FPopover, FPicker, FContainer } from '../../index'
import 'ant-design-vue/lib/dropdown/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import dlv from 'dlv'
import { timeStampToArray, arrayToTimeStamp } from './timePickerUtil'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import getProperty from 'dlv'

dayjs.extend(duration)

export default {
  name: 'FTimePicker',
  mixins: [ThemeMixin],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: undefined,
      default: 0,
    },
    is12Hour: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showSeconds: {
      type: Boolean,
      default: false,
    },
    selectableRange: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    isDropdownVisible: false,
    selectedTime: [],
    reset: false,
  }),

  computed: {
    formattedDates() {
      let { selectedTime, showSeconds } = this || []
      if (isEmpty(selectedTime)) {
        return ''
      }
      let displayTitle = ''
      if (!showSeconds) {
        let [hours = 0, minutes = 0, meridiem = ''] = selectedTime
        displayTitle = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')} ${meridiem}`
      } else {
        let [hours = 0, minutes = 0, seconds = 0, meridiem = ''] = selectedTime
        displayTitle = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${meridiem}`
      }
      return displayTitle
    },
    displayFormat() {
      let { is12Hour } = this || {}
      if (is12Hour) {
        return `hh:mm A`
      } else {
        return `HH:mm`
      }
    },
    pickerOptions() {
      let {
        is12Hour,
        showSeconds,
        selectableRangeArray,
        selectedTime,
        selectableRange,
      } = this || {}
      let length = 24
      if (is12Hour) {
        length = 12
      }
      const hoursArray = Array.from({ length: length }, (_, index) => {
        let hour = index
        let label
        let isDisabled = true
        if (isEmpty(selectableRange)) {
          isDisabled = false
        }
        if (is12Hour) {
          if (hour == 0) hour = hour + 12
          label = hour.toString().padStart(2, '0')
          let { from, to } = selectableRangeArray || {}
          let [fromHour, , fromMeridian] = from || []
          let [toHour, , toMeridian] = to || []
          if (fromMeridian === 'PM') {
            fromHour += 12
          }
          if (toMeridian === 'PM') {
            toHour += 12
          }
          if (
            selectedTime[selectedTime.length - 1] === 'AM' &&
            fromMeridian === 'AM'
          ) {
            if (index < fromHour) {
              isDisabled = true
            } else {
              isDisabled = false
            }
          }
          if (
            selectedTime[selectedTime.length - 1] === 'PM' &&
            toMeridian === 'PM'
          ) {
            if (index + 12 > toHour) {
              isDisabled = true
            } else {
              isDisabled = false
            }
            console.log(toHour, index)
          }
          if (
            (fromMeridian === 'PM' && toMeridian === 'PM') ||
            (fromMeridian === 'AM' && toMeridian === 'AM')
          ) {
            if (fromMeridian === 'AM') {
              if (index >= fromHour && index <= toHour) {
                isDisabled = false
              } else {
                isDisabled = true
              }
            }
            if (fromMeridian === 'PM') {
              if (index + 12 >= fromHour && index + 12 <= toHour) {
                isDisabled = false
              } else {
                isDisabled = true
              }
            }
          }
        } else {
          let { from, to } = selectableRangeArray || {}
          let [fromHour] = from || []
          let [toHour, toMin] = to || []
          // not disabled if value is withing the given range
          if (index >= parseInt(fromHour) && index < parseInt(toHour)) {
            isDisabled = false
          }
          // not disabled if minute of the end hour is non zero
          if (index == parseInt(toHour) && toMin !== '00') {
            isDisabled = false
          }
          label = index.toString().padStart(2, '0')
        }
        let obj = { label, value: hour }
        if (isDisabled) {
          obj = { ...obj, disabled: true }
        }
        return obj
      })
      const minutesArray = Array.from({ length: 60 }, (_, index) => {
        const label = index.toString().padStart(2, '0')
        let isDisabled = false
        let [selectedHour, , selectedMeridian] = selectedTime || []
        if (
          !isEmpty(selectedHour) && is12Hour ? !isEmpty(selectedMeridian) : true
        ) {
          let { from, to } = selectableRangeArray || {}
          let [fromHour, fromMin, fromMeridian] = from || []
          let [toHour, toMin, toMeridian] = to || []

          // disabled if selected hour matches and current minute is less than start
          if (
            selectedHour === parseInt(fromHour) &&
            (is12Hour ? fromMeridian == selectedMeridian : true) &&
            index < parseInt(fromMin)
          ) {
            isDisabled = true
          }

          // disabled if selected hour matches and current minute is greater than end
          if (
            selectedHour === parseInt(toHour) &&
            (is12Hour ? toMeridian == selectedMeridian : true) &&
            index > parseInt(toMin)
          ) {
            isDisabled = true
          }
        }
        let obj = { label, value: index }
        if (isDisabled) {
          obj = { ...obj, disabled: true }
        }
        return obj
      })
      const secondsArray = Array.from({ length: 60 }, (_, index) => {
        let isDisabled = false
        const label = index.toString().padStart(2, '0')

        let [selectedHour, selectedMin] = selectedTime || []
        if (!isEmpty(selectedHour)) {
          let { from, to } = selectableRangeArray || {}
          let [fromHour, fromMin, fromSec] = from || []
          let [toHour, toMin, toSec] = to || []

          // disabled if selected hour & min matches and current sec is less than start
          if (
            selectedHour === parseInt(fromHour) &&
            selectedMin === parseInt(fromMin) &&
            index < parseInt(fromSec)
          ) {
            isDisabled = true
          }

          // disabled if selected hour & min matches and current sec is greater than end
          if (
            selectedHour === parseInt(toHour) &&
            selectedMin === parseInt(toMin) &&
            index > parseInt(toSec)
          ) {
            isDisabled = true
          }
        }
        let obj = { label, value: index }
        if (isDisabled) {
          obj = { ...obj, disabled: true }
        }
        return obj
      })
      let column = [
        {
          title: 'HH',
          options: hoursArray,
        },
        {
          title: 'MM',
          options: minutesArray,
        },
        {
          title: 'SS',
          options: secondsArray,
        },
      ]
      if (is12Hour) {
        let rangeOptions = [
          { label: 'AM', value: 'AM' },
          { label: 'PM', value: 'PM' },
        ]
        rangeOptions = rangeOptions.map((obj) => {
          let { value } = obj || {}
          let isDisabled = false
          let [selectedHour] = selectedTime || []
          let selectedAm = dayjs(`${selectedHour} ${value}`, { format: 'hh A' })
          let { from, to } = selectableRangeArray || {}
          let [fromHour, fromMeridian] = from || []
          let [toHour, toMeridian] = to || []
          fromMeridian = from[from.length - 1]
          toMeridian = to[to.length - 1]
          let fromTime = dayjs(`${fromHour} ${fromMeridian}`, {
            format: 'hh A',
          })
          let toTime = dayjs(`${toHour} ${toMeridian}`, { format: 'hh A' })

          let selectedMinutesDifferenceStart = selectedAm.diff(
            fromTime,
            'minute'
          )

          let selectedMinutesDifferenceEnd = selectedAm.diff(toTime, 'minute')
          let isSelectedTimeNotValid =
            selectedMinutesDifferenceStart >= 0 &&
            selectedMinutesDifferenceEnd <= 0
          if (!isSelectedTimeNotValid) {
            isDisabled = true
          }
          if (fromMeridian === toMeridian) {
            if (value !== fromMeridian) {
              isDisabled = true
            } else {
              isDisabled = false
            }
          }
          if (isDisabled) {
            obj = { ...obj, disabled: true }
          }
          return obj
        })

        column = [
          ...column,
          {
            options: rangeOptions,
          },
        ]
      }
      if (!showSeconds) {
        column = column.filter((obj) => obj.title !== 'SS')
      }
      return column
    },
    selectableRangeArray() {
      let { is12Hour, selectableRange } = this || {}
      let modifiedRange = []
      let startOfDay = dayjs().startOf('day')
      let { to } = selectableRange || {}
      let from = getProperty(selectableRange, 'from', 0)
      if (isEmpty(to)) {
        let endTime = startOfDay
          .add(23, 'hour')
          .add(59, 'minute')
          .add(59, 'second')
        to = endTime.diff(startOfDay)
      }
      let fromArray, toArray
      if (!is12Hour) {
        fromArray = this.splitTime(from)
        toArray = this.splitTime(to)
      } else {
        fromArray = this.split24Hour(from)
        toArray = this.split24Hour(to)
      }
      modifiedRange = { from: fromArray, to: toArray }
      return modifiedRange
    },
  },
  watch: {
    selectedTime: {
      async handler(newVal) {
        let { showSeconds, is12Hour } = this
        let timeStamp = null
        if (!isEmpty(newVal)) {
          timeStamp = arrayToTimeStamp(newVal, showSeconds, is12Hour)
        }
        this.$emit('input', timeStamp)
        this.$emit('change', timeStamp)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
      deep: true,
    },
    isDropdownVisible: {
      handler(newVal) {
        if (!newVal) {
          let [t1, t2] = this.selectedTime || []
          if (!isEmpty(t1) && isEmpty(t2)) {
            let { showSeconds, is12Hour } = this
            let timeStamp = null
            this.selectedTime[1] = 0
            timeStamp = arrayToTimeStamp(
              this.selectedTime,
              showSeconds,
              is12Hour
            )
            this.$emit('input', timeStamp)
            this.$emit('change', timeStamp)
          }
        }
      },
    },
  },
  created() {
    let { value, showSeconds, is12Hour } = this
    if (!isEmpty(value)) {
      this.selectedTime = timeStampToArray(value, showSeconds, is12Hour)
    }
  },
  methods: {
    splitTime(timeStamp) {
      let { showSeconds } = this
      let time = dayjs.duration(timeStamp)
      let hour = time.hours()
      let minutes = time.minutes()
      let timeString = `${hour}:${minutes}`

      if (showSeconds) {
        let seconds = time.seconds()
        timeString = `${timeString}:${seconds}`
      }

      timeString = timeString.split(':')
      timeString = timeString.map(Number)
      return timeString
    },
    split24Hour(timeStamp) {
      let { showSeconds } = this
      let time = dayjs.duration(timeStamp)
      let hour = time.hours() % 12
      let minutes = time.minutes()
      let timeString = `${hour}:${minutes}`
      let ampm = time.hours() < 12 ? 'AM' : 'PM'

      if (showSeconds) {
        let seconds = time.seconds()
        timeString = `${timeString}:${seconds}`
      }

      timeString = timeString.split(':')
      timeString = timeString.map(Number)
      timeString.push(ampm)
      return timeString
    },
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    showInvalid(value) {
      let inputElement = this.$refs['f-time-input']
      if (!isEmpty(inputElement)) {
        inputElement.showInvalid(value)
      }
    },
    clearValue() {
      this.reset = true
    },
    showTimeOptions() {
      this.setSelectableTime()
      this.isDropdownVisible = true
    },
    setSelectableTime() {
      let { selectableRange, selectedTime, selectableRangeArray, reset } = this
      if (!isEmpty(selectableRange) && isEmpty(selectedTime) && !reset) {
        let { from } = selectableRangeArray || {}
        this.selectedTime = from || []
      } else {
        if (this.reset) {
          this.selectedTime = []
        }
        this.reset = false
      }
    },
  },
  render() {
    const PanelContainer = styled('div')`
      ${this.getStyle('timePanelContainer')}
    `
    return (
      <FPopover
        disabled={this.disabled}
        trigger="clickToOpen"
        placement="bottom-start"
        v-model={this.isDropdownVisible}
        vOn:show={this.showTimeOptions}
        vOn:hide={() => {
          this.isDropdownVisible = false
        }}
      >
        <FInput
          ref="f-time-input"
          placeholder={this.placeholder}
          v-model={this.formattedDates}
          readOnly={true}
          disabled={this.disabled}
          clearable={true}
          clearValue={this.clearValue}
        >
          <template slot="prefix">
            <FIcon
              color="iconNeutralLight"
              name="clock"
              group="dsm"
              size="20"
              pressable={false}
            ></FIcon>
          </template>
        </FInput>
        <PanelContainer slot="content" id="dsm-facilio-dropdown">
          {this.isDropdownVisible && (
            <FContainer>
              <FPicker
                v-model={this.selectedTime}
                columnList={this.pickerOptions}
                showDisableCell={true}
              />
            </FContainer>
          )}
        </PanelContainer>
      </FPopover>
    )
  },
}
</script>

<style scoped></style>
