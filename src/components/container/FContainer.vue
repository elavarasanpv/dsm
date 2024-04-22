<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'

export default {
  name: 'FContainer',
  mixins: [ThemeMixin],
  props: {
    tag: {
      type: String,
      default: 'div',
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
    handleClick() {
      this.$emit('click')
    },
    handleMouseOver() {
      this.$emit('mouseover')
    },
    handleMouseLeave() {
      this.$emit('mouseleave')
    },
  },
  render() {
    let { tag } = this || {}
    const Container = styled(tag)`
      ${this.computedStyleProps}
    `
    return (
      <Container
        vOn:click={this.handleClick}
        vOn:mouseover={this.handleMouseOver}
        vOn:mouseleave={this.handleMouseLeave}
      >
        {this.children()}
      </Container>
    )
  },
}
</script>

<style scoped></style>
