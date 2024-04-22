<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FAccordion',
  mixins: [ThemeMixin],
  data() {
    return {}
  },
  methods: {
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
  },
  render() {
    let { styleProps } = this || {}
    const Element = styled('div')`
      ${styleProps}
    `

    return <Element getStyle={this.getStyle}>{this.children()}</Element>
  },
}
</script>

<style scoped></style>
