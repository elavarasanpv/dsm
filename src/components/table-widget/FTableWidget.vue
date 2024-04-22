<script>
import {
  FContainer,
  FWidgetCard,
  FTable,
  FPagination,
  FText,
  FButton,
  FIcon,
  FTooltip,
  FTags,
  FTabs,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FTableWidget',
  mixins: [ThemeMixin],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    tableProps: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['large'].includes(value)
      },
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    showRightAction: {
      type: Boolean,
      default: false,
    },
    rightActionButtonProps: {
      type: Array,
      default: () => [],
    },
    showLIcon: {
      type: Boolean,
      default: false,
    },
    leftIconProps: {
      type: Object,
      default: () => {},
    },
    showInfoIcon: {
      type: Boolean,
      default: false,
    },
    tooltipText: {
      type: String,
      default: '',
    },
    showTag: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    showTab: {
      type: Boolean,
      default: false,
    },
    tabsList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    paginationProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // availableSlots: [],
      open: false,
    }
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    availableSlots() {
      let { $scopedSlots } = this || {}
      if (!isEmpty($scopedSlots)) {
        let slots = Object.keys($scopedSlots).filter((key) => !isEmpty(key))
        return slots
      } else return []
    },
  },
  mounted() {
    this.open = true
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    renderHeaderCell(name, row, data) {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        if (!isEmpty(key)) {
          if (key === name) {
            currSlot = $scopedSlots[key]
          }
        }
      })
      let props = {
        prop: data,
        row: row,
      }
      const parts = name.split('.')
      if (parts[0] === 'header') {
        props = {
          header: row,
        }
      }
      if (!isEmpty(currSlot)) {
        return <div>{currSlot(props)}</div>
      }
    },
    getLeftIcon() {
      let { leftIconProps } = this
      let { group, name } = leftIconProps || {}
      return (
        <FIcon group={group} name={name} size="16" pressable={false}></FIcon>
      )
    },
    getTabs() {
      return (
        <FContainer>
          <FTabs
            tabsList={this.tabsList}
            v-model={this.modelValue}
            appearance="button"
            size="small"
            vOn:change={() => this.$emit('onTabChange')}
          />
        </FContainer>
      )
    },
    getInfoIcon() {
      return (
        <FTooltip placement="top">
          <template slot="title">{this.tooltipText}</template>

          <FIcon group="dsm" name="info" size="14" pressable={false} />
        </FTooltip>
      )
    },
    getTags() {
      return this.tags.map((tag, index) => <FTags props={tag} key={index} />)
    },
    getRightActionButtons() {
      return this.rightActionButtonProps.map((button) => (
        <FButton
          size="small"
          props={button}
          onClick={() => this.$emit(button.clickAction)}
        >
          {button.text}
        </FButton>
      ))
    },
    generateScopedSlots() {
      return this.availableSlots.reduce((scopedSlots, columnName) => {
        const parts = columnName.split('.')
        if (parts[0] === 'header') {
          scopedSlots[columnName] = ({ header }) => (
            <FContainer>{this.renderHeaderCell(columnName, header)}</FContainer>
          )
        } else {
          scopedSlots[columnName] = ({ row, prop }) => (
            <FContainer>
              {this.renderHeaderCell(columnName, row, prop)}
            </FContainer>
          )
        }
        return scopedSlots
      }, {})
    },
  },
  render() {
    let { computedStyleProps, title, description } = this
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `
    return (
      <Container>
        <FWidgetCard size={this.size}>
          <FContainer
            display="flex"
            flexDirection="column"
            height="100%"
            gap="containerXLarge"
          >
            <FContainer
              display="flex"
              gap="containerMedium"
              justifyContent="space-between"
              alignItems="center"
            >
              <FContainer
                display="flex"
                gap="containerMedium"
                alignItems="center"
              >
                {this.showLIcon && this.getLeftIcon()}
                <FContainer display="flex" flexDirection="column">
                  <FContainer
                    display="flex"
                    gap="containerMedium"
                    alignItems="center"
                  >
                    {!isEmpty(title) && (
                      <FText appearance="headingMed14">{this.title}</FText>
                    )}
                    {this.showInfoIcon && this.getInfoIcon()}
                    {this.showTag && this.getTags()}
                  </FContainer>
                  {!isEmpty(description) && (
                    <FText appearance="captionReg12" color="textDescription">
                      {this.description}
                    </FText>
                  )}
                </FContainer>
              </FContainer>
              <FContainer display="flex" gap="containerMedium">
                {this.showRightAction && this.getRightActionButtons()}
              </FContainer>
            </FContainer>
            {this.showTab && this.getTabs()}
            {this.open && (
              <FTable
                columns={this.columns}
                data={this.data}
                props={this.tableProps}
                scopedSlots={this.generateScopedSlots()}
              ></FTable>
            )}
            {this.showPagination && (
              <FContainer>
                <FPagination
                  props={this.paginationProps}
                  vOn:currentChange={(val) => this.$emit('onPageChange', val)}
                />
              </FContainer>
            )}
          </FContainer>
        </FWidgetCard>
      </Container>
    )
  },
}
</script>

<style scoped></style>
