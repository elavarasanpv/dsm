<script>
import { FText } from '../../index'
import { Checkbox } from 'ant-design-vue'
import 'ant-design-vue/lib/checkbox/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import dlv from 'dlv'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FCheckbox',
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
    indeterminate: {
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
      const Element = styled(Checkbox)`
        ${styleProps}
        &:hover {
          .ant-checkbox {
            .ant-checkbox-inner {
              ${stateStyle('hover')}
            }
          }
        }
        .ant-checkbox {
          margin-top: 3px;
          .ant-checkbox-inner {
            ${stateStyle('unchecked')}
          }
        }
        .ant-checkbox-indeterminate {
          .ant-checkbox-inner::after {
            ${stateStyle('indeterminate')}
          }
        }
        .ant-checkbox-disabled {
          .ant-checkbox-inner {
            ${stateStyle('disabled')}
          }
        }
        .ant-checkbox-checked {
          .ant-checkbox-inner {
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
        indeterminate={this.indeterminate}
        v-model={this.modelValue}
        vOn:change={this.toggleChecked}
      >
        { !isEmpty(this.children()) && (<FText muted={this.disabled}>{this.children()}</FText>)}
      </Element>
    )
  },
}
</script>
