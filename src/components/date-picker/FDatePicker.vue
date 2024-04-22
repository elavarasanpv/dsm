<script>
import { FIcon, FInput, FPopover } from '../../index'
import DatePanel from './components/DatePanel.vue'
import DateRangePanel from './components/DateRangePanel.vue'
import 'ant-design-vue/lib/dropdown/style/index.css'
import { isDateEmpty, isEmpty } from '../../utils/validation'
import { isEqual } from 'lodash'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { format } from 'date-format-parse'
import { convertToLocalTZ, convertToTZ } from './utils/date'
import dlv from 'dlv'

export default {
  name: 'FDatePicker',
  mixins: [ThemeMixin],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: undefined,
      default: '',
    },
    type: {
      type: String,
      default: 'date',
      validator: (value) => {
        return ['date', 'date-time', 'date-range', 'date-time-range'].includes(
          value
        )
      },
    },
    validateDate: {
      type: Function,
      default: undefined,
    },
    // timeFormat: {
    //   type: Object,
    //   default: () => {},
    // },
    timeZone: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    displayFormat: {
      type: String,
      default: '',
    },
    dateView: {
      type: String,
      default: 'day',
      validator: (value) => {
        return ['year', 'quater', 'month', 'week', 'day'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  data: () => ({
    isDropdownVisible: false,
    formattedDate: '',
    initialDate: new Date().getTime(),
    placement: 'bottom-start',
    offsetVal: 8,
  }),
  computed: {
    timeFormat() {
      let { displayFormat } = this
      let format = { is12Hour: true, interval: 15 }
      if (!isEmpty(displayFormat)) {
        if (displayFormat.includes('A') || displayFormat.includes('a')) {
          format.is12Hour = true
        } else {
          format.is12Hour = false
        }
      }
      return format
    },
    actualDisplayFormat() {
      let { type, timeFormat, displayFormat } = this
      let { is12Hour } = timeFormat || {}
      if (isEmpty(displayFormat)) {
        if (['date-time', 'date-time-range'].includes(type)) {
          return is12Hour ? 'YYYY-MM-DD hh:mm A' : 'YYYY-MM-DD HH:mm'
        }
        return 'YYYY-MM-DD'
      } else {
        return displayFormat
      }
    },
    modelValue: {
      get() {
        return convertToLocalTZ(this.value, this.timeZone)
      },
      set(value) {
        console.log('modelValue changed: ', value)
        let { displayFormat, isRangePicker, actualDisplayFormat, type } =
          this || {}
        let formatOption = !isEmpty(displayFormat)
          ? displayFormat
          : actualDisplayFormat
        if (!isEmpty(displayFormat) && ['date', 'date-range'].includes(type)) {
          const timeFormatPattern =
            /(?:hh?|HH?)?((:?mm?|m?)(:?ss?|s?)?)? ?(A|a)?/g
          formatOption = formatOption.replace(timeFormatPattern, '').trim()
        }
        // if (!isEmpty(value)) {
        if (isRangePicker) {
          let [value0, value1] = value || []
          value0 = new Date(value0)
          value1 = new Date(value1)
          let formattedValue0 = !isDateEmpty(value0)
            ? format(value0, formatOption)
            : ''
          let formattedValue1 = !isDateEmpty(value1)
            ? format(value1, formatOption)
            : ''
          this.formattedDate = `${formattedValue0} ~ ${formattedValue1}`
          value0 = new Date(value0).getTime()
          value1 = new Date(value1).getTime()
          if (isNaN(value0) && isNaN(value1)) {
            this.$emit('input', '')
            this.$emit('change', '')
          } else {
            let converted = convertToTZ([value0, value1], this.timeZone)
            this.$emit('input', converted)
            this.$emit('change', converted)
          }
        } else {
          this.formattedDate = value ? format(value, formatOption) : ''
          let selectedVal = value ? new Date(value).getTime() : ''
          let converted = convertToTZ(selectedVal, this.timeZone)
          this.$emit('input', converted)
          this.$emit('change', converted)
        }

        if (isEmpty(this.value) && isDateEmpty(this.value)) {
          this.formattedDate = ''
        }
        if (
          ['date-range', 'date-time-range'].includes(type) &&
          !Array.isArray(this.value)
        ) {
          this.formattedDate = ''
        }
        if (isEmpty(this.value)) {
          this.formattedDate = ''
        }
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
    isRangePicker() {
      let { type } = this || {}
      return ['date-range', 'date-time-range'].includes(type)
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (!isEmpty(newVal) && oldVal !== newVal && !isEqual(oldVal, newVal)) {
        if (this.isRangePicker && Array.isArray(newVal)) {
          this.modelValue = convertToLocalTZ(newVal, this.timeZone)
        } else {
          this.modelValue = ''
        }
        if (!this.isRangePicker) {
          this.modelValue = convertToLocalTZ(newVal, this.timeZone)
          console.log(
            'changed model value: ',
            this.modelValue,
            newVal,
            this.timeZone
          )
        }
      }
      if (isEmpty(newVal)) {
        this.formattedDate = ''
      }
    },
    isDropdownVisible(newVal, oldVal) {
      if (!isEmpty(newVal) && oldVal !== newVal && !newVal) {
        window.removeEventListener('resize', this.handleResize.bind(this))
      }
    },
  },

  mounted() {
    let { value } = this
    this.initialDate = convertToLocalTZ(value, this.timeZone)
    this.setFormatedDate()
    setTimeout(() => {
      this.getOut()
    }, 1000)
    if (this.$refs['date-headers']) {
      window.addEventListener('resize', this.handleResize.bind(this))
    }
  },

  methods: {
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    getOut() {
      let { type } = this
      let height = 0
      if (type === 'date') {
        height = 325
      } else if (type === 'date-time') {
        height = 373
      } else {
        height = 437
      }
      const rectElement = this.$refs['f-date-input']
      if (isEmpty(rectElement)) {
        return ''
      }
      let rect
      if (rectElement) {
        rect = rectElement.$el.getBoundingClientRect()
      }
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight
      if (viewportHeight - (rect.top + 48) > height) {
        this.placement = 'bottom-start'
      } else if (rect.top > height) {
        this.placement = 'top-start'
      } else {
        this.placement = 'right'
      }
      if (this.placement === 'right') {
        let width = window.innerWidth
        if (width - rect.right < 420) {
          this.offsetVal = width - rect.right - 420
          console.log(this.offsetVal, 'offsetVal')
        }
      }
      console.log(this.placement, 'placement')
    },
    handleResize() {
      this.getOut()
    },
    setFormatedDate() {
      let { value, isRangePicker, displayFormat, actualDisplayFormat, type } =
        this
      let formatOption = !isEmpty(displayFormat)
        ? displayFormat
        : actualDisplayFormat
      if (!isEmpty(displayFormat) && ['date', 'date-range'].includes(type)) {
        const timeFormatPattern =
          /(?:hh?|HH?)?((:?mm?|m?)(:?ss?|s?)?)? ?(A|a)?/g
        formatOption = formatOption.replace(timeFormatPattern, '').trim()
      }
      let converted = convertToLocalTZ(value, this.timeZone)
      if (isRangePicker) {
        this.formattedDate = converted
          ? `${format(converted[0], formatOption)} ~  ${format(
              converted[1],
              formatOption
            )}`
          : ''
      } else {
        this.formattedDate = converted ? format(converted, formatOption) : ''
      }
      if (isEmpty(this.value)) {
        this.formattedDate = ''
      }
    },
    clearValue() {
      this.modelValue = ''
    },
    showInvalid(value) {
      let inputElement = this.$refs['f-date-input']
      if (!isEmpty(inputElement)) {
        inputElement.showInvalid(value)
      }
    },
    handleDateBlur() {
      this.$emit('blur')
      let checkValid = dlv(this, '$parent.checkValid')
      if (!isEmpty(checkValid)) checkValid({ triggerType: 'blur' })
    },
  },
  render() {
    let { isRangePicker } = this || {}
    return (
      <div ref="date-headers">
        <FPopover
          class="date-id"
          offset={this.offsetVal}
          disabled={this.disabled}
          trigger="clickToOpen"
          v-model={this.isDropdownVisible}
          vOn:show={() => {
            this.isDropdownVisible = true
          }}
          placement={this.placement}
        >
          {!isRangePicker && this.isDropdownVisible ? (
            <DatePanel
              ref="date-panel"
              slot="content"
              key={`${this.value}`}
              v-model={this.modelValue}
              getStyle={this.getStyle}
              placeholder={this.placeholder}
              dateView={this.dateView}
              type={this.type}
              timeFormat={this.timeFormat}
              initialDate={new Date(this.initialDate)}
              vOn:close={() =>
                (this.isDropdownVisible = !this.isDropdownVisible)
              }
              validateDate={this.validateDate}
              id="dsm-facilio-dropdown"
            />
          ) : (
            this.isDropdownVisible && (
              <DateRangePanel
                ref="date-panel"
                slot="content"
                v-model={this.modelValue}
                getStyle={this.getStyle}
                placeholder={this.placeholder}
                dateView={this.dateView}
                type={this.type}
                vOn:close={() =>
                  (this.isDropdownVisible = !this.isDropdownVisible)
                }
                validateDate={this.validateDate}
                timeFormat={this.timeFormat}
                initialDate={this.initialDate}
                id="dsm-facilio-dropdown"
              />
            )
          )}

          <FInput
            ref="f-date-input"
            id="rect-dom"
            readOnly
            v-model={this.formattedDate}
            placeholder={this.placeholder}
            clearable
            clearValue={this.clearValue}
            size={this.size}
            disabled={this.disabled}
            vOn:blur={this.handleDateBlur}
          >
            <template slot="prefix">
              <FIcon
                color="iconNeutralLight"
                group="time-date"
                name="date"
                size="20"
                pressable={false}
              ></FIcon>
            </template>
          </FInput>
        </FPopover>
      </div>
    )
  },
}
</script>

<style scoped></style>
