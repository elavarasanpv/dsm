<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { textAppearance } from '../../utils/helpers'

export default {
  name: 'FText',
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'bodyReg14',
      validator: (value) => {
        return textAppearance.includes(value)
      },
    },
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  methods: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
  },
  render() {
    let { styleProps, computedStyleProps } = this || {}
    const Element = styled('span')`
      ${styleProps}
      ${computedStyleProps}
    `

    return <Element>{this.children()}</Element>
  },
}
</script>
