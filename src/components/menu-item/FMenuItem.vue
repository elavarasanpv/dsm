<script>
import { FText, FCheckbox, FRadio, FIcon, FContainer } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'
import { isEmpty } from 'lodash'

fcIcon(window)

export default {
  name: 'FMenuItem',
  mixins: [ThemeMixin],
  inject: {
    selectType: { default: '' },
    eventBus: { default: '' },
    menuList: { default: '' },
    uniqueId: { default: '' },
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    unselectable: {
      type: Boolean,
      default: false,
    },
    isMultiSelect: {
      type: Boolean,
      default: false,
    },
    childrenAvailable: {
      type: Boolean,
      default: false,
    },
    iconGroup: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'suffix',
      validator: (value) => {
        return ['prefix', 'suffix'].includes(value)
      },
    },
  },
  data() {
    return {
      selected: false,
      multiSelect: false,
      singleSelect: false,
      canShowMenu: true,
    }
  },
  computed: {
    canShowIcon() {
      let { iconName, iconGroup } = this || {}
      return !isEmpty(iconName) && !isEmpty(iconGroup)
    },
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  watch: {
    isSelected(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.selected = newVal
      }
    },
    menuList() {
      this.checkForKey()
    },
  },
  created() {
    let { isSelected, selectType } = this
    this.selected = isSelected
    if (selectType === 'bulk') {
      this.multiSelect = true
      this.singleSelect = false
    }
    if (selectType === 'single') {
      this.singleSelect = true
      this.multiSelect = false
    }
    this.checkForKey()
  },
  mounted() {
    if (!isEmpty(this.eventBus)) {
      this.eventBus.$on(
        `selected-item${this.value}${this.uniqueId}`,
        (props) => {
          this.selected = props
        }
      )
    }
  },
  methods: {
    emitKey() {
      let { value, uniqueId } = this || {}
      this.$emit('click', { value })
      if (!isEmpty(this.eventBus)) {
        this.eventBus.$emit(`menu-selected${value}${uniqueId}`, value)
      }
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    checkForKey() {
      let { menuList, value } = this
      if (!isEmpty(menuList)) {
        this.canShowMenu = menuList.some((menu) => menu.value === value)
      }
    },
    hasPrefixSlot() {
      return !isEmpty(this.inputSlots('prefix'))
    },
  },
  render() {
    let {
      styleProps,
      selected,
      isMultiSelect,
      multiSelect,
      singleSelect,
      canShowMenu,
      childrenAvailable,
      canShowIcon,
      iconPosition,
      iconGroup,
      iconName,
      isRTL,
    } = this || {}
    const Element = styled('div')`
      ${styleProps}
      ${isMultiSelect || multiSelect || singleSelect
        ? 'justify-content: flex-start'
        : 'justify-content: space-between'}
    `

    const RightIconContainer = styled('div')`
      display: flex;
      margin-left: auto;
    `

    return this.unselectable ? (
      <Element selected={selected}>
        <FText>{this.children()}</FText>
      </Element>
    ) : (
      canShowMenu && (
        <Element vOn:click={this.emitKey} selected={selected}>
          {(isMultiSelect || multiSelect) && <FCheckbox v-model={selected} />}
          {singleSelect && <FRadio v-model={selected} />}
          <FContainer display="flex" gap="containerLarge">
            {canShowIcon && iconPosition === 'prefix' && (
              <FIcon
                group={iconGroup}
                name={iconName}
                size="16"
                pressable={false}
                color="currentColor"
              ></FIcon>
            )}
            <FText> {this.children()} </FText>
          </FContainer>

          <RightIconContainer>
            {canShowIcon && iconPosition === 'suffix' && (
              <FIcon
                group={iconGroup}
                name={iconName}
                size="16"
                pressable={false}
                color="currentColor"
                marginRight={!isRTL && 'containerLarge'}
                marginLeft={isRTL && 'containerLarge'}
              ></FIcon>
            )}
            {!childrenAvailable ? (
              <FText display="flex">
                {!isMultiSelect &&
                  !multiSelect &&
                  !singleSelect &&
                  selected && (
                    <fc-icon
                      name="check"
                      group="dsm"
                      size="14"
                      color="#0074d1"
                    ></fc-icon>
                  )}
              </FText>
            ) : (
              <fc-icon group="dsm" name="chevron-right" size="14"></fc-icon>
            )}
          </RightIconContainer>
        </Element>
      )
    )
  },
}
</script>
