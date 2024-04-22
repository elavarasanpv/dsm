<script>
import { FInput, FSelect, FText, FContainer } from '../../index'
import { isEmpty } from '../../utils/validation'
import { durationToSeconds, getDuration } from '../../utils/helpers'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import dlv from 'dlv'
const TOLGEE_CONFIG = Symbol.for('@facilio/tolgee')
let $t
if (window[TOLGEE_CONFIG]) {
  $t = window[TOLGEE_CONFIG].t
} else {
  $t = (_, defaultValue) => defaultValue
}
export default {
  name: 'FDuration',
  mixins: [ThemeMixin],
  props: {
    field: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false },
    value: { type: undefined, default: undefined },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  data() {
    return {
      durationObj: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      unitOptions: [
        {
          label: $t('dsm.date_time.days', 'Days'),
          value: 'days',
        },
        {
          label: $t('dsm.date_time.hours', 'Hours'),
          value: 'hours',
        },
      ],
      selectedUnit: 'days',
    }
  },
  computed: {
    formModelValue: {
      get() {
        return this.value
      },
      set(val) {
        val = val === 0 || isEmpty(val) ? null : val
        this.$emit('input', val)
      },
    },
    secondaryUnitObj() {
      let { selectedUnit } = this
      return selectedUnit === 'days'
        ? { label: this.$t('dsm.date_time.hours', 'Hours'), value: 'hours' }
        : {
            label: this.$t('dsm.date_time.minutes', 'Minutes'),
            value: 'minutes',
          }
    },
    selectedFieldUnit() {
      let { selectedUnit } = this || {}
      return selectedUnit
    },
  },
  watch: {
    durationObj: {
      handler(value) {
        this.handleDurationObjChange(value)
      },
      deep: true,
    },
    value: {
      handler(val) {
        this.deserializeDurationField(val)
      },
      immediate: true,
    },
  },
  created() {
    this.deserializeDurationField()
  },
  methods: {
    deserializeDurationField() {
      let { formModelValue: value } = this
      if (!isEmpty(value)) {
        let durationObj = getDuration(value, 'seconds', 1)
        let { Days = 0, Hrs = 0, Mins = 0, Secs = 0 } = durationObj
        let selectedUnit = Days == 0 ? 'hours' : 'days'
        let defaultValue = {
          days: Days,
          hours: Hrs,
          minutes: Mins,
          seconds: Secs,
        }
        this.$set(this, 'durationObj', defaultValue)

        this.selectedUnit = selectedUnit
      }
    },
    onUnitChange(value) {
      let { durationObj } = this
      let { days, hours, minutes, seconds } = durationObj
      if (value === 'days') {
        minutes = 0
        seconds = 0
      } else if (value === 'hours') {
        days = 0
        seconds = 0
      }
      this.$set(this, 'durationObj', {
        days,
        hours,
        minutes,
        seconds,
      })
    },
    handleDurationObjChange(durationObj) {
      let { days, hours, minutes, seconds } = durationObj || {}

      let formatedDuration = durationToSeconds({
        seconds,
        minutes,
        hours,
        days,
      })
      this.formModelValue = formatedDuration
      let checkValid = dlv(this, '$parent.checkValid')
      if (!isEmpty(checkValid)) checkValid()
    },
    handleDurationBlur() {
      this.$emit('blur')
      let checkValid = dlv(this, '$parent.checkValid')
      if (!isEmpty(checkValid)) checkValid({ triggerType: 'blur' })
      this.$nextTick(() => {
        this.deserializeDurationField()
      })
    },
  },
  render() {
    const { styleProps, secondaryUnitObj, selectedFieldUnit } = this || {}
    const Element = styled('div')`
      ${styleProps}
    `

    const FirstInputContainer = styled('div')`
      ${this.getCustomStyle({ property: 'firstInputContainer' })}
    `
    return (
      <Element>
        <FirstInputContainer>
          <FInput
            type="number"
            size={this.size}
            v-model={this.durationObj[selectedFieldUnit]}
            disabled={this.disabled}
            vOn:blur={this.handleDurationBlur}
          />
          <FContainer width="155px">
            <FSelect
              size={this.size}
              v-model={this.selectedUnit}
              options={this.unitOptions}
              clearable={false}
              vOn:change={this.onUnitChange}
              disabled={this.disabled}
              vOn:blur={this.handleDurationBlur}
            />
          </FContainer>
        </FirstInputContainer>
        <FInput
          type="number"
          size={this.size}
          v-model={this.durationObj[secondaryUnitObj.value]}
          disabled={this.disabled}
          vOn:blur={this.handleDurationBlur}
        >
          <template slot="suffix">
            <FText>{secondaryUnitObj.label}</FText>
          </template>
        </FInput>
      </Element>
    )
  },
}
</script>
