<script>
import dlv from 'dlv'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FRow',
  props: {
    gutter: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
  },
  mounted() {
    this.setChildIndex()
  },
  methods: {
    setChildIndex() {
      let children = dlv(this, '$children')
      if (!isEmpty(children)) {
        children.forEach((child, index) => {
          let childProps = dlv(child, '$options.propsData')
          if (!isEmpty(childProps) || childProps === {}) {
            let start = false,
              end = false
            if (index === 0) start = true
            if (index === children.length - 1) end = true
            this.$children[index].updatePosition({ start, end })
          }
        })
      }
    },
  },
  render() {
    const Element = styled('div')`
      display: flex;
    `
    return <Element>{this.children}</Element>
  },
}
</script>
