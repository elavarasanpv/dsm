<script>
import { FCheckbox } from '../../index'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import dlv from 'dlv'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FCheckboxGroup',
  mixins: [ThemeMixin],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    alignment: {
      type: String,
      default: 'vertical',
      validator: (value) => {
        return ['vertical', 'horizontal'].includes(value)
      },
    },
  },
  data: () => ({
    data: [],
  }),
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('change', value)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
    selectedOption() {
      let { options, modelValue } = this || {}
      return options.find((option) => `${option.value}` === modelValue)
    },
  },
  watch: {
    modelValue: {
      handler(value) {
        let { options } = this || {}
        this.data = options.map((option) => {
          return value.includes(`${option.value}`)
        })
      },
      immediate: true,
    },
  },
  methods: {
    isChecked(val) {
      let { modelValue } = this || {}
      return modelValue.includes(`${val}`)
    },
    selectValue(option) {
      let { modelValue } = this || {}
      let { value } = option
      if (this.isChecked(value)) {
        this.modelValue = modelValue.filter((val) => val !== `${value}`)
      } else {
        this.modelValue = [...modelValue, `${value}`]
      }
    },
  },
  render() {
    let { styleProps } = this || {}
    const Element = styled('div')`
      ${styleProps}
    `
    return (
      <Element>
        {this.options.map((option, index) => {
          return (
            <FCheckbox
              class="f-checkbox"
              v-model={this.data[index]}
              vOn:change={() => this.selectValue(option)}
              disabled={option.disabled}
            >
              {option.label}
            </FCheckbox>
          )
        })}
      </Element>
    )
  },
}
</script>

<style scoped>
.f-checkbox {
  padding-bottom: 14px;
  padding-right: 14px;
  margin-left: 0px;
}
</style>
