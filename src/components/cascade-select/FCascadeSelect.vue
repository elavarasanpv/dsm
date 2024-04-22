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
import getProperty from 'dlv'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
import { isEqual } from 'lodash'

export default {
  name: 'FCascadeSelect',
  components: {
    FInput,
    FMenuItem,
    FPopover,
    FSpinner,
    FText,
    FTags,
    FContainer,
  },
  mixins: [ThemeMixin],
  props: {
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
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: 'Loading options ...',
    },
    emptyText: {
      type: String,
      default: 'No Options',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    remoteMethod: {
      type: Function,
      default: undefined,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    filterable: {
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
    fieldNames: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
        children: 'children',
      }),
    },
  },
  data: () => ({
    isDropdownVisible: false,
    inputText: '',
    multiple: false,
    columns: [],
    filterColumns: [],
    filtering: false,
    selectedOptions: [],
    addOptionLoading: false,
    remoteActive: false,
  }),
  computed: {
    menuValue() {
      return [this.modelValue]
    },
    modelValue: {
      get() {
        return this.value || []
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('change', value)
      },
    },
    showCascader() {
      let { columns, loading, filtering, filterColumns } = this || {}

      return (
        (filtering && !isEmpty(filterColumns)) ||
        (!filtering && !isEmpty(columns) && !loading)
      )
    },
    emptyDataContainer() {
      let { loading, loadingText, emptyText } = this || {}
      let NoOptionContainer = styled('div')`
        ${this.getCustomStyle({ property: 'emptyDataContainer' })}
      `
      return (
        <NoOptionContainer>
          <FText color="textCaption">{loading ? loadingText : emptyText}</FText>
        </NoOptionContainer>
      )
    },
  },
  watch: {
    selectedOptions: {
      handler(options) {
        this.inputText = !isEmpty(options) ? options.join(' / ') : ''
      },
      deep: true,
      immediate: true,
    },
    modelValue: {
      handler(newVal) {
        if (isEmpty(newVal)) this.inputText = ''
      },
      deep: true,
    },
    isDropdownVisible(val) {
      if (val) {
        let { modelValue, $refs } = this

        if (!isEmpty(modelValue)) {
          this.$nextTick(() => {
            modelValue.forEach((item, index) => {
              let { $el } = $refs[`f-menu-item-${item}-${index}`] || {}

              $el?.scrollIntoView()
            })
          })
        }
      }
    },
  },
  created() {
    this.initOptions()
    this.prefillSelectedOptions()
  },
  methods: {
    initOptions() {
      let { options } = this
      options = this.modifyOptions(options)
      this.columns = !isEmpty(options) ? [options] : []
    },
    modifyOptions(options) {
      let modifiedOptions = []
      if (!isEmpty(options)) {
        let { fieldNames } = this
        let displayLabel = getProperty(fieldNames, 'label', '')
        let displayValue = getProperty(fieldNames, 'value', '')
        modifiedOptions = (options || []).map((option) => {
          let { [`${displayLabel}`]: label, [`${displayValue}`]: value } =
            option || {}
          return { ...option, label, value }
        })
      }
      return modifiedOptions
    },
    getMenuStyles() {
      return `width:250px;padding:var(--spacing-containerMedium);max-height:190px;overflow:scroll`
    },
    getSuffixComponent() {
      let { $slots, hideChevron } = this
      let { suffix } = $slots
      if (!isEmpty(suffix)) {
        return suffix
      } else if (!hideChevron) {
        return (
          <FContainer display="flex" alignItems="center">
            {this.addOptionLoading ? (
              <FSpinner size={15} />
            ) : (
              <FIcon
                name={this.isDropdownVisible ? 'chevron-up' : 'chevron-down'}
                group="dsm"
                size="18"
                color="textMain"
                pressable={false}
                vOn:click={(e) => this.toggleDropDown(e)}
              ></FIcon>
            )}
          </FContainer>
        )
      }
      return
    },
    selectOption(option, columnIndex) {
      if (!this.hasSelectedOptions(option, columnIndex)) {
        let { columns, remoteActive } = this
        if (remoteActive) {
          this.remoteMethod('')
          this.remoteActive = false
        }
        if (columnIndex === 0) {
          this.selectedOptions = []
          this.modelValue = []
        }

        let { value, children, label } = option || {}
        let updatedSelectedOptions = []
        let updatedModelValue = []
        let { selectedOptions = [] } = this
        let selectedOptionsLength = selectedOptions.length

        if (columnIndex < selectedOptionsLength) {
          this.selectedOptions.splice(
            columnIndex + 1,
            selectedOptionsLength - (columnIndex + 1)
          )
        }
        if (columnIndex < this.modelValue.length) {
          this.modelValue.splice(
            columnIndex + 1,
            this.modelValue.length - (columnIndex + 1)
          )
        }
        if (columnIndex > 0) {
          updatedSelectedOptions = [...this.selectedOptions]
          updatedModelValue = [...this.modelValue]
        }
        updatedSelectedOptions[columnIndex] = label
        updatedModelValue[columnIndex] = value
        this.$set(this, 'selectedOptions', updatedSelectedOptions)
        this.$set(this, 'modelValue', updatedModelValue)

        // Adding children in seperate column for cascading
        let columnLength = columns.length
        selectedOptions = this.selectedOptions
        selectedOptionsLength = selectedOptions.length

        if (columnLength > selectedOptionsLength) {
          this.columns.splice(columnIndex + 1, columnLength - (columnIndex + 1))
          columnLength = this.columns.length
        }
        if (!isEmpty(children)) {
          let lastColumn = columns[columnLength - 1] || {}
          children = this.modifyOptions(children)

          if (!isEqual(lastColumn, children)) {
            columns[columnIndex + 1] = children
            this.$set(this, 'columns', columns)
          }
        } else {
          this.isDropdownVisible = false
        }
      }
    },
    filterOptionSelected(option) {
      this.filtering = false
      if (!this.isSelected(option)) {
        let { remoteActive } = this
        let { value = [], children, keyVsNames } = option || {}
        let updatedSelectedOptions = []

        if (remoteActive) {
          this.remoteMethod('')
          this.remoteActive = false
        }

        value.forEach((val, index) => {
          updatedSelectedOptions[index] = keyVsNames[val]
          if (index > 0) {
            this.columns[index] = this.modifyOptions(children[index - 1])
          }
          this.selectedOptions = updatedSelectedOptions
        })

        this.modelValue = value
        this.isDropdownVisible = false
      }
    },
    isSelected(option) {
      let { modelValue } = this || {}
      let { value } = option || {}

      return (modelValue || []).some((val) => val === value)
    },
    hasSelectedOptions(option, index) {
      let { modelValue } = this || {}
      let { value } = option || {}

      return modelValue?.[index] === value
    },
    clearValue() {
      this.initOptions()
      this.remoteActive = false
      this.modelValue = []
      this.selectedOptions = []
      this.inputText = ''
    },
    async filterOptions() {
      this.filtering = true
      let { filterable, isDropdownVisible, options, inputText, remoteMethod } =
        this
      if (filterable && isDropdownVisible && !isEmpty(inputText)) {
        if (!isEmpty(remoteMethod)) {
          this.remoteActive = true
          let modifiedColumns =
            (await remoteMethod(inputText, options)) || options
          modifiedColumns = this.modifyOptions(modifiedColumns || [])
          this.columns = !isEmpty(modifiedColumns) ? [modifiedColumns] : []
        } else {
          let modifiedColumns = [this.modifyOptions(options)]
          let data = this.cascaderFilter(modifiedColumns[0], inputText)
          let filteringData = this.generatePaths(data)

          this.filterColumns = filteringData.length > 0 ? filteringData : []
        }
      } else {
        this.filtering = false
        this.clearValue()
      }
    },
    cascaderFilter(optionList = [], inputText = '') {
      let { fieldNames } = this
      let displayLabel = getProperty(fieldNames, 'label', 'label')
      let displayChildren = getProperty(fieldNames, 'children', 'children')

      return optionList.flatMap((option) => {
        let { [`${displayLabel}`]: label } = option || {}

        if ((label || '').toLowerCase().includes(inputText.toLowerCase())) {
          return option
        }

        let { [displayChildren]: children = [] } = option || {}
        if (isEmpty(children)) return []
        let childrenData = this.cascaderFilter(children, inputText)

        return !isEmpty(childrenData)
          ? { ...option, children: childrenData }
          : []
      })
    },
    prefillSelectedOptions() {
      let { modelValue, columns } = this
      if (!isEmpty(modelValue)) {
        let path = this.findPathForValueArray(modelValue, columns)
        if (path) {
          this.selectedOptions = this.buildColumnsFromPath(path, columns)
        }
      }
    },
    generatePaths(tree, currentPath = []) {
      const paths = []

      for (const node of tree) {
        let displayLabel = getProperty(this.fieldNames, 'label', 'label')
        let displayValue = getProperty(this.fieldNames, 'value', 'value')
        let displayChildren = getProperty(
          this.fieldNames,
          'children',
          'children'
        )
        const newPath = [...currentPath, { ...node }]
        let hasChildren = getProperty(node, displayChildren, [])

        if (!isEmpty(hasChildren)) {
          const childPaths = this.generatePaths(hasChildren, newPath)
          paths.push(...childPaths)
        } else {
          let labels = []
          let values = []
          let keyVsNames = {}
          let children = []

          newPath.forEach((item) => {
            let label = getProperty(item, displayLabel, '')
            let value = getProperty(item, displayValue, [])
            let childrenData = getProperty(item, displayChildren, [])

            keyVsNames = {
              ...keyVsNames,
              [value]: label,
            }
            values = [...values, value]
            labels = [...labels, label]
            children = [...children, childrenData]
          })

          paths.push({
            label: labels.join('/'),
            value: values,
            children,
            keyVsNames,
          })
        }
      }

      return paths
    },

    findPathForValueArray(valueArray, columns) {
      let path = []
      let currentOptions = columns

      for (let value of valueArray) {
        let optionFound = false
        for (let optionGroup of currentOptions) {
          if (Array.isArray(optionGroup)) {
            let option = optionGroup.find((opt) => opt.value === value)
            if (option) {
              path.push(value)
              let children = this.modifyOptions(option.children) || []
              currentOptions = children
              optionFound = true
              break
            }
          } else if (typeof optionGroup === 'object' && optionGroup !== null) {
            if (optionGroup.value === value) {
              path.push(value)
              let children = this.modifyOptions(optionGroup.children) || []
              currentOptions = children
              optionFound = true
              break
            }
          }
        }
        if (!optionFound) {
          break
        }
      }

      return path.length === valueArray.length ? path : null
    },

    buildColumnsFromPath(path, columns) {
      let selectedLabels = []
      let currentOptions = columns

      for (let value of path) {
        let optionFound = false
        for (let optionGroup of currentOptions) {
          if (Array.isArray(optionGroup)) {
            let option = optionGroup.find((opt) => opt.value === value)
            if (option) {
              let children = this.modifyOptions(option.children) || []
              currentOptions = children
              if (!isEmpty(children)) {
                this.columns.push(children)
              }
              selectedLabels.push(option.label)
              optionFound = true
              break
            }
          } else if (typeof optionGroup === 'object' && optionGroup !== null) {
            if (optionGroup.value === value) {
              selectedLabels.push(optionGroup.label)
              currentOptions = optionGroup || []
              optionFound = true
              break
            }
          }
        }
        if (!optionFound) {
          break
        }
      }

      return selectedLabels
    },
    toggleDropDown(e) {
      e.cancelBubble = true
      let { isDropdownVisible } = this
      this.isDropdownVisible = !isDropdownVisible
    },
  },
  render() {
    return (
      <FPopover
        trigger="clickToOpen"
        placement="bottom-start"
        v-model={this.isDropdownVisible}
        vOn:show={() => {
          this.isDropdownVisible = true
        }}
        vOn:hide={() => {
          this.isDropdownVisible = false
        }}
      >
        <FInput
          ref="f-select-input"
          readOnly={this.readOnly}
          clearable={this.clearable}
          clearValue={this.clearValue}
          placeholder={this.placeholder}
          disabled={this.disabled}
          v-model={this.inputText}
          size={this.size}
          containerWidth={true}
          vOn:enterPress={
            !isEmpty(this.remoteMethod) ? this.filterOptions : () => {}
          }
          vOn:input={isEmpty(this.remoteMethod) ? this.filterOptions : null}
        >
          <template slot="suffix">{this.getSuffixComponent()}</template>
        </FInput>
        {this.showCascader ? (
          <FContainer
            slot="content"
            display="flex"
            class="cascader-input-options"
          >
            {!this.filtering &&
              this.columns.map((column, columnIndex) => {
                {
                  return (
                    <Menu
                      ref={`f-menu-${columnIndex}`}
                      v-model:selectedKeys={this.menuValue}
                      style={this.getMenuStyles()}
                      selectable
                    >
                      {column.map((option) => {
                        return (
                          <FMenuItem
                            value={`${option.value}`}
                            vOn:click={() =>
                              this.selectOption(option, columnIndex)
                            }
                            ref={`f-menu-item-${option.value}-${columnIndex}`}
                            isSelected={this.hasSelectedOptions(
                              option,
                              columnIndex
                            )}
                            childrenAvailable={option.children ? true : false}
                            iconGroup={option.iconGroup}
                            iconName={option.iconName}
                            iconPosition={option.iconPosition}
                            key={`${option.value}`}
                          >
                            {option.label}
                          </FMenuItem>
                        )
                      })}
                    </Menu>
                  )
                }
              })}
            {this.filtering ? (
              <Menu
                v-model:selectedKeys={this.menuValue}
                style={this.getMenuStyles()}
                selectable
              >
                {(this.filterColumns || []).map((option) => {
                  return (
                    <FMenuItem
                      value={`${option.value}`}
                      vOn:click={() => this.filterOptionSelected(option)}
                      iconGroup={option.iconGroup}
                      iconName={option.iconName}
                      iconPosition={option.iconPosition}
                      key={`${option.value}`}
                    >
                      {option.label}
                    </FMenuItem>
                  )
                })}
              </Menu>
            ) : null}
          </FContainer>
        ) : (
          <template slot="content">{this.emptyDataContainer}</template>
        )}
      </FPopover>
    )
  },
}
</script>
<style lang="scss">
.cascader-input-options {
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 1px solid #e8e8e8;
  }
}
</style>
