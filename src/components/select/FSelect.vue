<script>
import {
  FInput,
  FMenuItem,
  FPopover,
  FSpinner,
  FText,
  FTags,
  FIcon,
  FContainer,
} from '../../index'
import { Menu } from 'ant-design-vue'
import 'ant-design-vue/lib/menu/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import dlv from 'dlv'
import { isEmpty, isFunction } from '../../utils/validation'
import styled from 'vue-emotion'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'

fcIcon(window)

export default {
  name: 'FSelect',
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default'].includes(value)
      },
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: undefined,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    remoteMethod: {
      type: Function,
      default: undefined,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: 'Loading...',
    },
    emptyText: {
      type: String,
      default: 'No Data',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    addOptionLoading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    hideChevron: {
      type: Boolean,
      default: false,
    },
    showAppend: {
      type: Boolean,
      default: false,
    },
    showPrepend: {
      type: Boolean,
      default: false,
    },
    prependDetails: {
      type: Object,
      default: () => {},
    },
    appendDetails: {
      type: Object,
      default: () => {},
    },
    openPrepend: {
      type: Boolean,
      default: false,
    },
    openAppend: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isDropdownVisible: false,
    inputText: '',
    filteredOptions: [],
    cachedOption: [],
    remoteActive: false,
    closeContent: true,
    prependPopover: false,
    appendPopover: false,
  }),
  computed: {
    canShowCustomOption() {
      let { allowCreate, customOptionLabel } = this || {}
      return allowCreate && !isEmpty(customOptionLabel)
    },
    customOptionLabel() {
      let { filterable, filteredOptions, inputText } = this || {}
      if (filterable && isEmpty(filteredOptions) && !isEmpty(inputText)) {
        return inputText
      }
      return ''
    },
    isReadOnly() {
      let { filterable, addOptionLoading } = this || {}
      return addOptionLoading || !filterable
    },
    popoverDisabled() {
      let { disabled, addOptionLoading } = this || {}
      return addOptionLoading || disabled
    },
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('change', value)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },

    selectedOption() {
      let { options, modelValue } = this || {}
      return this.findOption(options, modelValue)
    },
    selectedOptionLabel() {
      let { selectedOption, multiple } = this || {}
      let { label } = selectedOption || {}
      if (multiple) {
        return ''
      }
      return label || ''
    },
    menuValue() {
      // ant vue expects menu v model to be an array
      let { multiple } = this
      if (multiple) {
        return this.modelValue
      }
      return [this.modelValue]
    },
    getPlaceholder() {
      let { modelValue, placeholder, multiple, selectedOptionLabel } = this
      if (multiple) {
        return !isEmpty(modelValue) ? '' : placeholder
      } else {
        return !isEmpty(selectedOptionLabel) ? selectedOptionLabel : placeholder
      }
    },
    showOptions() {
      let { filteredOptions, loading, allowCreate } = this || {}
      if (!allowCreate) {
        return !isEmpty(filteredOptions) && !loading
      } else {
        return true
      }
    },
    filteredOptionsValue() {
      const rearrangedArray = []
      this.filteredOptions.forEach((item) => {
        if ('label' in item && 'value' in item) {
          rearrangedArray.push(item)
        }
      })

      this.filteredOptions.forEach((item) => {
        if ('label' in item && !('value' in item)) {
          rearrangedArray.push(item)
        }
      })
      return rearrangedArray || []
    },
  },
  watch: {
    prependPopover: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:openPrepend', newVal)
      },
    },
    openPrepend: {
      handler(newVal) {
        this.isDropdownVisible = false
        this.prependPopover = newVal
      },
    },
    appendPopover: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:openAppend', newVal)
      },
    },
    openAppend: {
      handler(newVal) {
        this.isDropdownVisible = false
        this.appendPopover = newVal
      },
    },
    options: {
      handler(newVal) {
        this.filteredOptions = newVal
      },
    },
    modelValue: {
      handler(newVal) {
        if (isEmpty(newVal)) this.inputText = ''
      },
      deep: true,
    },
    selectedOptionLabel: {
      handler(val) {
        if (!isEmpty(val)) {
          this.inputText = val
        }
      },
    },
    inputText: {
      async handler(val) {
        let {
          options,
          filterable,
          remoteMethod,
          isDropdownVisible,
          remoteActive,
        } = this
        let modifiedOptions = options
        if (filterable && isDropdownVisible && !isEmpty(val)) {
          if (!isEmpty(remoteMethod)) {
            this.remoteActive = true
            modifiedOptions = (await remoteMethod(val, options)) || options
            this.filteredOptions = modifiedOptions
          } else {
            modifiedOptions = options
              .map((option) => {
                if (
                  option.label.toLowerCase().includes(val.toLowerCase()) &&
                  option.options === undefined
                ) {
                  return option
                } else if (option.options) {
                  const filteredNestedOptions = option.options.filter(
                    (nestedOption) =>
                      nestedOption.label
                        .toLowerCase()
                        .includes(val.toLowerCase())
                  )
                  if (filteredNestedOptions.length > 0) {
                    return {
                      ...option,
                      options: filteredNestedOptions,
                    }
                  }
                }
                return null
              })
              .filter(Boolean)
            this.filteredOptions = modifiedOptions
          }
        } else {
          if (remoteActive) {
            this.remoteActive = false
            let defaultOptions = await this.remoteMethod('')
            this.filteredOptions = defaultOptions
          } else this.filteredOptions = options
        }
      },
      immediate: true,
    },
  },
  created() {
    this.inputText = this.selectedOptionLabel
  },
  methods: {
    getMenuStyles() {
      let dropdownWidth = '100%'
      let { $refs } = this || {}
      let inputWidth = dlv($refs['f-select-input'], '$el.clientWidth')
      if (!isEmpty(inputWidth)) dropdownWidth = `${inputWidth + 2}px`
      return `width:${dropdownWidth};padding:0px;max-height:200px;overflow:scroll`
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    findOption(options, modelValue) {
      return options.reduce((acc, option) => {
        if (acc) return acc
        if (option.value === modelValue) return option

        if (option.options && Array.isArray(option.options)) {
          return this.findOption(option.options, modelValue)
        }

        return acc
      }, undefined)
    },
    selectOption(option) {
      let { multiple, modelValue, cachedOption, remoteActive } = this
      if (remoteActive) {
        this.remoteMethod('')
        this.remoteActive = false
      }
      let { value } = option || {}
      if (multiple) {
        let existingIndex = (modelValue || []).findIndex(
          (selectedValue) => selectedValue == value
        )
        if (!isEmpty(existingIndex)) {
          this.modelValue = [
            ...modelValue.slice(0, existingIndex),
            ...modelValue.slice(existingIndex + 1),
          ]
        } else {
          this.modelValue = [...(modelValue || []), value]
          this.cachedOption = [...cachedOption, option]
        }
        this.inputText = ''
      } else {
        this.modelValue = value
        this.isDropdownVisible = false
      }
      setTimeout(() => {
        let inputElement = this.$refs['f-select-input']
        if (inputElement) inputElement.setElementPadding()
      })
    },
    getUnSelectable(option) {
      let { unselectable } = option
      return isEmpty(unselectable) ? false : unselectable
    },
    isSelected(option) {
      let { modelValue, multiple } = this || {}
      let { value } = option || {}
      if (multiple) {
        return (modelValue || []).some(
          (selectedValue) => selectedValue == value
        )
      } else {
        return value === modelValue
      }
    },
    showInvalid(value) {
      let inputElement = this.$refs['f-select-input']
      if (!isEmpty(inputElement)) {
        inputElement.showInvalid(value)
      }
    },
    clearValue() {
      this.modelValue = ''
      this.inputText = ''
    },
    removeChip(index) {
      this.isDropdownVisible = false
      let { modelValue } = this
      this.modelValue = [
        ...modelValue.slice(0, index),
        ...modelValue.slice(index + 1),
      ]
    },
    getLabel(value) {
      let { cachedOption, options } = this
      let option = cachedOption.find((option) => option.value === value) || {}
      if (isEmpty(option)) {
        option = this.findOption(options, value) || {}
      }
      let { label } = option
      return label
    },

    toggleDropDown(e) {
      e.cancelBubble = true
      let { isDropdownVisible } = this
      if (this.$refs['f-select-input'] && !isDropdownVisible)
        this.$refs['f-select-input'].$refs['f-input-field'].focus()
      this.isDropdownVisible = !isDropdownVisible
    },
    getSuffixComponent() {
      let { $slots, hideChevron } = this
      let { suffix } = $slots
      if (!isEmpty(suffix)) {
        return suffix
      } else if (!hideChevron) {
        return (
          <div style="display:flex;align-items:center;">
            {this.addOptionLoading ? (
              <FSpinner size={15} />
            ) : (
              <FIcon
                vOn:click={(e) => !this.disabled && this.toggleDropDown(e)}
                name={
                  this.isDropdownVisible && this.closeContent
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                group="dsm"
                size="16"
                color="textMain"
                cursor={!this.disabled ? 'pointer' : ''}
                pressable={false}
              />
            )}
          </div>
        )
      }
      return
    },
    getClickableSlot() {
      let { $slots } = this
      let { clickable } = $slots
      if (!isEmpty(clickable)) {
        return clickable
      }
    },
    getPrefixComponent() {
      let { $slots, multiple, modelValue } = this
      let { prefix } = $slots
      if (!isEmpty(prefix) && multiple && !isEmpty(modelValue)) {
        return [prefix, this.getSelectedValues(true)]
      } else if (!isEmpty(prefix)) {
        return prefix
      } else {
        if (multiple && !isEmpty(modelValue)) {
          return this.getSelectedValues(false)
        }
      }
    },
    getSelectedValues(val) {
      let { modelValue } = this

      const ChipContainer = styled(FContainer)`
        ${this.getStyle('chipContainer')};
        ${val && 'margin-left: 4px;'}
      `
      if (modelValue.length <= 1) {
        return (
          <ChipContainer>
            {modelValue.map((val, index) => (
              <FTags
                appearance="action"
                actionType="removable"
                text={this.getLabel(val)}
                disabled={this.disabled}
                vOn:close={() => this.removeChip(index)}
              />
            ))}
          </ChipContainer>
        )
      } else {
        let firstValue = modelValue[0]

        return (
          <ChipContainer>
            <FTags
              appearance="action"
              actionType="removable"
              text={this.getLabel(firstValue)}
              disabled={this.disabled}
              vOn:close={() => this.removeChip(0)}
            />
            <FTags
              text={`+${modelValue.length - 1}`}
              disabled={this.disabled}
            />
          </ChipContainer>
        )
      }
    },
    noDataContainer() {
      let { loading, loadingText, emptyText } = this || {}
      const NoOptionContainer = styled('div')`
        ${this.getCustomStyle({ property: 'noDataLoadingDropdown' })}
      `
      return (
        <NoOptionContainer>
          <FText color="textCaption">{loading ? loadingText : emptyText}</FText>
        </NoOptionContainer>
      )
    },
    emitAddOption() {
      let { inputText } = this || {}
      if (!isEmpty(inputText)) {
        this.$emit('addOption', inputText)
        if (this.multiple) this.inputText = ''
      }
    },
    handleSlotClick() {
      setTimeout(() => {
        this.isDropdownVisible = false
      }, 1)
      this.$emit('slotClicked')
    },
    handleInputBlur() {
      this.$emit('blur')
    },
    handleInputFocus() {
      this.$emit('focus')
      if (this.filterable) {
        this.$refs['f-select-input'].selectInput()
      }
    },
    openPrepended(val) {
      if (val) {
        this.prependPopover = val
        this.closeContent = false
      } else {
        this.closeContent = true
      }
    },
    openAppended(val) {
      if (val) {
        this.appendPopover = val
        this.closeContent = false
      } else {
        this.closeContent = true
      }
    },
    getSlot(prop) {
      let { $scopedSlots } = this || {}
      let { [prop]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        return component && component()
      }
    },
  },
  render() {
    return (
      <FPopover
        trigger="clickToOpen"
        containerWidth={true}
        v-model={this.isDropdownVisible}
        disabled={this.popoverDisabled}
      >
        <FInput
          ref="f-select-input"
          readOnly={this.isReadOnly}
          clearable={this.clearable}
          clearValue={this.clearValue}
          placeholder={this.getPlaceholder}
          disabled={this.disabled}
          appendDetails={this.appendDetails}
          prependDetails={this.prependDetails}
          showPrepend={this.showPrepend}
          showAppend={this.showAppend}
          v-model={this.inputText}
          appearance={this.appearance}
          openPrepend={this.prependPopover}
          openAppend={this.appendPopover}
          vOn:updatedPrepend={this.openPrepended}
          vOn:updatedAppend={this.openAppended}
          size={this.size}
          vOn:slotClicked={this.handleSlotClick}
          vOn:blur={this.handleInputBlur}
          vOn:focus={this.handleInputFocus}
          style={{ width: '100%' }}
        >
          <template slot="prefix">{this.getPrefixComponent()}</template>
          <template slot="suffix">{this.getSuffixComponent()}</template>
          <template slot="clickable">{this.getClickableSlot()}</template>
          <template slot="prepend">{this.getSlot('prepend')}</template>
          <template slot="append">{this.getSlot('append')}</template>
        </FInput>
        {this.closeContent && this.showOptions ? (
          <div slot="content">
            <Menu
              v-model:selectedKeys={this.menuValue}
              style={this.getMenuStyles()}
              multiple
              selectable
            >
              {this.filteredOptionsValue.map((option, index) => {
                return isEmpty(option.options) ? (
                  <FMenuItem
                    value={`${option.value}`}
                    vOn:click={() => this.selectOption(option)}
                    isSelected={this.isSelected(option)}
                    unselectable={this.getUnSelectable(option)}
                    key={`${option.value}`}
                    iconGroup={option.iconGroup}
                    iconName={option.iconName}
                    iconPosition="prefix"
                  >
                    {option.label}
                  </FMenuItem>
                ) : (
                  <FContainer key={`${option.value}${index}`}>
                    <FContainer padding="containerMedium containerXLarge">
                      {' '}
                      <FText color="textCaption" appearance="captionMed10">
                        {' '}
                        {option.label}{' '}
                      </FText>
                    </FContainer>
                    {(option.options || []).map((nestedOption) => (
                      <FMenuItem
                        value={`${nestedOption.value}`}
                        vOn:click={() => this.selectOption(nestedOption)}
                        isSelected={this.isSelected(nestedOption)}
                        key={`${nestedOption.value}`}
                        iconGroup={nestedOption.iconGroup}
                        iconName={nestedOption.iconName}
                        iconPosition="prefix"
                      >
                        {nestedOption.label}
                      </FMenuItem>
                    ))}
                  </FContainer>
                )
              })}
              {this.canShowCustomOption && (
                <FMenuItem
                  value="custom"
                  vOn:click={() => this.emitAddOption()}
                >
                  <FText>{this.customOptionLabel}</FText>
                  <FText color="neutralFont60"> (Click to add option)</FText>
                </FMenuItem>
              )}
            </Menu>
          </div>
        ) : (
          this.closeContent && (
            <template slot="content">{this.noDataContainer()}</template>
          )
        )}
      </FPopover>
    )
  },
}
</script>

<style>
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border: none;
}
</style>
