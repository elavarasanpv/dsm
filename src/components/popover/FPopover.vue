<script>
import { FContainer } from '../../index'
import { createPopper } from '@popperjs/core'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import uniqueId from 'lodash/uniqueId'
import debounce from 'lodash/debounce'

export default {
  name: 'FPopover',
  mixins: [ThemeMixin],
  props: {
    trigger: {
      type: String,
      default: 'hover',
      validator: (value) => {
        return ['hover', 'clickToOpen'].includes(value)
      },
    },
    showArrow: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
      validator: (value) => {
        return [
          'top',
          'bottom',
          'right',
          'left',
          'bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
          'left-start',
          'left-end',
          'right-start',
          'right-end',
        ].includes(value)
      },
    },
    containerWidth: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: 'backgroundCanvas',
    },
    offset: {
      type: Number,
      default: 8,
    },
  },
  data: () => ({
    canShowPopover: false,
    width: '',
    popper: null,
    contentId: null,
    root: null,
    showContent: false,
  }),
  computed: {
    popoverstyle() {
      let { width, containerWidth } = this || {}
      if (isEmpty(width) || !containerWidth) {
        return ``
      } else {
        return `width: ${width}px`
      }
    },
  },
  watch: {
    value(newVal) {
      this.canShowPopover = newVal
    },
    canShowPopover(val) {
      this.$emit('input', val)
      val ? this.$emit('show') : this.$emit('hide')
      if (val) this.init()
      else this.popper.destroy()
    },
  },
  created() {
    this.contentId = uniqueId('f-popover-')
    this.root = document.createElement('div')
    this.root.setAttribute('id', this.contentId)
    this.root.setAttribute(
      'style',
      'width: fit-content;z-index:1000;position:relative;'
    )
    document.body.appendChild(this.root)
  },
  beforeDestroy() {
    document.removeEventListener('click', () => {})
    this.root.remove()
  },
  methods: {
    onRefClick() {
      if (!this.disabled) {
        this.canShowPopover = true
      }
    },
    onRefHover() {
      if (!this.disabled && this.trigger === 'hover') {
        this.canShowPopover = true
      }
    },
    onRefLeave() {
      let debounceMethod = debounce(() => {
        if (this.showContent) return
        if (!this.disabled && this.trigger === 'hover') {
          this.canShowPopover = false
        }
      }, 50)
      debounceMethod()
    },
    onRefContentHover() {
      if (!this.disabled && this.trigger === 'hover') {
        this.canShowPopover = true
        this.showContent = true
      }
    },
    onRefContentLeave() {
      if (!this.disabled && this.trigger === 'hover') {
        this.canShowPopover = false
        this.showContent = false
      }
    },
    init() {
      let { placement, popper } = this || {}
      if (!isEmpty(popper)) this.popper.destroy()
      if (this.canShowPopover) {
        let content = this.$refs['content'].$el
        content && this.root.appendChild(content)
      }
      let childrenElement = this.$refs['children']?.$el
      this.popper = createPopper(childrenElement, this.root, {
        placement: placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, this.offset],
            },
          },
        ],
      })
      this.poppoverId = uniqueId('dsm-popover-')
      this.getWidth()
      document.addEventListener('click', (event) => {
        let elementsList = document.getElementsByClassName(
          'f-dsm-popover-content'
        )
        elementsList = [].slice.call(elementsList)
        const isContentClick = (elementsList || []).some((element) => {
          return element?.contains(event.target)
        })
        const isChildrenClick = childrenElement?.contains(event.target)

        if (!isContentClick && !isChildrenClick) {
          this.canShowPopover = false
        }
      })
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    content() {
      let { $slots } = this || {}
      let { content } = $slots || {}
      return content
    },
    getWidth() {
      let element = this.$refs['children']?.$el
      let { clientWidth } = element || {}
      this.width = !isEmpty(clientWidth) ? clientWidth : ''
    },
  },
  render() {
    let { popoverstyle, bgColor } = this || {}
    const Content = styled(FContainer)`
      ${this.getCustomStyle({ property: 'content' })}
      ${popoverstyle}
    `
    return (
      <FContainer>
        <FContainer
          ref="children"
          onClick={this.onRefClick}
          vOn:mouseover={this.onRefHover}
          vOn:mouseleave={(event) => this.onRefLeave(event)}
        >
          {this.children()}
        </FContainer>
        <Content
          backgroundColor={bgColor}
          class="f-dsm-popover-content"
          display={this.canShowPopover ? 'block' : 'none'}
          ref="content"
          zIndex="99"
          overflow="unset"
          vOn:mouseover={this.onRefContentHover}
          vOn:mouseleave={this.onRefContentLeave}
        >
          {this.content()}
        </Content>
      </FContainer>
    )
  },
}
</script>
