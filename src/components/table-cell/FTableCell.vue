<script>
import {
  FSwitch,
  FIcon,
  FText,
  FTags,
  FButton,
  FAvatar,
  FPopover,
  FContainer,
  FTooltip,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import { cloneDeep } from 'lodash'

const DISPLAY_TYPE_HASH = {
  link() {
    let { data, header, isRTL } = this || {}
    let { name, alignment = 'left' } = header
    let link = data[name] || {}
    let { text, url, target = '_blank' } = link
    let textAlignment = 'left'
    if (!isEmpty(alignment)) {
      if (isRTL) {
        textAlignment =
          alignment === 'right'
            ? 'left'
            : alignment === 'left'
            ? 'right'
            : alignment
      } else {
        textAlignment = alignment
      }
    }
    const Button = styled(FButton)`
      ${this.getStyle('linkButton')};
      justify-content: ${textAlignment};
    `
    return (
      <FTooltip placement="bottom" mouseEnterDelay={0.5}>
        <template slot="title">
          <FText fontsize="body3" fontWeight="medium" color="backgroundCanvas">
            {text}
          </FText>
        </template>
        {!isEmpty(url) ? (
          <Button
            appearance="link"
            vOn:click={() => {
              this.redirect(url, target)
            }}
          >
            <FText
              fontsize="body3"
              fontWeight="medium"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {text}
            </FText>
          </Button>
        ) : (
          <FText appearance="bodyReg14">{text}</FText>
        )}
      </FTooltip>
    )
  },
  mainfield() {
    let { data, header, isRTL } = this || {}
    let { name, alignment = 'left' } = header
    let field = data[name] || {}
    let { text, url, clickAction } = field
    let textAlignment = 'left'
    if (!isEmpty(alignment)) {
      if (isRTL) {
        textAlignment =
          alignment === 'right'
            ? 'left'
            : alignment === 'left'
            ? 'right'
            : alignment
      } else {
        textAlignment = alignment
      }
    }
    const Button = styled(FButton)`
      ${this.getStyle('linkButton')};
      justify-content: ${textAlignment};
    `
    const Anchor = styled('a')`
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `
    return (
      <FTooltip placement="bottom" mouseEnterDelay={0.5}>
        <template slot="title">
          <FText appearance="captionReg12">{text}</FText>
        </template>
        {!isEmpty(url) && !isEmpty(clickAction) ? (
          <Button appearance="link">
            <Anchor
              href={url}
              vOn:click={(e) => {
                clickAction(field, e)
              }}
            >
              <FText
                appearance="bodyReg14"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {text}
              </FText>
            </Anchor>
          </Button>
        ) : !isEmpty(clickAction) ? (
          <Button appearance="link">
            <Anchor
              vOn:click={(e) => {
                clickAction(field, e)
              }}
            >
              <FText
                appearance="bodyReg14"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {text}
              </FText>
            </Anchor>
          </Button>
        ) : (
          <FText appearance="bodyReg14">{text}</FText>
        )}
      </FTooltip>
    )
  },
  text() {
    let { data, header } = this || {}
    let element = this.$refs[`text-${header?.id}`]
    let { name } = header || {}
    let displayItem = data[name]
    let { specialText } = data || {}
    let { appearance = 'bodyReg14', color = 'textMain' } = specialText || {}
    let canShowToolTip = false
    if (!isEmpty(element)) {
      if (element.$el.scrollWidth > element.$el.clientWidth) {
        canShowToolTip = true
      }
    }

    if (isEmpty(displayItem)) {
      displayItem = '--'
      color = 'textCaption'
    }
    return (
      <FTooltip mouseEnterDelay={canShowToolTip ? 0.5 : 10}>
        <div slot="title">
          <FText> {displayItem}</FText>
        </div>
        <FContainer
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          ref={`text-${header?.id}`}
        >
          <FText appearance={appearance} color={color}>
            {displayItem}
          </FText>
        </FContainer>
      </FTooltip>
    )
  },
  file() {
    let { data, header } = this || {}
    let { name } = header
    let displayItem = data[name]
    const isValueEmpty = isEmpty(displayItem)
    if (isValueEmpty) {
      displayItem = '--'
    }
    return (
      <FText color={isValueEmpty ? 'textCaption' : 'textMain'}>
        {displayItem}
      </FText>
    )
  },
  avatar() {
    let { data, styleProps, header } = this || {}
    let { name } = header
    let user = data[name] || {}
    let { name: avatarName, url } = user
    const Element = styled(FContainer)`
      ${styleProps}
    `
    return (
      <Element gap="containerMedium">
        <FAvatar userName={avatarName} avatarUrl={url} size="S" />
        <FText color="textMain">{avatarName}</FText>
      </Element>
    )
  },
  status() {
    let { data } = this || {}
    let { status } = data || {}
    let { disabled, size = 'default' } = status || {}
    return (
      <div>
        <FSwitch
          disabled={disabled}
          size={size}
          v-model={this.toggle}
          vOn:change={(value) => this.toggleChecked(data, value)}
        ></FSwitch>
      </div>
    )
  },
  tag() {
    let { data, styleProps, header } = this || {}
    let { name, collapsedTag } = header
    let tags = data[name] || []
    let showCollapseTag = tags.length > 1

    let collapseTagCount = showCollapseTag ? tags.length - 1 : 0
    let visibleTags = cloneDeep(tags)
    let showInToolTipTags = cloneDeep(visibleTags)

    let modifiedTags = collapsedTag ? visibleTags.splice(0, 1) : tags
    let tooltipTags = showInToolTipTags.splice(1)
    const Element = styled(FContainer)`
      ${styleProps}
    `
    const Tags = styled(FTags)`
      ${collapsedTag && 'max-width: 100px; overflow: hidden'};
    `
    return (
      <Element gap="containerLarge">
        {modifiedTags.map((tag) => {
          let { text, appearance, statusType, accentColor, accentLevel } =
            tag || {}
          return (
            <Tags
              text={text}
              appearance={appearance}
              statusType={statusType}
              accentColor={accentColor}
              accentLevel={accentLevel}
              key={`${tag.text}`}
            ></Tags>
          )
        })}
        {collapsedTag && (
          <FTooltip>
            <template slot="title">
              {tooltipTags.map((tag) => {
                let { text } = tag
                return <FContainer key={`${tag.text}`}>{{ text }}</FContainer>
              })}
            </template>
            <Tags text={`+${collapseTagCount}`}></Tags>
          </FTooltip>
        )}
      </Element>
    )
  },
  dropdown() {},
  iconText() {
    let { data, styleProps } = this || {}
    let { specialText } = data || {}
    let {
      group,
      name,
      size,
      pressable = false,
      text,
      position = 'prefix',
    } = specialText || {}

    let isPrefix = position === 'prefix'
    const Element = styled(FContainer)`
      ${styleProps}
    `
    const Icon = styled(FIcon)`
      ${this.getStyle('flexCenter')}/* ${isPrefix
        ? 'margin-right : 8px'
        : 'margin-left : 8px'} */
    `
    let icon = (
      <Icon
        group={group ? group : 'default'}
        name={name ? name : 'apps'}
        size={size ? size : '16'}
        pressable={pressable}
      ></Icon>
    )
    return (
      <Element gap="containerLarge">
        {position === 'prefix' && icon}
        <FText color="textMain">{text}</FText>
        {position === 'suffix' && icon}
      </Element>
    )
  },
  popover() {
    let { data, styleProps, header } = this || {}
    let { name } = header
    let popover = data[name] || {}
    let {
      text,
      placement = 'bottom',
      action = 'hover',
      showArrow = false,
      content,
    } = popover
    const Element = styled('div')`
      ${styleProps}
    `
    const Div = styled(FContainer)``
    return (
      <Div width="fit-content">
        <FPopover
          placement={placement}
          disabled={this.disabled}
          showArrow={showArrow}
          trigger={action}
        >
          <FText color="textMain">{text}</FText>
          <div slot="content">
            {!isEmpty(content) ? (
              <Element>{content}</Element>
            ) : (
              <Element>{this.renderPopover(data)}</Element>
            )}
          </div>
        </FPopover>
      </Div>
    )
  },
}
export default {
  name: 'FTableCell',
  mixins: [ThemeMixin],
  props: {
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
    header: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      toggle: true,
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
  created() {
    let { data, type } = this
    if (type === 'status') {
      let { status } = data || {}
      let { mode } = status || {}
      this.toggle = mode
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getCellDisplay() {
      let { type, data, header } = this
      let { name } = header || {}
      if (DISPLAY_TYPE_HASH[type] && !isEmpty(data[name])) {
        return this[type]()
      } else {
        return this['text']()
      }
    },
    redirect(url, target) {
      window.open(url, target)
    },
    toggleChecked(data, value) {
      let values = value
      this.toggle = values
      this.$emit('statusChanged', { record: data, status: value })
    },
    renderPopover(record) {
      let { $scopedSlots, header } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        let keyList = (key || '').split('.')
        if (!isEmpty(keyList)) {
          let { name } = header || {}
          let [type, headerName, action] = keyList || []
          if (type === 'cell' && name === headerName && action == 'popover') {
            currSlot = $scopedSlots[key]
          }
        }
      })
      if (!isEmpty(currSlot)) {
        return currSlot({ record })
      }
    },
    ...DISPLAY_TYPE_HASH,
  },
  render() {
    let { data, header } = this || {}
    let { clickable } = header || {}
    const Container = styled(FContainer)`
      ${this.getStyle('container')};
    `
    return (
      <Container
        cursor={clickable ? 'pointer' : ''}
        vOn:click={() => {
          clickable && this.$emit('onCellClick', data)
        }}
      >
        {this.getCellDisplay()}
      </Container>
    )
  },
}
</script>

<style scoped></style>
