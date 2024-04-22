<script>
import {
  FContainer,
  FWidgetCard,
  FText,
  FIcon,
  FTooltip,
  FTags,
  FTabs,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty, isFunction } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FTimeWidget',
  mixins: [ThemeMixin],
  props: {
    record: {
      type: Array,
      default: () => [],
    },
    tableProps: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
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
    return {}
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
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
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
    getRightActionButtons(prop) {
      let { $scopedSlots } = this || {}
      let { [prop]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        return component && component()
      }
    },
    checkText(left = '', middle = '', right = '') {
      return !isEmpty(left) || !isEmpty(middle) || !isEmpty(right)
    },
    canShowIcon(icon, size = '20') {
      let { group, name } = icon || {}
      if (!isEmpty(group) && !isEmpty(name))
        return <FIcon group={group} name={name} size={size} pressable={false} />
    },
    getRecordDetails() {
      let { record } = this
      return (record || []).map((list) => {
        let {
          title = '',
          rightText = '',
          leftText = '',
          rightSubText = '',
          leftSubText = '',
          middleText = '',
          linkIcon,
          middleIcon,
        } = list
        return (
          <FContainer>
            {!isEmpty(title) && (
              <FContainer minHeight="24px" display="flex" alignItems="center">
                <FText appearance="captionReg12" color="textCaption">
                  {title}
                </FText>
              </FContainer>
            )}
            {this.checkText(leftText, '', rightText) && (
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerMedium"
                minHeight="32px"
              >
                {' '}
                <FText
                  appearance="headingMed20"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  flex="1"
                  textAlign="left"
                >
                  {leftText}
                </FText>
                {this.canShowIcon(linkIcon)}
                <FText
                  appearance="headingMed20"
                  appearance="headingMed20"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  flex="1"
                  textAlign="right"
                >
                  {rightText}
                </FText>
              </FContainer>
            )}
            {this.checkText(leftSubText, middleText, rightSubText) && (
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerMedium"
                minHeight="24px"
                justifyContent="space-between"
              >
                {' '}
                <FText
                  appearance="captionReg12"
                  color="textCaption"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {leftSubText}
                </FText>
                <FContainer
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  display="flex"
                  flex="1"
                  justifyContent="center"
                >
                  {this.canShowIcon(middleIcon, '12')}
                  <FText
                    appearance="captionReg12"
                    color="textDescription"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {middleText}
                  </FText>
                </FContainer>
                <FText
                  appearance="captionReg12"
                  color="textCaption"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {rightSubText}
                </FText>
              </FContainer>
            )}
          </FContainer>
        )
      })
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
              height="24px"
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
                {this.showRightAction &&
                  this.getRightActionButtons('rightAction')}
              </FContainer>
            </FContainer>
            {this.showTab && this.getTabs()}
            <FContainer
              height="100%"
              flex="1"
              overflow="scroll"
              width="100%"
              display="flex"
              flexDirection="column"
              gap="containerMedium"
            >
              {this.getRecordDetails()}
            </FContainer>
          </FContainer>
        </FWidgetCard>
      </Container>
    )
  },
}
</script>

<style scoped></style>
