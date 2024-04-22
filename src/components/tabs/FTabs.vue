<script>
import { FContainer, FText, FIcon, FPopover, FMenuItem } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import { cloneDeep } from 'lodash'
export default {
  name: 'FTabs',
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'link',
      validator: (value) => {
        return ['link', 'button'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    tabsList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    maxCount: {
      type: Number,
      default: 0,
    },
    hideBorder: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    beforeChangeHandler: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      defaultTabs: [],
      viewMoreTabs: [],
      isEventPopoverVisible: true,
      width: 0,
      offset: 0,
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  watch: {
    maxCount(newVal, oldVal) {
      if (newVal > 0 && oldVal !== newVal) {
        this.filterTab()
      }
    },
    modelValue(newVal, oldVal) {
      if (!isEmpty(newVal) && oldVal !== newVal) {
        this.setWidth(true)
      }
    },
    tabsList: {
      handler() {
        this.filterTab()
        this.setWidth()
      },
      deep: true,
    },
  },
  created() {
    this.filterTab()
  },
  mounted() {
    this.setWidth()
  },
  methods: {
    defaultSlots() {
      let { modelValue, $slots = {} } = this
      let selectedTab = 0
      if (!isEmpty($slots)) {
        let slots = $slots?.default || []
        Array.from(slots).forEach((slot, index) => {
          let { componentOptions } = slot || {}
          let { propsData } = componentOptions || {}
          let { activeKey } = propsData || {}
          if (activeKey === modelValue) {
            selectedTab = index
            return
          }
        })
        return !isEmpty(slots) ? this.$slots.default[selectedTab] : ''
      } else return ''
    },
    lazyLoadSlots() {
      let { tabsList, $slots = {}, modelValue } = this
      let selectedTab = []
      let availablePanel = []
      let showPanel = false
      if (!isEmpty($slots)) {
        let slots = $slots?.default || []
        Array.from(slots).forEach((slot, index) => {
          let { componentOptions } = slot || {}
          let { propsData } = componentOptions || {}
          let { activeKey } = propsData || {}
          if (tabsList.some((tab) => tab.value === activeKey)) {
            selectedTab.push(index)
          }
        })
        selectedTab.forEach((id) => {
          let tab = tabsList[id] || {}
          showPanel = tab.value === modelValue
          if (!isEmpty(slots))
            availablePanel.push(
              <FContainer
                class="selected-tab"
                display={!showPanel && 'none'}
                height="100%"
                width="100%"
              >
                {this.$slots.default[id]}
              </FContainer>
            )
        })
        return availablePanel
      } else return ''
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    setWidth(change) {
      let { modelValue, $refs } = this
      let component = $refs[`tab-${modelValue}`]
      let { $el: element } = component || {}
      this.width = element?.offsetWidth
      if (element?.offsetLeft !== 0 && !change) {
        this.offset = element?.offsetLeft
      } else {
        this.offset = element?.offsetLeft
      }
    },
    filterTab() {
      let { maxCount, tabsList = [] } = this
      let tabs = cloneDeep(tabsList)
      let length = tabsList.length
      if (maxCount > 0 && maxCount < length) {
        this.viewMoreTabs = tabs.filter((item, index) => {
          return index >= maxCount
        })
        this.defaultTabs = tabs.filter((item, index) => {
          return index >= 0 && index < maxCount
        })
      } else {
        this.defaultTabs = tabsList
        this.viewMoreTabs = []
      }
    },
    tabsContainer(tab) {
      let { styleProps, modelValue, appearance, size } = this
      let {
        disabled = false,
        label = '',
        value,
        iconGroup,
        iconName,
        path,
      } = tab || {}
      let iconTab = false
      if (!isEmpty(iconGroup) && !isEmpty(iconName)) iconTab = true
      let isSelectedTab = value === modelValue
      let isButtonType = appearance === 'button'
      let color = ''
      let isSizeSmall = size === 'small'
      let fontStyle = 'bodyRegSt14'
      if (appearance === 'link' && isSelectedTab) {
        color = 'backgroundPrimaryDefault'
      } else {
        color = ''
      }
      if (isSizeSmall && isSelectedTab) {
        fontStyle = 'captionMed12'
      } else if (isSizeSmall) {
        fontStyle = 'captionReg12'
      } else if (isSelectedTab) {
        fontStyle = 'headingMed14'
      } else {
        fontStyle = 'bodyRegSt14'
      }
      const Container = styled(FContainer)`
        ${styleProps};
        ${this.getStyle('tabList')};
        ${isSelectedTab && isButtonType ? this.getStyle('buttonPressed') : ''};
        ${`color:#${!isEmpty(color) ? '0059d6ff' : ''}`};
      `
      return (
        <a
          href={path}
          class="ftabs-anchor"
          vOn:click={(e) => e.preventDefault()}
        >
          <Container
            ref={`tab-${value}`}
            disabled={disabled}
            vOn:click={() => this.onTabClick(tab)}
          >
            {iconTab && (
              <FIcon
                group={iconGroup}
                name={iconName}
                size={isSizeSmall ? '12' : '16'}
                color="currentColor"
                pressable={false}
              />
            )}
            {!isEmpty(label) && (
              <FText appearance={fontStyle} color={color} whiteSpace="nowrap">
                {label}
              </FText>
            )}
          </Container>
        </a>
      )
    },
    getViewMore() {
      return (
        <FPopover
          placement="bottom"
          trigger="clickToOpen"
          showArrow={true}
          v-model={this.isEventPopoverVisible}
          vOn:show={() => {
            this.isEventPopoverVisible = true
          }}
          vOn:hide={() => {
            this.isEventPopoverVisible = false
          }}
        >
          <FIcon
            group="action"
            name="options-horizontal"
            size="20"
            pressable={true}
          />
          <div slot="content">{this.getViewMoreTabs()}</div>
        </FPopover>
      )
    },
    getViewMoreTabs() {
      let { viewMoreTabs } = this || []
      return (
        <FContainer>
          {viewMoreTabs.map((tab, index) => {
            return this.getMenuItem(tab, index)
          })}
        </FContainer>
      )
    },
    getMenuItem(tab, index) {
      let {
        disabled = false,
        iconGroup,
        iconName,
        label = '',
        path,
      } = tab || {}
      let iconTab = false
      if (!isEmpty(iconGroup) && !isEmpty(iconName)) iconTab = true
      const MenuItem = styled(FMenuItem)`
        ${disabled ? 'cursor: not-allowed !important' : 'cursor: pointer'}
      `
      const MenuContainer = styled(FContainer)`
        ${this.getStyle('menuItem')};
      `
      return (
        <a
          href={path}
          class="ftabs-anchor"
          vOn:click={(e) => e.preventDefault()}
        >
          <MenuItem
            value={`${tab.value}`}
            vOn:click={() => this.onExtraTabClick(tab, index)}
            key={`${tab.value}`}
          >
            <MenuContainer>
              {iconTab && (
                <FIcon
                  group={iconGroup}
                  name={iconName}
                  size="18"
                  pressable={false}
                />
              )}
              {!isEmpty(label) && <FText whiteSpace="nowrap">{label}</FText>}
            </MenuContainer>
          </MenuItem>
        </a>
      )
    },
    onExtraTabClick(tab, index) {
      let { disabled = false } = tab || {}
      if (!disabled) {
        this.isEventPopoverVisible = false
        let { maxCount, defaultTabs } = this
        let lastTab = defaultTabs[maxCount - 1]
        this.defaultTabs[maxCount - 1] = {}
        this.defaultTabs[maxCount - 1] = tab
        this.viewMoreTabs[index] = {}
        this.viewMoreTabs[index] = lastTab
        setTimeout(() => {
          this.onTabClick(tab)
        }, 1)
      }
    },
    async onTabClick(tab) {
      let { value, disabled = false } = tab || {}
      this.$emit('beforeChange', { current: this.modelValue, next: value })
      await this.beforeChangeHandler({
        current: this.modelValue,
        next: value,
      })
      if (!disabled) {
        this.modelValue = value
        this.$emit('change', value)
      }
    },
  },
  render() {
    let {
      defaultTabs,
      appearance,
      viewMoreTabs,
      width = 0,
      offset = 0,
      hideBorder,
      computedStyleProps,
      lazy,
    } = this
    const MainContainer = styled(FContainer)`
      ${this.getStyle('container')};
      ${appearance === 'link' && !hideBorder ? this.getStyle('border') : ''};
      ${computedStyleProps}
    `
    let padding = 24
    let bordeWidth = 34
    let iconWidth = width - padding
    if (iconWidth < padding) {
      bordeWidth = iconWidth
    }
    if (width === 0) {
      bordeWidth = 0
    }
    const Border = styled(FContainer)`
      ${this.getStyle('selectBorder')};
      ${`transform: translateX(${offset + 12}px);width: ${bordeWidth}px;`}
    `
    return (
      <FContainer
        height="100%"
        width="100%"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <MainContainer gap="containerSmall" flexShrink="0">
          {' '}
          {defaultTabs.map((tab) => this.tabsContainer(tab))}
          {viewMoreTabs.length > 0 && this.getViewMore()}
          {appearance === 'link' && <Border />}
        </MainContainer>
        {lazy ? this.lazyLoadSlots() : this.defaultSlots()}
      </FContainer>
    )
  },
}
</script>

<style scoped>
.ftabs-anchor {
  color: unset;
  text-decoration: unset;
}
</style>
