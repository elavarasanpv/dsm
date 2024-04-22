<script>
import {
  FAccordion,
  FAccordionItem,
  FInput,
  FPopover,
  FText,
  FMenuItem,
  FContainer,
} from '../../index'
import { Menu } from 'ant-design-vue'
import 'ant-design-vue/lib/menu/style/index.css'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import uniqBy from 'lodash/uniqBy'
import dlv from 'dlv'
fcIcon(window)
const TOLGEE_CONFIG = Symbol.for('@facilio/tolgee')
let $t
if (window[TOLGEE_CONFIG]) {
  $t = window[TOLGEE_CONFIG].t
} else {
  $t = (_, defaultValue) => defaultValue
}
export default {
  name: 'FCascader',
  mixins: [ThemeMixin],
  props: {
    disabled: {
      type: Boolean,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: undefined,
      default: '',
    },
    hideChevron: {
      type: Boolean,
      default: false,
    },
    optionIconProps: {
      type: Object,
      default: () => ({
        iconGroup: 'files',
        iconName: 'files',
      }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: 'Loading...',
    },
  },
  data() {
    return {
      emptyText: $t('no_data', 'No Data'),
      inputText: '',
      isDropdownVisible: false,
      group: null,
      showAllOptions: false,
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('change', value)
      },
    },
    selectedOption() {
      let { group, modelValue, options } = this
      let groupValue = group
      if (isEmpty(group) && !isEmpty(modelValue)) {
        let selectedGroup = options.find((option) => {
          let { children } = option
          let ifValueExists = children.some(
            (option) => option.value === modelValue
          )
          return ifValueExists
        })
        groupValue = selectedGroup
      }
      let { value = '' } = groupValue || {}

      let selectedGroup = (options || []).find(
        (optionGroup) => optionGroup.value === value
      )
      let { children } = selectedGroup || []

      let selectedOption = (children || []).find(
        (option) => option.value === modelValue
      )
      return selectedOption || ''
    },
    selectedOptionLabel() {
      let { selectedOption } = this || {}
      let { label } = selectedOption || {}

      return label || ''
    },
    menuValue() {
      // ant vue expects menu v model to be an array

      return [this.modelValue]
    },
    showOptions() {
      let { filteredOptions, loading } = this || {}
      return !isEmpty(filteredOptions) && !loading
    },
    filteredOptions() {
      let { inputText, options } = this
      if (isEmpty(inputText)) return options
      if (this.showAllOptions) return options
      let text = inputText.toLowerCase()
      let filteredOptions = options.filter((obj) =>
        obj.label.toLowerCase().includes(text)
      )
      let filteredChildren = options
        .map((option) => {
          let { children } = option
          let childrenOptions = children.filter((obj) =>
            obj.label.toLowerCase().includes(text)
          )
          return { ...option, children: childrenOptions, showPanel: true }
        })
        .filter((option) => !isEmpty(option.children))

      return uniqBy([...filteredOptions, ...filteredChildren], 'label')
    },
  },
  watch: {
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
    isDropdownVisible(val) {
      if (val) {
        let { modelValue, options } = this
        this.showAllOptions = true
        if (!isEmpty(modelValue)) {
          let selectedGroup = options.find((option) => {
            let { children } = option
            let ifValueExists = children.some(
              (option) => option.value === modelValue
            )
            return ifValueExists
          })
          this.$nextTick(() => {
            if (selectedGroup?.value)
              this.$refs[selectedGroup?.value]?.$el?.scrollIntoView()
          })
        }
      }
    },
    inputText(val) {
      if (!isEmpty(val)) this.showAllOptions = false
    },
  },
  mounted() {
    this.inputText = this.selectedOptionLabel
  },
  methods: {
    scrollGroupIntoView(ref) {
      if (this.$refs[ref]) this.$refs[ref].$el.scrollIntoView()
    },
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    handleInputBlur() {
      this.$emit('blur')
    },
    getSuffixComponent() {
      let { $slots, hideChevron } = this
      let { suffix } = $slots
      if (!isEmpty(suffix)) {
        return suffix
      } else if (!hideChevron) {
        return (
          <div vOn:click={(e) => this.toggleDropDown(e)}>
            <fc-icon
              name={this.isDropdownVisible ? 'chevron-up' : 'chevron-down'}
              group="dsm"
              size="16"
              color="#71818e"
            ></fc-icon>
          </div>
        )
      }
      return
    },
    setOption(parent, option) {
      this.group = parent
      let { value } = option
      this.modelValue = value
      this.isDropdownVisible = false
    },
    isSelected(option) {
      let { modelValue } = this || {}
      let { value } = option || {}

      return value === modelValue
    },
    clearValue() {
      this.group = ''
      this.modelValue = ''
    },
    toggleDropDown(e) {
      e.cancelBubble = true
      let { isDropdownVisible } = this
      if (this.$refs['f-cascader-input'] && !isDropdownVisible) {
        this.$refs['f-cascader-input'].$refs['f-input-field'].focus()
      }
      this.isDropdownVisible = !isDropdownVisible
    },
    getMenuStyles() {
      let dropdownWidth = '100%'
      let { $refs } = this || {}
      let inputWidth = dlv($refs['f-select-input'], '$el.clientWidth')
      if (!isEmpty(inputWidth)) dropdownWidth = `${inputWidth}px`
      return `width:${dropdownWidth};padding:0px;max-height:200px;overflow:scroll`
    },
    panelState(option) {
      let { modelValue } = this
      let { showPanel, children } = option
      if (showPanel) return true
      let isSelectedChild = children.some(
        (option) => option.value == modelValue
      )
      return isSelectedChild
    },
    noDataContainer() {
      let { loading, loadingText, emptyText } = this || {}

      return (
        <FContainer
          backgroundColor="backgroundContainer"
          boxShadow="lightLow01"
          zIndex="99"
          padding="containerXLarge"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <FText color="textCaption">{loading ? loadingText : emptyText}</FText>
        </FContainer>
      )
    },
  },
  render() {
    return (
      <FPopover
        disabled={this.disabled}
        trigger="clickToOpen"
        containerWidth={true}
        v-model={this.isDropdownVisible}
      >
        <FInput
          ref="f-cascader-input"
          readOnly={false}
          placeholder="Select"
          disabled={this.disabled}
          v-model={this.inputText}
          clearValue={this.clearValue}
          clearable={true}
          vOn:blur={this.handleInputBlur}
          style={{ width: '100%' }}
        >
          <template slot="suffix">{this.getSuffixComponent()}</template>
        </FInput>
        {this.showOptions ? (
          <Menu
            v-model:selectedKeys={this.menuValue}
            slot="content"
            style={this.getMenuStyles()}
            selectable={true}
            id="dsm-facilio-dropdown"
            class="dsm-scroll-box"
          >
            <FAccordion>
              {this.filteredOptions.map((option, index) => {
                return (
                  <FContainer
                    vOn:click={() => this.scrollGroupIntoView(option.value)}
                  >
                    <FAccordionItem
                      style={{ marginBottom: '0px' }}
                      ref={option.value}
                      key={option.value}
                      showPanel={index == 0 || this.panelState(option)}
                      showSuffix={true}
                      {...{
                        scopedSlots: {
                          header: () => {
                            return (
                              <FText
                                appearance="headingMed14"
                                style={{ cursor: 'pointer' }}
                              >
                                {option.label}
                              </FText>
                            )
                          },
                          prefix: () => {
                            return (
                              <fc-icon
                                group="files"
                                name="folder"
                                size="16"
                              ></fc-icon>
                            )
                          },
                          suffix: ({ open }) => {
                            return (
                              <fc-icon
                                group="navigation"
                                name={open ? 'accordion-up' : 'accordion-right'}
                                size="16"
                              ></fc-icon>
                            )
                          },
                        },
                      }}
                    >
                      <template slot="panel">
                        <FContainer
                          display="flex"
                          flexDirection="column"
                          width="100%"
                          padding="containerLarge containerXLarge"
                        >
                          {option.children.map((childOption) => {
                            return (
                              <FMenuItem
                                value={`${childOption.value}`}
                                ref={`option-${childOption.value}`}
                                vOn:click={() =>
                                  this.setOption(option, childOption)
                                }
                                isSelected={this.isSelected(childOption)}
                                key={`${childOption.value}`}
                                style={{
                                  height: '40px',
                                }}
                              >
                                <fc-icon
                                  group={this.optionIconProps.iconGroup}
                                  name={this.optionIconProps.iconName}
                                  size="16"
                                  style="margin-right:4px;"
                                ></fc-icon>{' '}
                                {childOption.label}
                              </FMenuItem>
                            )
                          })}
                        </FContainer>
                      </template>
                    </FAccordionItem>
                  </FContainer>
                )
              })}
            </FAccordion>
          </Menu>
        ) : (
          <template slot="content">{this.noDataContainer()}</template>
        )}
      </FPopover>
    )
  },
}
</script>

<style>
.popper {
  text-align: left;
}
.ant-menu-vertical {
  border-right: none !important;
}
</style>
