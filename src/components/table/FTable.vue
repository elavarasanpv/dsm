<script>
import {
  FText,
  FCheckbox,
  FRadio,
  FTableCell,
  FContainer,
  FBulkToolbar,
  FTooltip,
  FIcon,
} from '../../index'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import { isFunction, cloneDeep } from 'lodash'
import dlv from 'dlv'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
export default {
  name: 'FTable',
  components: {
    FText,
  },
  mixins: [ThemeMixin],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    selectType: {
      type: String,
      default: '',
      validator: (val) => {
        return ['bulk', 'single', ''].includes(val)
      },
    },
    headerContentAlignTop: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    hideBorder: {
      type: Boolean,
      default: false,
    },
    showSelectBar: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    selectedList: {
      type: Array,
      default: () => [],
    },
    actionColumnWidth: {
      type: String,
      default: '',
    },
    accordionType: {
      type: String,
      default: '',
      validator: (val) => {
        return ['prefix', 'suffix', ''].includes(val)
      },
    },
    tableType: {
      type: String,
      default: 'default',
      validator: (val) => {
        return ['compact', 'default'].includes(val)
      },
    },
  },
  data() {
    return {
      headers: [],
      rows: [],
      checkBoxOptions: [],
      indeterminate: false,
      selecteAll: false,
      actualWidth: 0,
      distance: 0,
      resizeColIndex: undefined,
      selectedRecord: [],
      changesColumnWidth: 0,
      initialTableWidth: 0,
      tableheight: 0,
      headerHeight: 0,
      tableWidth: 0,
      isActionPresent: false,
      isColumnResizeOn: false,
      selectedRows: [],
      verticalScroll: false,
      horizontalScroll: false,
      accordionPositon: '',
      actionBarWidth: 0,
      rightColFixed: false,
      previousZIndex: 0,
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: true,
      },
    }
  },
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      if (direction === 'rtl') {
        document.documentElement.style.setProperty(
          '--shadow',
          '25px -4px 15px -25px rgba(29, 56, 78, 0.14) inset, -25px 0px 20px -20px rgba(29, 56, 78, 0.14)'
        )
        document.documentElement.style.setProperty(
          '--shadow1',
          'inset -10px 0 8px -8px rgba(29, 56, 78, 0.14)'
        )
      } else {
        document.documentElement.style.setProperty(
          '--shadow',
          'inset -10px 0 8px -8px rgba(29, 56, 78, 0.14)'
        )
        document.documentElement.style.setProperty(
          '--shadow1',
          'inset 9px 0px 7px -8px rgba(29, 56, 78, 0.14)'
        )
      }
      return direction === 'rtl'
    },
    hasAccordion() {
      let { accordionType, $scopedSlots } = this || {}
      let accordionSlot
      Object.keys($scopedSlots).forEach((key) => {
        if (key === 'accordion') {
          accordionSlot = $scopedSlots[key]
        }
      })
      return !!accordionSlot && !isEmpty(accordionType)
    },
  },
  watch: {
    selectType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.createCheckBoxList()
      }
    },
    data: {
      handler: function () {
        // if(isEqual(newVal,oldVal)){}
        this.addActionColumHeader()
      },
      deep: true,
    },
    columns: {
      handler: function () {
        // if(isEqual(newVal,oldVal)){}
        this.addActionColumHeader()
      },
      deep: true,
    },
    selectedList: {
      handler: function () {
        this.getDefaultSelectedRow()
      },
      deep: true,
    },
  },
  created() {
    this.addActionColumHeader()
    this.getDefaultSelectedRow()
  },
  mounted() {
    this.setHeaderColumnWidth()
    this.addActionColumHeader()
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    addActionColumHeader() {
      let { $scopedSlots } = this || {}
      let {
        ['cell.action']: cellAction,
        ['cell.fixed-action']: fixedCellAction,
      } = $scopedSlots || null
      let { columns, data } = this || []
      this.headers = cloneDeep(columns)
      if (this.hasAccordion) {
        let modifiedRows = []
        data.forEach((row) => {
          row = cloneDeep(row)
          modifiedRows = [
            ...modifiedRows,
            row,
            { ...row, accordion: true, accordionToggle: false },
          ]
        })
        this.rows = modifiedRows
        let accordionHeader = {
          name: 'accordion',
          width: 55,
          type: 'accordion',
        }
        if (this.accordionType === 'suffix') {
          this.headers.push(accordionHeader)
        } else {
          this.headers.unshift(accordionHeader)
        }
      } else this.rows = cloneDeep(data)
      let fixedRightClassApplied = false
      this.headers.forEach((element, index) => {
        let { headers } = this || []
        let nextElement = headers[index + 1]
        if (element.fixed && !(nextElement || {}).fixed) {
          element.class = 'sticky_last_left_cell'
        }
        if (element.fixedRight && !fixedRightClassApplied) {
          element.class = 'sticky_first_right_cell'
          fixedRightClassApplied = true
          this.rightColFixed = true
        }
      })
      let { selectType } = this
      if (!isEmpty(selectType)) {
        this.createCheckBoxList()
      } else {
        this.setDefaultWidth()
      }
      if (isFunction(cellAction)) {
        this.isActionPresent = true
        let actionRow = {
          displayName: 'Action',
          name: 'action',
          id: 10,
          // width: 95,
          class: 'action-colum-cell',
        }
        this.headers.push(actionRow)
      }
      if (isFunction(fixedCellAction)) {
        this.isActionPresent = true
        let actionRow = {
          displayName: 'Action',
          name: 'fixed-action',
          id: 10,
          // width: 95,
          class: 'action-colum-cell',
        }
        this.headers.push(actionRow)
      }
    },
    getDefaultSelectedRow() {
      if (!isEmpty(this.selectedList)) {
        let { checkBoxOptions, selectedList, data } = this || {}
        let selectedListIds = selectedList.map((item) => item.id)
        this.checkBoxOptions = checkBoxOptions.map((_, index) => {
          let currentDataId = dlv(data, `${index}.id`)
          return selectedListIds.includes(currentDataId)
        })
        this.selectedRecord = this.selectedList
        let hasAllSelected = data.every((item) => {
          return selectedListIds.includes(item.id)
        })
        if (hasAllSelected) {
          this.selecteAll = hasAllSelected
        } else {
          this.indeterminate = data.some((item) => {
            return selectedListIds.includes(item.id)
          })
        }
      } else {
        this.onCloseFloatBar()
      }
    },
    setHeaderColumnWidth() {
      // let { headers } = this || []
      const table = this?.$el?.querySelector('table')
      const tbody = table?.getElementsByTagName('thead')[0]
      const rows = tbody.getElementsByTagName('th')
      let col = document.getElementById('custom-table')
      let actionCell = document.getElementById('action-cell')
      if (table.clientWidth > col.clientWidth && this.rightColFixed) {
        col.classList.add('horizontal_scrolled_row_right')
      }
      this.headerHeight = rows[0].clientHeight
      let widthTolerance = (col.clientWidth + 2) / 100
      let columWidth,
        width = 0
      Array.from(rows).forEach((row, index0) => {
        columWidth = row.clientWidth + widthTolerance
        this.headers = this.headers.map((element, index) => {
          if (
            index === index0 &&
            element.name !== 'action' &&
            isEmpty(element.width)
          ) {
            // element.width = columWidth
            this.$set(element, 'width', columWidth)
            width = width + columWidth
          } else if (
            index === index0 &&
            ['action', 'fixed-action'].includes(element.name)
          ) {
            let { clientWidth = 0 } = actionCell || {}
            this.$set(element, 'width', clientWidth + 55)
            // element.width = clientWidth + 55
            this.actionBarWidth = element.width
            width = width + clientWidth + 55
          }
          return element
        })
      })
      this.initialTableWidth = width
      this.tableWidth = width
      this.tableheight = col.clientHeight - 2
    },
    createCheckBoxList() {
      let { headers, rows, checkBoxOptions } = this || {}
      let head = { displayName: 'Box', name: 'option', width: 40, fixed: true }
      this.headers = [head, ...headers]

      this.rows = rows.map((row, index) => {
        row.option = `box${index}`
        if (isEmpty(checkBoxOptions[index])) {
          this.checkBoxOptions.push(false)
        }
        return row
      })
    },
    setDefaultWidth() {
      this.headers.forEach((element) => {
        if (isEmpty(element.width)) element.width = 200
      })
    },
    cellCheckBox(row, header, index) {
      let val = row[header.name]
      let { selectType } = this
      if (selectType === 'bulk') {
        return (
          <FCheckbox
            class="f-checkbox"
            v-model={this.checkBoxOptions[index]}
            disabled={row.checkBoxdisable}
            vOn:change={(data) => this.checkForSelectedCell(data, val, row)}
          ></FCheckbox>
        )
      } else {
        return (
          <FRadio
            class="f-checkbox"
            v-model={this.checkBoxOptions[index]}
            vOn:change={(data) => this.onSelectedCell(data, val, index)}
          ></FRadio>
        )
      }
    },
    onSelectedCell(data, val, ind) {
      let { checkBoxOptions, rows } = this
      this.checkBoxOptions = checkBoxOptions.map((option, index) => {
        if (ind === index) return data
        else return false
      })
      this.selectedRecord = rows[ind]
      this.$emit('recordSelected', this.selectedRecord)
      this.addselectRowClass(val, data)
    },
    checkForSelectedCell(data, val, row) {
      let { rows, checkBoxOptions } = this || []
      if (data) {
        const foundItem = rows.find((item) => item.id === row.id)
        this.selectedRecord.push(foundItem)
      } else {
        let removerRecord = this.selectedRecord.filter(
          (obj) => obj.id !== row.id
        )
        let unselectedRecord = this.selectedRecord.find(
          (obj) => obj.id == row.id
        )
        this.$emit('recordRemoved', unselectedRecord)
        this.selectedRecord = removerRecord
      }
      this.$emit('recordSelected', this.selectedRecord)
      this.addselectRowClass(val, data)
      let selectedRecordCount = checkBoxOptions.filter(
        (item) => item === true
      ).length
      let notSelectedRecordCount = checkBoxOptions.filter(
        (item) => item === false
      ).length
      if (selectedRecordCount === rows.length) {
        this.selecteAll = true
        this.indeterminate = false
      } else if (selectedRecordCount > 0 && notSelectedRecordCount > 0) {
        this.indeterminate = true
        this.selecteAll = false
      } else {
        this.indeterminate = false
        this.selecteAll = false
      }
    },
    addselectRowClass(val, data) {
      let { selectType } = this
      if (data && selectType !== 'single') {
        this.selectedRows.push(val)
      } else if (!data && selectType !== 'single') {
        let { selectedRows } = this
        let index = selectedRows.indexOf(val)
        if (index > -1) {
          selectedRows.splice(index, 1)
        }
        this.selectedRows = selectedRows
      }
      const element = document.getElementById(val)
      if (data) {
        element.classList.add('selected_row')
      } else {
        element.classList.remove('selected_row')
      }
      if (selectType === 'single') {
        this.selectedRows = []
        this.selectedRows.push(val)
        const trElements = document.querySelectorAll(`tr:not(#${val}`)
        trElements.forEach((tr) => {
          tr.classList.remove('selected_row')
        })
      }
    },
    tableHeader(header, index) {
      let { readOnly, selectType } = this
      let { name, width, fixed, alignment, fixedRight } = header
      let actionCell, actionWidth
      let isActionCell = ['action', 'fixed-action'].includes(name)
      if (isActionCell) {
        actionCell = document?.getElementById('action-cell')
        actionWidth = actionCell?.clientWidth + 64
        if (!isEmpty(this.actionColumnWidth)) {
          actionWidth = parseInt(this.actionColumnWidth, 10)
        }
      }
      let left = 0
      let right = 0
      this.headers.forEach((head, ind) => {
        if (index > 0 && ind < index) {
          left = left + head.width
        }
      })
      this.headers.forEach((head, ind) => {
        if (ind > index && head.fixedRight) {
          right = right + isNaN(head.width) ? 150 : head.width
        }
      })
      if (this.isActionPresent) {
        right = right + this.actionBarWidth + 9
      }
      let textAlignment = 'left'
      if (this.isRTL) {
        textAlignment = 'right'
      }
      if (!isEmpty(header.alignment)) {
        if (this.isRTL) {
          textAlignment =
            header.alignment === 'right'
              ? 'left'
              : header.alignment === 'left'
              ? 'right'
              : header.alignment
        } else {
          textAlignment = header.alignment
        }
      }

      const Th = styled('th')`
        ${this.getStyle('headerRow')};
        ${isActionCell ? this.getStyle('actionCell') : ''}
        ${isActionCell ? (this.isRTL ? 'left:0px' : 'right:0px') : ''};
        ${width ? `width:${width}px` : 'width:150px'};
        ${alignment
          ? `text-align: ${alignment}`
          : `text-align:${textAlignment}`};
        ${isActionCell && `width:${actionWidth}px`};
        ${fixed
          ? {
              ...this.getStyle('fixedHeader'),
              [this.isRTL ? 'right' : 'left']: `${left}px`,
            }
          : ''};
        ${fixedRight
          ? {
              ...this.getStyle('fixedHeader'),
              [!this.isRTL ? 'right' : 'left']: `${right}px`,
            }
          : ''};
        ${readOnly ? '' : this.getStyle('readCellHeader')};
        ${this.headerContentAlignTop && 'vertical-align:top'};
      `
      return (
        <Th
          id={`resize${index}`}
          key={index}
          style={{
            width: `${header.width}px`,
          }}
          class={header.class}
        >
          {!isEmpty(selectType) && header.displayName === 'Box'
            ? this.headerCheckBox()
            : this.headerCell(header, index)}
        </Th>
      )
    },
    headerCell(header, index) {
      let { headerHeight, isColumnResizeOn, resizeColIndex, isRTL } = this || {}
      let { resize } = header || {}
      let isCurrentIndex = resizeColIndex === index
      const Resize = styled('div')`
        ${!isRTL && this.getStyle('resizediv')};
        ${isRTL && this.getStyle('resizediv1')};
        ${isColumnResizeOn &&
        isCurrentIndex &&
        !isRTL &&
        this.getStyle('resizer')};
        ${isColumnResizeOn &&
        isCurrentIndex &&
        isRTL &&
        this.getStyle('resizer1')};
        ${`height:${headerHeight}px`}
      `
      const ResizeBorder = styled('div')`
        ${isColumnResizeOn &&
        isCurrentIndex &&
        !isRTL &&
        this.getStyle('resizeBorder')};
        ${isColumnResizeOn &&
        isCurrentIndex &&
        isRTL &&
        this.getStyle('resizeBorder1')};
      `
      return (
        <FContainer
          class={
            ['action', 'fixed-action'].includes(header.name)
              ? 'action-column'
              : ''
          }
        >
          {this.renderHeaderCell(header)}
          {resize && (
            <Resize
              id={`resizer${index}`}
              vOn:click={() => this.resize()}
              vOn:mousedown={(event) =>
                this.resizer(index, `resize${index}`, event, `resizer${index}`)
              }
            >
              <ResizeBorder class="resize-border"></ResizeBorder>
            </Resize>
          )}
        </FContainer>
      )
    },
    renderHeaderCell(header) {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        let keyList = (key || '').split('.')
        if (!isEmpty(keyList)) {
          let { name } = header || {}
          let [type, headerName] = keyList || []
          if (type === 'header' && name === headerName) {
            currSlot = $scopedSlots[key]
          }
        }
      })
      let prop = {
        header,
      }
      if (!isEmpty(currSlot)) {
        return currSlot(prop)
      } else {
        return this.defaultHeaderCell(header)
      }
    },
    defaultHeaderCell(props) {
      let element = this.$refs[`header-${props.name}`]
      let canShowToolTip = false
      if (!isEmpty(element)) {
        if (element.$el.scrollWidth > element.$el.clientWidth) {
          canShowToolTip = true
        }
      }
      return (
        <FTooltip mouseEnterDelay={canShowToolTip ? 0.5 : 10}>
          <div slot="title">
            <FText> {props.displayName}</FText>
          </div>
          <FContainer
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            ref={`header-${props.name}`}
          >
            <FText appearance="headingMed14" color="textMain">
              {props.displayName}
            </FText>
          </FContainer>
        </FTooltip>
      )
    },
    headerCheckBox() {
      let { selectType } = this
      if (selectType === 'bulk') {
        return (
          <FCheckbox
            class="f-checkbox"
            v-model={this.selecteAll}
            indeterminate={this.indeterminate}
            vOn:change={(data) => this.selectedAllCheckBox(data)}
          ></FCheckbox>
        )
      }
    },
    selectedAllCheckBox(data) {
      let { rows, checkBoxOptions } = this || {}
      const indices = []
      rows.forEach((item, index) => {
        if (item.checkBoxdisable === true) {
          indices.push(index)
        }
      })
      this.checkBoxOptions = checkBoxOptions.map((_, index) => {
        if (indices.includes(index)) return false
        return data
      })
      this.selectedRecord = []
      if (data) {
        this.selectedRecord = rows
        rows.forEach((row) => {
          this.selectedRows.push(row.option)
        })
      } else {
        this.selectedRows = []
        this.selectedRecord = []
      }
      this.selectedRecord = this.selectedRecord.filter(
        (element) => !element.checkBoxdisable
      )
      this.$emit('recordSelected', this.selectedRecord)
      this.indeterminate = false
      const trList = document.querySelectorAll('tr')
      if (data) {
        trList.forEach(function (element) {
          element.classList.add('selected_row')
        })
      } else {
        trList.forEach(function (element) {
          element.classList.remove('selected_row')
        })
      }
    },
    resize() {
      // console.log('huu')
    },
    resizer(index, colId, event, resizeDivId) {
      let table = document.getElementById('custom-table')
      let tableHeight = table.clientHeight
      this.resizeColIndex = index
      const resizer = document.getElementById(resizeDivId)
      resizer.classList.add('resizer')
      this.isColumnResizeOn = true
      resizer.style.height = `${tableHeight}px`
      let col = document.getElementById(colId)
      let scrollBar = document.getElementById('perfect-scrollbar')
      let scrollLength = scrollBar.scrollLeft

      this.previousZIndex = window.getComputedStyle(col).zIndex
      col.style.zIndex = parseInt(this.previousZIndex) + 2

      this.actualWidth =
        col.offsetLeft +
        resizer.offsetLeft +
        table.offsetLeft +
        5 -
        scrollLength
      const styles = window.getComputedStyle(col)
      this.distance = parseInt(styles.width, 10)
      document.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseMoveHandler(event) {
      let { resizeColIndex, distance, actualWidth, isRTL } = this
      let table = document.getElementById('custom-table')
      let rect = table.getBoundingClientRect()
      let innerLeft = rect.left - table.offsetLeft

      let col = document.getElementById(`resize${this.resizeColIndex}`)
      let width = col.clientWidth
      const element = document.getElementById('custom-table')
      let scrollLength1 = element.scrollLeft ? element.scrollLeft : 0

      let rightOffset = 0
      if (isRTL) {
        rightOffset =
          document.body.clientWidth - element.offsetLeft - element.offsetWidth
      }
      let dx = 0
      if (!isRTL) {
        dx = event.clientX - actualWidth - innerLeft
      } else {
        dx =
          event.clientX -
          (col.offsetLeft - 10 - rightOffset + Math.abs(scrollLength1))
      }
      const resize = document.getElementById(`resizer${resizeColIndex}`)
      let val = dx * 1
      if (!isRTL) {
        val = dx * -1
      }
      if (val < width - 50) {
        if (!isRTL) {
          resize.style.right = `${val}px`
          this.changesColumnWidth = distance + dx
        } else {
          resize.style.left = `${val}px`
          this.changesColumnWidth = distance + dx * -1
        }
      }
    },
    mouseUpHandler() {
      let { resizeColIndex, headerHeight, changesColumnWidth, previousZIndex } =
        this
      document.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
      const resizer = document.getElementById(`resizer${resizeColIndex}`)
      const col = document.getElementById(`resize${resizeColIndex}`)
      resizer.classList.remove('resizer')
      this.isColumnResizeOn = false
      resizer.style.height = `${headerHeight}px`
      col.style.zIndex = previousZIndex

      if (changesColumnWidth > 0) {
        this.headers[resizeColIndex].width = changesColumnWidth
        this.widthChanged()
      }
    },
    widthChanged() {
      let {
        headers,
        resizeColIndex,
        initialTableWidth,
        changesColumnWidth,
        isRTL,
      } = this
      let width = 0
      headers.forEach((element) => {
        width = element.width + width
      })
      let table = document.getElementById('custom-table')
      this.tableWidth = width
      if (initialTableWidth > width) {
        table.style.width = `${width + 2}px`
      }
      let col = document.getElementById(`resize${resizeColIndex}`)
      let initialColumWidth = col.clientWidth
      col.style.width = `${changesColumnWidth}px`
      const resizer = document.getElementById(`resizer${resizeColIndex}`)
      if (isRTL) {
        resizer.style.left = `${0}px`
      } else {
        resizer.style.right = `${0}px`
      }
      this.$emit('OnColumnResize', {
        column: headers[resizeColIndex],
        initialWidth: initialColumWidth,
        finalWidth: changesColumnWidth,
      })
    },
    toggle(rowIndex) {
      let { rows } = this
      let accordionRow = rows[rowIndex + 1]
      let { accordionToggle } = accordionRow || {}
      if (accordionRow && !isEmpty(accordionToggle)) {
        this.rows[rowIndex + 1].accordionToggle = !accordionRow.accordionToggle
        this.$emit('accordionToggle', accordionRow)
      }
    },
    renderAccordionContent(row) {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        if (key === 'accordion') {
          currSlot = $scopedSlots[key]
        }
      })
      if (currSlot) {
        return currSlot({ row })
      }
    },
    renderTableCell(header, row, index0) {
      let { $scopedSlots, rows } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        let keyList = (key || '').split('.')
        if (!isEmpty(keyList)) {
          let { name } = header || {}
          let [type, headerName] = keyList || []
          if (type === 'cell' && name === headerName) {
            currSlot = $scopedSlots[key]
          }
        }
      })
      let SlotElement = styled('div')`
        display: flex;
        width: fit-content;
      `
      let props = {
        prop: header.name,
        row: row,
        index: index0,
      }
      if (header.type === 'accordion') {
        let accordionIconName = 'accordion-down'
        if (!isEmpty(rows[index0 + 1]) && rows[index0 + 1].accordionToggle) {
          accordionIconName = 'accordion-up'
        }
        return (
          <FContainer display="flex" justifyContent="end">
            <FIcon
              group="navigation"
              name={accordionIconName}
              size="16"
              vOn:click={() => this.toggle(index0)}
            ></FIcon>
          </FContainer>
        )
      } else if (
        !isEmpty(currSlot) &&
        ['action', 'fixed-action'].includes(header.name)
      ) {
        return (
          <SlotElement
            id="action-cell"
            class={header.name === 'action' ? 'action-column' : ''}
          >
            {currSlot(props)}
          </SlotElement>
        )
      } else if (!isEmpty(currSlot)) {
        return currSlot(props)
      } else {
        let type = header.type
        return (
          <FTableCell
            vOn:onCellClick={(data) => this.$emit('onCellClick', data)}
            type={type}
            data={row}
            header={header}
          ></FTableCell>
        )
      }
    },
    bodyCell(row, header, index, index0) {
      let { readOnly, selectType, striped, tableType } = this
      let width = 0
      let right = 0
      let textAlignment = 'left'
      let { disable = false } = row || {}
      this.headers.forEach((head, ind) => {
        if (index > 0 && ind < index) {
          width = width + head.width
        }
      })
      this.headers.forEach((head, ind) => {
        if (ind > index && head.fixedRight) {
          right = right + isNaN(head.width) ? 150 : head.width
        }
      })
      if (this.isActionPresent) {
        right = right + this.actionBarWidth + 9
      }
      if (this.isRTL) {
        textAlignment = 'right'
      }
      if (!isEmpty(header.alignment)) {
        if (this.isRTL) {
          textAlignment =
            header.alignment === 'right'
              ? 'left'
              : header.alignment === 'left'
              ? 'right'
              : header.alignment
        } else {
          textAlignment = header.alignment
        }
      }
      const Td = styled('td')`
        ${this.getStyle('bodyCell')};
        ${disable && this.getStyle('disabledRow')};
        ${!striped && this.getStyle('bodyBgColor')};
        ${header.name === 'action' ? this.getStyle('actionCell') : ''};
        ${tableType === 'compact' ? 'height:40px' : 'height:52px'};
        ${header.name === 'action'
          ? this.isRTL
            ? 'left:0px'
            : 'right:0px'
          : ''};
        ${!isEmpty(header.alignment)
          ? `text-align: ${textAlignment}`
          : `text-align: ${textAlignment}`};
        ${header.name === 'fixed-action'
          ? this.getStyle('fixedActionCell')
          : ''}
        ${header.name === 'fixed-action'
          ? this.isRTL
            ? 'left:0px'
            : 'right:0px'
          : ''};
        ${header.fixed
          ? {
              ...this.getStyle('fixedColumn'),
              [this.isRTL ? 'right' : 'left']: `${width}px`,
            }
          : ''};
        ${header.fixedRight
          ? {
              ...this.getStyle('fixedRightColumn'),
              [!this.isRTL ? 'right' : 'left']: `${right}px`,
            }
          : ''};
        ${readOnly && this.getStyle('readOnlyCell')};
      `
      return (
        <Td key={index} class={header.class} id={header.class}>
          {!isEmpty(selectType) && header.displayName === 'Box'
            ? this.cellCheckBox(row, header, index0)
            : this.renderTableCell(header, row, index0)}
        </Td>
      )
    },
    getFloatBar() {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        let keyList = (key || '').split('.')
        if (!isEmpty(keyList)) {
          let [type] = keyList || []
          if (type === 'float-bar') {
            currSlot = $scopedSlots[key]
          }
        }
      })
      let { selectedRecord = [] } = this
      let recordCount = selectedRecord.length || 0
      const FloatBarContainer = styled(FContainer)`
        ${this.getStyle('floatContainer')}
      `
      const Container = styled('div')`
        ${this.getStyle('floatBar')}
      `
      return (
        <FloatBarContainer>
          <Container>
            <FBulkToolbar
              recordCount={recordCount}
              vOn:close={this.onCloseFloatBar}
              animate={true}
            >
              {currSlot()}
            </FBulkToolbar>
          </Container>
        </FloatBarContainer>
      )
    },
    onCloseFloatBar() {
      let { checkBoxOptions } = this
      this.checkBoxOptions = checkBoxOptions.map(() => {
        return false
      })
      this.selectedRows = []
      this.selectedRecord = []
      this.indeterminate = false
      this.selecteAll = false
    },
    isScrollrd(event, val) {
      const element = document.getElementById('custom-table')
      element.classList.add('vertical_scrolled_row')
      this.verticalScroll = val
      this.setWidth()
    },
    isScrollhor(event, val) {
      this.setWidth()
      const element = document.getElementById('custom-table')
      if (val !== 'right') {
        if (val) {
          element.classList.add('horizontal_scrolled_row')
        } else {
          element.classList.remove('horizontal_scrolled_row')
        }
      }
      if (this.rightColFixed) {
        if (val !== 'right') {
          element.classList.add('horizontal_scrolled_row_right')
        } else {
          element.classList.remove('horizontal_scrolled_row_right')
        }
      }
    },
    setWidth() {
      let actionCell = document?.getElementById('action-cell')
      let actionWidth = actionCell?.clientWidth + 64
      if (!isEmpty(this.actionColumnWidth)) {
        actionWidth = parseInt(this.actionColumnWidth, 10)
      }
      if (this.isActionPresent) {
        this.actionBarWidth = actionWidth - 9
      }
    },
    scrolled() {
      let actionCell = document?.getElementById('action-cell')
      let actionWidth = actionCell?.clientWidth + 64
      if (!isEmpty(this.actionColumnWidth)) {
        actionWidth = parseInt(this.actionColumnWidth, 10)
      }
      if (this.isActionPresent) {
        this.actionBarWidth = actionWidth - 9
      }
      const element = document.getElementById('custom-table')
      let scrollLength = element.scrollLeft
      if (this.rightColFixed) {
        let checkLength = this.isRTL
          ? Math.abs(element.scrollWidth - element.clientWidth)
          : element.scrollWidth - element.clientWidth
        if (Math.abs(scrollLength) === checkLength) {
          element.classList.remove('horizontal_scrolled_row_right')
        } else {
          element.classList.add('horizontal_scrolled_row_right')
        }
      }
      let scrollTop = element.scrollTop
      if (this.isRTL ? scrollLength < 0 : scrollLength > 1) {
        this.horizontalScroll = true
        element.classList.add('horizontal_scrolled_row')
      } else {
        this.horizontalScroll = false
        element.classList.remove('horizontal_scrolled_row')
      }
      if (scrollTop > 1) {
        this.verticalScroll = true
        element.classList.add('vertical_scrolled_row')
      } else {
        this.verticalScroll = false
        element.classList.remove('vertical_scrolled_row')
      }
    },
  },
  render() {
    let {
      striped,
      isActionPresent,
      readOnly,
      verticalScroll,
      hideBorder,
      showSelectBar,
      rounded,
      tableType,
    } = this
    const Container = styled('div')`
      ${this.getStyle('tableContainer')};
      ${'position:relative;'}
      ${hideBorder ? 'border: none;' : ''}
      ${!rounded ? 'border-radius: 0px' : ''}
    `
    const Table = styled('table')`
      ${this.getStyle('table')}
    `
    const Thead = styled('thead')`
      ${this.getStyle('header')};
    `
    const Htr = styled('tr')`
      ${this.getStyle('bodyCell')};
      ${tableType === 'compact'
        ? this.getStyle('headerCellCompact')
        : this.getStyle('headerCell')};
      ${verticalScroll && this.getStyle('scrollTop')};
    `
    const Tr = styled(FContainer)`
      ${this.getStyle('bodyRow')};
      ${!striped && this.getStyle('hoveredRow')}
    `
    return (
      <Container id="custom-table" vOn:scroll={this.scrolled}>
        <vueCustomScrollbar
          swicher={!this.isRTL}
          id="perfect-scrollbar"
          class="perfect-scrollbar"
          vOn:ps-scroll-y={(event) => this.isScrollrd(event, true)}
          vOn:ps-y-reach-start={(event) => this.isScrollrd(event, false)}
          vOn:ps-scroll-x={(event) => this.isScrollhor(event, true)}
          vOn:ps-x-reach-start={(event) => this.isScrollhor(event, false)}
          vOn:ps-x-reach-end={(event) => this.isScrollhor(event, 'right')}
        >
          <Table
            class={`${isActionPresent ? 'action-table' : ''} ${
              readOnly ? 'read-table' : ''
            } ${!hideBorder ? 'hideBottom' : ''}`}
          >
            <Thead>
              <Htr class={striped ? 'striped-header-row' : ''}>
                {this.headers.map((header, index) =>
                  this.tableHeader(header, index)
                )}
              </Htr>
            </Thead>
            <tbody>
              {this.rows.map((row, index0) =>
                row.accordion ? (
                  row.accordionToggle && (
                    <tr>
                      <td colspan={this.headers.length}>
                        {this.renderAccordionContent(row)}
                      </td>
                    </tr>
                  )
                ) : (
                  <Tr
                    tag="tr"
                    hover-backgroundColor={
                      row.disable ? 'backgroundMidgroundMedium' : ''
                    }
                    id={`box${index0}`}
                    key={index0}
                    class={`${striped ? 'striped-row' : ''} ${
                      row.disable ? 'disabled-row' : ''
                    } ${
                      striped && index0 % 2 !== 0 ? 'striped-marked-row' : ''
                    } ${row.disable ? ' ' : 'visibility-visible-actions'} `}
                    vOn:mouseover={() => this.$emit('rowMouseOver', row)}
                    vOn:mouseleave={() => this.$emit('rowMouseLeave', row)}
                  >
                    {this.headers.map((header, index) =>
                      this.bodyCell(row, header, index, index0)
                    )}
                  </Tr>
                )
              )}
            </tbody>
          </Table>
          {showSelectBar && this.getFloatBar()}
        </vueCustomScrollbar>
      </Container>
    )
  },
}
</script>

<style scoped>
.perfect-scrollbar {
  width: 100%;
  height: 100%;
}

.horizontal_scrolled_row .sticky_last_left_cell {
  box-shadow: var(--shadow);
}
.horizontal_scrolled_row_right .sticky_first_right_cell {
  box-shadow: var(--shadow1);
}
.horizontal_scrolled_row_right th.action-colum-cell {
  z-index: 5;
  background-color: var(--colors-backgroundMidgroundMedium);
}
.horizontal_scrolled_row_right td.action-colum-cell {
  background-color: var(--colors-backgroundCanvas);
}
.visibility-visible-actions:hover .action-colum-cell .action-column {
  visibility: visible;
}
.action-column {
  visibility: hidden;
}
table tbody .disabled-row:hover {
  box-shadow: none;
}
table tbody .disabled-row:hover td {
  background-color: unset;
}
table tbody .disabled-row td label {
  visibility: hidden;
}
.hideBottom tbody tr:last-child td {
  border-bottom: none;
}
table tbody tr td:last-child,
table thead tr th:last-child {
  border-right: none;
}

table .striped-marked-row td {
  background-color: #f1f2f4;
}
table tbody .striped-row td {
  border: none;
}
table thead .striped-header-row th {
  border-right: none;
}
.action-column {
  right: 0px;
}
.action-colum-cell {
  background-color: transparent;
}
table .striped-row .action-colum-cell {
  background-color: #fff;
}
table .striped-row.striped-marked-row .action-colum-cell {
  background-color: #f1f2f4;
}
th.action-colum-cell {
  z-index: 2;
}
.read-table th.action-colum-cell {
  z-index: 2;
}
.action-table tr td:nth-last-child(2),
.action-table tr th:nth-last-child(2) {
  border-right: none;
}
</style>
<style lang="scss">
.perfect-scrollbar .ps__rail-x {
  z-index: 15;
  height: 8px;
  /* visibility: hidden; */
  position: absolute;
  .ps__thumb-x {
    background-color: var(--colors-borderNeutralBaseSubtle);
    height: 4px;
    bottom: -1.5px;
    cursor: pointer;
    visibility: visible;
    position: relative;
  }
}
.perfect-scrollbar .ps__rail-x:hover {
  .ps__thumb-x {
    height: 6px;
  }
  background-color: var(--colors-backgroundMidgroundSubtle);
}
.perfect-scrollbar .ps__rail-y:hover {
  .ps__thumb-y {
    width: 6px;
  }
  background-color: var(--colors-backgroundMidgroundSubtle);
}
.perfect-scrollbar .ps__rail-y {
  z-index: 15;
  width: 8px;
  /* visibility: hidden; */
  position: absolute;
  .ps__thumb-y {
    background-color: var(--colors-borderNeutralBaseSubtle);
    width: 4px;
    right: -1.5px;
    cursor: pointer;
    visibility: visible;
    position: relative;
  }
}
.perfect-scrollbar .ps__rail-x.ps--clicking,
.perfect-scrollbar .ps__rail-x:focus,
.perfect-scrollbar .ps__rail-x:hover {
  .ps__thumb-x {
    background-color: var(--colors-borderNeutralBaseLight);
    height: 6px;
  }
}
.perfect-scrollbar .ps__rail-y.ps--clicking,
.perfect-scrollbar .ps__rail-y:focus,
.perfect-scrollbar .ps__rail-y:hover {
  .ps__thumb-y {
    background-color: var(--colors-borderNeutralBaseLight);
    width: 6px;
  }
}
</style>
