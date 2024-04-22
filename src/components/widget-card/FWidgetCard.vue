<script>
import { FContainer } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
export default {
  name: 'FWidgetCard',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
  },
  render() {
    let { styleProps, computedStyleProps } = this
    const Container = styled(FContainer)`
      ${styleProps};
      ${computedStyleProps}
    `
    return <Container>{this.children()}</Container>
  },
}
</script>

<style scoped></style>
