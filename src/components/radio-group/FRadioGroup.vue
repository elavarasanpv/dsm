<script>
import { FRadio } from '../../index'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import dlv from 'dlv'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FRadioGroup',
  mixins: [ThemeMixin],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: undefined,
      default: undefined,
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
  created() {
    let { options, modelValue } = this || {}
    this.data = options.map((option) => {
      return modelValue == option.value
    })
  },
  methods: {
    isChecked(val) {
      let { modelValue } = this || {}
      return modelValue == val
    },
    selectValue(option) {
      let { data, options } = this || {}
      let { value } = option
      this.modelValue = value
      this.data = data.map((val, index) => {
        let currOption = options[index]
        return currOption.value == value
      })
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
            <FRadio
              class="f-radio"
              v-model={this.data[index]}
              vOn:change={() => this.selectValue(option)}
              disabled={option.disabled}
            >
              {option.label}
            </FRadio>
          )
        })}
      </Element>
    )
  },
}
</script>

<style scoped>
.f-radio {
  padding-bottom: 14px;
  padding-right: 14px;
  margin-left: 0px;
}
</style>
