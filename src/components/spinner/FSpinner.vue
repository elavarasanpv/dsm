<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
export default {
  name: 'FSpinner',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    borderWidth() {
      let { size } = this || {}
      return size / 8
    },
  },
  render() {
    let { styleProps, size, borderWidth } = this || {}
    const Element = styled('div')`
      ${styleProps}
      width: ${size}px;
      height: ${size}px;
      border-width: ${borderWidth}px;
    `
    return <Element />
  },
}
</script>

<style scoped></style>
