<script>
import { Button } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { FIcon } from '../../index'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FButton',
  components: { Button },
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return [
          'primary',
          'secondary',
          'tertiary',
          'link',
          'primaryInverse',
          'secondaryInverse',
        ].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    split: {
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
    iconButton: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      type: String,
      default: 'suffix',
      validator: (value) => {
        return ['prefix', 'suffix'].includes(value)
      },
    },
  },
  computed: {
    canShowIcon() {
      let { iconName, iconGroup } = this || {}
      return !isEmpty(iconName) && !isEmpty(iconGroup)
    },
    iconMargin() {
      let { size } = this
      if (size === 'small') {
        return 'containerMedium'
      } else return 'containerLarge'
    },
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
    onDropdownClick() {
      this.$emit('dropdown')
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    getDropdownStyle(value) {
      return this.getCustomStyle({ property: 'splitButton', value })
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
  },
  render() {
    let {
      styleProps,
      appearance,
      split,
      canShowIcon,
      iconGroup,
      iconName,
      iconButton,
      iconPosition,
      size,
      selected,
      isRTL,
    } = this || {}
    const Container = styled('div')`
      ${this.getDropdownStyle('container')}
    `
    const ButtonElement = styled(Button)`
      ${styleProps}
      ${selected && appearance === 'secondary' && this.getStyle('selected')}
      ${appearance === 'link' ? 'padding:0px;height:unset' : ''}
      ${split ? this.getDropdownStyle(this.isRTL ? 'buttonRtl' : 'button') : ''}
    `
    const DropdownElement = styled(Button)`
      ${styleProps}
      ${this.getDropdownStyle(this.isRTL ? 'dropdownRtl' : 'dropdown')}
      /* ${appearance === 'primary' ? 'margin-left:0.5px;' : ''} */
      ${appearance === 'primary' && !this.isRTL
        ? 'margin-left:0.5px;'
        : appearance === 'primary' && this.isRTL
        ? 'margin-right:0.5px;'
        : ''}
    `
    return (
      <Container class={isRTL && 'fc-rtl'}>
        <ButtonElement
          vOn:click={this.onClick}
          disabled={this.disabled}
          loading={this.loading}
          block={this.block}
        >
          {canShowIcon && iconPosition === 'prefix' && (
            <FIcon
              group={iconGroup}
              name={iconName}
              size={size === 'small' ? '12' : '16'}
              pressable={false}
              color="currentColor"
              marginRight={
                !iconButton && !isRTL
                  ? this.iconMargin
                  : this.loading && !iconButton && isRTL
                  ? this.iconMargin
                  : ''
              }
              // marginLeft={!iconButton && isRTL ? this.iconMargin : ''}
              // marginLeft={this.loading ? this.iconMargin : ''}

              marginLeft={
                !iconButton && isRTL
                  ? this.iconMargin
                  : this.loading
                  ? this.iconMargin
                  : ''
              }
            ></FIcon>
          )}
          {this.children()}
          {canShowIcon && iconPosition === 'suffix' && (
            <FIcon
              group={iconGroup}
              name={iconName}
              size={size === 'small' ? '12' : '16'}
              pressable={false}
              color="currentColor"
              marginLeft={!iconButton && !isRTL ? this.iconMargin : ''}
              marginRight={!iconButton && isRTL ? this.iconMargin : ''}
            ></FIcon>
          )}
        </ButtonElement>
        {split && (
          <DropdownElement
            vOn:click={this.onDropdownClick}
            disabled={this.disabled}
          >
            <FIcon
              group="dsm"
              name="chevron-down"
              size="16"
              pressable={false}
              color="currentColor"
            ></FIcon>
          </DropdownElement>
        )}
      </Container>
    )
  },
}
</script>

<style>
.fc-rtl
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(
    .ant-btn-circle-outline
  ):not(.ant-btn-icon-only) {
  padding-right: 29px;
  padding-left: 8px !important;
}
.fc-rtl .ant-btn > .anticon + span {
  margin-right: 8px;
  margin-left: 0px !important;
}
.fc-rtl
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(
    .ant-btn-circle-outline
  ):not(.ant-btn-icon-only)
  .anticon:not(:last-child) {
  margin-right: -14px;
  margin-left: 0px !important;
}
</style>
