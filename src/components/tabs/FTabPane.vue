<script>
import { FContainer } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
export default {
  mixins: [ThemeMixin],
  props: {
    activeKey: {
      type: String,
      default: '',
    },
    tab: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  render() {
    const Container = styled(FContainer)`
      overflow: scroll;
      ${this.computedStyleProps};
    `
    return (
      <Container flexGrow="1" height="100%" width="100%">
        {this.$slots.default}
      </Container>
    )
  },
}
</script>
