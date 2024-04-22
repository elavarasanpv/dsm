<script>
import { isEmpty } from '../../utils/validation'
import { FMenuItem, FContainer } from '../../index'
import isEqual from 'lodash/isEqual'
import { cloneDeep } from 'lodash'

export default {
  name: 'FMenu',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    isMultiSelect: {
      type: Boolean,
      default: false,
    },
    value: {
      type: undefined,
    },
    filters: {
      type: String,
      default: '',
    },
  },
  computed: {
    isMultiLevel() {
      let { options } = this || {}
      return options.some((option) => !isEmpty(option.children))
    },
    optionsList() {
      let { options, filters } = this || {}
      let modifiedOptions = cloneDeep(options)
      if (!isEmpty(filters)) {
        modifiedOptions = (modifiedOptions || []).filter((option) => {
          let { label } = option || {}
          label = label.toLowerCase()
          filters = filters.toLowerCase()
          return label.includes(filters)
        })
      }
      return this.iterateNestedArray(modifiedOptions)
    },
  },
  methods: {
    isSelected(option) {
      let { isMultiSelect, value, isMultiLevel } = this || {}
      if (!isEmpty(value)) {
        if (isMultiSelect) {
          return (value || []).includes(option.value)
        } else {
          if (isMultiLevel) {
            return (value || []).includes(option.value)
          } else {
            return value === option.value
          }
        }
      } else {
        return false
      }
    },
    isMultiLevelSelected(option) {
      let { isMultiSelect, value } = this || {}
      let currValue = option.path
      if (isMultiSelect) {
        return (value || []).some((val) => {
          return isEqual(currValue, val)
        })
      } else {
        return isEqual(currValue, value)
      }
    },
    selectOption(option) {
      let { isMultiSelect, value } = this || {}
      if (isMultiSelect) {
        if (!Array.isArray(value)) value = []
        value = this.selectArrayValue(option)
      } else {
        value = option.value
      }

      this.$emit('input', value)
    },
    selectMultiOption(option) {
      let { isMultiSelect, value } = this || {}
      let currValue = option.path
      if (isMultiSelect) {
        const isPresent = (value || []).some((val) => isEqual(val, currValue))

        if (isPresent) {
          value = (value || []).filter((val) => !isEqual(val, currValue))
        } else {
          value = [...value, currValue]
        }

        this.$emit('input', value)
      } else {
        if (isEqual(currValue, value)) this.$emit('input', [])
        else this.$emit('input', currValue)
      }
    },
    selectArrayValue(option) {
      let { value } = this || {}

      const isPresent = (value || []).includes(option.value)
      if (isPresent)
        value = (value || []).filter((currVal) => currVal != option.value)
      else value = [...value, option.value]

      return value
    },
    iterateNestedArray(nestedArray) {
      function iterateAndAddKey(arr, path = []) {
        arr.forEach((obj) => {
          // Create a copy of the current path and add the current index
          const newPath = [...path, obj.value]

          // Add the path array to the current object
          obj.path = newPath

          // If the object has children, recursively call the function
          if (obj.children) {
            iterateAndAddKey(obj.children, newPath)
          }
        })
      }

      iterateAndAddKey(nestedArray)

      return nestedArray
    },
  },
  render() {
    let { optionsList, isMultiSelect, isMultiLevel } = this || {}
    return (
      <div>
        {optionsList.map((option) => {
          let { children } = option || {}
          return isMultiLevel ? (
            <div>
              <FMenuItem
                isMultiSelect={isMultiSelect}
                key={option.value}
                isSelected={this.isMultiLevelSelected(option)}
                vOn:click={() => this.selectMultiOption(option)}
                childrenAvailable={!isEmpty(option.children)}
              >
                {option.label}
              </FMenuItem>
              {this.isMultiLevelSelected(option) &&
                !isEmpty(option.children) && (
                  <FContainer marginLeft="containerLarge">
                    {children.map((child) => {
                      return (
                        <FMenuItem
                          isMultiSelect={isMultiSelect}
                          key={child.value}
                          isSelected={this.isMultiLevelSelected(child)}
                          vOn:click={() => this.selectMultiOption(child)}
                        >
                          {child.label}
                        </FMenuItem>
                      )
                    })}
                  </FContainer>
                )}
            </div>
          ) : (
            <FMenuItem
              isMultiSelect={isMultiSelect}
              key={option.value}
              isSelected={this.isSelected(option)}
              vOn:click={() => this.selectOption(option)}
            >
              {option.label}
            </FMenuItem>
          )
        })}
      </div>
    )
  },
}
</script>
