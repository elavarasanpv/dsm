<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty, isFunction } from '../../utils/validation'
import { FText, FIcon } from '../../index'
export default {
  name: 'FTags',
  components: { FText, FIcon },
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      validator: (value) =>
        ['simple', 'action', 'status', 'accent'].includes(value), // There are 4 types of tags
      default: 'simple',
    },
    text: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    statusType: {
      type: String,
      validator: (value) =>
        [
          'information',
          'default',
          'success',
          'danger',
          'warning',
          'neutral',
        ].includes(value),
      default: 'default',
    },
    accentColor: {
      type: String,
      validator: (value) =>
        [
          'blue',
          'green',
          'red',
          'orange',
          'yellow',
          'grey',
          'cyan',
          'violet',
          'purple',
          'pink',
        ].includes(value),
      default: 'grey',
    },
    accentLevel: {
      type: String,
      validator: (value) => ['L1', 'L2', 'L3'].includes(value),
      default: 'L2',
    },
    actionType: {
      type: String,
      validator: (value) => ['dropdown', 'removable'].includes(value),
    },
    isClickable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      open: false,
      closed: false,
    }
  },
  computed: {
    // status tag cannot have prefix since it provides default circle as prefix
    canRenderPrefixSlot() {
      return 'status' !== this.appearance
    },
    // action tag can only have suffix
    canRenderSuffixSlot() {
      return 'action' === this.appearance
    },
  },
  methods: {
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    slot(type) {
      const component = this.$scopedSlots[type]
      if (component && isFunction(component)) {
        return component()
      }
    },
    onClick(ev) {
      this.$emit('click', ev)
    },
    closeAction() {
      //Tag remove event
      this.$emit('close', { removed: true })
    },
  },
  render() {
    let { styleProps, statusType, appearance, actionType, isClickable } = this
    if (!isClickable) {
      delete styleProps['&:active']
      delete styleProps['&:hover']
      delete styleProps['&:focus']
    }
    const disabledStyle = `
      opacity: ${this.disabled ? 0.5 : 1};
      pointer-events: ${this.disabled ? 'none' : 'auto'};
    `
    let Marker
    let Element = styled('div')`
      ${styleProps}
      ${disabledStyle}
    `

    if (appearance === 'action') {
      return (
        <Element vOn:click={this.onClick} tabindex={1}>
          {this.canRenderPrefixSlot && this.slot('prefix')}
          <FText appearance="captionReg12" color="inherit">
            {this.text}
          </FText>
          {this.slot('action') ? (
            this.slot('action')
          ) : actionType === 'removable' ? (
            <FIcon
              group="dsm"
              name="close"
              size="12"
              style={{ padding: '0px' }}
              vOn:click={this.closeAction}
            />
          ) : (
            <FIcon
              group="dsm"
              name="chevron-down"
              size="12"
              style={{ padding: '0px' }}
            />
          )}
        </Element>
      )
    }
    // accent
    if (appearance === 'accent') {
      const accentObject = this.getStyle('accentType', this.accentLevel)
      const AccentElement = styled(Element)`
        ${this.getStyle('accentType', 'baseStyle')}
        ${accentObject[this.accentColor]}
      `
      return (
        <AccentElement vOn:click={this.onClick}>
          {this.canRenderPrefixSlot ? this.slot('prefix') : ''}
          {this.text}
        </AccentElement>
      )
    }

    if (appearance === 'status') {
      Marker = styled('div')`
        ${this.getStyle('marker')}
        ${this.getStyle('markerBackground', statusType)}
      `
    }
    // simple and status
    return (
      <Element vOn:click={this.onClick} tabindex={1}>
        {this.canRenderPrefixSlot ? this.slot('prefix') : <Marker />}
        <FText appearance="captionReg12" color="inherit">
          {this.text}
        </FText>
        {this.canRenderSuffixSlot && this.slot('suffix')}
      </Element>
    )
  },
}
</script>

<style scoped>
.icon-down {
  padding-right: 0;
  &:focus,
  &:hover {
    background-color: transparent;
  }
}
</style>
