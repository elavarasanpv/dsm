<script>
import { FButton, FPopover, FContainer, FMenuItem } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import { isFunction } from 'lodash'
export default {
  name: 'FDropdown',
  mixins: [ThemeMixin],
  props: {
    name: {
      type: String,
      default: 'Dropdown',
    },
    options: {
      type: Array,
      default: () => [],
    },
    split: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonProps: {
      type: Object,
      default: () => ({}),
    },
    contentWidth: {
      type: String,
      default: '200px',
    },
    maxHeight: {
      type: String,
      default: '13.75em',
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      selected: {},
    }
  },
  computed: {
    buttonPropsList() {
      let { split, buttonProps } = this || {}
      let iconProps = {}
      if (!split) {
        iconProps = {
          iconGroup: 'dsm',
          iconName: 'chevron-down',
        }
      }
      return { ...buttonProps, ...iconProps }
    },
  },
  mounted() {},
  beforeDestroy() {
    document.removeEventListener('click', () => {})
  },
  methods: {
    handleDropdown() {
      this.visible = !this.visible
    },
    handleClick() {
      if (!this.split) {
        this.visible = !this.visible
      } else {
        this.$emit('click')
      }
    },
    handleItemClick(option) {
      this.visible = false
      this.selected = option
      this.$emit('dropdown', option)
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    isSelected(option) {
      return option.value === this.selected.value
    },
    menuItemSlot(option) {
      const { $scopedSlots = {} } = this
      const slotFn = $scopedSlots[`menu.${option.value}`]
      if (isFunction(slotFn)) {
        return slotFn(option)
      }
      return null
    },
  },
  render() {
    const { styleProps } = this || {}
    const Container = styled(FContainer)`
      ${styleProps}
    `
    return (
      <Container ref="f-dropdown" width="fit-content">
        <FPopover
          v-model={this.visible}
          trigger="clickToOpen"
          placement="bottom-end"
          inline={true}
          disabled={this.loading}
        >
          {!isEmpty(this.children()) ? (
            <FContainer vOn:click={this.handleDropdown}>
              {this.children()}
            </FContainer>
          ) : (
            <FButton
              props={this.buttonPropsList}
              split={this.split}
              vOn:dropdown={this.handleDropdown}
              vOn:click={this.handleClick}
              loading={this.loading}
            >
              {this.name}
            </FButton>
          )}
          <FContainer
            maxHeight={this.maxHeight}
            overflow="auto"
            width={this.contentWidth}
            slot="content"
            padding="containerNone containerMedium"
          >
            {this.options.map((option) => {
              return (
                <FMenuItem
                  value={`${option.value}`}
                  key={`${option.value}`}
                  vOn:click={() => this.handleItemClick(option)}
                  isSelected={this.selectable && this.isSelected(option)}
                >
                  {this.menuItemSlot(option) || option.label}
                </FMenuItem>
              )
            })}
          </FContainer>
        </FPopover>
      </Container>
    )
  },
}
</script>
