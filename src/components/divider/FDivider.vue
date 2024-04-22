<script>
import { FContainer } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FDivider',
  mixins: [ThemeMixin],
  props: {
    height: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
  },
  computed: {
    lineStyle() {
      let { height, width } = this
      let style
      if (!isEmpty(height)) {
        style = { height: height, width: '1px' }
      } else if (isEmpty(height) && !isEmpty(width)) {
        style = { height: '1px', width: width }
      } else {
        style = { height: '1px', width: '1px' }
      }
      return style
    },
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
  },
  render() {
    let { styleProps, lineStyle, computedStyleProps } = this
    const Line = styled(FContainer)`
      ${styleProps};
      ${lineStyle}
      ${computedStyleProps}
    `
    return <Line />
  },
}
</script>
