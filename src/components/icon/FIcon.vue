<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'
import { isEmpty } from '../../utils/validation'
fcIcon(window)

export default {
  name: 'FIcon',
  mixins: [ThemeMixin],
  props: {
    group: { type: String, default: '' },
    name: { type: String, default: '' },
    size: { type: String, default: '' },
    pressable: { type: Boolean, default: true },
    padding: { type: String, default: '' },
  },
  computed: {
    paddingStyle() {
      let { size, padding, pressable } = this || {}
      if (isEmpty(padding)) {
        let formattedPadding = size / 2.5
        padding = Math.round(formattedPadding)
      }
      return `padding:${pressable ? padding : '0'}px`
    },
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    colorVal() {
      let { $attrs, computedStyleProps } = this || {}
      let { color } = $attrs
      let { color: modifiedColor } = computedStyleProps || {}
      return color === 'currentColor' ? 'currentColor' : modifiedColor
    },
  },
  mounted() {
    this.removeColorAttribute()
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
    removeColorAttribute() {
      let element = this.$refs['icon-container']
      if (!isEmpty(element)) {
        element.setAttribute('color', 'currentColor')
      }
    },
  },
  render() {
    let { styleProps, size, paddingStyle, computedStyleProps } = this || {}
    const Element = styled('fc-icon')`
      ${styleProps}
      ${computedStyleProps}
      ${paddingStyle}
    `

    return (
      <Element
        ref="icon-container"
        vOn:click={this.onClick}
        group={this.group}
        name={this.name}
        size={size}
      ></Element>
    )
  },
}
</script>

<style scoped></style>
