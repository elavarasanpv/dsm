<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isFunction } from 'lodash'
import { isEmpty } from '../../utils/validation'
import { sanitize } from '../richtext/utils.js'
import dlv from 'dlv'
import { FContainer, FIcon, FText, FPopover } from '../../index'

export default {
  name: 'FInput',
  components: { FIcon },
  mixins: [ThemeMixin],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: undefined,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    appearance: {
      type: String,
      default: 'default',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    showAppend: {
      type: Boolean,
      default: false,
    },
    showPrepend: {
      type: Boolean,
      default: false,
    },
    prependDetails: {
      type: Object,
      default: () => {},
    },
    appendDetails: {
      type: Object,
      default: () => {},
    },
    clearValue: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    wrap: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: undefined,
      default: 'any',
    },
    maxlength: {
      type: Number,
      default: Infinity,
    },
    openPrepend: {
      type: Boolean,
      default: false,
    },
    openAppend: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    padding: '',
    isInvalid: false,
    toggleClear: false,
    isFocussed: false,
    customReadOnly: false,
    prependPopover: false,
    appendPopover: false,
  }),
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
    isReadOnly() {
      return this.customReadOnly || this.readOnly
    },
    modelValue: {
      get() {
        return sanitize(this.value)
      },
      set(e) {
        let value = e?.target?.value
        this.$emit('input', sanitize(value))
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
    wrapperStyle() {
      let { isInvalid, styleProps, disabled } = this || {}
      if (disabled) {
        let custom =
          this.getCustomStyle({ property: 'appearance', value: 'disabled' }) ||
          {}
        return { ...styleProps, ...custom }
      } else if (isInvalid) {
        let custom =
          this.getCustomStyle({ property: 'appearance', value: 'error' }) || {}
        return { ...styleProps, ...custom }
      } else {
        return styleProps
      }
    },
    inputStyles() {
      return this.getCustomStyle({ property: 'inputStyle' })
    },
    canShowClear() {
      let { modelValue, clearable } = this || {}
      return clearable && !isEmpty(modelValue)
    },
    closeIcon() {
      let { toggleClear } = this || {}
      return (
        <FIcon
          vOn:click={this.clearValue}
          group="dsm"
          name="close"
          size="14"
          style={`visibility:${
            toggleClear ? 'visible' : 'hidden'
          };margin:0px 3px`}
        />
      )
    },
    hasClickableSlot() {
      let { $scopedSlots } = this || {}
      let { clickable } = $scopedSlots || {}
      return !isEmpty(clickable)
    },
    hasPrefixSlot() {
      return !isEmpty(this.inputSlots('prefix'))
    },
    hasSuffixSlot() {
      return !isEmpty(this.inputSlots('suffix'))
    },
  },
  watch: {
    prependPopover: {
      immediate: true,
      handler(newVal) {
        this.$emit('updatedPrepend', newVal)
        this.$emit('update:openPrepend', newVal)
      },
    },
    openPrepend: {
      handler(newVal) {
        this.prependPopover = newVal
      },
    },
    appendPopover: {
      immediate: true,
      handler(newVal) {
        this.$emit('updatedAppend', newVal)
        this.$emit('update:openAppend', newVal)
      },
    },
    openAppend: {
      handler(newVal) {
        this.appendPopover = newVal
      },
    },
  },
  mounted() {
    this.setElementPadding()
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.isFocussed) {
        this.$emit('enterPress')
      }
    })
  },
  methods: {
    showInvalid(value) {
      this.isInvalid = value
    },
    slotStyle(type) {
      return this.getCustomStyle({ property: 'slots', value: type })
    },
    height(type) {
      return this.getCustomStyle({ property: 'size', value: type })
    },
    inputSlots(type) {
      let { $scopedSlots, canShowClear, closeIcon, disabled } = this || {}
      let { [type]: component } = $scopedSlots || {}
      const style = this.slotStyle(type)
      if (isFunction(component) || (type === 'suffix' && canShowClear)) {
        let SlotElement = styled(FContainer)`
          ${style}
        `
        if (type === 'suffix' && canShowClear) {
          return (
            <SlotElement ref={`input-${type}`}>
              <FContainer
                cursor="pointer"
                vOn:click={this.clearValue}
                display="flex"
              >
                {!disabled && closeIcon}
              </FContainer>
              {component && component()}
            </SlotElement>
          )
        } else {
          return <SlotElement ref={`input-${type}`}>{component()}</SlotElement>
        }
      }
      return
    },
    clickableSlot() {
      let { $scopedSlots } = this || {}
      let { clickable: component } = $scopedSlots || {}
      const style = this.slotStyle('clickable')
      let SlotElement = styled('div')`
        ${style}
      `
      if (isFunction(component)) {
        return (
          <SlotElement vOn:click={this.handleSlotClick}>
            {component()}
          </SlotElement>
        )
      }
      return
    },
    handleSlotClick() {
      this.$emit('slotClicked')
    },
    setElementPadding() {
      let { padding } = this || {}
      let suffix = this.$refs['input-suffix']
      let prefix = this.$refs['input-prefix']
      if (!isEmpty(suffix)) {
        let { clientWidth } = suffix || {}
        padding = { ...padding, paddingRight: clientWidth + 32 }
      } else {
        delete padding['paddingRight']
      }
      if (!isEmpty(prefix)) {
        let { clientWidth } = prefix || {}
        padding = { ...padding, paddingLeft: clientWidth + 32 }
      } else {
        delete padding['paddingLeft']
      }

      this.padding = padding || ''
    },
    onInputBlur() {
      this.isFocussed = false
      this.$emit('blur')
      let checkValid = dlv(this, '$parent.checkValid')
      if (!isEmpty(checkValid)) checkValid({ triggerType: 'blur' })

      this.customReadOnly = true
    },
    onInputFocus() {
      this.isFocussed = true
      this.$emit('focus')

      this.customReadOnly = false
    },
    selectInput() {
      this.$refs['f-input-field'].select()
    },
    getPrepend() {
      let { prependDetails, disabled } = this || {}
      let isDisabled = false
      let {
        text = '',
        name = '',
        group = '',
        chevron = false,
        size,
        disable = false,
      } = prependDetails || {}
      isDisabled = disable || disabled
      const style = this.height(size)
      let SlotElement = styled(FContainer)`
        ${style[this.size]}
      `
      return (
        <FPopover
          height="100%"
          placement="bottom-start"
          trigger="clickToOpen"
          v-model={this.prependPopover}
        >
          <SlotElement
            borderRadius="none"
            display="flex"
            padding="containerLarge"
            gap="containerMedium"
            alignItems="center"
            justifyContent="flex-start"
            backgroundColor="backgroundMidgroundSubtle"
            hover-backgroundColor={
              isDisabled
                ? 'backgroundMidgroundSubtle'
                : 'backgroundMidgroundMedium'
            }
            cursor={
              chevron ? (isDisabled ? ' not-allowed' : 'pointer') : 'default'
            }
          >
            {!isEmpty(text) && <FText>{text}</FText>}
            {isEmpty(text) && (
              <FIcon name={name} group={group} size="16" pressable={false} />
            )}
            {chevron && (
              <FIcon
                name={
                  this.prependPopover && !isDisabled
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                group="dsm"
                size="16"
                pressable={false}
              />
            )}
          </SlotElement>
          <template slot="content">
            {!isDisabled && this.inputSlots('prepend')}
          </template>
        </FPopover>
      )
    },
    getAppend() {
      let { appendDetails, disabled } = this || {}
      let isDisabled = false
      let {
        text = '',
        name = '',
        group = '',
        chevron = false,
        size,
        disable = false,
      } = appendDetails || {}
      isDisabled = disable || disabled
      const style = this.height(size)
      let SlotElement = styled(FContainer)`
        ${style[this.size]}
      `
      return (
        <FPopover
          height="100%"
          placement="bottom-start"
          trigger="clickToOpen"
          v-model={this.appendPopover}
        >
          <SlotElement
            borderRadius="none"
            display="flex"
            padding="containerLarge"
            gap="containerMedium"
            alignItems="center"
            justifyContent="flex-start"
            backgroundColor="backgroundMidgroundSubtle"
            hover-backgroundColor={
              isDisabled
                ? 'backgroundMidgroundSubtle'
                : 'backgroundMidgroundMedium'
            }
            cursor={
              chevron ? (isDisabled ? ' not-allowed' : 'pointer') : 'default'
            }
          >
            {!isEmpty(text) && <FText>{text}</FText>}
            {isEmpty(text) && (
              <FIcon name={name} group={group} size="16" pressable={false} />
            )}
            {chevron && (
              <FIcon
                name={
                  this.appendPopover && !isDisabled
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                group="dsm"
                size="16"
                pressable={false}
              />
            )}
          </SlotElement>
          <template slot="content">
            {!isDisabled && this.inputSlots('append')}
          </template>
        </FPopover>
      )
    },
  },
  render() {
    let {
      inputStyles,
      wrapperStyle,
      readonly,
      disabled,
      hasPrefixSlot,
      hasSuffixSlot,
      isRTL,
    } = this || {}

    const Element = styled('input')`
      ${inputStyles}
      ${readonly ? 'cursor: pointer' : ''}
      ${disabled ? 'cursor:not-allowed;' : ''}
      ${hasPrefixSlot && !isRTL ? 'padding-left: 0px;' : ''}
      ${hasSuffixSlot && !isRTL ? 'padding-right: 0px;' : ''}
      ${hasPrefixSlot && isRTL ? 'padding-right: 0px;' : ''}
      ${hasSuffixSlot && isRTL ? 'padding-left: 0px;' : ''}
    `
    const Wrapper = styled('div')`
      ${wrapperStyle}
    `

    return (
      <Wrapper
        vOn:mouseover={() => (this.toggleClear = true)}
        vOn:mouseleave={() => (this.toggleClear = false)}
      >
        {' '}
        {this.showPrepend && !isEmpty(this.prependDetails) && this.getPrepend()}
        {this.inputSlots('prefix')}
        <Element
          class="f-dsm-input"
          ref="f-input-field"
          type={this.type}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly={this.isReadOnly}
          autofocus={this.autofocus}
          v-model={this.modelValue}
          vOn:blur={this.onInputBlur}
          vOn:focus={this.onInputFocus}
          maxlength={this.maxlength}
          vOn:click={() => {
            this.$emit('inputClick')
          }}
          vOn:change={(val) => this.$emit('change', val)}
          step={this.type === 'number' ? this.step : null}
          min={this.type === 'number' ? this.min : null}
          max={this.type === 'number' ? this.max : null}
        />
        {this.inputSlots('suffix')}
        {this.clickableSlot()}
        {this.showAppend && !isEmpty(this.appendDetails) && this.getAppend()}
      </Wrapper>
    )
  },
}
</script>
