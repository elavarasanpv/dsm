<script>
import { Switch } from 'ant-design-vue'
import 'ant-design-vue/lib/switch/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
export default {
  name: 'FSwitch',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'small'].includes(value)
      },
    },
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
      },
    },
    styledElement() {
      let { stateStyle, styleProps } = this || {}
      const checked = {
        '&[aria-checked]': stateStyle('checked'),
      }
      const Element = styled(Switch)`
        ${styleProps}
        ${checked}
      `
      return Element
    },
  },
  methods: {
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
      />
    )
  },
}
</script>

<style>
.ant-switch:focus {
  box-shadow: none;
}
</style>
