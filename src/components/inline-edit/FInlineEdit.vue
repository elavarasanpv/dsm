<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import dlv from 'dlv'
import { sanitize } from '../richtext/utils.js'
import { textAppearance } from '../../utils/helpers'

export default {
  name: 'FInlineEdit',
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'bodyReg14',
      validator: (value) => {
        return textAppearance.includes(value)
      },
    },
    value: {
      type: undefined,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isFocussed: false,
    }
  },
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
    appearanceStyle() {
      let { appearance } = this
      let allStyle = this.getStyle('appearance')
      return allStyle[appearance]
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.isFocussed) {
        let element = this.$refs['f-dsm-inline-edit']
        if (!isEmpty(element)) {
          element.blur()
        }
      }
    })
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    onInputFocus() {
      this.isFocussed = true
    },
    onInputBlur() {
      let { modelValue } = this || ''
      this.isFocussed = false
      this.$emit('blur', modelValue)
    },
  },
  render() {
    let { appearanceStyle, styleProps } = this
    const InputBox = styled('input')`
      ${styleProps}
      ${appearanceStyle}
    `
    return (
      <InputBox
        ref="f-dsm-inline-edit"
        v-model={this.modelValue}
        vOn:blur={this.onInputBlur}
        vOn:focus={this.onInputFocus}
        vOn:change={(val) => this.$emit('change', val)}
        placeholder={this.placeholder}
      ></InputBox>
    )
  },
}
</script>
