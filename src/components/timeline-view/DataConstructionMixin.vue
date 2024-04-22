<script>
import { isEmpty, isArray } from '../../utils/validation'
import { sortBy, orderBy } from 'lodash'
import getProperty from 'dlv'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)

const getMoment = (timezone, dateObj) => {
  return dayjs.tz(dateObj, timezone)
}
const formatDate = (date, { timezone, dateformat, timeformat }) => {
  return getMoment(timezone, date).format(dateformat + ' ' + timeformat)
}
const viewState = {
  1: { gridLines: '1H' },
  2: { gridLines: 'DAY' },
  3: { gridLines: 'DAY' },
  4: { gridLines: 'WEEK' },
}
const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
// const viewDisplayValue = {
//   DAY: 1,
//   WEEK: 2,
//   MONTH: 3,
//   YEAR: 4,
// }

export default {
  data: () => ({
    loading: true,
    headerGridColumns: [],
    eventList: {},
    eventsPositionMap: {},
    eventCount: {},
  }),
  computed: {
    blockDivision() {
      return this.headerGridColumns.length
    },
    currentViewTime() {
      return this.getTimeStamp().startOf('day').valueOf()
    },
    groupingListIds() {
      return (this.groupingListArr || []).map(
        (pickListItem) => pickListItem.value
      )
    },
    blockTime() {
      const blockTimeInMS = {
        HOUR: 3600300,
        WEEK: 604800000,
        DAY: 86400000,
      }
      return this.isYearView
        ? blockTimeInMS.WEEK
        : this.isDayView
        ? blockTimeInMS.HOUR
        : blockTimeInMS.DAY
    },
    maxResultPerCell() {
      return 3
      //   return this.currentView === viewDisplayValue.YEAR ? 3 : 5
    },
  },
  methods: {
    getTimeStamp(timeStamp) {
      return getMoment(this.timezone, timeStamp)
    },
    constructData() {
      this.constructHeaderColumnData()
      this.constructSchedulerData()
    },
    constructHeaderColumnData() {
      this.headerGridColumns = []

      let { currentTimeLimit, currentView: view, getTimeStamp } = this
      let { startTime, endTime } = currentTimeLimit || {}
      let currentTimeStamp = startTime

      while (currentTimeStamp <= endTime) {
        let weekVal = getTimeStamp(currentTimeStamp).format('w')
        let endTimeStamp = this.getNextTimeStamp(
          currentTimeStamp,
          viewState[view].gridLines,
          weekVal
        )
        let gridColumnObj = {
          startTime: currentTimeStamp,
          endTime: endTimeStamp - 1,
          date: getTimeStamp(currentTimeStamp).get('date'),
          day: weekdays[getTimeStamp(currentTimeStamp).day()],
          year: getTimeStamp(currentTimeStamp).get('year'),
          time: getTimeStamp(currentTimeStamp).format('h a'),
          week: weekVal + ' W',
        }

        this.headerGridColumns.push(gridColumnObj)
        currentTimeStamp = endTimeStamp
      }
    },
    constructSchedulerData() {
      this.loading = true
      this.constructTsCount()
      this.constructEventList()
      this.constructEventPosition()
      this.$nextTick(() => {
        this.loading = false

        this.$nextTick(() => {
          if (this.todayIndex > -1) {
            this.scrollCurrentBlock(`header-${this.todayIndex}`)
          }
        })
      })
    },
    getMaxCount(grpEvent) {
      return grpEvent.reduce((maxCount, rowCount) => {
        maxCount = rowCount > maxCount ? rowCount : maxCount
        return maxCount
      }, 0)
    },
    constructTsCount() {
      let { schedulerData, headerGridColumns, groupingListIds } = this

      groupingListIds.forEach((grpId) => {
        let rowCount = headerGridColumns.map((grid) => {
          let { startTime, endTime } = grid || {}
          let availableTS = schedulerData[grpId] || {}
          let timeStampsBtwGridCol = Object.keys(availableTS)
            .filter(
              (ts) => startTime <= parseInt(ts) && endTime >= parseInt(ts)
            )
            .map((ts) => parseInt(ts))
          return timeStampsBtwGridCol.reduce((totalCount, ts) => {
            let { count } = availableTS[ts] || {}
            totalCount += count
            return totalCount
          }, 0)
        })

        let maxCount = this.getMaxCount(rowCount)

        if (maxCount) {
          this.eventCount[grpId] = { rowCount, maxCount }
        }
      })
    },
    getGrpEventList(grpId) {
      return Object.values(this.schedulerData[grpId] || {}).reduce(
        (eventList, tsEvents) => {
          let { list } = tsEvents || {}
          let dataList = list.map((dataObj) => {
            let { data, customization } = dataObj || {}
            let colorObj = (customization && JSON.parse(customization)) || {}

            return { ...data, ...colorObj }
          })
          eventList = [...eventList, ...dataList]
          return eventList
        },
        []
      )
    },
    updateRowTotalCount(grpId) {
      let { maxCount, rowCount } = this.eventCount[grpId] || {}

      if (rowCount) {
        maxCount = this.getMaxCount(rowCount)

        if (maxCount) {
          this.eventCount[grpId] = { rowCount, maxCount }
        } else {
          delete this.eventCount[grpId]
        }
      }
    },
    constructEventList(eventGrpId) {
      let { groupingListIds } = this

      if (!isEmpty(eventGrpId)) {
        this.eventList[eventGrpId] = this.getEventListForGrp(eventGrpId)
        this.updateRowTotalCount(eventGrpId)
      } else {
        this.eventList = {}
        groupingListIds.forEach((grpId) => {
          this.eventList[grpId] = this.getEventListForGrp(grpId)
          this.updateRowTotalCount(grpId)
        })
      }
    },
    getBlockEventForGivenTS({ eventList, timeStampKey, currentTS }) {
      let { startTimeKey, endTimeKey } = timeStampKey || {}
      let { startTime, endTime } = currentTS || {}

      return eventList.filter((eventObj) => {
        let { [startTimeKey]: workStart, [endTimeKey]: actualWorkEnd } =
          eventObj || {}
        let workEnd = workStart > actualWorkEnd ? null : actualWorkEnd - 1

        return (
          (startTime <= workStart && endTime >= workStart) ||
          (startTime <= workEnd && endTime >= workEnd) ||
          (workStart < startTime && workEnd > endTime)
        )
      })
    },
    constructBlockEvents({
      blockEventList,
      calenderDetails,
      grpId,
      blockIndex,
      grid,
    }) {
      let { blockDivision, currentTimeLimit, blockTime, mainFieldName } = this
      let { startTimeKey, endTimeKey } = calenderDetails || {}

      return blockEventList.map((eventObj) => {
        let {
          [startTimeKey]: workStart,
          [endTimeKey]: actualWorkEnd,
          [mainFieldName]: name,
          id,
          eventColor = '#4d95ff',
          moduleState,
        } = eventObj || {}
        let { startTime, endTime } = grid

        let hasAfterLimit = false
        let hasBeforeLimit = false
        let blockSpan = 1
        let width = 1
        let className = ''
        let workEnd = workStart > actualWorkEnd ? null : actualWorkEnd - 1

        let { startTime: currentST } = currentTimeLimit
        if (workStart < currentST) {
          hasBeforeLimit = true
        }

        if (isEmpty(workEnd)) {
          workEnd = workStart + 3600000 //Default event endTime is 1hr ahead of startTime
        }

        let startScope =
          (startTime <= workStart && endTime >= workStart) ||
          (blockIndex === 0 && hasBeforeLimit)
        let endScope = workEnd >= startTime && workEnd <= endTime

        if (startScope) {
          if (endTime < workEnd) {
            width += Math.ceil((workEnd - endTime) / blockTime)
            blockSpan = width

            if (width > blockDivision - blockIndex) {
              width = blockDivision - blockIndex
              hasAfterLimit = true
            }
          }
        } else {
          className = 'transparent'
        }

        let {
          hasAssignEnabled,
          hasRescheduleEnabled,
          hasReAssignEnabled,
          disabledPastEvents,
          currentViewTime,
          updatePermission,
          isLocked,
        } = this
        let canEdit =
          startScope &&
          updatePermission &&
          (hasRescheduleEnabled ||
            hasReAssignEnabled ||
            (hasAssignEnabled && parseInt(grpId) === -1)) &&
          (!disabledPastEvents ||
            (disabledPastEvents && workStart > currentViewTime))
        let draggable = !hasBeforeLimit && canEdit
        let disableResize = !(
          updatePermission &&
          !isLocked &&
          hasRescheduleEnabled
        )
        let startResizeDisabled =
          !startScope ||
          disableResize ||
          (disabledPastEvents && workStart < currentViewTime)
        let endResizeDisabled =
          !startScope ||
          disableResize ||
          (disabledPastEvents && workEnd < currentViewTime)
        let cursor = isLocked
          ? `url(data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2011%2015%22%20width=%2214px%22%20height=%2214px%22%3E%0A%20%20%3Cpath%20d=%22M7.934%205.493H3.052v-1.22a2.444%202.444%200%200%201%202.44-2.442%202.444%202.444%200%200%201%202.442%202.441v1.221zm2.747%200h-.916v-1.22A4.275%204.275%200%200%200%205.493%200%204.277%204.277%200%200%200%201.22%204.272v1.221H.305A.305.305%200%200%200%200%205.798v7.63c0%20.673.548%201.22%201.221%201.22h8.544c.674%200%201.221-.547%201.221-1.22v-7.63a.305.305%200%200%200-.305-.305z%22/%3E%0A%3C/svg%3E) 10 10, auto`
          : !draggable && startScope
          ? 'pointer'
          : 'grab'
        let { timezone, dateformat, timeformat } = this
        let { displayName, status } = moduleState || {}
        let moduleStateDisplayName = !isEmpty(displayName)
          ? displayName
          : status || null

        return {
          workStart,
          workEnd,
          actualWorkEnd,
          isNeedConfirm: !actualWorkEnd || workStart > actualWorkEnd,
          name,
          id,
          width: `calc(((100%/${blockDivision}) * ${width}) - ${
            startScope ? 18 : endScope ? 20 : 0
          }px)`,
          cursor,
          hasAfterLimit,
          hasBeforeLimit,
          eventColor,
          startScope,
          className,
          blockIndex,
          blockSpan,
          canEdit,
          draggable,
          isLocked,
          moduleState: moduleStateDisplayName,
          startResizeDisabled,
          endResizeDisabled,
          startTimeDisplayFormat: workStart
            ? formatDate(workStart, {
                timezone,
                dateformat,
                timeformat,
              })
            : null,
          endTimeDisplayFormat: actualWorkEnd
            ? formatDate(actualWorkEnd, {
                timezone,
                dateformat,
                timeformat,
              })
            : null,
        }
      })
    },
    getEventListForGrp(grpId, grpEventList) {
      let { headerGridColumns, viewDetails, maxResultPerCell } = this
      let { startDateField, endDateField } = viewDetails || {}
      let { name: startTimeKey } = startDateField || {}
      let { name: endTimeKey } = endDateField || {}
      let eventList = grpEventList || this.getGrpEventList(grpId)

      return headerGridColumns.map((grid, blockIndex) => {
        let { startTime, endTime } = grid || {}
        let dataToGetTotalBlockEvents = {
          eventList,
          timeStampKey: { startTimeKey, endTimeKey },
          currentTS: { startTime, endTime },
        }
        let totalBlockEvents = this.getBlockEventForGivenTS(
          dataToGetTotalBlockEvents
        )
        let dataToConstructBlockEvents = {
          blockEventList: totalBlockEvents,
          calenderDetails: { startTimeKey, endTimeKey },
          grpId,
          blockIndex,
          grid,
        }

        totalBlockEvents = this.constructBlockEvents(dataToConstructBlockEvents)

        this.updateRowCount({ totalBlockEvents, grpId, blockIndex })

        let passThroughEvents = sortBy(
          totalBlockEvents.filter((e) => e.hasBeforeLimit || !e.startScope),
          ['workStart']
        )
        let blockStartScopeEvents = orderBy(
          totalBlockEvents.filter((e) => !e.hasBeforeLimit && e.startScope),
          ['blockSpan'],
          ['desc']
        )
        let blockEvents = [...passThroughEvents, ...blockStartScopeEvents]
        let count =
          getProperty(this.eventCount, `${grpId}.rowCount.${blockIndex}`) || 0
        let hasViewMore = count > maxResultPerCell
        let eventIdsToRemove = blockEvents
          .slice(maxResultPerCell)
          .map((e) => e.id)

        this.removeEventsFromlist(eventList, eventIdsToRemove)

        let sliceCount = hasViewMore ? maxResultPerCell - 1 : maxResultPerCell
        return blockEvents.slice(0, sliceCount)
      })
    },
    currentModuleState(moduleState) {
      let { moduleName } = this
      let currentStateId = getProperty(moduleState, 'id')
      let currentState = this.getTicketStatus(currentStateId, moduleName)
      let { displayName, status } = currentState || {}

      return !isEmpty(displayName) ? displayName : status || null
    },
    updateRowCount({ totalBlockEvents, grpId, blockIndex }) {
      if (this.hasActionOngoing) return

      let { blockDivision, maxResultPerCell } = this
      let totalBlockCount = totalBlockEvents.length
      let { rowCount, maxCount = 0 } = this.eventCount[grpId] || {}
      let blockCount = getProperty(rowCount, `${blockIndex}`, 0)

      if (totalBlockCount > maxResultPerCell || blockCount < totalBlockCount) {
        if (blockCount > maxResultPerCell) {
          blockCount = blockCount - maxResultPerCell + totalBlockCount
        } else {
          blockCount = totalBlockCount
        }

        if (!isArray(rowCount)) rowCount = Array(blockDivision).fill(0)
        rowCount[blockIndex] = blockCount
        this.eventCount[grpId] = { rowCount, maxCount }
      }
    },
    removeEventsFromlist(eventList, eventIdsToRemove) {
      eventList = eventList.filter((e) => !eventIdsToRemove.includes(e.id))
    },
    canEditRecord(eventObj) {
      return this.isStateFlowEnabled(eventObj) && !this.isRecordLocked(eventObj)
    },
    isStateFlowEnabled(eventObj) {
      let { module: moduleDetails } = this.metaInfo || {}
      let { custom, stateFlowEnabled } = moduleDetails || {}
      let { moduleState } = eventObj || {}
      let hasState = getProperty(moduleState, 'id')

      return hasState && (!custom || (custom && stateFlowEnabled))
    },
    isRecordLocked(eventObj) {
      let { moduleState } = eventObj || {}

      if (this.isStateFlowEnabled) {
        let hasState = getProperty(moduleState, 'id')
        return hasState
      }
      return false
    },
    constructEventPosition(eventGrpId) {
      let { eventList, eventsPositionMap } = this

      if (!isEmpty(eventGrpId)) {
        eventsPositionMap[eventGrpId] = this.calculateEventPosition(
          eventList[eventGrpId]
          //   eventGrpId
        )
      } else {
        Object.entries(eventList).forEach(([grpId, eventDetails]) => {
          eventsPositionMap[grpId] = this.calculateEventPosition(
            eventDetails
            // grpId
          )
        })
      }
    },
    calculateEventPosition(eventDetails) {
      let grpEventList = eventDetails
        .reduce((grpEventList, blockEventList) => {
          grpEventList = [...grpEventList, ...blockEventList]
          return grpEventList
        }, [])
        .filter((event) => event.startScope)

      let eventPositionObj = {}
      let position = 0
      let eventIdsToRemove = []

      while (grpEventList.length > 0) {
        let endEventTime = 0
        let lastBlockIndex = 0

        grpEventList.forEach((event) => {
          let { id, workStart, workEnd, blockIndex } = event || {}

          if (
            workStart > endEventTime ||
            (workStart === endEventTime && blockIndex > lastBlockIndex)
          ) {
            if (isNaN(workEnd)) workEnd = workStart + 3500000
            let { endTime } =
              this.headerGridColumns.find(
                (d) => d.startTime <= workEnd && d.endTime >= workEnd
              ) || {}

            eventPositionObj[id] = position
            endEventTime = endTime
            lastBlockIndex = blockIndex
            eventIdsToRemove.push(id)
          }
        })
        position++
        grpEventList = grpEventList.filter(
          (event) => !eventIdsToRemove.includes(event.id)
        )
      }

      //   let styleObj = { height: '3em' }
      //   let rowMaxCount = position
      //   let { maxCount = 0 } = this.eventCount[grpId] || {}

      //   if (rowMaxCount > 0) {
      //     styleObj.height = `${40 * rowMaxCount + 10}px`

      //     if (maxCount > 5) {
      //       styleObj.height = `${40 * rowMaxCount + 30}px`
      //     }
      //   }

      return {
        ...eventPositionObj,
        // styleObj,
      }
    },
  },
}
</script>
