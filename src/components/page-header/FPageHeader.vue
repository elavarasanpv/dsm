<script>
import {
  FBreadcrumb,
  FText,
  FTags,
  FButton,
  FButtonGroup,
  FContainer,
  FDivider,
  FNotification,
  FIcon,
  FShimmer,
  FTooltip,
  FAvatar,
} from '../../index'
import dlv from 'dlv'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty, isFunction } from '../../utils/validation'
export default {
  name: 'FPageHeader',
  components: {
    FBreadcrumb,
    FTags,
    FText,
    FButton,
    FButtonGroup,
    FNotification,
    FIcon,
    FShimmer,
  },
  mixins: [ThemeMixin],
  props: {
    breadCrumbProps: {
      type: Object,
      default: () => ({}),
    },
    captionText: {
      type: String,
      default: '',
    },
    heading: {
      type: String,
      default: '',
    },
    headingIcon: {
      type: Object,
      default: () => ({}),
    },
    description: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    tagProps: {
      type: Object,
      default: () => {},
    },
    showButtonGroup: {
      type: Boolean,
      default: true,
    },
    withTabs: {
      type: Boolean,
      default: false,
    },
    showNotification: {
      type: Boolean,
      default: false,
    },
    showActionBar: {
      type: Boolean,
      default: false,
    },
    notificationDetails: {
      type: Object,
      default: () => {},
    },
    showButtonPanel: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    avatarClickable: {
      type: Boolean,
      default: false,
    },
    iconname: {
      type: String,
      default: 'space',
    },
    icongroup: {
      type: String,
      default: 'setup',
    },
  },
  data() {
    return {
      openActionBar: false,
      openButtonPanel: true,
      showPanel: false,
      panelHeight: 'fit-content',
      notificationHeight: 'fit-content',
      initialHeight: 0,
      canShowTooltip: false,
    }
  },
  computed: {
    canShowDescription() {
      let { description } = this || {}
      return !isEmpty(description)
    },
    canShowTag() {
      let { tagProps } = this || {}
      return !isEmpty(tagProps)
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let { $refs } = this || {}
      let panelHeight = dlv($refs['buttonPanel'], '$el.clientHeight')
      if (panelHeight > 42) {
        this.panelHeight = panelHeight
        this.showPanel = true
        this.initialHeight = panelHeight / 2
      } else {
        this.initialHeight = panelHeight
      }
      //need to handle animation for notification movement
      // setTimeout(() => {
      //   this.notificationHeight = dlv(
      //     $refs['notificationPanel'],
      //     '$el.clientHeight'
      //   )
      // }, 10)
      this.openButtonPanel = false
      setTimeout(() => {
        let textEle = dlv($refs['textPanel'], '$el')
        let VisibleWidth = textEle?.offsetWidth
        let scrollWidth = textEle?.scrollWidth
        if (scrollWidth > VisibleWidth) {
          this.canShowTooltip = true
          const divElement = document.querySelector('.textPanel')
          if (divElement) {
            divElement.style.display = 'unset'
          }
        }
      }, 270)
    },
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    slot(type) {
      let { $scopedSlots } = this
      let { [type]: component } = $scopedSlots || {}
      let validSlots = [
        'header',
        'buttons',
        'tags',
        'actionBar',
        'notificationButton',
        'buttonPanel',
        'header-actions',
      ]

      if (isFunction(component) && validSlots.includes(type)) {
        return component && component()
      }
    },
    closeNotification() {
      this.$emit('closeNotification')
    },
  },
  render() {
    let {
      breadCrumbProps,
      canShowDescription,
      canShowTag,
      tagProps,
      withTabs,
      showActionBar,
      showNotification,
      notificationDetails,
      showButtonPanel,
      headingIcon,
    } = this
    let {
      title,
      description,
      intent = 'information',
      hideCloseIcon = false,
    } = notificationDetails || {}
    let { name: headingName, group: headingGroup, text = '' } = headingIcon
    let LeftContainer = styled(FContainer)`
      ${this.getStyle('leftContainer')}
    `
    let RightContainer = styled(FContainer)`
      ${this.getStyle('rightContainer')}
    `
    return (
      <FContainer
        display="flex"
        backgroundColor="backgroundMidgroundSubtle"
        borderRadius={!withTabs ? 'high' : 'high high none none'}
        border="1px solid"
        borderBottom={withTabs ? 'solid 1px' : ''}
        borderColor="borderNeutralBaseSubtler"
        flexDirection="column"
        overflow="hidden"
        transition="transform 0.10s ease"
      >
        <FContainer
          height={this.showNotification ? this.notificationHeight : '0px'}
          class="fpanel-moving-animation"
        >
          {showNotification && (
            <FNotification
              ref="notificationPanel"
              style={{ animation: 'unset' }}
              title={title}
              description={description}
              menuType="alerts"
              intent={intent}
              rounded={false}
              close={() => this.closeNotification()}
              hideCloseIcon={hideCloseIcon}
            >
              {this.slot('notificationButton')}
            </FNotification>
          )}
        </FContainer>
        <FContainer display="flex" width="100%">
          <LeftContainer>
            <FBreadcrumb
              props={breadCrumbProps}
              vOn:click={(obj) => this.$emit('path', obj)}
            />
            <FContainer
              marginTop="containerSmall"
              display="flex"
              gap="containerLarge"
              alignItems="center"
            >
              {this.showAvatar && (
                <FContainer flex="1 0 auto">
                  <FAvatar
                    size="XL"
                    iconname={this.iconname}
                    icongroup={this.icongroup}
                    avatarUrl={this.avatarUrl}
                    shape="square"
                    clickable={this.avatarClickable}
                    vOn:onClick={() => this.$emit('onAvatarClick')}
                  />
                </FContainer>
              )}
              <FContainer width={this.showAvatar ? '93%' : '100%'}>
                {!isEmpty(this.captionText) && !this.loading && (
                  <FText appearance="captionReg10" color="textCaption">
                    {this.captionText}{' '}
                  </FText>
                )}
                <FContainer
                  display="flex"
                  alignItems="center"
                  gap="containerLarge"
                >
                  {!isEmpty(headingName) && !isEmpty(headingGroup) && (
                    <FTooltip>
                      <template slot="title">{text}</template>
                      <FContainer display="flex">
                        <FIcon
                          group={headingGroup}
                          name={headingName}
                          size="16"
                          pressable={false}
                        />
                      </FContainer>
                    </FTooltip>
                  )}
                  {!this.loading && (
                    <FText
                      appearance="headingMed20"
                      whiteSpace="nowrap"
                      ref="textPanel"
                      class="textPanel"
                      display="inline-block"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      width={this.canShowTooltip && '100%'}
                    >
                      {this.heading}{' '}
                    </FText>
                  )}
                  {this.canShowTooltip && (
                    <FTooltip placement="top">
                      <template slot="title">{this.heading}</template>
                      <FIcon
                        group="action"
                        name="info"
                        size="16"
                        pressable={false}
                      />
                    </FTooltip>
                  )}
                  {!isEmpty(this.slot('header-actions')) && (
                    <FContainer display="flex" alignItems="center">
                      {this.slot('header-actions')}
                    </FContainer>
                  )}
                  {this.loading && <FShimmer height={24} width={120} />}

                  {canShowTag ? (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerLarge"
                    >
                      <FDivider height="16px" />
                      {!this.loading ? (
                        <FTags props={tagProps}></FTags>
                      ) : (
                        <FShimmer height={20} width={100} />
                      )}
                    </FContainer>
                  ) : (
                    this.slot('tags')
                  )}
                </FContainer>
                {canShowDescription &&
                  (!this.loading ? (
                    <FText appearance="bodyReg14" color="textDescription">
                      {this.description}
                    </FText>
                  ) : (
                    <FShimmer height={16} width={400} />
                  ))}
              </FContainer>
            </FContainer>
          </LeftContainer>
          {!this.loading && (
            <RightContainer>
              {this.slot('buttons')}
              {showActionBar && (
                <FContainer display="flex">
                  {' '}
                  <FContainer padding="containerNone containerXLarge">
                    <FDivider height="20px" />
                  </FContainer>
                  <FIcon
                    group="dsm"
                    name={this.openActionBar ? 'chevron-up' : 'chevron-down'}
                    size="16"
                    color="iconNeutralDefault"
                    vOn:click={() => (this.openActionBar = !this.openActionBar)}
                  />
                </FContainer>
              )}
            </RightContainer>
          )}
        </FContainer>
        {this.openActionBar && <FDivider width="100%" />}
        {showActionBar && (
          <FContainer
            height={this.openActionBar ? '42.5px' : '0px'}
            display="flex"
            alignItems="center"
            class="fpanel-moving-animation"
          >
            <FContainer
              padding="containerLarge containerXLarge"
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
            >
              {this.slot('actionBar')}
            </FContainer>
          </FContainer>
        )}
        {showButtonPanel && <FDivider width="100%" />}
        {showButtonPanel && (
          <FContainer
            ref="buttonPanel"
            display="flex"
            alignItems="center"
            height={
              this.openButtonPanel
                ? `${this.panelHeight}px`
                : `${this.initialHeight + 4}px`
            }
            class="fpanel-moving-animation"
          >
            <FContainer
              padding="containerLarge containerXLarge"
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              gap="containerLarge"
            >
              {this.slot('buttonPanel')}
            </FContainer>
            {this.showPanel && (
              <FContainer
                display="flex"
                height="100%"
                padding="containerNone containerXLarge"
                alignItems="center"
              >
                {' '}
                <FContainer padding="containerNone containerXLarge">
                  <FDivider
                    height={
                      this.openButtonPanel ? `${this.panelHeight}px` : '49.5px'
                    }
                  />
                </FContainer>
                <FIcon
                  group="dsm"
                  name={this.openButtonPanel ? 'chevron-up' : 'chevron-down'}
                  size="16"
                  color="iconNeutralDefault"
                  vOn:click={() =>
                    (this.openButtonPanel = !this.openButtonPanel)
                  }
                />
              </FContainer>
            )}
          </FContainer>
        )}
      </FContainer>
    )
  },
}
</script>

<style scoped>
.fpanel-moving-animation {
  overflow: hidden;
  transition: height 200ms;
}
</style>
