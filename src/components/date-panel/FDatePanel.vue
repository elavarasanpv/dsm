<script>
import { format } from 'date-format-parse'
import { FContainer, FText, FDivider, FIcon, FPicker } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEqual } from 'lodash'
import {
  getCalendar,
  setMonth,
  setYear,
  getMonths,
  getWeeks,
  getWeekNumber,
  getQuarter,
  getYears,
  getTimePickerProps,
} from '../date-picker/utils/date'
import locale from '../date-picker/utils/locale'
import { chunk } from '../date-picker/utils/helpers'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/ar'
import localeData from 'dayjs/plugin/localeData'

const SIZE = {
  medium: 'width:100%;height:32px;',
  large: 'width:100%;height:44px;',
}
const SPACING = {
  XS: '0px 0px',
  S: '0px 4px',
  M: '0px 12px',
  L: '0px 16px',
}
// dayjs.locale('ar')
dayjs.extend(localeData)
export default {
  name: 'FDatePanel',
  mixins: [ThemeMixin],
  props: {
    referenceDate: {
      type: undefined,
      default: new Date(),
    },
    selectDate: {
      type: Function,
      default: () => {},
    },
    selectTime: {
      type: Function,
      default: () => {},
    },
    timeFormat: {
      type: Object,
      default: () => {},
    },
    selectedTime: {
      type: undefined,
      default: undefined,
    },
    selectedDate: {
      type: undefined,
      default: undefined,
    },
    showTime: {
      type: Boolean,
      default: false,
    },
    tab: {
      type: String,
      default: '0',
      validator: (value) => {
        return ['0', '1'].includes(value)
      },
    },
    dateType: {
      type: String,
      default: 'day',
      validator: (value) => {
        return ['year', 'quarter', 'month', 'week', 'day', 'day-time'].includes(
          value
        )
      },
    },
    validateDate: {
      type: Function,
      default: undefined,
    },
    startingDay: {
      type: Number,
      default: 0,
      validator: (value) => {
        return [0, 1].includes(value)
      },
    },
    isDatePicker: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    localSelectedTime: undefined,
    isDomMounted: false,
    selectionPanel: false,
    customType: 'year',
    isEndSelection: false,
  }),
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
    dateFormater() {
      if (this.selectionPanel) {
        return this.customType
      } else {
        return this.dateType
      }
    },
    firstDayOfWeek() {
      return locale.formatLocale.firstDayOfWeek || 0
    },
    sizeObj() {
      let { dateFormater } = this
      const validDateTypes = ['month', 'year']
      const isLarge = validDateTypes.includes(dateFormater)
      if (isLarge) {
        return SIZE.large
      } else return SIZE.medium
    },
    spacingObj() {
      let { dateFormater } = this
      const validDateTypes = ['week', 'day', 'day-time']
      const isSmall = validDateTypes.includes(dateFormater)
      if (isSmall) {
        return SPACING.S
      } else if (dateFormater === 'year') {
        return SPACING.M
      } else if (dateFormater === 'month') {
        return SPACING.L
      } else {
        return SPACING.XS
      }
    },
    headerLabel() {
      let { referenceDate, dateFormater } = this || {}
      const yearLabel = {
        panel: 'year',
        label: dayjs(referenceDate).format('YYYY'),
      }
      const monthLabel = {
        panel: 'month',
        label: dayjs(referenceDate).format('MMM'),
      }
      let labelArr = []
      if (dateFormater === 'month' || dateFormater === 'quarter') {
        labelArr = [yearLabel]
      } else if (dateFormater === 'week') {
        labelArr = [yearLabel]
      } else if (dateFormater === 'year') {
        let year = referenceDate.getFullYear()
        let allYears = getYears(year)
        let start = allYears[0]
        let end = allYears[allYears.length - 1]
        let label = {
          panel: 'week',
          label: `${start.getFullYear()} - ${end.getFullYear()} `,
        }
        labelArr = [label]
      } else {
        labelArr = [monthLabel, yearLabel]
      }
      // console.log(labelArr, 'labelArr')
      return labelArr
    },
    dates() {
      let { referenceDate, startingDay, isDatePicker } = this || {}
      let dateType = this.dateFormater
      let year = referenceDate.getFullYear()
      let month = referenceDate.getMonth()
      let arr = getCalendar({
        firstDayOfWeek: this.firstDayOfWeek,
        year,
        month,
      })
      let monthsArr = dayjs().localeData().monthsShort()
      // console.log(monthsArr)
      let monthArr = getMonths({ monthsArr, year })
      // let startingDay = 0
      let weekArr = getWeeks({ year, startingDay })
      let quarterArr = getQuarter({ year })
      let yearsArr = getYears(year)
      if (dateType === 'month') {
        return chunk(monthArr, isDatePicker ? 3 : 4)
      } else if (dateType === 'week') {
        return chunk(weekArr, 7)
      } else if (dateType === 'quarter') {
        return chunk(quarterArr, 4)
      } else if (dateType === 'year') {
        return chunk(yearsArr, 5)
      } else {
        return chunk(arr, 7)
      }
    },
    customDates() {
      let { referenceDate, startingDay } = this || {}
      let dateType = this.customType
      let year = referenceDate.getFullYear()
      let month = referenceDate.getMonth()
      let arr = getCalendar({
        firstDayOfWeek: this.firstDayOfWeek,
        year,
        month,
      })
      let monthsArr = locale.formatLocale.monthsShort
      let monthArr = getMonths({ monthsArr, year })
      // let startingDay = 0
      let weekArr = getWeeks({ year, startingDay })
      let quarterArr = getQuarter({ year })
      let yearsArr = getYears(year)
      if (dateType === 'month') {
        return chunk(monthArr, 4)
      } else if (dateType === 'week') {
        return chunk(weekArr, 7)
      } else if (dateType === 'quarter') {
        return chunk(quarterArr, 4)
      } else if (dateType === 'year') {
        return chunk(yearsArr, 5)
      } else {
        return chunk(arr, 7)
      }
    },
    reverseDisabled() {
      const currentYear = new Date().getFullYear()
      const currentCenturyStartYear = Math.floor(currentYear / 100) * 100
      return (
        this.customType === 'year' &&
        new Date(this.customDates[0][0]).getFullYear() ===
          currentCenturyStartYear - 20
      )
    },
    forwardDisabled() {
      const currentYear = new Date().getFullYear()
      const currentCenturyStartYear = Math.floor(currentYear / 100) * 100
      return (
        this.customType === 'year' &&
        new Date(this.customDates[3][4]).getFullYear() ===
          currentCenturyStartYear + 119
      )
    },
    days() {
      const days = dayjs().localeData().weekdaysMin()
      return days
        .concat(days)
        .slice(this.firstDayOfWeek, this.firstDayOfWeek + 7)
    },
  },
  watch: {
    selectedTime(newVal, oldVal) {
      if (!isEmpty(newVal) && !isEqual(oldVal, newVal)) {
        this.localSelectedTime = newVal
      }
    },
    tab: {
      handler() {
        this.localSelectedTime = this.selectedTime
      },
      immediate: true,
      deep: true,
    },
    dateType(newVal) {
      if (!isEmpty(newVal)) {
        this.isEndSelection = false
        this.selectionPanel = false
      }
    },
    dateFormater: {
      handler(value) {
        this.$emit('changeType', value)
      },
      // immediate: true,
    },
  },
  mounted() {
    console.log(locale, dayjs().localeData(), 'ko')
    this.$nextTick(() => {
      this.isDomMounted = true
    })
  },
  beforeDestroy() {
    this.isDomMounted = false
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    formatDate(date, fmt) {
      return format(date, fmt)
    },
    moveOutside() {
      this.isEndSelection = false
      this.selectionPanel = false
    },
    isSelectedDate(date) {
      let refMonth = new Date(this.referenceDate).getMonth()
      let refYear = new Date(this.referenceDate).getFullYear()
      let currMonth = new Date(date).getMonth()
      let currYear = new Date(date).getFullYear()
      if (this.dateFormater === 'month') {
        return refMonth === currMonth
      }
      if (this.dateFormater === 'year') {
        return refYear === currYear
      }
    },
    gotoPrevious() {
      let { dateFormater } = this || ''
      let modifiedRefDate
      const currentYear = new Date().getFullYear()
      const currentCenturyStartYear = Math.floor(currentYear / 100) * 100
      if (
        this.customType === 'year' &&
        new Date(this.customDates[0][0]).getFullYear() ===
          currentCenturyStartYear - 20
      ) {
        return false
      }
      const validDateTypes = ['month', 'week', 'quarter']
      const isMoveByYear = validDateTypes.includes(dateFormater)
      if (isMoveByYear) {
        modifiedRefDate = setYear(this.referenceDate, (v) => v - 1)
      } else if (dateFormater === 'year') {
        modifiedRefDate = setYear(this.referenceDate, (v) => v - 20)
      } else {
        modifiedRefDate = setMonth(this.referenceDate, (v) => v - 1)
      }
      this.$emit('changeRefDate', modifiedRefDate)
    },
    gotoNext() {
      let { dateFormater } = this || ''
      let modifiedRefDate
      const currentYear = new Date().getFullYear()
      const currentCenturyStartYear = Math.floor(currentYear / 100) * 100
      if (
        this.customType === 'year' &&
        new Date(this.customDates[3][4]).getFullYear() ===
          currentCenturyStartYear + 119
      ) {
        return false
      }
      const validDateTypes = ['month', 'week', 'quarter']
      const isMoveByYear = validDateTypes.includes(dateFormater)
      if (isMoveByYear) {
        modifiedRefDate = setYear(this.referenceDate, (v) => v + 1)
      } else if (dateFormater === 'year') {
        modifiedRefDate = setYear(this.referenceDate, (v) => v + 20)
      } else {
        modifiedRefDate = setMonth(this.referenceDate, (v) => v + 1)
      }
      this.$emit('changeRefDate', modifiedRefDate)
    },
    triggerSelect(value) {
      let { selectDate } = this
      if (!this.selectionPanel) {
        selectDate(value)
      }
      if (this.dateFormater === 'month' && this.selectionPanel) {
        this.$emit('changeRefDate', value)
        this.selectionPanel = false
        this.isEndSelection = false
        this.customType = this.dateType
      }
      if (this.dateFormater === 'year' && this.selectionPanel) {
        this.$emit('changeRefDate', value)
        if (this.dateType === 'day' || this.dateType === 'day-time') {
          setTimeout(() => {
            this.customType = 'month'
          }, 1)
        } else {
          setTimeout(() => {
            this.selectionPanel = false
            this.isEndSelection = false
            this.customType = this.dateType
          }, 1)
        }
      }
    },
    renderDateCell(value) {
      let {
        referenceDate,
        selectDate,
        selectedDate,
        dateFormater,
        sizeObj,
        startingDay,
      } = this || {}
      let isNonCurrentDate = referenceDate.getMonth() !== value.getMonth()
      let isToday = value.getTime() === new Date().setHours(0, 0, 0, 0)
      let isSelected
      let isStartSelected
      let isSameCell = false
      if (Array.isArray(selectedDate)) {
        let [value0, value1] = selectedDate || []
        isStartSelected =
          !isEmpty(value0.getTime) &&
          new Date(value0).toDateString() === new Date(value).toDateString()
        isSelected =
          isStartSelected ||
          (!isEmpty(value1.getTime) &&
            new Date(value1).toDateString() === new Date(value).toDateString())
      } else {
        isSelected =
          !isEmpty(selectDate) &&
          new Date(selectedDate).toDateString() ===
            new Date(value).toDateString()
        isSameCell = true
      }
      let nonSelectableDate = false
      let isWithinRange = false
      let isRange = Array.isArray(selectedDate)
      if (isRange) {
        let [value0, value1] = selectedDate || []
        let initTime = !isEmpty(value0.getTime) ? value0.getTime() : null
        let endTime = !isEmpty(value1.getTime) ? value1.getTime() : null
        let currentTime = value.getTime()
        if (!isEmpty(initTime) && !isEmpty(endTime)) {
          isWithinRange = initTime < currentTime && currentTime < endTime
        }
        // if (this.tab === '1' && value.getTime() < initTime) {
        //   nonSelectableDate = true
        // }
        if (initTime === endTime) {
          isSameCell = true
        }
      }
      let type = ''
      if (Array.isArray(selectedDate)) {
        type = isStartSelected ? 'activeRangeCellStart' : 'activeRangeCellEnd'
        if (this.isRTL) {
          type = isStartSelected ? 'activeRangeCellEnd' : 'activeRangeCellStart'
        }
      }
      let isCellSelected = false
      let TableDataCell
      let isDaySelect = dateFormater === 'day' || dateFormater === 'day-time'
      let isDisableCell = isNonCurrentDate && isDaySelect
      if (!isEmpty(this.validateDate) && !this.selectionPanel) {
        nonSelectableDate = this.validateDate(value, this.dateType)
      }
      if (this.selectionPanel) {
        isSelected = this.isSelectedDate(value)
        isSameCell = this.isSelectedDate(value)
        isCellSelected = this.isSelectedDate(value)
      }
      let Container = styled(FContainer)`
        ${isSelected && !isDisableCell && this.getStyle('selected')}
        ${isSelected && !isSameCell && this.getStyle(type)}
           ${isSameCell && 'border-radius:4px;'}
      `
      if ((isNonCurrentDate && isDaySelect) || nonSelectableDate) {
        TableDataCell = styled(FContainer)`
          ${this.getStyle('nonCurrentDateCell')}
        `
      } else if (isSelected) {
        isCellSelected = true
        TableDataCell = styled(FContainer)`
          ${this.getStyle('text')}
        `
      } else if (isWithinRange) {
        // isCellSelected = true
        TableDataCell = styled(FContainer)`
          ${this.getStyle('withinRange')}
        `
        Container = styled(FContainer)`
          ${isWithinRange && this.getStyle('conWithinRange')}
        `
      } else if (isToday) {
        // isCellSelected = true
        TableDataCell = styled(FContainer)`
          ${this.getStyle('todayDateCell')}
        `
      } else {
        TableDataCell = styled(FContainer)`
          ${this.getStyle('dateCell')}
        `
      }
      if (nonSelectableDate) {
        isCellSelected = true
      }
      if (this.selectionPanel && isWithinRange) {
        isCellSelected = false
      }
      if (this.selectionPanel && this.isSelectedDate(value)) {
        isCellSelected = true
      }
      let displayTitle = value.getDate()
      if (dateFormater === 'month') {
        displayTitle = dayjs(value).format('MMM')
      } else if (dateFormater === 'week') {
        let year = value.getFullYear()
        let month = value.getMonth()
        let day = value.getDate()
        const date = new Date(year, month, day)
        // let startingDay = 0
        displayTitle = `W${getWeekNumber(date, referenceDate, startingDay)}`
      } else if (dateFormater === 'quarter') {
        let month = value.getMonth()
        let number = month / 3 + 1
        displayTitle = `Q${number}`
      } else if (dateFormater === 'year') {
        let year = value.getFullYear()
        displayTitle = `${year}`
      }
      const DataCell = styled(FContainer)`
        ${this.getStyle('cell')}
        ${!isCellSelected && !isWithinRange && this.getStyle('cellHover')}
        ${!isCellSelected && this.selectionPanel && this.getStyle('cellHover')}
        ${isSelected && !isDisableCell && this.getStyle('selected')}
        ${sizeObj}
      `

      return (
        <Container
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor={nonSelectableDate ? 'not-allowed' : 'pointer'}
          backgroundColor={
            !this.selectionPanel &&
            isWithinRange &&
            (!isNonCurrentDate || !isDaySelect)
              ? 'backgroundAccentBlueSubtle'
              : ''
          }
          vOn:click={() => {
            if (!nonSelectableDate) this.triggerSelect(value)
          }}
        >
          <DataCell>
            <TableDataCell>{displayTitle}</TableDataCell>
          </DataCell>
        </Container>
      )
    },
    selectTimeValue(val) {
      this.selectTime(val)
    },
    changePanel(val) {
      if (!isEmpty(val)) {
        this.customType = val
      }
      // if (this.dateFormater === 'year') {
      //   this.isEndSelection = true
      // }
      this.selectionPanel = true
    },
  },
  render() {
    let { headerLabel, days, dateFormater, spacingObj, showTime, timeFormat } =
      this || {}
    let { is12Hour = false } = timeFormat || {}
    let isWeekHeader = false
    if (this.dateFormater === 'day' || this.dateFormater === 'day-time') {
      isWeekHeader = true
    }
    let isShowTimePicker = showTime || dateFormater === 'day-time'
    const TableHeaderCell = styled(FContainer)`
      ${this.getStyle('headerCell')}
    `
    const HeaderContainer = styled(FContainer)`
      ${this.getStyle('dateHeader')}
    `
    const Title = styled(FContainer)`
      ${this.getStyle('title')}
    `
    const TitleContainer = styled(FContainer)`
      ${this.getStyle('titleContainer')}
    `
    const TableContainer = styled(FContainer)`
      ${this.getStyle('table')}
    `
    const Td = styled('td')`
      ${isWeekHeader && 'min-width:36px;height:32px;'}
      ${dateFormater === 'month' && 'min-width:80px;height:44px;'}
      ${dateFormater === 'week' && 'min-width:36px;height:32px;'}
      padding:0px;
    `
    let [v1, v2] = headerLabel || []
    let { label: label1 } = v1 || {}
    let { label: label2 } = v2 || {}
    return (
      <FContainer width="100%" display="flex">
        <FContainer display="flex" flexDirection="column" width="100%">
          <HeaderContainer>
            <Title>
              <TitleContainer>
                {/* {headerLabel.map((value, index) => {
                  return (
                    <FContainer
                      marginRight="containerMedium"
                      vOn:click={() => this.changePanel()}
                      key={`${index}`}
                    >
                      <FText appearance="headingMed14">{value.label}</FText>
                    </FContainer>
                  )
                })} */}
                <FContainer
                  height="100%"
                  display="flex"
                  alignItems="center"
                  marginRight="containerMedium"
                  borderRadius="medium"
                  cursor={
                    !this.isEndSelection && this.dateFormater !== 'year'
                      ? 'pointer'
                      : 'default'
                  }
                  vOn:click={() =>
                    !this.isEndSelection &&
                    this.dateFormater !== 'year' &&
                    this.changePanel(v1.panel)
                  }
                  hover-color={
                    !this.isEndSelection && this.dateFormater !== 'year'
                      ? 'backgroundPrimaryDefault'
                      : 'textMain'
                  }
                >
                  <FText appearance="headingMed14">{label1}</FText>
                </FContainer>
                <FContainer
                  height="100%"
                  display="flex"
                  alignItems="center"
                  marginRight="containerMedium"
                  hover-color={
                    !this.isEndSelection
                      ? 'backgroundPrimaryDefault'
                      : 'textMain'
                  }
                  borderRadius="medium"
                  cursor={!this.isEndSelection ? 'pointer' : 'default'}
                  vOn:click={() =>
                    !this.isEndSelection && this.changePanel(v2.panel)
                  }
                >
                  <FText appearance="headingMed14">{label2}</FText>
                </FContainer>
              </TitleContainer>
            </Title>
            <FContainer display="flex" alignItems="center" gap="containerLarge">
              <FContainer
                class="navigation-icons"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                cursor={this.reverseDisabled ? 'not-allowed' : 'pointer'}
              >
                <FIcon
                  group="dsm"
                  name="chevron-left"
                  size="18"
                  cursor={this.reverseDisabled ? 'not-allowed' : 'pointer'}
                  visibility="visible"
                  color="iconNeutralDefault"
                  vOn:click={this.gotoPrevious}
                ></FIcon>
              </FContainer>
              <FContainer
                class="navigation-icons"
                display="flex"
                alignItems="center"
                cursor={this.forwardDisabled ? 'not-allowed' : 'pointer'}
                justifyContent="center"
                cursor="pointer"
              >
                <FIcon
                  group="dsm"
                  name="chevron-right"
                  size="18"
                  cursor={this.forwardDisabled ? 'not-allowed' : 'pointer'}
                  visibility="visible"
                  color="iconNeutralDefault"
                  vOn:click={this.gotoNext}
                ></FIcon>
              </FContainer>
            </FContainer>
          </HeaderContainer>
          <FDivider width="100%" />
          <TableContainer width="100%">
            <FContainer
              tag="table"
              width="100%"
              borderSpacing={spacingObj}
              minWidth={this.isDatePicker && '252px'}
            >
              <thead>
                <FContainer tag="tr" display={!isWeekHeader && 'none'}>
                  {(days || []).map((day) => {
                    return (
                      <FContainer
                        tag="th"
                        padding="containerNone"
                        minWidth="36px"
                        height="28px"
                      >
                        <FContainer
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <TableHeaderCell key={day}>
                            <FText
                              appearance="headingMed14"
                              color="textCaption"
                            >
                              {day}
                            </FText>
                          </TableHeaderCell>
                        </FContainer>
                      </FContainer>
                    )
                  })}
                </FContainer>

                {this.dates.map((week) => {
                  return (
                    <tr>
                      {week.map((day) => {
                        return (
                          <Td>
                            <FText>{this.renderDateCell(day)}</FText>
                          </Td>
                        )
                      })}
                    </tr>
                  )
                })}
                {/* {this.selectionPanel &&
                  this.customDates.map((week) => {
                    return (
                      <tr>
                        {week.map((day) => {
                          return (
                            <Td>
                              <FText>{this.renderDateCell(day)}</FText>
                            </Td>
                          )
                        })}
                      </tr>
                    )
                  })} */}
              </thead>
            </FContainer>
          </TableContainer>
        </FContainer>
        {isShowTimePicker && this.isDomMounted && (
          <FContainer
            borderLeft="1px solid"
            borderColor="borderNeutralBaseSubtler"
          >
            <FContainer
              padding="containerXLarge containerNone"
              marginTop="containerLarge"
              height="100%"
            >
              <FPicker
                key={`${this.tab}-${this.dateFormater}`}
                v-model={this.localSelectedTime}
                columnList={getTimePickerProps(is12Hour)}
                vOn:change={() => this.selectTimeValue(this.localSelectedTime)}
              />
            </FContainer>
          </FContainer>
        )}
      </FContainer>
    )
  },
}
</script>

<style></style>
