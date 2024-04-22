<script>
import { FContainer, FText } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

import dlv from 'dlv'
export default {
  name: 'FPicker',
  mixins: [ThemeMixin],
  props: {
    columnList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    columnList: {
      handler(newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          let { modelValue } = this || {}
          this.modelValue = modelValue.map((value, index) => {
            let currentOptionObj = newVal[index]
            let { options } = currentOptionObj || {}
            if (
              (options || []).some(
                (option) => option.value === value && option.disabled
              )
            ) {
              value = undefined
            }
            return value
          })
        }
      },
      deep: true,
    },
  },
  created() {
    let { value, columnList } = this || []
    if (!isEmpty(value)) {
      if (value.length < columnList.length) {
        let newArr = []
        columnList.forEach((element, index) => {
          if (isEmpty(value[index])) {
            newArr.push(undefined)
          } else {
            newArr.push(value[index])
          }
        })
        this.modelValue = newArr
      } else {
        this.modelValue = value
      }
    }
  },
  mounted() {
    this.setInitialPosition()
    this.getWidth()
    this.columnList.forEach((column, index0) => {
      const parentDiv = this.getParentElement(index0)
      const innerDivs = this.getChildElement(index0)
      parentDiv.addEventListener('scroll', () => {
        this.isScrolling = true
        setTimeout(() => {
          this.isScrolling = false
        }, 0)
        const parentScrollTop = parentDiv.scrollTop
        const parentHeight = parentDiv.clientHeight

        innerDivs.forEach((innerDiv, index) => {
          const divTop = innerDiv.offsetTop
          const divHeight = innerDiv.clientHeight
          const isCentered =
            divTop + divHeight <= parentScrollTop + parentHeight / 2

          if (isCentered) {
            innerDiv.classList.add('centered')
            let column = this.columnList[index0]
            let selectedCol = column.options
            let value = dlv(selectedCol, [index, 'value'])
            let { disabled } = column || {}
            let { disabled: cellDisabled } = selectedCol[index] || {}
            let disabledCell = disabled || cellDisabled
            if (!disabledCell) {
              this.onCellClick(value, index0)
            }
          } else {
            innerDiv.classList.remove('centered')
          }
        })
      })
    })
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    setInitialValue() {
      let { value, columnList } = this || []
      if (!isEmpty(value)) {
        if (value.length < columnList.length) {
          let newArr = []
          columnList.forEach((element, index) => {
            if (isEmpty(value[index])) {
              newArr.push(undefined)
            } else {
              newArr.push(value[index])
            }
          })
          this.currentSelected = newArr
        } else {
          this.currentSelected = value
        }
      }
    },
    getParentElement(index) {
      let { $refs } = this
      let component = $refs[`column-${index}`]
      let { $el: element } = component || {}
      return element
    },
    getChildElement(index) {
      let { $refs } = this
      let childArr = []
      let component = $refs[`column-${index}`]
      let { $children: element } = component || {}
      element.forEach((ele) => {
        childArr.push(ele.$el)
      })
      return childArr
    },
    getWidth() {
      let { columnList } = this || []
      columnList.forEach((column, index0) => {
        const childDivs = this.getChildElement(index0)

        let maxWidth = 0
        let widestChild = null

        childDivs.forEach((childDiv) => {
          const width = childDiv.clientWidth

          if (width > maxWidth) {
            maxWidth = width
            widestChild = childDiv
          }
        })
        if (widestChild && !isEmpty(childDivs)) {
          childDivs.forEach((childDiv) => {
            childDiv.style.width = `${maxWidth + 10}px`
          })
        }
      })
    },
    setInitialPosition() {
      let { modelValue, columnList } = this
      if (!isEmpty(modelValue)) {
        columnList.forEach((col, index) => {
          col.options.forEach((ele, ind) => {
            let record = modelValue[index]
            if (ele.value === record) {
              const parentDiv = this.getParentElement(index)
              this.scrollElement(parentDiv, ind, 32)
            }
          })
        })
      }
    },
    scrollElement(dom, index, height) {
      dom.scrollTo({
        top: (index + 1) * height - height,
        behavior: 'smooth',
      })
      if (index === 0) {
        dom.scrollTo({
          top: 1,
          behavior: 'smooth',
        })
      }
    },
    columRows(column, index0, title, disabled) {
      const Column = styled(FContainer)`
        ${this.getStyle('column')}
      `
      const Border = styled(FContainer)`
        ${this.getStyle('border')}
      `
      const Text = styled(FText)`
        height: 28px;
      `
      return (
        <FContainer
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="relative"
        >
          <Text appearance="headingMed14" color="textCaption">
            {title}
          </Text>
          <Border top="49.3%" />
          <Border top="62.4%" />
          <Column
            width="100%"
            height="224px"
            id={`parentDiv${index0}`}
            ref={`column-${index0}`}
          >
            <FContainer height="calc(50% - 15px)" flexShrink="0" />
            {column.map((item, index) => {
              return this.rows(item, index0, index, disabled)
            })}
            <FContainer height="calc(50% - 15px)" flexShrink="0" />
          </Column>
        </FContainer>
      )
    },
    rows(column, index, ind, colDisable) {
      let { modelValue } = this || {}
      let { label, value, disabled } = column || {}
      let isSelected = modelValue[index] == value
      let isDisabled = colDisable || disabled
      const Cell = styled(FContainer)`
        ${this.getStyle('cell')}
      `
      const Text = styled(FText)`
        ${this.getStyle('text')}
        height: 32px;
      `
      return (
        <Cell
          cursor={isDisabled && 'not-allowed'}
          class={`innerDiv${index}`}
          ref={`cell-${index}`}
          hover-backgroundColor={
            isDisabled ? 'backgroundCanvas' : 'backgroundMidgroundMedium'
          }
          backgroundColor={isSelected ? 'backgroundAccentBlueSubtle' : ''}
          vOn:click={() => {
            if (!isDisabled) {
              this.onCellClick(value, index, ind)
            }
          }}
        >
          <Text
            appearance="bodyReg14"
            color="textMain"
            opacity={isDisabled ? '0.4' : '1'}
          >
            {label}
          </Text>
        </Cell>
      )
    },
    onCellClick(value, index, ind) {
      let { columnList, modelValue } = this || []
      let selectedRecord
      if (isEmpty(modelValue)) {
        let lastIndex = columnList.length
        selectedRecord = new Array(lastIndex).fill(undefined)
        selectedRecord[index] = value
      } else {
        selectedRecord = cloneDeep(modelValue)
        selectedRecord[index] = value
      }
      this.modelValue = selectedRecord
      this.$emit('change', selectedRecord)
      if (ind !== undefined) {
        const parentDiv = this.getParentElement(index)
        this.scrollElement(parentDiv, ind, 32)
      }
    },
  },
  render() {
    let { styleProps } = this
    const Container = styled(FContainer)`
      ${styleProps}
    `
    return (
      <Container>
        {this.columnList.map((column, index0) => {
          let { disabled, title = '', options } = column || {}
          return this.columRows(options, index0, title, disabled)
        })}
      </Container>
    )
  },
}
</script>
<style>
.centered {
  opacity: 1 !important;
}

::-webkit-scrollbar {
  display: none;
}
</style>
