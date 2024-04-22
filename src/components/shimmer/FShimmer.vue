<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FShimmer',
  mixins: [ThemeMixin],
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: undefined,
    },
    width: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  render() {
    let { height, width, styleProps, isRTL } = this
    let shimmerHeight = !isEmpty(height) ? `${height}px` : '100%'
    let shimmerWidth = !isEmpty(width) ? `${width}px` : '100%'

    const Element = styled('div')`
      ${styleProps};
      width: ${shimmerWidth};
      height: ${shimmerHeight};
      animation-direction: ${isRTL ? 'reverse' : 'normal'};
    `

    return <Element></Element>
  },
}
</script>

<style scoped></style>
