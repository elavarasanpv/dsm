<script>
import { FContainer, FInput, FMenuItem, FTags, FText } from '../../index'
import { Menu } from 'ant-design-vue'
import 'ant-design-vue/lib/menu/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import dlv from 'dlv'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'

fcIcon(window)

export default {
  name: 'FSelectList',
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'minimal'].includes(value)
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
  },
  data: () => ({
    isDropdownVisible: false,
    inputText: '',
    filteredOptions: [],
    cachedOption: [],
    remoteActive: false,
    singleSelect: false,
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

      return options.find((option) => option.value == modelValue)
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
  },
  watch: {
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
        let { options, filterable, remoteMethod, remoteActive } = this
        let modifiedOptions = options
        if (filterable && !isEmpty(val)) {
          if (!isEmpty(remoteMethod)) {
            this.remoteActive = true
            modifiedOptions = (await remoteMethod(val, options)) || options
            this.filteredOptions = modifiedOptions
          } else {
            modifiedOptions = options.filter((option) =>
              option.label.toLowerCase().includes(val.toLowerCase())
            )
            this.filteredOptions = modifiedOptions
          }

          if (this.singleSelect) {
            this.filteredOptions = options
            this.singleSelect = false
          }
        } else {
          // when  empty options is returned from server and user clears the text, we need to set remoteActive to false to fetch all options again
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
      if (!isEmpty(inputWidth)) dropdownWidth = `${inputWidth}px`
      return `width:${dropdownWidth};padding:0px;`
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
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
        this.singleSelect = true
      }
      setTimeout(() => {
        let inputElement = this.$refs['f-select-input']
        if (inputElement) inputElement.setElementPadding()
      })
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
        option = options.find((option) => option.value === value) || {}
      }
      let { label } = option
      return label
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
      if (!isEmpty(prefix)) {
        return prefix
      } else {
        if (multiple && !isEmpty(modelValue)) {
          return this.getSelectedValues()
        }
      }
    },
    getSelectedValues() {
      let { modelValue } = this

      const ChipContainer = styled('div')`
        display: flex;
        gap: 4px;
      `
      if (modelValue.length <= 1) {
        return (
          <ChipContainer>
            {modelValue.map((val, index) => (
              <FTags
                text={this.getLabel(val)}
                appearance="action"
                actionType="removable"
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
              text={this.getLabel(firstValue)}
              appearance="action"
              actionType="removable"
              vOn:close={() => this.removeChip(0)}
            />
            <FTags text={`+${modelValue.length - 1}`} />
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
          {loading ? loadingText : emptyText}
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
  },
  render() {
    let { multiple: isMultiSelect } = this
    return (
      <FContainer height="100%" display="flex" flexDirection="column">
        <FInput
          ref="f-select-input"
          readOnly={this.isReadOnly}
          clearable={this.clearable}
          clearValue={this.clearValue}
          placeholder={this.getPlaceholder}
          disabled={this.disabled}
          v-model={this.inputText}
          appearance={this.appearance}
          size="large"
          vOn:slotClicked={this.handleSlotClick}
          vOn:blur={this.handleInputBlur}
          vOn:focus={this.handleInputFocus}
          style={{ width: '100%' }}
        >
          <template slot="prefix">{this.getPrefixComponent()}</template>

          <template slot="clickable">{this.getClickableSlot()}</template>
        </FInput>

        <FContainer height="100%" overflow="scroll" flexGrow="1">
          <Menu
            v-model:selectedKeys={this.menuValue}
            style={this.getMenuStyles()}
            multiple
            selectable
          >
            {this.filteredOptions.map((option) => {
              return (
                <FMenuItem
                  isMultiSelect={isMultiSelect}
                  value={`${option.value}`}
                  vOn:click={() => this.selectOption(option)}
                  isSelected={this.isSelected(option)}
                  key={`${option.value}`}
                >
                  {option.label}
                </FMenuItem>
              )
            })}
            {this.canShowCustomOption && (
              <FMenuItem value="custom" vOn:click={() => this.emitAddOption()}>
                <FText>{this.customOptionLabel}</FText>
                <FText color="neutralFont60"> (Click to add option)</FText>
              </FMenuItem>
            )}
          </Menu>
        </FContainer>
      </FContainer>
    )
  },
}
</script>

<style scoped>
.ant-menu-vertical {
  border: none !important;
}
</style>
