<script>
import {
  FContainer,
  FPopover,
  FButton,
  FIcon,
  FTabs,
  FDatePanel,
  FSegmentedControl,
  FText,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty, isDateEmpty } from '../../utils/validation'
import {
  setMonth,
  getEndDate,
  setRefsDate,
  getWeekNumber,
  setNextDate,
  setPrevioustDate,
  setCurrentValue,
  setDateForLabel,
  setTimeForDate,
  millisecondsToTime,
  findForCurrentDate,
  convertToTZ,
  convertToLocalTZ,
} from '../date-picker/utils/date'
import styled from 'vue-emotion'
import dlv from 'dlv'
import { cloneDeep } from 'lodash'
const TOLGEE_CONFIG = Symbol.for('@facilio/tolgee')
let $t
if (window[TOLGEE_CONFIG]) {
  $t = window[TOLGEE_CONFIG].t
} else {
  $t = (_, defaultValue) => defaultValue
}
const QUICK_RANGE_HASH = {
  Days: [
    {
      id: 0,
      operatorId: 22,
      label: 'Today',
      value: null,
      offset: 0,
      operationOn: 'day',
      operationOnId: 1,
      displayName: $t('dsm.timeline.today', 'Today'),
    },
    {
      id: 1,
      operatorId: 25,
      label: 'Yesterday',
      value: null,
      offset: -1,
      operationOn: 'day',
      operationOnId: 1,
      displayName: $t('dsm.timeline.yesterday', 'Yesterday'),
    },
    {
      id: 2,
      operatorId: 43,
      label: 'Today upto Now',
      value: null,
      offset: 0,
      operationOn: 'day',
      operationOnId: 1,
      displayName: $t('dsm.timeline.today_upto_now', 'Today upto Now'),
    },
    {
      id: 6,
      operatorId: 49,
      label: 'Last 2 days',
      value: null,
      offset: -2,
      operationOn: 'day',
      operationOnId: 1,
      more: true,
      displayName: $t('dsm.timeline.last_2_days', 'Last 2 days'),
    },
    {
      id: 7,
      operatorId: 49,
      label: 'Last 7 days',
      value: null,
      offset: -7,
      operationOn: 'day',
      operationOnId: 1,
      more: true,
      displayName: $t('dsm.timeline.last_7_days', 'Last 7 days'),
    },
    {
      id: 8,
      operatorId: 49,
      label: 'Last 15 days',
      value: null,
      offset: -15,
      operationOn: 'day',
      operationOnId: 1,
      more: true,
      displayName: $t('dsm.timeline.last_15_days', 'Last 15 days'),
    },
    {
      id: 9,
      operatorId: 49,
      label: 'Last 30 days',
      value: null,
      offset: -30,
      operationOn: 'day',
      operationOnId: 1,
      more: true,
      displayName: $t('dsm.timeline.last_30_days', 'Last 30 days'),
    },
  ],
  Weeks: [
    {
      id: 10,
      operatorId: 31,
      label: 'This week',
      value: null,
      offset: 0,
      operationOn: 'week',
      operationOnId: 2,
      displayName: $t('dsm.timeline.this_week', 'This week'),
    },
    {
      id: 11,
      operatorId: 30,
      label: 'Last week',
      value: null,
      offset: -1,
      operationOn: 'week',
      operationOnId: 2,
      displayName: $t('dsm.timeline.last_week', 'Last week'),
    },
    {
      operatorId: 47,
      label: 'This Week Until Now',
      offset: 0,
      value: null,
      operationOn: 'week',
      operationOnId: 2,
      isNow: true,
      displayName: $t(
        'dsm.timeline.this_week_until_now',
        'This Week Until Now'
      ),
    },
    {
      id: 13,
      operatorId: 50,
      label: 'Last 2 weeks',
      value: null,
      offset: -2,
      operationOn: 'week',
      operationOnId: 2,
      more: true,
      displayName: $t('dsm.timeline.last_2_weeks', 'Last 2 weeks'),
    },
    {
      id: 14,
      operatorId: 50,
      label: 'Last 4 weeks',
      value: null,
      offset: -4,
      operationOn: 'week',
      operationOnId: 2,
      more: true,
      displayName: $t('dsm.timeline.last_4_weeks', 'Last 4 weeks'),
    },
    {
      id: 15,
      operatorId: 50,
      label: 'Last 8 weeks',
      value: null,
      offset: -8,
      operationOn: 'week',
      operationOnId: 2,
      more: true,
      displayName: $t('dsm.timeline.last_8_weeks', 'Last 8 weeks'),
    },
  ],
  Months: [
    {
      id: 16,
      operatorId: 28,
      label: 'This month',
      value: null,
      offset: 0,
      operationOn: 'month',
      operationOnId: 3,
      displayName: $t('dsm.timeline.this_month', 'This month'),
    },
    {
      id: 18,
      operatorId: 27,
      label: 'Last month',
      value: null,
      offset: -1,
      operationOn: 'month',
      operationOnId: 3,
      displayName: $t('dsm.timeline.last_month', 'Last month'),
    },
    {
      operatorId: 48,
      label: 'This Month Until Now',
      offset: 0,
      value: null,
      operationOn: 'month',
      operationOnId: 3,
      isNow: true,
      displayName: $t(
        'dsm.timeline.this_month_until_now',
        'This Month Until Now'
      ),
    },
    {
      id: 19,
      operatorId: 51,
      label: 'Last 2 months',
      value: null,
      offset: -2,
      operationOn: 'month',
      operationOnId: 3,
      more: true,
      displayName: $t('dsm.timeline.last_2_months', 'Last 2 months'),
    },
    {
      id: 20,
      operatorId: 51,
      label: 'Last 4 months',
      offset: -4,
      value: null,
      operationOn: 'month',
      operationOnId: 3,
      more: true,
      displayName: $t('dsm.timeline.last_4_months', 'Last 4 months'),
    },
  ],
  Year: [
    {
      id: 21,
      operatorId: 44,
      label: 'This year',
      value: null,
      offset: 0,
      operationOn: 'year',
      operationOnId: 4,
      displayName: $t('dsm.timeline.this_year', 'This year'),
    },
    {
      id: 23,
      operatorId: 45,
      label: 'Last year',
      value: null,
      offset: -1,
      operationOn: 'year',
      operationOnId: 4,
      displayName: $t('dsm.timeline.last_year', 'Last year'),
    },
    {
      id: 24,
      operatorId: 46,
      label: 'This Year upto Now',
      value: null,
      offset: 0,
      operationOn: 'year',
      operationOnId: 4,
      isNow: true,
      displayName: $t('dsm.timeline.this_year_upto_now', 'This Year upto Now'),
    },
  ],
  Quarter: [
    {
      operatorId: 68,
      label: 'This Quarter',
      value: null,
      offset: 0,
      operationOn: 'quarter',
      operationOnId: 5,
      displayName: $t('dsm.timeline.this_quarter', 'This Quarter'),
    },
    {
      operatorId: 69,
      label: 'Last Quarter',
      value: null,
      offset: -1,
      operationOn: 'quarter',
      operationOnId: 5,
      displayName: $t('dsm.timeline.this_quarter', 'last_quarter'),
    },
  ],
}
const TITLE_HASH = {
  day: 'Today',
  week: 'This Week',
  month: 'This Month',
  year: 'This year',
  quarter: 'This Quarter',
}
const HEIGHT_HASH = {
  day: 316,
  week: 274,
  month: 232,
  year: 148,
  quarter: 106,
}
export default {
  name: 'FTimelineFilter',
  mixins: [ThemeMixin],
  props: {
    disableViews: {
      type: Array,
      default: () => [],
    },
    value: {
      type: undefined,
      default: '',
    },
    timeFormat: {
      type: Object,
      default: () => {},
    },
    timeZone: {
      type: String,
    },
    initalDate: {
      type: undefined,
      default: undefined,
    },
    dateType: {
      type: String,
      default: 'month',
      validator: (value) => {
        return ['year', 'quarter', 'month', 'week', 'day', 'day-time'].includes(
          value
        )
      },
    },
    selectType: {
      type: String,
      default: 'range',
      validator: (value) => {
        return ['range', 'single'].includes(value)
      },
    },
    operatorId: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
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
    emitOnInitialLoad: {
      type: Boolean,
      Default: false,
    },
    placement: {
      type: String,
      default: 'bottom-start',
      validator: (value) => {
        return [
          'top',
          'bottom',
          'right',
          'left',
          'bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
        ].includes(value)
      },
    },
  },
  data: () => ({
    val: 'month',
    tabsLists: [
      // { label: 'H', value: 'day-time' },
      { label: 'D', value: 'day' },
      { label: 'W', value: 'week' },
      { label: 'M', value: 'month' },
      { label: 'Q', value: 'quarter' },
      { label: 'Y', value: 'year' },
    ],
    isDropdownVisible: false,
    referenceDates: [],
    referenceTimes: [],
    selectedValues: [],
    selectedTime: [[], []],
    type: '0',
    SegmanetLists: [
      { label: $t('dsm.date_time.start', 'Start'), value: '0' },
      { label: $t('dsm.date_time.end', 'End'), value: '1' },
    ],
    currentView: 'month',
    preservedView: '',
    displayLabel: '',
    enableQuickFilter: false,
    openFilter: false,
    openMoreFilter: [false, false, false],
    selectedQuickFilter: {},
    isTillNow: false,
    buttonText: '',
    initialRecord: {},
    boxHeight: 0,
    hideApplyButton: false,
  }),
  computed: {
    formatedQuickRange() {
      let { startingDay } = this || 0
      let arr = cloneDeep(QUICK_RANGE_HASH)
      let records = []
      Object.values(arr).forEach((category) => {
        category.forEach((item) => {
          const startDayOfWeek = item.startDayOfWeek || startingDay // Default to Sunday
          item.value = setDateForLabel(
            item.label,
            item.offset,
            item.operationOn,
            startDayOfWeek
          )
          records.push(item)
        })
      })
      return arr
    },
    ckeckForOperatorId() {
      let { formatedQuickRange, operatorId, offset } = this || {}
      let foundObject = null
      let filterData = cloneDeep(formatedQuickRange)
      Object.values(filterData).some((category) => {
        foundObject = category.find(
          (obj) => obj.operatorId === operatorId && obj.offset === offset
        )
        return foundObject
      })
      if (!isEmpty(foundObject)) {
        return true
      } else {
        return false
      }
    },
    modelValue: {
      get() {
        return this.value || ''
      },
      set(value) {
        let [value0, value1] = value || []
        let currEndDate = getEndDate(this.currentView, value1)
        value0 = new Date(value0).getTime()
        value1 = currEndDate
        let converted = convertToTZ([value0, value1], this.timeZone)
        this.$emit('input', converted)
        this.$emit('change', converted)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
  },
  watch: {
    modelValue: {
      handler(value) {
        if (value.length == 2) {
          value = convertToLocalTZ(value, this.timeZone)
        }
        console.log('##### value changed: ', value)
        this.setReferenceDates(value)
        setTimeout(() => {
          this.buttonText = this.displayLabel
        }, 1)
      },
      immediate: true,
      deep: true,
    },
    value: {
      handler(val) {
        if (Array.isArray(val)) {
          this.setCurrentdate()
          let [value0, value1] = val || {}
          if (!isDateEmpty(value0) && !isDateEmpty(value1)) {
            this.selectedValues = undefined
          }
        }
      },
    },
    operatorId(newVal, oldVal) {
      if (newVal > 0 && oldVal !== newVal) {
        this.getQuickFilterData()
        this.isDropdownVisible = false
        console.log('operatorId change')
        this.openFilter = false
        if (!this.ckeckForOperatorId) {
          this.setCurrentdate()
          this.buttonText = this.displayLabel
        }
      }
    },
    dateType(newVal, oldVal) {
      if (
        !isEmpty(newVal) &&
        oldVal !== newVal &&
        !this.enableQuickFilter &&
        isEmpty(this.value)
      ) {
        console.log(this.value, 'datetype change')
        this.currentView = newVal
        this.setCurrentdate()
      }
      if (
        !isEmpty(newVal) &&
        oldVal !== newVal &&
        this.selectType === 'single'
      ) {
        this.selectedView(newVal, true)
      }
    },
    selectedValues: {
      handler(val) {
        let [val0, val1] = val || []
        this.getTagLabel(val0, val1)
      },
    },
    isDropdownVisible(val) {
      if (val) {
        this.scrollToIndex()
        this.initialRecord.type = this.currentView
        this.initialRecord.selectedValues = this.selectedValues
        this.initialRecord.referenceDates = this.referenceDates
        setTimeout(() => {
          this.setHeight()
        }, 6)
      }
      if (!val) {
        let {
          type,
          selectedValues,
          referenceDates,
          enableQuickFilter = false,
          selectedQuickFilter = {},
        } = this.initialRecord
        this.selectedValues = selectedValues
        this.referenceDates = referenceDates
        this.val = type
        this.currentView = type
        this.enableQuickFilter = enableQuickFilter
        this.selectedQuickFilter = selectedQuickFilter
      }
    },
    currentView: {
      handler(newVal, oldVal) {
        if (!isEmpty(newVal) && oldVal !== newVal) {
          this.$emit('dateType', newVal)
        }
      },
    },
  },
  created() {
    let { modelValue, dateType, value, operatorId, ckeckForOperatorId } = this
    this.selectedValues = modelValue || undefined
    this.currentView = dateType
    if (operatorId > 0) {
      this.getQuickFilterData()
      this.isDropdownVisible = false
      this.openFilter = false
      this.enableQuickFilter = true
    }
    if (!ckeckForOperatorId) {
      this.setCurrentdate()
    }
    if (!isEmpty(value) && this.emitOnInitialLoad) {
      this.$emit('change', value)
    }
    this.$nextTick(() => {
      if (isEmpty(value) && !ckeckForOperatorId) {
        this.buttonText = TITLE_HASH[this.currentView]
      } else {
        this.buttonText = this.displayLabel
      }
    })
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getTagLabel(val0, val1) {
      let { currentView, enableQuickFilter, selectedQuickFilter, startingDay } =
        this
      const day1 = val0.getDate()
      const month1 = val0.toLocaleString('en-us', { month: 'short' })
      const year1 = val0.getFullYear()
      const day2 = val1.getDate()
      const month2 = val1.toLocaleString('en-us', { month: 'short' })
      const year2 = val1.getFullYear()
      let isSameDate = val0.getTime() === val1.getTime()
      if (currentView === 'month') {
        this.displayLabel = `${month1} ${year1} - ${month2} ${year2}`
      } else if (currentView === 'day') {
        this.displayLabel = `${day1} ${month1} ${year1} - ${day2} ${month2} ${year2}`
      } else if (currentView === 'day-time') {
        this.displayLabel = `${day1} ${month1} ${year1} - ${day2} ${month2} ${year2}`
      } else if (currentView === 'year') {
        this.displayLabel = `${year1} - ${year2}`
      } else if (currentView === 'quarter') {
        let number1 = val0.getMonth() / 3 + 1
        let number2 = val1.getMonth() / 3 + 1
        this.displayLabel = `Q${number1} ${year1} - Q${number2} ${year2}`
      } else if (currentView === 'week') {
        // let startingDay = 0
        let number1 = getWeekNumber(val0, val0, startingDay)
        let number2 = getWeekNumber(val1, val1, startingDay)
        this.displayLabel = `W${number1} ${year1} - W${number2} ${year2}`
      } else {
        this.displayLabel = `${day1} ${month1} ${year1} - ${day2} ${month2} ${year2}`
      }
      // let startingDay = 0
      if (isSameDate && findForCurrentDate(val0, currentView, startingDay)) {
        this.displayLabel = TITLE_HASH[currentView]
      }
      if (enableQuickFilter) {
        this.displayLabel = selectedQuickFilter?.label
      } else {
        const match = this.displayLabel.match(/^(.+) - \1$/)
        if (match) {
          this.displayLabel = match[1]
        }
      }
    },
    setCurrentdate(val) {
      let { value, preservedView, timeFormat, dateType } = this || undefined
      let { is12Hour = false } = timeFormat || {}
      if (!isEmpty(value)) {
        value = convertToLocalTZ(value, this.timeZone)
        this.val = preservedView
        if (isEmpty(preservedView) && !isEmpty(dateType)) {
          this.preservedView = dateType
        }
        let dateArr = setRefsDate(this.preservedView, value)
        if (preservedView === 'day-time') {
          let [val1, val2] = value || []
          this.selectedTime[0] = millisecondsToTime(val1, is12Hour)
          this.selectedTime[1] = millisecondsToTime(val2, is12Hour)
        }
        this.setReferenceDates([new Date(dateArr[0]), new Date(dateArr[1])])
        this.selectedValues = [new Date(dateArr[0]), new Date(dateArr[1])]
      }
      if (isEmpty(value)) {
        let { dateType } = this
        this.selectedView(dateType, 'initial')
        this.val = dateType
      }
      if (val === 'open') {
        if (!isEmpty(this.selectedQuickFilter)) {
          this.enableQuickFilter = true
          this.type = '0'
        }
        setTimeout(() => {
          this.setHeight()
        }, 5)
      }
    },
    setHeight() {
      let element = this.$refs['children']?.$el
      let { clientHeight } = element || {}
      this.boxHeight = clientHeight
      document.getElementById('fquick-range').style.height = `${clientHeight}px`
    },
    getQuickFilterData() {
      let { formatedQuickRange, operatorId, offset } = this || {}
      let foundObject = null
      let filterData = cloneDeep(formatedQuickRange)
      Object.values(filterData).some((category) => {
        foundObject = category.find(
          (obj) => obj.operatorId === operatorId && obj.offset === offset
        )
        return foundObject
      })
      if (!isEmpty(foundObject)) {
        this.selectedQuickValue(foundObject, true)
      } else {
        this.setCurrentdate()
      }
    },
    getHeader() {
      const HeaderContainer = styled(FContainer)`
        ${this.getStyle('timelineHeader')};
      `
      return (
        <HeaderContainer>
          {/* {this.getQuickFilter()} */}
          {/* <FContainer>
            <FDivider height="24px" />
          </FContainer> */}
          {this.getTabs()}
          <FIcon
            group="dsm"
            name="close"
            pressable={true}
            size="16"
            vOn:click={() => (
              (this.isDropdownVisible = !this.isDropdownVisible),
              (this.openFilter = !this.openFilter),
              console.log('get header')
            )}
          ></FIcon>
        </HeaderContainer>
      )
    },
    scrollToIndex() {
      let { selectedQuickFilter, enableQuickFilter, selectType } = this
      let height = 0
      if (!isEmpty(selectedQuickFilter) && enableQuickFilter) {
        let { operationOn } = selectedQuickFilter
        const keysBefore = Object.keys(HEIGHT_HASH).slice(
          0,
          Object.keys(HEIGHT_HASH).indexOf(operationOn)
        )
        height = keysBefore.reduce(
          (accumulator, currentKey) => accumulator + HEIGHT_HASH[currentKey],
          0
        )
        height = height + 42 + 15
      }
      setTimeout(() => {
        if (selectType === 'range') {
          const container = document.getElementById('scrollContainer')
          container.scrollTo({
            top: height,
            behavior: 'smooth',
          })
        }
      }, 1)
    },
    getQuickRange() {
      let { formatedQuickRange, selectedQuickFilter } = this || {}
      let quickRange = cloneDeep(formatedQuickRange)
      let { label } = selectedQuickFilter
      const QuickRange = styled(FContainer)`
        ${this.getStyle('quickRange')};
      `
      return (
        this.isDropdownVisible && (
          <QuickRange width="216px" flexDirection="column">
            <FContainer
              padding="containerXLarge"
              width="100%"
              borderBottom="1px solid"
              borderColor="borderNeutralBaseSubtler"
            >
              {' '}
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerMedium"
                flex="1"
                height="24px"
              >
                <FIcon
                  group="webtabs"
                  name="energy"
                  pressable={false}
                  size="16"
                ></FIcon>
                <FText appearance="headingMed14">
                  {this.$t('dsm.timeline.quick_range', 'Quick Range')}
                </FText>
              </FContainer>
            </FContainer>
            <FContainer
              display="flex"
              gap="containerMedium"
              padding="containerMedium"
              flexDirection="column"
              height="calc(100% - 49px)"
              overflow="scroll"
              id="scrollContainer"
            >
              <FContainer
                padding="containerXLarge"
                height="42px"
                borderBottom="1px solid"
                borderColor="borderNeutralBaseSubtler"
              >
                <FText
                  appearance={
                    !this.enableQuickFilter ? 'headingMed14' : 'bodyReg14'
                  }
                  color={
                    !this.enableQuickFilter
                      ? 'backgroundPrimaryDefault'
                      : 'textMain'
                  }
                >
                  {this.$t('dsm.timeline.custom', 'Custom')}
                </FText>
              </FContainer>
              {Object.entries(quickRange).map(([key, category]) => (
                <FContainer
                  key={key}
                  borderBottom="1px solid"
                  borderColor="borderNeutralBaseSubtler"
                >
                  <FContainer
                    padding="containerMedium containerXLarge"
                    height="21px"
                    display="flex"
                    alignItems="center"
                  >
                    <FText appearance="captionMed10" color="textCaption">
                      {key}
                    </FText>
                  </FContainer>
                  {category.map((item) => (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      padding="containerXLarge"
                      height="42px"
                      cursor="pointer"
                      hover-backgroundColor="backgroundMidgroundMedium"
                      vOn:click={() => this.selectedQuickValue(item)}
                    >
                      <FText
                        key={item.label}
                        appearance={
                          label === item.label && this.enableQuickFilter
                            ? 'headingMed14'
                            : 'bodyReg14'
                        }
                        color={
                          label === item.label && this.enableQuickFilter
                            ? 'backgroundPrimaryDefault'
                            : 'textMain'
                        }
                      >
                        {item.displayName}
                      </FText>
                    </FContainer>
                  ))}
                </FContainer>
              ))}
            </FContainer>
          </QuickRange>
        )
      )
    },
    closePopover(key) {
      if (this.openMoreFilter[key]) {
        this.openMoreFilter[key] = false
      } else {
        this.openMoreFilter[key] = true
      }
    },
    selectedQuickValue(item, isCreated) {
      this.enableQuickFilter = true
      let { label: lable1 } = this.selectedQuickFilter || {}
      if (lable1 !== item.label) {
        this.selectedQuickFilter = item
        console.log(this.selectedQuickFilter, 'this.selectedQuickFilter')
        let { operationOn, value, label } = item || {}
        let [val0, val1] = value || []
        this.selectedView(operationOn, 'quick')
        this.val = operationOn
        this.setReferenceDates([val0, val1])
        this.selectedValues = [val0, val1]
        this.displayLabel = label
        if (isCreated) {
          this.onSubmit()
        } else {
          this.openFilter = !this.openFilter
          this.openMoreFilter = [false, false, false]
        }
      }
      if (this.$refs['childComponentRef-panel']) {
        this.$refs['childComponentRef-panel'].moveOutside()
      }
    },
    getTabs() {
      let { tabsLists } = this || []
      return (
        <FTabs
          v-model={this.val}
          tabsList={tabsLists}
          appearance="button"
          vOn:change={(val) => this.selectedView(val, true)}
        ></FTabs>
      )
    },
    selectedView(val, type) {
      let { startingDay } = this || 0
      this.currentView = val
      // let startingDay = 0
      let date = setCurrentValue(val, startingDay)
      this.selectedTime = [[], []]
      this.type = '1'
      if (!isEmpty(date.getTime())) {
        this.selectedValues = [date, date]
        this.referenceDates = [date, date]
      } else {
        this.selectedValues = undefined
      }
      if (type === 'initial') {
        let startDate = new Date(cloneDeep(date)).getTime()
        let endDate = getEndDate(this.currentView, cloneDeep(date))
        this.$emit('change', convertToTZ([startDate, endDate], this.timeZone))
      }
      if (type) {
        this.enableQuickFilter = false
        setTimeout(() => {
          this.setHeight()
        }, 5)
      }
      if (type === 'quick') {
        this.enableQuickFilter = true
        setTimeout(() => {
          this.setHeight()
        }, 5)
      }
      if (this.$refs['childComponentRef-panel']) {
        this.$refs['childComponentRef-panel'].moveOutside()
        this.hideApplyButton = false
      }
    },
    changeRefDate(value, index) {
      let { referenceDates, selectedValues } = this || {}
      referenceDates = referenceDates.map((ref, refIndex) => {
        if (refIndex === index) {
          return value
        } else {
          return ref
        }
      })
      let [val1, val0] = selectedValues || []
      if (isEmpty(selectedValues)) {
        referenceDates = [value, value]
      } else {
        if (val1.getTime() === val0.getTime()) referenceDates = [value, value]
      }
      let [ref0, ref1] = referenceDates || []
      if (ref0.getTime() === ref1.getTime()) this.referenceDates = [ref0, ref0]
      else this.referenceDates = referenceDates
    },
    setReferenceDates(value) {
      console.log('###### ref: ', value)
      if (isEmpty(value)) {
        this.referenceDates = [new Date(), new Date()]
        this.referenceTimes = [new Date(), setMonth(new Date(), (v) => v + 1)]
      } else {
        let [value0, value1] = value || {}
        if (isDateEmpty(value0) && isDateEmpty(value1)) {
          // both empty set consecutive months from current date
          this.referenceDates = [new Date(), setMonth(new Date(), (v) => v + 1)]
        } else if (
          !isDateEmpty(value0) &&
          !isDateEmpty(value1) &&
          value0.getMonth() === value1.getMonth()
        ) {
          // both not empty and same month then the right should be the same month calendar and the
          // next one should be the next month calendar
          this.referenceDates = [value0, value1]
        } else {
          value0 = !isDateEmpty(value0) ? value0 : new Date()
          value1 = !isDateEmpty(value1) ? value1 : new Date()
          if (value0.getMonth() === value1.getMonth()) {
            this.referenceDates = [value0, setMonth(value0, (v) => v + 1)]
          } else {
            this.referenceDates = [value0, value1]
          }
        }
      }
    },
    selectDateValue(value) {
      if (
        this.type === '1' &&
        value.getTime() < this.selectedValues[0].getTime()
      ) {
        this.type = '0'
      }
      if (this.selectType === 'single') {
        this.type = '0'
      }
      this.enableQuickFilter = false
      if (!isEmpty(this.selectedQuickFilter)) {
        this.selectedQuickFilter = {}
      }
      this.scrollToIndex()
      let { selectedValues, type, val } = this || {}

      if (isEmpty(selectedValues)) selectedValues = ['', '']

      let [value0, value1] = selectedValues || []
      if (isDateEmpty(value0) && isDateEmpty(value1)) {
        // both empty the value is the start date
        selectedValues[0] = value
        selectedValues[1] = value
      } else if (!isDateEmpty(value0) && !isDateEmpty(value1)) {
        // both not empty then value is the start date and the end
        // date should be empty
        if (type === '1') {
          selectedValues[1] = value
        } else {
          selectedValues[0] = value
          selectedValues[1] = value
        }
      } else if (isDateEmpty(value1)) {
        if (value.getTime() < value0.getTime()) {
          // if the value selected is less than the start date, then replace start and end
          selectedValues = [value, value0]
        } else {
          // else set it as the end date
          selectedValues[1] = value
        }
      }
      this.selectedValues = [...selectedValues]
      if (this.type === '0' && val !== 'day-time') {
        this.type = '1'
      }
      if (val === 'day' || val === 'day-time') {
        this.setReferenceDates(this.selectedValues)
      }
    },
    changeRefTime(val, index) {
      this.referenceTimes[index] = val
    },
    selectTimeValue(value) {
      let { type } = this
      if (type === '0') {
        this.selectedTime[0] = value
        if (isEmpty(this.selectedTime[1])) {
          this.selectedTime[1] = []
        }
      } else if (type === '1' && isEmpty(this.selectedTime[0])) {
        this.selectedTime[0] = []
        this.selectedTime[1] = value
      } else {
        this.selectedTime[1] = value
      }
    },
    hideApply(val) {
      // if (val === this.dateType) {
      //   this.hideApplyButton = false
      // } else {
      //   this.hideApplyButton = true
      // }
      console.log(val, this.dateType, 'datatype changes')
      this.hideApplyButton = val !== this.currentView
    },
    getBody() {
      let index = parseInt(this.type)
      const BodyContainer = styled(FContainer)`
        ${this.getStyle('timelineBody')};
      `
      return (
        <BodyContainer
          display="flex"
          justifyContent="center"
          width="100%"
          flexDirection="column"
        >
          {this.selectType === 'range' && this.getSegmentControl()}
          {this.isDropdownVisible && (
            <FDatePanel
              ref="childComponentRef-panel"
              id={`tab-${this.type}`}
              tab={this.type}
              startingDay={this.startingDay}
              referenceDate={this.referenceDates[index]}
              dateType={this.currentView}
              selectDate={(val) => this.selectDateValue(val)}
              selectTime={(val) => this.selectTimeValue(val)}
              timeFormat={this.timeFormat}
              selectedTime={this.selectedTime[this.type]}
              selectedDate={this.selectedValues}
              vOn:changeRefDate={(val) => this.changeRefDate(val, index)}
              vOn:changeType={(val) =>
                setTimeout(() => {
                  this.setHeight(val), this.hideApply(val)
                }, 5)
              }
              validateDate={this.validateDate}
            />
          )}
        </BodyContainer>
      )
    },
    getSTab(prop) {
      let { currentView, timeFormat, startingDay } = this
      let { is12Hour } = timeFormat || {}
      let { value } = prop
      let date = '',
        getMonth,
        day,
        year,
        displayTitle,
        isDatepresent = '',
        time,
        meridian = '',
        displayTime = ''
      // refsDate
      if (!isEmpty(this.selectedValues) && value === '0') {
        date = this.selectedValues[0]
        time = this.selectedTime[0]
        // refsDate = referenceDates[0]
      }
      if (!isEmpty(this.selectedValues) && value === '1') {
        date = this.selectedValues[1]
        time = this.selectedTime[1]
        // refsDate = referenceDates[1]
      }
      if (is12Hour) {
        meridian = time[2] || 'AM'
        if (!isEmpty(time[0]) || !isEmpty(time[1])) {
          displayTime = `${time[0] ? time[0] : '00'}:${
            time[1] ? time[1].toString().padStart(2, '0') : '00'
          } ${meridian}`
        }
      }
      isDatepresent = `${date}`
      if (!isEmpty(isDatepresent)) {
        getMonth = date.toLocaleString('default', {
          month: 'short',
        })
        day = date.getDate()
        year = date.getFullYear()
        if (currentView === 'day') {
          displayTitle = `${day} ${getMonth} ${year}`
        } else if (currentView === 'day-time') {
          displayTitle = `${day} ${getMonth} ${year} ${displayTime}`
        } else if (currentView === 'month') {
          let month = date.toLocaleString('default', {
            month: 'long',
          })
          displayTitle = `${month} ${year}`
        } else if (currentView === 'quarter') {
          let month = date.getMonth()
          let number = month / 3 + 1
          displayTitle = `Q${number} ${year}`
        } else if (currentView === 'year') {
          displayTitle = `${year}`
        } else if (currentView === 'week') {
          // let startingDay = 0
          let number = getWeekNumber(date, date, startingDay)
          displayTitle = `W${number} ${year}`
        }
      }
      const Container = styled(FContainer)`
        ${this.getStyle('segment')}
      `
      let displayName = currentView
      if (currentView === 'day') {
        displayName = 'date'
      }
      if (currentView === 'day-time') {
        displayName = 'date & time'
      }
      return (
        <Container>
          <FContainer
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            gap="containerSmall"
          >
            <FText appearance="captionMed12">
              {prop.label}{' '}
              {this.$t(`dsm.date_time.${displayName}`, `${displayName}`)}
            </FText>
            {isEmpty(isDatepresent) ? (
              <FText appearance="captionReg12" color="textCaption">
                {this.$t('dsm.attachment.select', 'Select')}
              </FText>
            ) : (
              <FText appearance="captionReg12" color="textMain">
                {displayTitle}
              </FText>
            )}
          </FContainer>
        </Container>
      )
    },
    getSegmentControl() {
      return (
        <FContainer
          padding="containerLarge"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          borderBottom="1px solid"
          borderColor="borderNeutralBaseSubtler"
        >
          <FSegmentedControl
            v-model={this.type}
            tabsList={this.SegmanetLists}
            vOn:change={(val) => (this.type = val)}
            tabWidth="100%"
            {...{
              scopedSlots: {
                ['tab.0']: (prop) => this.getSTab(prop),
                ['tab.1']: (prop) => this.getSTab(prop),
              },
            }}
          ></FSegmentedControl>
        </FContainer>
      )
    },
    getFooter() {
      {
        /* let { selectedValues } = this || {}
      let disabled = false
      if (isEmpty(selectedValues)) {
        disabled = true
      } */
      }
      const FooterContainer = styled(FContainer)`
        ${this.getStyle('timelineFooter')};
      `
      {
        /* const Tag = styled(FContainer)`
        ${this.getStyle('tagTitle')};
      ` */
      }

      return (
        <FooterContainer>
          <FContainer />
          <FButton
            vOn:click={() => this.onSubmit()}
            disabled={this.hideApplyButton}
          >
            {this.$t('dsm.timeline.apply', 'Apply')}
          </FButton>
        </FooterContainer>
      )
    },
    onSubmit(type) {
      this.initialRecord.selectedValues = cloneDeep(this.selectedValues)
      let {
        selectedValues,
        selectedTime,
        timeFormat,
        currentView,
        enableQuickFilter,
      } = this
      let { is12Hour = false } = timeFormat || {}
      let [value0, value1] = selectedValues || {}
      let [time0, time1] = selectedTime || {}
      if (!isDateEmpty(value0) && !isDateEmpty(value1)) {
        let date0 = new Date(value0).getTime()
        let start = setTimeForDate(value0, time0, is12Hour)
        let end = setTimeForDate(value1, time1, is12Hour)
        let endDate = getEndDate(this.currentView, value1)
        let date1 = endDate
        if (currentView === 'day-time') {
          date0 = start
          date1 = end
        }
        console.log(
          this.selectedQuickFilter,
          enableQuickFilter,
          'selectedQuickFilter'
        )
        if (enableQuickFilter) {
          if (
            !isEmpty(this.selectedQuickFilter) &&
            this.selectedQuickFilter.isNow
          )
            date1 = new Date().getTime()
        } else {
          this.selectedQuickFilter = ''
        }
        let converted = convertToTZ([date0, date1], this.timeZone)
        this.$emit('input', converted)
        this.$emit('change', converted, this.selectedQuickFilter)
        this.$emit('onApply', converted, this.selectedQuickFilter)
        this.initialRecord.type = this.currentView
        this.initialRecord.referenceDates = this.referenceDates
        this.initialRecord.selectedQuickFilter = this.selectedQuickFilter
        this.initialRecord.enableQuickFilter = this.enableQuickFilter
      } else if (!isDateEmpty(value0) && isDateEmpty(value1)) {
        this.modelValue = [value0, value0]
      }
      this.preservedView = this.currentView
      if (type) {
        this.openFilter = false
      } else {
        this.isDropdownVisible = false
      }
      const match = this.displayLabel.match(/^(.+) - \1$/)
      console.log('displayLabel: ', this.displayLabel)
      if (match) {
        this.buttonText = match[1]
      } else {
        this.buttonText = this.displayLabel
      }
    },
    gotoPrevious() {
      let { selectedValues, currentView } = this
      this.enableQuickFilter = false
      let date = setPrevioustDate(currentView, selectedValues)
      this.selectedValues = date
      setTimeout(() => {
        this.onSubmit()
        this.isDropdownVisible = false
      }, 1)
    },
    gotoNext() {
      let { selectedValues, currentView } = this
      this.enableQuickFilter = false
      let date = setNextDate(currentView, selectedValues)
      this.selectedValues = date
      setTimeout(() => {
        this.onSubmit()
        this.isDropdownVisible = false
      }, 1)
    },
  },
  render() {
    let { styleProps } = this
    const MainContainer = styled(FContainer)`
      ${styleProps};
    `
    return (
      <FContainer display="flex">
        <FButton appearance="tertiary" vOn:click={() => this.gotoPrevious()}>
          {' '}
          <fc-icon
            group="dsm"
            name="chevron-left"
            size="16"
            color="#1d384e"
          ></fc-icon>
        </FButton>
        <FPopover
          bgColor="transparent"
          placement={this.placement}
          trigger="clickToOpen"
          v-model={this.isDropdownVisible}
          vOn:show={() => {
            this.isDropdownVisible = true
          }}
        >
          <template slot="content">
            <FContainer
              display="flex"
              id="fquick-range"
              overflow="hidden"
              height={`${this.boxHeight}px`}
              transition="height 200ms"
            >
              {this.selectType === 'range' && this.getQuickRange()}
              <MainContainer
                width="fit-content"
                height="fit-content"
                ref="children"
              >
                {this.selectType === 'range' && this.getHeader()}
                {this.getBody()}
                {this.getFooter()}
              </MainContainer>
            </FContainer>
          </template>
          <FButton
            appearance="tertiary"
            vOn:click={() => this.setCurrentdate('open')}
          >
            {this.buttonText}
          </FButton>
        </FPopover>
        <FButton appearance="tertiary" vOn:click={() => this.gotoNext()}>
          <fc-icon
            group="dsm"
            name="chevron-right"
            size="16"
            color="#1d384e"
          ></fc-icon>
        </FButton>
      </FContainer>
    )
  },
}
</script>
