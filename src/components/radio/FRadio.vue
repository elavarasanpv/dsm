<script>
import { FText } from '../../index'
import { Radio } from 'ant-design-vue'
import 'ant-design-vue/lib/radio/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import dlv from 'dlv'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FRadio',
  mixins: [ThemeMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
    styledElement() {
      let { stateStyle, styleProps } = this || {}
      const Element = styled(Radio)`
        ${styleProps}
        &:hover {
          .ant-radio {
            .ant-radio-inner {
              ${stateStyle('hover')}
            }
          }
        }
        .ant-radio {
          margin-top: 0px;
          .ant-radio-inner {
            ${stateStyle('unchecked')}
          }
        }
        .ant-radio-disabled {
          .ant-radio-inner {
            ${stateStyle('disabled')}
          }
        }
        .ant-radio-checked {
          .ant-radio-inner {
            ${stateStyle('checked')}
          }
        }
      `
      return Element
    },
  },
  methods: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    stateStyle(state) {
      return this.getCustomStyle({ property: 'states', value: state })
    },
    toggleChecked() {
      let value = !this.modelValue
      this.modelValue = value
      this.$emit('change', value)
    },
  },
  render() {
    const Element = this.styledElement
    return (
      <Element
        disabled={this.disabled}
        checked={this.modelValue}
        vOn:change={this.toggleChecked}
      >
        <FText muted={this.disabled}>{this.children()}</FText>
      </Element>
    )
  },
}
</script>
