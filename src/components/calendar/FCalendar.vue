<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import moment from 'moment-timezone'
import { FText, FPopover, FContainer } from '../../index'
import { isEmpty } from '../../utils/validation'
import { isFunction } from 'lodash'

const MAX_COUNT_WEEK = 3
const MAX_COUNT_DAY = 5
export default {
  name: 'FCalendar',
  components: { VueCal },
  mixins: [ThemeMixin],
  props: {
    calendarEvents: {
      type: Array,
      default: () => [],
    },
    calendarView: {
      type: String,
      default: 'month',
      validator: (value) => {
        return ['month', 'week', 'day'].includes(value)
      },
    },
    timezone: {
      type: String,
      default: 'Etc/UTC',
    },
    referenceDate: {
      type: Number,
      default: 0,
    },
    availableViews: {
      type: Array,
      default: () => ['month'],
    },
    outOfScopeCellClicked: {
      type: Boolean,
      default: false,
    },
    startHour: {
      type: Number,
      default: 0,
    },
    endHour: {
      type: Number,
      default: 24,
    },
    timeStep: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      activeView: null,
      selectedDate: moment.tz(this.timezone).format('YYYY-MM-DD'),
      events: [],
      currentDay: null,
      eventClass: '',
      eventHeightClass: '',
      isEventClicked: false,
      selectedEventClass: '',
      isEventPopoverVisible: true,
    }
  },
  computed: {
    classObject() {
      let { activeView } = this
      let eventclass = ''
      if (activeView === 'month' || this.activeView === 'week') {
        eventclass = 'hide-header'
      }
      if (activeView === 'month') {
        eventclass = `${eventclass} event-height`
      }
      if (activeView === 'week') {
        eventclass = `${eventclass} activeWeekBorder`
      }
      if (activeView === 'day') {
        eventclass = `${eventclass} activeDayBorder`
      }
      return eventclass
    },
    timeZone() {
      let { timezone } = this
      return `GMT${moment(new Date()).tz(timezone).format('ZZ')}`
    },
    disableViews() {
      let allViews = ['years', 'year', 'month', 'week', 'day']
      let { availableViews } = this
      if (!isEmpty(availableViews)) {
        availableViews.forEach((item) => {
          allViews = allViews.filter((element) => element !== item)
        })
      }
      return allViews
    },
  },
  watch: {
    referenceDate(newVal, oldVal) {
      if (!isEmpty(newVal) && oldVal !== newVal) {
        this.moveToDate(newVal)
      }
    },
    currentDay(newVal, oldVal) {
      if (!isEmpty(newVal) && oldVal !== newVal) {
        this.$emit('currentDayChanged', newVal)
      }
    },
  },
  created() {
    let { referenceDate } = this || 0
    this.activeView = this.calendarView
    this.currentDay = moment().format('YYYY-MM-DD')
    if (!isEmpty(referenceDate) && referenceDate !== 0) {
      this.moveToDate(referenceDate)
    }
  },
  mounted() {
    this.removeExtraCell()
  },
  methods: {
    moveToDate(date) {
      let { timezone, outOfScopeCellClicked } = this
      const currentdate = moment.tz(date, timezone).format('YYYY-MM-DD')
      const currentMonth = moment().month()
      const dateMonth = moment(currentdate).month()
      const checkYear = moment().year() === moment(currentdate).year()
      if (currentMonth === dateMonth && checkYear && !outOfScopeCellClicked) {
        this.selectedDate = moment.tz(timezone).format('YYYY-MM-DD')
      } else {
        this.selectedDate = moment.tz(date, timezone).format('YYYY-MM-DD')
      }
      this.removeExtraCell()
    },
    removeExtraCell() {
      const { $el: vuecalEl } = this.$refs['vuecal'] ?? {}
      const cells = vuecalEl?.querySelectorAll('.vuecal__cell') ?? []
      let shouldAddExtraClass = false
      let shouldRemoveExtraClass = false
      let maxCellOfMonth = 35
      setTimeout(() => {
        if (!isEmpty(cells)) {
          Array.from(cells).forEach((cell, index) => {
            if (
              index === maxCellOfMonth &&
              Array.from(cell.classList).includes('vuecal__cell--out-of-scope')
            ) {
              shouldAddExtraClass = true
            }
            if (
              index === 35 &&
              !Array.from(cell.classList).includes('vuecal__cell--out-of-scope')
            ) {
              shouldRemoveExtraClass = true
            }
            if (shouldAddExtraClass) {
              cell.classList.add('extra-cell')
            }
            if (shouldRemoveExtraClass) {
              cell.classList.remove('extra-cell')
            }
          })
        }
      }, 5)
    },
    getStyle(value) {
      return this.getCustomStyle({ property: value })
    },
    gotoPrevious() {
      this.$refs.vuecal.previous()
      this.removeExtraCell()
    },
    gotoNext() {
      this.$refs.vuecal.next()
      this.removeExtraCell()
    },
    gotoToday() {
      this.selectedDate = moment.tz(this.timezone).format('YYYY-MM-DD')
      this.currentDay = moment.tz(this.timezone).format('YYYY-MM-DD')
      this.$refs.vuecal.switchView(this.activeView, this.currentDay)
      this.removeExtraCell()
    },
    extraEventsCount() {
      return <FContainer marginLeft="2px">View More</FContainer>
    },
    removeEventStyle(eventClass) {
      if (!isEmpty(eventClass)) {
        let resultClass = eventClass.split(' ')[0]
        let element = document.getElementsByClassName(resultClass)
        Array.from(element).forEach((box) => {
          box.classList.remove('targetEvent')
        })
      }
    },
    onEventClick(event) {
      let { activeView } = this
      if (activeView === 'week') {
        this.eventClass = 'event_clicked'
        this.isEventClicked = true
      }
      if (activeView === 'month') {
        this.eventClass = 'month_event_clicked'
        this.isEventClicked = true
      }
      let { title: eventTitle } = event || {}
      if (eventTitle !== 'more') {
        if (
          !isEmpty(this.selectedEventClass) &&
          this.selectedEventClass !== event.class
        ) {
          this.removeEventStyle(this.selectedEventClass)
        }
        this.selectedEventClass = event.class
        let resultClass = event.class.split(' ')[0]
        let element = document.getElementsByClassName(resultClass)
        Array.from(element).forEach((box) => {
          box.classList.add('targetEvent')
        })
        this.$emit('eventClick', event)
      }
    },
    onCellFocused(cellData) {
      if (this.isEventClicked) {
        this.isEventClicked = false
      }
      this.currentDay = moment(cellData).format('YYYY-MM-DD')
      this.eventClass = ''
      this.removeEventStyle(this.selectedEventClass)
      let startTimeinMill = moment(cellData).format('YYYY-MM-DD')
      let formatedStartTime = moment(startTimeinMill).valueOf()
      let endTimeinMilli = moment(formatedStartTime - 1)
        .add(1, 'day')
        .valueOf()
      this.$emit('OnCellClick', {
        startDate: startTimeinMill,
        endDate: endTimeinMilli,
      })
    },
    onCellClicked(dateObj) {
      let { date: currentDate } = dateObj || {}
      console.log(typeof currentDate)
      if (typeof currentDate === 'object') {
        this.currentDay = moment(new Date(currentDate)).format('YYYY-MM-DD')
      }
      this.eventClass = ''
      if (this.isEventClicked) {
        this.isEventClicked = false
      }
      this.removeEventStyle(this.selectedEventClass)
    },
    viewMoreEvents(event) {
      let { activeView } = this
      let startTimeinMill
      let endTimeinMilli
      let { startDate: startTime } = event || {}
      if (activeView === 'month') {
        startTimeinMill = moment(moment(startTime).format('YYYY-MM-DD HH:mm'))
          .startOf('day')
          .format('x')
        endTimeinMilli = moment(startTimeinMill - 1)
          .add(1, 'day')
          .format('x')
      } else {
        startTimeinMill = moment(moment(startTime).format('YYYY-MM-DD HH:mm'))
          .startOf('hour')
          .format('x')
        endTimeinMilli = moment(startTimeinMill - 1)
          .add(1, 'hour')
          .format('x')
      }
      this.removeEventStyle(this.selectedEventClass)
      this.$emit('OnViewMoreClick', {
        calendarView: activeView,
        startDate: moment(event.start).format('YYYY-MM-DD'),
        endDate: endTimeinMilli,
      })
    },
    onViewChange(viewObj) {
      this.removeExtraCell()
      let { view: currentView, startDate, endDate } = viewObj || {}
      let start = moment(new Date(startDate)).format('YYYY-MM-DD')
      let end = moment(new Date(endDate)).format('YYYY-MM-DD')
      let startDay = moment(start).format('dddd')
      let numberOfDays = moment(end).daysInMonth()
      if (
        (startDay === 'Saturday' || startDay === 'Sunday') &&
        numberOfDays === 31
      ) {
        this.eventHeightClass = 'smaller-cell'
      } else {
        this.eventHeightClass = 'bigger-cell'
      }
      this.$emit('viewChanged', viewObj)
      this.activeView = currentView
      this.eventClass = ''
    },
    getDayInWeek(obj) {
      let { activeView } = this
      if (activeView === 'week') {
        let { date: dateStr } = obj || {}
        let dayNumber = moment(dateStr, 'ddd MMM DD YYYY HH:mm:ss').format('DD')
        return dayNumber
      } else {
        return false
      }
    },
    displayDayTitle(view, title) {
      if (view.id === 'day') {
        let dayName = moment(title, 'dddd MMMM Do, YYYY').format('dddd')
        let dayNumber = moment(title, 'dddd MMMM Do, YYYY').format('DD')
        return `${dayName} ${dayNumber}`
      } else {
        return title
      }
    },
    eventsConatiner(event) {
      let {
        displayStartTime: startTime,
        displayEndTime: endTime,
        title: eventTitle,
        bgColor: color,
        isBorder,
        borderColor,
      } = event || {}
      let { activeView } = this || {}
      const Events = styled(FContainer)`
        ${this.getStyle('events')}
        ${this.calendarView !== 'month' && 'border-radius: 4px;'}
      `
      const MonthEvent = styled('span')`
        ${this.getStyle('monthEvent')}
      `
      const WeekEvent = styled('span')`
        ${this.getStyle('weekEvent')}
        width:100%;
      `
      const EventText = styled(FText)`
        ${this.getStyle('eventText')}
      `
      const Container = styled(FContainer)`
        ${this.getStyle('weekTitle')}
      `
      return (
        <FPopover
          placement="bottom"
          trigger="clickToOpen"
          containerWidth={true}
        >
          <Events
            backgroundColor={color}
            border={isBorder ? `1px solid ` : 'none'}
            borderColor={borderColor}
            class="starting-event"
            vOn:click={() => this.onEventClick(event)}
          >
            {activeView === 'month' ? (
              <MonthEvent class="middle-event">{eventTitle}</MonthEvent>
            ) : (
              <WeekEvent>
                <Container height="16px">
                  <EventText appearance="captionMed12">
                    {' '}
                    {event.title}{' '}
                  </EventText>
                </Container>
                <Container height="16px">
                  <EventText appearance="captionReg10">
                    {startTime} - {endTime}
                  </EventText>
                </Container>
              </WeekEvent>
            )}
          </Events>
          <div slot="content">
            {this.activeView === 'month' &&
              event.title !== 'dummy' &&
              this.eventSlots('event', event)}
          </div>
        </FPopover>
      )
    },
    getWeekHeading(heading) {
      let { currentDay, isEventClicked } = this || null
      let { label: weekHeading, today: isToday, date: day } = heading || {}
      let weekDay = moment(new Date(day)).format('YYYY-MM-DD')
      let showBorder = currentDay === weekDay && !isEventClicked
      const WeekHeading = styled('div')`
        ${this.getStyle('weekdayHeading')}
        ${isToday
          ? 'color: #007adb;background-color:#F0F6FF;'
          : 'color: #1d384e;'}
        ${showBorder
          ? this.getStyle('weekdayHeadingToday')
          : 'border: 0.5px solid #f1f2f4;'}
      `
      const Text = styled(FText)`
        ${'display:flex;gap:8px'}
      `
      return (
        <WeekHeading>
          {this.activeView === 'month' && (
            <FText appearance="headingMed14">{weekHeading.slice(0, 3)} </FText>
          )}

          {this.getDayInWeek(heading) && (
            <Text appearance="headingMed14">
              <div>{weekHeading.slice(0, 3)} </div>
              <FText appearance="headingMed14">
                {' '}
                {this.getDayInWeek(heading)}
              </FText>
            </Text>
          )}
        </WeekHeading>
      )
    },
    onDateClick() {
      //need to be included once day view is supported
      // this.activeView = 'day'
    },
    eventSlots(type, event) {
      let { $scopedSlots } = this || {}
      let { [type]: component } = $scopedSlots || {}
      if (isFunction(component) && type === 'event') {
        return <div ref={`cal-${type}`}>{component && component(event)}</div>
      }
    },
    getCellContent(cell) {
      let { timezone, activeView } = this
      let {
        outOfScope: inActiveCell,
        content: cellContent,
        formattedDate,
      } = cell || {}
      let isToday = false
      if (activeView === 'month') {
        let todayDate = moment.tz(timezone).format('YYYY-MM-DD')
        isToday = todayDate === formattedDate
      }
      const CellContent = styled('div')`
        ${this.getStyle('cellContent')}
        ${inActiveCell ? 'opacity: 1;' : 'opacity: 1;'}
      `
      const TextContainer = styled('div')`
        z-index: 3;
      `
      const Text = styled(FText)`
        ${this.getStyle('cellSelect')}
        ${isToday ? this.getStyle('todayCell') : this.getStyle('normalCell')}
          ${inActiveCell ? 'opacity: 0.4;' : 'opacity: 1;'}
      `
      return (
        <CellContent>
          {this.activeView === 'month' && (
            <TextContainer vOn:click={() => this.onDateClick()}>
              <Text appearance="headingMed16">{cellContent}</Text>
            </TextContainer>
          )}
        </CellContent>
      )
    },
    viewMoreWeek(event) {
      let { activeView } = this
      let { totalEvent: totalCount } = event || {}
      let count
      if (activeView === 'week') {
        count = totalCount - MAX_COUNT_WEEK
      } else {
        count = totalCount - MAX_COUNT_DAY
      }
      const ViewMoreWeek = styled('div')`
        ${this.getStyle('viewMoreWeek')}
      `
      return (
        <ViewMoreWeek>
          <FText appearance="captionReg12">{count} more</FText>
        </ViewMoreWeek>
      )
    },
    printTime(hours) {
      let currentHour = hours
      let displayHour = ''
      if (hours > 12) {
        currentHour = hours - 12
      }
      // currentHour = currentHour.toString().padStart(2, '0')
      // if (hours >= 12) {
      //   displayHour = `${currentHour}:00 PM`
      // } else {
      //   displayHour = `${currentHour}:00 AM`
      // }
      if (hours >= 12) {
        displayHour = `${currentHour} pm`
      } else {
        displayHour = `${currentHour} am`
      }
      if (hours === 0) {
        displayHour = ''
      }
      return (
        <div class="vuecal__time-cell-line">
          <div class="time-cell">
            <FText appearance="captionReg12" class="time-cell-label">
              {displayHour}
            </FText>
          </div>
        </div>
      )
    },
  },
  render() {
    let { timeStep, startHour, endHour } = this
    const TableHeaderCell = styled('div')`
      ${this.getStyle('calendarHeader')};
      ${this.getStyle('dayHeader')};
    `
    const ViewMore = styled('div')`
      ${this.getStyle('viewMore')}
    `
    const TimeZone = styled('div')`
      ${this.getStyle('timezone')}
    `
    const MainContainer = styled('div')`
      height: 100%;
    `

    return (
      <MainContainer class="dsm-calendar-container">
        {this.activeView !== 'month' && (
          <TimeZone>
            <FText appearance="captionReg10" color="textCaption">
              {this.timeZone}
            </FText>
          </TimeZone>
        )}
        <vue-cal
          ref="vuecal"
          active-view={this.activeView}
          class={`${this.classObject}  ${this.eventClass} ${this.eventHeightClass}`}
          hide-view-selector
          timeCellHeight={50}
          disable-views={this.disableViews}
          events-on-month-view="short"
          time-from={startHour * 60}
          time-to={endHour * 60}
          timeStep={timeStep * 60}
          editable-events={false}
          twelveHour={true}
          events={this.calendarEvents}
          vOn:view-change={this.onViewChange}
          vOn:ready={this.onViewChange}
          vOn:cell-focus={this.onCellFocused}
          vOn:cell-click={this.onCellClicked}
          dblclick-to-navigate={false}
          startWeekOnSunday={false}
          watchRealTime={true}
          selected-date={this.selectedDate}
          {...{
            scopedSlots: {
              title: ({ title, view }) => (
                <TableHeaderCell>
                  <FText appearance="headingMed14">
                    {' '}
                    {this.displayDayTitle(view, title)}
                  </FText>
                </TableHeaderCell>
              ),
              event: ({ event }) => (
                <div>
                  {event.title !== 'more' ? (
                    this.eventsConatiner(event)
                  ) : (
                    <ViewMore vOn:click={() => this.viewMoreEvents(event)}>
                      {this.activeView === 'month'
                        ? this.extraEventsCount(event)
                        : this.viewMoreWeek(event)}
                    </ViewMore>
                  )}
                </div>
              ),
              'cell-content': ({ cell }) => this.getCellContent(cell),
              'weekday-heading': ({ heading }) => this.getWeekHeading(heading),
              'time-cell': ({ hours }) => this.printTime(hours),
            },
          }}
        ></vue-cal>
      </MainContainer>
    )
  },
}
</script>

<style>
.event-height .view-more-event {
  position: absolute;
  bottom: 0;
  left: 5px;
}
.vuecal {
  border-bottom-left-radius: 5px;
}
.event-height .vuecal__cell-events .targetEvent {
  box-shadow: 1px 1px 6px #0003;
}
.event-height .vuecal__cell .vuecal__cell-events .targetEvent.event-start {
  box-shadow: 12px 1px 6px #0003;
}
.event-height .vuecal__cell .vuecal__cell-events .targetEvent.event-end {
  box-shadow: -12px 1px 6px #0003;
}
.event-height
  .vuecal__cell--day1
  .vuecal__cell-events
  .targetEvent.event-middle {
  box-shadow: 5px 1px 6px #0003;
}
.event-height .month-view .extra-cell {
  display: none;
}
.vuecal__weekdays-headings > div:last-of-type,
.vuecal__weekdays-headings > div:last-of-type .weekday-label > div:first-child {
  border-top-right-radius: 0px;
  border-right: 0.5px solid #f1f2f4;
}
.event-height
  .vuecal__weekdays-headings
  > div:first-of-type
  .weekday-label
  > div:first-child {
  border-top-left-radius: 0px;
  border-left: 1px solid #f1f2f4;
}
.event-height .vuecal__cell--day7 .vuecal__cell-events {
  padding-right: 5px;
}
.event-height .vuecal__cell--day1 .vuecal__cell-events {
  padding-left: 5px;
}
.event-height .vuecal__cell--day1 .vuecal__cell-events .event-start {
  padding-left: 0px;
}
.event-height .vuecal__cell-events .event-start {
  padding-left: 5px;
}
.event-height .vuecal__cell-events .event-end .starting-event {
  box-sizing: border-box;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-left: 5px;
}
.event-height .vuecal__cell-events .event-start .starting-event {
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 5px;
}
.event-height
  .vuecal__flex
  .vuecal__cell--day1
  .vuecal__cell-content
  .vuecal__cell-events
  .event-middle
  .starting-event {
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 5px;
}
.event-height
  .vuecal__flex
  .vuecal__cell--day7
  .vuecal__cell-content
  .vuecal__cell-events
  .event-middle
  .starting-event {
  box-sizing: border-box;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.event-height
  .vuecal__flex
  .vuecal__cell--day7
  .vuecal__cell-content
  .vuecal__cell-events
  .event-start
  .starting-event {
  box-sizing: border-box;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.event-height .vuecal__cell-events .event-end {
  width: 100%;
}
.vuecal__body {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.hide-header .vuecal__title-bar {
  display: none;
}
.vuecal__now-line {
  display: none;
}
.vuecal__header {
  border-bottom: 1px solid #ededed;
}
.vuecal__title-bar {
  visibility: hidden;
}
.vuecal__cells.month-view .add-cell-height {
  height: 16.66%;
}
.smaller-cell .vuecal__flex .vuecal__cells.month-view .vuecal__cell {
  height: 16.66%;
}
.event-height .vuecal__flex .vuecal__cells.month-view .dummy {
  opacity: 0;
  pointer-events: none;
}
.bigger-cell .vuecal__flex .vuecal__cells.month-view .vuecal__cell {
  height: 19.9%;
}
.event-height .vuecal__flex .vuecal__cells.month-view .removed-cell-height {
  height: 19.9%;
}
.vuecal--month-view.event-height .vuecal__heading {
  height: 40px;
}
.activeWeekBorder .vuecal__weekdays-headings {
  height: 40px;
  width: 99.92%;
}
.activeDayBorder .vuecal__header {
  height: 40px;
}
.event-height .vuecal__cell-events {
  height: 100%;
  overflow: hidden;
}
.event-height .vuecal__event {
  margin: 4px 0 4px;
}
.vuecal__cell--has-events {
  padding: 0px;
}
.vuecal--month-view .vuecal__cell-content {
  justify-content: start;
}
.vuecal__event div:first-of-type {
  height: 100%;
}
.vuecal__event {
  background-color: transparent;
}
.vuecal__header .vuecal__weekdays-headings {
  border-bottom: 0;
}
.vuecal--twelve-hour .vuecal__time-column {
  width: 72px;
}
.vuecal--view-with-time.vuecal--twelve-hour .vuecal__weekdays-headings {
  padding-left: 5em;
}
.event-height .vuecal__cell--selected:before {
  border: 1px solid #0074d1;
  z-index: 2;
  left: -1px;
}
.event-height .vuecal__flex .vuecal__cell--day1.vuecal__cell--selected:before {
  left: 0px;
}
.event-height .vuecal__cell--selected .vuecal__cell-events {
  z-index: 2;
  width: 100%;
}
.month_event_clicked .vuecal__flex .vuecal__cell--selected:before {
  border: 1px solid #0074d1;
  z-index: 0;
}
.event_clicked .vuecal__flex .vuecal__cell--selected {
  border: 1px solid #f0f0f0;
  background-color: transparent;
  border-top: 0;
}
.vuecal__cell--selected {
  background-color: #fff;
}
.activeWeekBorder .vuecal__cell--selected {
  /* border: 1px solid #0074d1; */
  background-color: transparent;
}
.activeWeekBorder .vuecal__flex .vuecal__cell--selected {
  padding: 0px 3px;
}
.activeWeekBorder .vuecal__cell--selected {
  border-top: 0;
}
.vuecal__time-column .vuecal__time-cell {
  font-family: Roboto;
  font-size: 12px;
  color: #1d384e;
}
.vuecal__cell--today {
  background-color: transparent;
}
.vuecal__event--focus,
.vuecal__event,
.vuecal__event:focus {
  box-shadow: none;
  outline: none;
  transition: none;
}
.vuecal__event--focus {
  z-index: 2;
}
.vuecal:not(.vuecal--dragging-event) .vuecal__event:hover {
  z-index: 1;
}
.bigger-cell
  .vuecal__body
  .month-view
  .vuecal__flex
  .vuecal__cell:nth-last-child(14):before {
  border-bottom-left-radius: 5px;
}
.smaller-cell
  .vuecal__body
  .month-view
  .vuecal__flex
  .vuecal__cell:nth-last-child(7):before {
  border-bottom-left-radius: 5px;
}
.vuecal__event > div:nth-child(2) {
  height: 100%;
}
.event-middle .middle-event {
  visibility: hidden;
}
.event-end .middle-event {
  visibility: hidden;
}
.vuecal__cell--day1
  .vuecal__cell-content
  .vuecal__cell-events
  .event-middle
  .middle-event {
  visibility: visible;
}
.vuecal__cell--day1
  .vuecal__cell-content
  .vuecal__cell-events
  .event-end
  .middle-event {
  visibility: visible;
}
.activeWeekBorder .vuecal__event {
  border: 1px solid #fff;
  margin-top: 1px;
}
.activeWeekBorder .vuecal__cell {
  padding: 0px 4px;
}
.activeDayBorder .vuecal__event {
  border: 1px solid #fff;
}
.activeWeekBorder,
.activeDayBorder {
  border-bottom: 1px solid #f0f0f0;
}
.activeDayBorder .vuecal__cell {
  padding: 0px 4px;
}
.event-height .event-start .starting-event {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  margin-left: 2px;
}
.event-height .event-end .starting-event {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-right: 2px;
}
.event-height .single-day-event {
  width: 97%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.event-height .vuecal__flex .vuecal__cell--day7 .single-day-event {
  width: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.event-height
  .vuecal__cell--day1
  .vuecal__cell-content
  .vuecal__cell-events
  .event-middle
  .starting-event,
.event-height
  .vuecal__cell--day1
  .vuecal__cell-content
  .vuecal__cell-events
  .event-end
  .starting-event {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-left: 2px;
}
.event-height
  .vuecal__cell--day7
  .vuecal__cell-content
  .vuecal__cell-events
  .event-middle
  .starting-event,
.event-height
  .vuecal__cell--day7
  .vuecal__cell-content
  .vuecal__cell-events
  .event-end
  .starting-event,
.event-height
  .vuecal__cell--day7
  .vuecal__cell-content
  .vuecal__cell-events
  .event-start
  .starting-event {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-right: 2px;
}
.vuecal__time-column .vuecal__time-cell-line:before {
  /* left: 5px; */
  left: 60px;
}
.vuecal__time-cell-line .time-cell {
  position: relative;
}
.vuecal__time-cell-line .time-cell .time-cell-label {
  position: absolute;
  /* left: 8px; */
  left: 20px;
  top: -8px;
  padding-right: 5px;
  background: #fff;
}
/*css to remove animation effect while view is changed*/
.slide-fade--left-enter-active,
.slide-fade--left-leave-active,
.slide-fade--right-enter-active,
.slide-fade--right-leave-active {
  transition: 0s ease-out;
}
.vuecal__title-bar .slide-fade--left-leave-active,
.vuecal__title-bar .slide-fade--right-leave-active {
  left: 0;
  right: 0;
  height: auto;
  display: none;
}
.vuecal__heading .slide-fade--left-leave-active,
.vuecal__heading .slide-fade--right-leave-active {
  display: flex;
  align-items: center;
  display: none;
}
.vuecal--week-view .vuecal__heading {
  height: 100%;
}
</style>
<style lang="scss">
.dsm-calendar-container {
  .event-height {
    .vuecal__cell--day1,
    .vuecal__cell--day2,
    .vuecal__cell--day3,
    .vuecal__cell--day4,
    .vuecal__cell--day5,
    .vuecal__cell--day6 {
      .vuecal__cell-events {
        .event-end {
          padding-right: 5px;
        }
      }
    }
  }
  .activeWeekBorder,
  .activeDayBorder {
    .vuecal__time-column .vuecal__time-cell:first-child {
      .time-cell-label {
        visibility: hidden;
      }
    }
  }
}
</style>
