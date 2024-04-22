<script>
import styled from 'vue-emotion'
export default {
  name: 'FCol',
  props: {
    span: {
      type: [Number],
      default: 12,
      validator: (value) => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(value)
      },
    },
  },
  data: () => ({
    isStart: false,
    isEnd: false,
  }),
  computed: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    width() {
      let { span } = this || {}
      span = span / 12
      span = span.toFixed(2)
      return span * 100
    },
    gutter() {
      let parent = this.$parent
      if (parent.$options.name === 'FRow') {
        let gut = parent ? parent.gutter : 0
        return gut / 2
      }

      return 0
    },
  },
  methods: {
    updatePosition({ start, end }) {
      this.isStart = start
      this.isEnd = end
    },
  },
  render() {
    let { width, gutter, isStart, isEnd } = this || {}
    let paddingLeft = `${gutter}rem`,
      paddingRight = `${gutter}rem`

    if (isStart) paddingLeft = '0rem'
    if (isEnd) paddingRight = '0rem'

    const Element = styled('div')`
      width: ${width}%;
      padding-left: ${paddingLeft};
      padding-right: ${paddingRight};
    `
    return <Element>{this.children}</Element>
  },
}
</script>
