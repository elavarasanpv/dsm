<script>
import dlv from 'dlv'
import styled from 'vue-emotion'
import {
  isEmpty,
  isObject,
  areValuesEmpty,
  isFunction,
} from '../../utils/validation'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { FContainer, FIcon, FText } from '../../index'

export default {
  name: 'FFormItem',
  mixins: [ThemeMixin],
  inject: ['rules', 'model', 'position', 'eventBus', 'uniqueKey'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    trigger: {
      type: String,
      default: 'change',
      validator: (value) => {
        return ['change', 'blur'].includes(value)
      },
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errMsg: '',
    }
  },
  computed: {
    formItemStyle() {
      let { position } = this || {}
      return this.getCustomStyle({ property: 'position', value: position })
    },
    rule() {
      let { prop, rules = {} } = this || {}
      return rules[prop] || {}
    },
    mandatorySign() {
      let { required } = this || {}
      if (required)
        return <span style="color:#de3500;padding-right:2px">{' *'}</span>
      else return ''
    },
  },
  watch: {
    errMsg: {
      handler(val) {
        this.$emit('hasError', !isEmpty(val))
      },
      immediate: true,
    },
  },
  mounted() {
    this.initEvents()
  },
  methods: {
    initEvents() {
      let { prop, uniqueKey } = this || {}
      let invalidLabel = `form-invalid-${prop}${uniqueKey}`
      if (this.eventBus) this.eventBus.$on(invalidLabel, this.checkValid)
    },
    checkValid(props) {
      let { label, prop, model, rule, uniqueKey, required } = this || {}
      let { trigger = 'change', validator, message } = rule || {}
      let { triggerType = 'change' } = props || {}
      let children = this.children()
      let canTrigger = [trigger, 'form'].includes(triggerType)

      if ((canTrigger && !isEmpty(rule)) || required) {
        let showInvalid = dlv(children, '0.child.showInvalid')
        let value = model()[prop]
        let isInvalid = false

        if (isObject(value)) {
          isInvalid = areValuesEmpty(value)
        } else {
          isInvalid = isEmpty(value)
        }

        if (!isEmpty(validator)) {
          let { errorMessage, invalid } = validator(value) || {}
          isInvalid = invalid
          if (invalid) {
            message = errorMessage || message
          }
        }

        if (isInvalid) {
          this.errMsg =
            message || `Please provide ${label.toLowerCase() || 'value'}`
          if (!isEmpty(showInvalid)) showInvalid(true)
          this.eventBus.$emit(`throw-form-invalid${uniqueKey}`, {
            invalid: true,
            prop,
          })
        } else {
          this.errMsg = ''
          if (!isEmpty(showInvalid)) showInvalid(false)
          this.eventBus.$emit(`throw-form-invalid${uniqueKey}`, {
            invalid: false,
            prop,
          })
        }
      }
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    setPosition(value) {
      this.position = value
    },
    getSlot(prop) {
      let { $scopedSlots } = this || {}
      let { [prop]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        return component && component()
      }
    },
  },
  render() {
    let { formItemStyle, styleProps, position, hideLabel } = this || {}
    const Element = styled('div')`
      ${styleProps}
      ${formItemStyle}
    `
    const LabelElement = styled(FContainer)`
      ${this.getCustomStyle({ property: 'labelStyle', value: position })}
    `
    const FieldElement = styled('div')`
      ${this.getCustomStyle({ property: 'fieldStyle' })}
    `
    return (
      <Element>
        {!hideLabel &&
          (!isEmpty(this.getSlot('header')) ? (
            this.getSlot('header')
          ) : (
            <LabelElement>
              <FText appearance="captionReg12" color="textMain">
                {this.mandatorySign}
                {this.label}
              </FText>
            </LabelElement>
          ))}
        <FieldElement>
          {this.children()}
          {!isEmpty(this.errMsg) && (
            <FContainer
              display="flex"
              gap="containerMedium"
              marginTop="containerMedium"
            >
              <FIcon
                group="alert"
                name="critical-filled"
                size="14"
                color="textSemanticRed"
                pressable={false}
              />
              <FText appearance="captionReg12" color="textSemanticRed">
                {this.errMsg}
              </FText>
            </FContainer>
          )}
        </FieldElement>
      </Element>
    )
  },
}
</script>

<style scoped></style>
