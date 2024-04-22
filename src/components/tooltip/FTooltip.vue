<script>
import { Tooltip } from 'ant-design-vue'
import 'ant-design-vue/lib/tooltip/style/index.css'

export default {
  name: 'FTooltip',
  props: {
    placement: {
      type: String,
      default: 'bottom',
      validator: (value) => {
        return [
          'top',
          'left',
          'right',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
          'leftTop',
          'leftBottom',
          'rightTop',
          'rightBottom',
        ].includes(value)
      },
    },
    mouseEnterDelay: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    title() {
      let { $slots } = this || {}
      let { title } = $slots || {}
      return title
    },
  },
  render() {
    return (
      <Tooltip
        placement={this.placement}
        mouseEnterDelay={this.mouseEnterDelay}
      >
        <template slot="title">{this.title()}</template>
        {this.children()}
      </Tooltip>
    )
  },
}
</script>

<style scoped>
fc-icon {
  visibility: visible;
}
</style>
