<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty, isFunction } from '../../utils/validation'
import { FText, FIcon, FContainer } from '../../index'
export default {
  name: 'FSidebar',
  mixins: [ThemeMixin],
  props: {
    sidebarWidth: {
      type: Number,
      default: 200,
    },
    toggleText: {
      type: String,
      default: 'Sidebar',
    },
    title: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: 'backgroundMidgroundSubtle',
      validator: (val) => {
        return ['backgroundMidgroundSubtle', 'backgroundContainer'].includes(
          val
        )
      },
    },
    defaultOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      isActive: null,
    }
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
  watch: {
    visible(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.isActive = true
        }, 330)
      } else {
        this.isActive = false
      }
    },
  },
  mounted() {
    this.visible = this.defaultOpen
    if (this.defaultOpen) {
      this.isActive = true
    }
  },
  methods: {
    toggleSidebar() {
      let { visible } = this
      this.visible = !visible
    },
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    slot(type) {
      let { $scopedSlots } = this || {}
      let { [type]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        let SlotElement = styled(FContainer)`
          height: 100%;
          position: relative;
        `
        return <SlotElement>{component && component()} </SlotElement>
      }
    },
  },
  render() {
    let { styleProps, title, isRTL } = this
    let Container = styled('div')`
      ${styleProps}
    `
    let Sidebar = styled(FContainer)`
      width: ${this.sidebarWidth}px;
      ${this.getStyle('sidebar')}
    `
    let Content = styled('div')`
      ${this.visible
        ? `width: calc(100% - ${this.sidebarWidth}px);`
        : 'width:100%;'}
      ${this.getStyle('content')};
      ${!isRTL ? 'right:0px' : 'left:0px'};
    `
    let Title = styled(FContainer)`
      ${this.getStyle('title')}
    `
    let Toggle = styled(FContainer)`
      ${this.getStyle('toggle')}
      ${isRTL ? 'right:0px' : 'left:0px'};
    `

    return (
      <Container>
        <Sidebar
          backgroundColor={this.bgColor}
          display="flex"
          flexDirection="column"
          class={` ${this.visible ? 'activebutton' : ''} ${
            this.isActive && 'isActive'
          } more-button-list`}
        >
          {!isEmpty(title) ? (
            <Title>
              <FIcon
                group="action"
                name="option"
                size="16"
                vOn:click={() => (this.visible = false)}
              />
              <FText fontWeight="500">{title}</FText>
            </Title>
          ) : (
            <Title>{this.slot('title')}</Title>
          )}
          {this.slot('sidebar')}
        </Sidebar>

        <Toggle
          vOn:click={this.toggleSidebar}
          class={` ${
            this.visible
              ? 'f-active-button-moveup-animation '
              : 'f-inactive-button-movedown-animation'
          } `}
        >
          <fc-icon
            group="action"
            name="option"
            size="14"
            style={{
              marginRight: !isRTL ? '10px' : '0px',
              marginLeft: isRTL ? '10px' : '0px',
            }}
            color="#ffffff"
          ></fc-icon>
          <FText>{this.toggleText}</FText>
        </Toggle>
        <Content
          class={
            this.visible ? 'sidebar-content-open' : 'sidebar-content-collapse'
          }
        >
          {this.slot('content')}
        </Content>
      </Container>
    )
  },
}
</script>

<style scoped>
.activebutton {
  opacity: 1 !important;
  transform: scale(1) !important;
  top: -20px;
}
.isActive {
  top: 0px !important;
}
.more-button-list {
  z-index: 50;
  list-style-type: none;
  bottom: 0;
  opacity: 0;
  transform: scale(0);
  transform-origin: bottom left;
  transition: all 0.3s ease 0.1s;
}
</style>
