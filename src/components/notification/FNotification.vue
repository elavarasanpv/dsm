<script>
import { FText, FIcon, FContainer, FProgressBar } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from 'lodash'
const INTENT_HASH_TOAST = {
  success: 'borderSemanticGreenDark',
  warning: 'borderAccentYellowMedium',
  information: 'borderAccentBlueDark',
  critical: 'borderSemanticRedMedium',
}
const INTENT_HASH_ALERTS = {
  success: 'iconNeutralInverse',
  warning: 'iconNeutralDefault',
  information: 'iconNeutralInverse',
  critical: 'iconNeutralInverse',
}
const ALERTS_BGCOLOR_HASH = {
  success: 'backgroundSemanticGreenDark',
  warning: 'backgroundAccentYellowMedium',
  information: 'backgroundAccentBlueDark',
  critical: 'backgroundSemanticRedMedium',
}
const ICON = {
  toast: {
    information: {
      name: 'circle-warning-filled',
    },
    warning: {
      name: 'triangle-warning-filled',
    },
    critical: {
      name: 'critical-filled',
    },
    success: {
      name: 'tick-circle-filled',
    },
  },
  alerts: {
    information: {
      name: 'circle-warning',
    },
    warning: {
      name: 'triangle-warning',
    },
    critical: {
      name: 'critical',
    },
    success: {
      name: 'circle-tick',
    },
  },
}
const INTENT_ICONS = {
  success() {
    let { intentColor, iconName } = this || {}
    return (
      <FIcon
        group="action"
        name={iconName}
        size="24"
        pressable={false}
        padding="0"
        color={intentColor}
      ></FIcon>
    )
  },
  warning() {
    let { intentColor, iconName } = this || {}
    return (
      <FIcon
        group="alert"
        name={iconName}
        size="24"
        pressable={false}
        padding="0"
        color={intentColor}
      ></FIcon>
    )
  },
  information() {
    let { intentColor, iconName } = this || {}
    return (
      <FIcon
        group="alert"
        name={iconName}
        size="24"
        pressable={false}
        padding="0"
        color={intentColor}
      ></FIcon>
    )
  },
  critical() {
    let { intentColor, iconName } = this || {}
    return (
      <FIcon
        group="alert"
        name={iconName}
        size="24"
        pressable={false}
        padding="0"
        color={intentColor}
      ></FIcon>
    )
  },
}
export default {
  name: 'FNotification',
  mixins: [ThemeMixin],
  props: {
    uniqueId: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    close: {
      type: Function,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
    intent: {
      type: String,
      default: 'success',
      validator: (value) => {
        return ['success', 'information', 'warning', 'critical'].includes(value)
      },
    },
    styleProperties: {
      type: Object,
      default: () => ({}),
    },
    menuType: {
      type: String,
      default: 'toast',
      validator: (value) => {
        return ['toast', 'alerts'].includes(value)
      },
    },
    width: {
      type: String,
      default: '100%',
    },
    animate: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    hideCloseIcon: {
      type: Boolean,
      default: false,
    },
    showProgress: {
      type: Boolean,
      default: false,
    },
    maxTime: {
      type: Number,
      default: 1000,
    },
  },
  computed: {
    intentStyle() {
      let { intentColor } = this || {}
      return `background-color:${intentColor};`
    },
    intentColor() {
      let { intent, menuType } = this || {}
      let hash
      if (menuType === 'toast') {
        hash = INTENT_HASH_TOAST
      } else {
        hash = INTENT_HASH_ALERTS
      }
      let colorHex = isEmpty(hash[intent]) ? hash['success'] : hash[intent]
      return colorHex
    },
    iconName() {
      let { intent, menuType } = this || {}
      let name = ''
      name = ICON[menuType][intent]['name']
      return name
    },
    bgColor() {
      let { intent } = this || {}
      let colorHex = isEmpty(ALERTS_BGCOLOR_HASH[intent])
        ? ALERTS_BGCOLOR_HASH['success']
        : ALERTS_BGCOLOR_HASH[intent]
      return colorHex
    },
    textTitleColor() {
      let { intent, menuType } = this || {}
      let color = ''
      let isAlerts = menuType === 'alerts'
      let isWarning = intent === 'warning'
      if (isAlerts && isWarning) {
        color = 'textDefault'
      } else if (isAlerts) {
        color = 'textInverseDefault'
      } else {
        color = 'textMain'
      }
      return color
    },
    textDescriptionColor() {
      let { intent, menuType } = this || {}
      let color = ''
      let isAlerts = menuType === 'alerts'
      let isWarning = intent === 'warning'
      if (isAlerts && isWarning) {
        color = 'textDefault'
      } else if (isAlerts) {
        color = 'textInverseDefault'
      } else {
        color = 'textDescription'
      }
      return color
    },
  },
  mounted() {
    let { $refs, animate } = this
    if (animate) {
      $refs['notification-popup'].$el.style.top = '-100px'
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    intentIcon() {
      let { intent } = this || {}
      return this[intent]() || this['success']()
    },
    ...INTENT_ICONS,
  },
  render() {
    let {
      styleProps,
      uniqueId,
      description,
      title,
      menuType,
      bgColor,
      textTitleColor,
      textDescriptionColor,
      width,
      close,
      hideCloseIcon,
    } = this || {}
    const Element = styled(FContainer)`
      ${styleProps};
      ${menuType === 'toast' && this.getStyle('toastMenu')};
      ${`width:${width}`}
      gap: 8px;
      justify-content: space-between;
    `
    const ContentContainer = styled(FContainer)`
      ${this.getCustomStyle({ property: 'contentContainer' })}
    `
    const ActionContainer = styled(FContainer)`
      ${this.getCustomStyle({ property: 'actionContainer' })}
    `
    const IntentIconContainer = styled(FContainer)``
    const ContiainerWrapper = styled(FContainer)`
      display: flex;
      gap: 8px;
    `
    return (
      <Element
        id={`${uniqueId}`}
        class="f-zoom-in-animation f-toast-popup"
        backgroundColor={menuType === 'alerts' ? bgColor : ''}
        transition="top 200ms"
        ref="notification-popup"
        overflow="hidden"
      >
        <ContiainerWrapper width="100%">
          <IntentIconContainer display="flex" alignItems="center">
            {this.intentIcon()}
          </IntentIconContainer>
          <ContentContainer>
            {!isEmpty(title) && (
              <FContainer>
                <FText appearance="headingMed16" color={textTitleColor}>
                  {title}
                </FText>
              </FContainer>
            )}
            <FContainer>
              <FText appearance="bodyRegSt14" color={textDescriptionColor}>
                {description}
              </FText>
            </FContainer>
          </ContentContainer>
        </ContiainerWrapper>
        <FContainer display="flex">{this.$slots.default}</FContainer>
        {!hideCloseIcon && (
          <ActionContainer>
            <FContainer
              vOn:click={() => {
                close()
              }}
              cursor="pointer"
            >
              <FIcon
                group="action"
                name="cross"
                size="16"
                pressable={false}
                color={
                  textTitleColor === 'textInverseDefault'
                    ? 'textInverseDefault'
                    : 'iconNeutralDefault'
                }
              />
            </FContainer>
          </ActionContainer>
        )}
        {this.showProgress && (
          <FContainer
            position="absolute"
            bottom={this.menuType === 'toast' ? '0px' : '4px'}
            left={this.menuType === 'toast' ? '0px' : '16px'}
            width={this.menuType === 'toast' ? '100%' : '93.5%'}
          >
            <FProgressBar
              usage={this.menuType}
              intent={this.intent}
              max={this.maxTime}
              isTimeEnabled={true}
            />
          </FContainer>
        )}
      </Element>
    )
  },
}
</script>

<style scoped></style>
