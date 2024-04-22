<script>
import {
  FContainer,
  FWidgetCard,
  FPagination,
  FText,
  FButton,
  FIcon,
  FTooltip,
  FTags,
  FTabs,
  FAvatar,
  FAvatarGroup,
  FDivider,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty, isFunction } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FInsightWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['large', 'medium'].includes(value)
      },
    },
    record: {
      type: Array,
      default: () => [],
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
    widgetHeader: {
      type: Boolean,
      default: true,
    },
    dataBlock: {
      type: Boolean,
      default: true,
    },
    dCaption: {
      type: String,
      default: '',
    },
    dTitle: {
      type: String,
      default: '',
    },
    dSubText: {
      type: String,
      default: '',
    },
    dSubTextIcon: {
      type: Object,
      default: () => {},
    },
    dCaptionIcon: {
      type: Object,
      default: () => {},
    },
    dTitleIcon: {
      type: Object,
      default: () => {},
    },
    dShowLeftIcon: {
      type: Boolean,
      default: false,
    },
    dShowRightAction: {
      type: Boolean,
      default: false,
    },
    dLeftAvatarProps: {
      type: Object,
      default: () => {},
    },
    dShowAvatar: {
      type: Boolean,
      default: false,
    },
    dAvatar: {
      type: Array,
      default: () => [],
    },
    dShowTag: {
      type: Boolean,
      default: false,
    },
    dTags: {
      type: Array,
      default: () => [],
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
    canShowIcon(icon, size = '16') {
      let { group, name } = icon || {}
      if (!isEmpty(group) && !isEmpty(name))
        return <FIcon group={group} name={name} size={size} pressable={false} />
    },
    dGetTags() {
      return this.dTags.map((tag, index) => <FTags props={tag} key={index} />)
    },
    getSlot(prop) {
      let { $scopedSlots } = this || {}
      let { [prop]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        return component && component()
      }
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
    getRightActionButtonsList(list) {
      return list.map((button) => (
        <FButton
          size="small"
          props={button}
          onClick={() => this.$emit(button.clickAction, list)}
        >
          {button.text}
        </FButton>
      ))
    },
    getTagsList(tags) {
      return tags.map((tag, index) => <FTags props={tag} key={index} />)
    },
    getRecordDetails() {
      const Text = styled(FText)`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `
      return (this.record || []).map((list) => {
        let {
          user,
          showRightAction = false,
          rightActionButton = [],
          tags = [],
          showTags = false,
          subTextIcon = {},
          showMoreDetails = false,
          userObject = [],
          duration = '',
        } = list || {}
        return (
          <FContainer display="flex" gap="containerLarge">
            {!isEmpty(list.user) && (
              <FContainer>
                <FAvatar size="S" props={user} />
              </FContainer>
            )}
            <FContainer
              display="flex"
              flexDirection="column"
              width="100%"
              overflow="hidden"
            >
              <FContainer
                height="24px"
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
                gap="containerMedium"
              >
                <FContainer
                  display="flex"
                  alignItems="center"
                  width="100%"
                  gap="containerMedium"
                  overflow="hidden"
                >
                  <Text>{list.title}</Text>
                  {showTags && (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerMedium"
                    >
                      {this.getTagsList(tags)}
                    </FContainer>
                  )}
                </FContainer>
                {showRightAction &&
                  this.getRightActionButtonsList(rightActionButton)}
              </FContainer>
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerMedium"
              >
                {this.canShowIcon(subTextIcon, '16')}
                <Text appearance="captionReg12" color="textCaption">
                  {list.description}
                </Text>
              </FContainer>
              {showMoreDetails && (
                <FContainer
                  display="flex"
                  alignItems="center"
                  gap="containerMedium"
                  marginTop="containerSmall"
                >
                  <FAvatarGroup size="S" userObject={userObject} />
                  {!isEmpty(duration) && <FDivider height="16px" />}
                  {!isEmpty(duration) && (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerMedium"
                    >
                      {this.canShowIcon(
                        { group: 'time-date', name: 'time' },
                        '16'
                      )}{' '}
                      <FText appearance="captionReg12" color="textDescription">
                        {duration}
                      </FText>
                    </FContainer>
                  )}
                </FContainer>
              )}
            </FContainer>
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
    const Text = styled(FText)`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
    return (
      <Container>
        <FWidgetCard size={this.size} position="relative" overflow="hidden">
          <FContainer
            height="100%"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            gap="containerXLarge"
          >
            {' '}
            {this.widgetHeader && (
              <FContainer
                display="flex"
                flexDirection="column"
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
                    overflow="hidden"
                  >
                    {this.showLIcon && this.getLeftIcon()}
                    <FContainer
                      display="flex"
                      flexDirection="column"
                      overflow="hidden"
                    >
                      <FContainer
                        display="flex"
                        gap="containerMedium"
                        alignItems="center"
                      >
                        {!isEmpty(title) && (
                          <Text appearance="headingMed14">{this.title}</Text>
                        )}
                        {this.showInfoIcon && this.getInfoIcon()}
                        {this.showTag && this.getTags()}
                      </FContainer>
                      {!isEmpty(description) && (
                        <Text appearance="captionReg12" color="textDescription">
                          {this.description}
                        </Text>
                      )}
                    </FContainer>
                  </FContainer>
                  <FContainer display="flex" gap="containerMedium">
                    {this.showRightAction && this.getRightActionButtons()}
                  </FContainer>
                </FContainer>
                {this.showTab && this.getTabs()}
              </FContainer>
            )}
            {this.dataBlock && (
              <FContainer
                overflow="hidden"
                display="flex"
                flexDirection="column"
                gap="containerXLarge"
              >
                <FContainer
                  display="flex"
                  flexDirection="column"
                  gap="containerMedium"
                  overflow="hidden"
                >
                  <FContainer
                    display="flex"
                    alignItems="center"
                    gap="containerLarge"
                  >
                    {this.dShowLeftIcon && (
                      <FContainer min-width="24px">
                        <FAvatar
                          size="S"
                          shape="square"
                          props={this.dLeftAvatarProps}
                        />
                      </FContainer>
                    )}
                    {!isEmpty(this.dCaption) && (
                      <FContainer
                        display="flex"
                        gap="containerMedium"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        flex="1"
                      >
                        {this.canShowIcon(this.dCaptionIcon, '16')}
                        <Text
                          appearance="captionReg12"
                          color="textDescription"
                          lineHeight="130%"
                        >
                          {this.dCaption}
                        </Text>
                      </FContainer>
                    )}
                    {this.dShowTag && this.dGetTags()}
                    {this.dShowAvatar && (
                      <FAvatarGroup size="S" userObject={this.dAvatar} />
                    )}
                    {this.dShowRightAction && this.getSlot('rightAction')}
                  </FContainer>
                  {!isEmpty(this.dTitle) && (
                    <FContainer
                      display="flex"
                      gap="containerMedium"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      flex="1"
                    >
                      {this.canShowIcon(this.dTitleIcon, '20')}
                      <Text appearance="headingMed20">{this.dTitle}</Text>
                    </FContainer>
                  )}
                  <FContainer
                    display="flex"
                    alignItems="center"
                    gap="containerLarge"
                  >
                    {this.canShowIcon(this.dSubTextIcon)}
                    {!isEmpty(this.dSubText) && (
                      <Text
                        appearance="captionReg12"
                        color="textCaption"
                        lineHeight="130%"
                      >
                        {this.dSubText}
                      </Text>
                    )}
                  </FContainer>
                </FContainer>
              </FContainer>
            )}
            {this.dataBlock && <FDivider width="100%" />}
            <FContainer
              flex="1"
              overflow="scroll"
              display="flex"
              flexDirection="column"
              gap="containerXxLarge"
            >
              {this.getRecordDetails()}
            </FContainer>
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
