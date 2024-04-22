<script>
import {
  FContainer,
  FWidgetCard,
  FAvatar,
  FText,
  FIcon,
  FTags,
  FAvatarGroup,
  FTableCell,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty, isFunction } from '../../utils/validation'
import styled from 'vue-emotion'
const STRIP = {
  red: 'backgroundSemanticRedMedium',
  orange: 'backgroundSemanticOrangeMedium',
  yellow: 'backgroundAccentYellowMedium',
  green: 'backgroundSemanticGreenMedium',
  blue: 'backgroundAccentBlueDark',
  pink: 'backgroundAccentPinkMedium',
  cyan: 'backgroundAccentCyanMedium',
  violet: 'backgroundAccentVioletMedium',
  purple: 'backgroundAccentPurpleMedium',
  gray: 'backgroundNeutralGrey01Medium',
}
export default {
  name: 'FDataWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    caption: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subText: {
      type: String,
      default: '',
    },
    subTextIcon: {
      type: Object,
      default: () => {},
    },
    captionIcon: {
      type: Object,
      default: () => {},
    },
    titleIcon: {
      type: Object,
      default: () => {},
    },
    record: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'left-right',
      validator: (value) => {
        return ['top-bottom', 'left-right'].includes(value)
      },
    },
    showTag: {
      type: Boolean,
      default: false,
    },
    showLeftIcon: {
      type: Boolean,
      default: false,
    },
    leftAvatarProps: {
      type: Object,
      default: () => {},
    },
    showRightAction: {
      type: Boolean,
      default: false,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    showStrip: {
      type: Boolean,
      default: false,
    },
    stripColor: {
      type: String,
      default: 'red',
      validator: (value) => {
        return [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'pink',
          'cyan',
          'violet',
          'purple',
          'gray',
        ].includes(value)
      },
    },
    tags: {
      type: Array,
      default: () => [],
    },
    avatar: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Number,
      default: 1,
      validator: (value) => {
        return [1, 2].includes(value)
      },
    },
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    stripbgColor() {
      let { stripColor } = this
      return STRIP[stripColor]
    },
    isVertical() {
      let { type } = this
      return type === 'top-bottom'
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getSlot(prop) {
      let { $scopedSlots } = this || {}
      let { [prop]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        return component && component()
      }
    },
    canShowIcon(icon, size = '16') {
      let { group, name } = icon || {}
      if (!isEmpty(group) && !isEmpty(name))
        return <FIcon group={group} name={name} size={size} pressable={false} />
    },
    getTags() {
      return this.tags.map((tag, index) => <FTags props={tag} key={index} />)
    },
    getRecordDetails() {
      let { record, isVertical } = this
      return (record || []).map((list) => {
        let { title = '', description = '', user, type = '' } = list
        let data = {
          [type]: list[type],
        }
        let colum = {
          name: [type],
        }
        return (
          <FContainer
            display="flex"
            gap={isVertical ? 'containerSmall' : 'containerLarge'}
            alignItems={isVertical ? 'flex-start' : 'center'}
            padding="containerNone"
            flexDirection={isVertical && 'column'}
          >
            <FContainer
              flex="1"
              width={isVertical ? '100%' : '50%'}
              overflow="hidden"
              display="flex"
            >
              <FText
                appearance="captionMed12"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {title}
              </FText>
            </FContainer>
            <FContainer
              display="flex"
              gap="containerMedium"
              alignItems="center"
              flex="1"
              minHeight="20px"
              width={this.type === 'top-bottom' ? '100%' : '50%'}
              overflow="hidden"
            >
              {!isEmpty(user) && (
                <FContainer min-width="16px">
                  <FAvatar size="XS" props={user} />
                </FContainer>
              )}
              {isEmpty(type) && (
                <FContainer
                  overflow="hidden"
                  textOverflow="ellipsis"
                  width="100%"
                >
                  <FText
                    color="textDescription"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    lineHeight="130%"
                  >
                    {description}
                  </FText>
                </FContainer>
              )}
              {!isEmpty(type) && (
                <FTableCell type={type} data={data} header={colum} />
              )}
            </FContainer>
          </FContainer>
        )
      })
    },
  },
  render() {
    let { computedStyleProps, isVertical } = this
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
            overflow="hidden"
            display="flex"
            flexDirection="column"
            height="100%"
            gap="containerXLarge"
          >
            {this.showStrip && (
              <FContainer
                backgroundColor={this.stripbgColor}
                height="6px"
                position="absolute"
                top="0px"
                width="100%"
                left="0px"
              />
            )}
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
                {this.showLeftIcon && (
                  <FContainer min-width="24px">
                    <FAvatar
                      size="S"
                      shape="square"
                      props={this.leftAvatarProps}
                    />
                  </FContainer>
                )}
                {!isEmpty(this.caption) && (
                  <FContainer
                    display="flex"
                    gap="containerMedium"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    flex="1"
                  >
                    {this.canShowIcon(this.captionIcon, '16')}
                    <Text
                      appearance="captionReg12"
                      color="textDescription"
                      lineHeight="130%"
                    >
                      {this.caption}
                    </Text>
                  </FContainer>
                )}
                {this.showTag && this.getTags()}
                {this.showAvatar && (
                  <FAvatarGroup size="S" userObject={this.avatar} />
                )}
                {this.showRightAction && this.getSlot('rightAction')}
              </FContainer>
              {!isEmpty(this.title) && (
                <FContainer
                  display="flex"
                  gap="containerMedium"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  flex="1"
                >
                  {this.canShowIcon(this.titleIcon, '20')}
                  <Text appearance="headingMed20">{this.title}</Text>
                </FContainer>
              )}
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerLarge"
              >
                {this.canShowIcon(this.subTextIcon)}
                {!isEmpty(this.subText) && (
                  <Text
                    appearance="captionReg12"
                    color="textCaption"
                    lineHeight="130%"
                  >
                    {this.subText}
                  </Text>
                )}
              </FContainer>
            </FContainer>
            <FContainer
              backgroundColor="backgroundMidgroundSubtle"
              height="100%"
              flex="1"
              borderRadius="high"
              padding="containerXLarge"
              overflow="scroll"
              display={isVertical ? 'grid' : 'flex'}
              grid-template-columns={`repeat(${this.column},minmax(0, 1fr))`}
              width="100%"
              gap="containerLarge"
              flexDirection="column"
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
