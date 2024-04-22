<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { Input } from 'ant-design-vue'
import 'ant-design-vue/lib/input/style/index.css'
import { isFunction } from 'lodash'
import { isEmpty } from '../../utils/validation'
import { sanitize } from '../richtext/utils.js'
import dlv from 'dlv'

export default {
  name: 'FTextArea',
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
    clearValue: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 4,
    },
    maxlength: {
      type: Number,
      default: Infinity,
    },
  },
  data: () => ({
    padding: '',
    isInvalid: false,
    toggleClear: false,
    isFocussed: false,
  }),
  computed: {
    modelValue: {
      get() {
        return sanitize(this.value)
      },
      set(e) {
        let value = e?.target?.value
        if (this.type === 'number' && !isEmpty(value)) value = parseInt(value)
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
      let { modelValue, clearable, toggleClear } = this || {}
      return toggleClear && clearable && !isEmpty(modelValue)
    },
    closeIcon() {
      return (
        <svg
          class="icon"
          style="height:12px; width: 12px; fill: #000;margin:0px 5px;cursor:pointer;"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.4 15.51L10.89 10l5.51-5.51c.13-.13.13-.34 0-.47l-.42-.42a.332.332 0 00-.47 0L10 9.11 4.49 3.6a.332.332 0 00-.47 0l-.42.42c-.13.13-.13.34 0 .47L9.11 10 3.6 15.51c-.13.13-.13.34 0 .47l.42.42c.13.13.34.13.47 0L10 10.89l5.51 5.51c.13.13.34.13.47 0l.42-.42c.13-.13.13-.34 0-.47z"></path>
        </svg>
      )
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
    inputSlots(type) {
      let { $scopedSlots, canShowClear, closeIcon, disabled } = this || {}
      let { [type]: component } = $scopedSlots || {}
      const style = this.slotStyle(type)
      if (isFunction(component) || (type === 'suffix' && canShowClear)) {
        let SlotElement = styled('div')`
          ${style}
          background-color:${disabled ? '#f5f5f5' : 'transparent'}
        `
        if (type === 'suffix' && canShowClear) {
          SlotElement = styled(SlotElement)`
            cursor: pointer;
          `
          return (
            <SlotElement ref={`input-${type}`} vOn:click={this.clearValue}>
              {closeIcon}
              {component && component()}
            </SlotElement>
          )
        } else {
          return <SlotElement ref={`input-${type}`}>{component()}</SlotElement>
        }
      }
      return
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
    },
    onInputFocus() {
      this.isFocussed = true
      this.$emit('focus')
    },
  },
  render() {
    let { inputStyles, wrapperStyle } = this || {}

    const Element = styled(Input.TextArea)`
      ${inputStyles}
    `
    const Wrapper = styled('div')`
      ${wrapperStyle}
    `

    return (
      <Wrapper
        vOn:mouseover={() => (this.toggleClear = true)}
        vOn:mouseleave={() => (this.toggleClear = false)}
      >
        {this.inputSlots('prefix')}
        <Element
          class="f-dsm-text-area"
          type={this.type}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly={this.readOnly}
          v-model={this.modelValue}
          maxlength={this.maxlength}
          vOn:blur={this.onInputBlur}
          vOn:focus={this.onInputFocus}
          vOn:change={(val) => this.$emit('change', val)}
          rows={this.rows}
        />
        {this.inputSlots('suffix')}
      </Wrapper>
    )
  },
}
</script>
