<script>
import { fDialog, ftoast } from '../../index'
import { sortBy, debounce } from 'lodash'
import { isEmpty } from '../../utils/validation'

const dataTypes = {
  BOOLEAN: 4,
  DATE: 5,
  DATE_TIME: 6,
  LOOKUP: 7,
  ENUM: 8,
  SYSTEM_ENUM: 12,
}
const WEEK_DAYS = {
  1: 'Mon',
  2: 'Tues',
  3: 'Wed',
  4: 'Thur',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
}

export default {
  data: () => ({
    isResized: false,
    isDragging: false,
    resizingElement: null,
    draggingElement: null,
    resizeHighlighter: { startTimeIdx: -1, endTimeIdx: -1 },
    activeEventTarget: null,
    dragedEventObj: null,
    sideBarRecordDetails: [],
  }),
  computed: {
    hasActionOngoing() {
      return this.isResized || this.isDragging
    },
    hasAssignEnabled() {
      let { allowGroupAssignment } = this.viewDetails || {}
      return allowGroupAssignment
    },
    hasRescheduleEnabled() {
      let { allowRescheduling } = this.viewDetails || {}
      return allowRescheduling
    },
    hasReAssignEnabled() {
      let { allowReAssignment } = this.viewDetails || {}
      return allowReAssignment
    },
    isLocked() {
      let { isLocked = false } = this.viewDetails || {}
      return isLocked
    },
    weekendIndex() {
      let { headerGridColumns, viewDetails } = this
      let { weekend } = viewDetails || {}
      let { valueJSON } = weekend || {}
      let { All } = valueJSON || {}
      let weekendVsDay = (All || []).reduce((weekendObj, day) => {
        weekendObj[WEEK_DAYS[day]] = day
        return weekendObj
      }, {})

      return headerGridColumns.reduce((indexArray, grid, gridIndex) => {
        if (weekendVsDay[grid.day]) {
          indexArray.push(gridIndex)
        }
        return indexArray
      }, [])
    },
    disabledWeekend() {
      let { disableWeekends } = this.viewDetails || {}
      return disableWeekends
    },
    disabledPastDate() {
      let { allowPastAssignment } = this.viewDetails || {}
      return !allowPastAssignment
    },
    disabledPastEvents() {
      let { disablePastEvents } = this.viewDetails || {}
      return disablePastEvents
    },
    canEnableEventListener() {
      let { hasAssignEnabled, hasRescheduleEnabled, hasReAssignEnabled } = this
      return hasAssignEnabled || hasRescheduleEnabled || hasReAssignEnabled
    },
  },
  methods: {
    mouseDownEvent(domEvent, eventObj) {
      let { target } = domEvent
      let { attributes, parentElement: eventTarget } = target || {}
      let blockIndex = parseInt(attributes['block-index'].value)
      let grpId = attributes['group-id'].value
      let eventPosition = attributes['side-position']?.value

      this.isResized = true
      this.resizingElement = {
        blockIndex,
        grpId,
        eventPosition,
        eventObj,
        eventTarget,
      }

      let { blockDivision } = this
      let { hasAfterLimit, workEnd } = eventObj || {}

      this.resizeHighlighter.startTimeIdx = blockIndex
      if (hasAfterLimit) {
        this.resizeHighlighter.endTimeIdx = blockDivision - 1
      } else {
        this.resizeHighlighter.endTimeIdx = this.headerGridColumns.findIndex(
          (grid) => {
            let { startTime, endTime } = grid || {}
            return startTime <= workEnd && endTime >= workEnd
          }
        )
      }
    },
    mouseMoveEvent(domEvent) {
      if (!this.isResized) return
      domEvent.preventDefault()

      let { target } = domEvent
      let { attributes } = target || {}
      let blockIndex = parseInt(attributes['block-index']?.value)
      let eventId = attributes['event-id']?.value
      let startScope = attributes['start-scope']?.value
      let { eventObj, eventPosition, eventTarget } = this.resizingElement || {}
      let { startTimeIdx, endTimeIdx } = this.resizeHighlighter || {}
      let { id } = eventObj
      let {
        blockDivision,
        disabledWeekend,
        weekendIndex,
        disabledPastDate,
        headerGridColumns,
      } = this
      let { endTime } = headerGridColumns[blockIndex] || {}
      let currentTime = this.getTimeStamp().valueOf()

      if (
        (parseInt(eventId) === id &&
          startScope === 'true' &&
          endTimeIdx !== blockIndex + 1) ||
        (disabledWeekend && weekendIndex.includes(blockIndex)) ||
        (disabledPastDate && currentTime > endTime)
      ) {
        return
      }

      if (eventPosition === 'start') {
        startTimeIdx = blockIndex <= endTimeIdx ? blockIndex : endTimeIdx
        eventTarget.style.left = `calc(${startTimeIdx} * (100%/${blockDivision}))`
      } else if (eventPosition === 'end') {
        endTimeIdx = blockIndex >= startTimeIdx ? blockIndex : startTimeIdx
      }

      let width = endTimeIdx - startTimeIdx + 1

      eventTarget.style.zIndex = 1
      eventTarget.style.width = `calc(((100%/${blockDivision}) * ${width}) - 10px)`
      this.resizeHighlighter = { startTimeIdx, endTimeIdx }
    },
    async mouseUpEvent() {
      if (!this.isResized || isEmpty(this.resizingElement)) return

      let { blockIndex, eventObj, grpId, eventPosition, eventTarget } =
        this.resizingElement || {}

      let { startTimeIdx, endTimeIdx } = this.resizeHighlighter || {}
      let { workStart, workEnd, id, name, isNeedConfirm } = eventObj

      if (isNeedConfirm) {
        let value = await this.getConfirmation({ name, id })
        if (!value) {
          return
        }
      }
      let elementEndBlockIdx = blockIndex
      let { endTime: blockEndTime } = this.headerGridColumns[blockIndex] || {}

      if (workEnd > blockEndTime) {
        let remainingDiff = workEnd - blockEndTime
        elementEndBlockIdx += Math.ceil(remainingDiff / this.blockTime)
      }

      let isEventResized =
        blockIndex !== startTimeIdx || elementEndBlockIdx !== endTimeIdx

      if (isEventResized) {
        if (eventPosition === 'start') {
          if (blockIndex > startTimeIdx) {
            workStart -= (blockIndex - startTimeIdx) * this.blockTime
          } else if (blockIndex < startTimeIdx) {
            let movedStart =
              workStart + (startTimeIdx - blockIndex) * this.blockTime

            if (workEnd > movedStart) {
              workStart = movedStart
            }
          }
        } else if (eventPosition === 'end') {
          if (elementEndBlockIdx < endTimeIdx) {
            workEnd += (endTimeIdx - elementEndBlockIdx) * this.blockTime
          } else if (elementEndBlockIdx > endTimeIdx) {
            let movedEnd =
              workEnd - (elementEndBlockIdx - endTimeIdx) * this.blockTime

            if (workStart < movedEnd) {
              workEnd = movedEnd
            }
          }
        }

        let rowEvents = this.eventList[grpId] || {}
        let blockEvents = rowEvents[blockIndex] || {}
        let eventIndex = blockEvents.findIndex((evnt) => evnt.id === id)

        if (eventIndex !== -1) {
          blockEvents.splice(eventIndex, 1, {
            ...eventObj,
            cursor: 'wait',
            startResizeDisabled: true,
            endResizeDisabled: true,
            draggable: false,
          })
          this.$set(rowEvents, blockIndex, blockEvents)
          this.$set(this.eventList, grpId, rowEvents)
        }

        this.updateEvent({ id, workEnd, workStart }, [grpId])
      }

      this.activeEventTarget = eventTarget
      this.isResized = false
      this.resizingElement = null
      this.resizeHighlighter = { startTimeIdx: -1, endTimeIdx: -1 }
    },
    dragOver(event) {
      event.preventDefault()
    },
    drop(event) {
      event.preventDefault()
      const serializedData = event.dataTransfer.getData('application/json')
      // Parse the data
      const droppedData = JSON.parse(serializedData)
      this.dragedEventObj = droppedData
    },
    addDragEventListener() {
      document.addEventListener('dragstart', this.dragStartEvent)
      document.addEventListener('dragend', this.dragEndEvent)
      document.addEventListener('dragover', this.dragOverEvent)
      document.addEventListener('dragenter', this.dragEnterEvent)
      document.addEventListener('dragleave', this.dragLeaveEvent)
      document.addEventListener('drop', this.dropEvent)
    },
    dragStartEvent(event) {
      if (
        event.target.className.includes('event-class') ||
        event.target.className.includes('sidebar-event')
      ) {
        let draggedEvent = event.target
        let { attributes } = draggedEvent || {}
        let grpId = attributes['group-id']?.value
        let eventId = parseInt(attributes['event-id'].value)
        let blockIndex = parseInt(attributes['block-index']?.value)
        let eventObj =
          (this.eventList[grpId][blockIndex] || []).find(
            (e) => e.id === eventId
          ) || {}

        draggedEvent.style.opacity = 0.5
        this.draggingElement = {
          eventId,
          grpId,
          blockIndex,
          draggedEvent,
          eventObj,
        }
        this.isDragging = true
      }
    },
    dragEndEvent(event) {
      event.target.style.opacity = ''
      this.isDragging = false
      this.draggingElement = null
    },
    dragOverEvent(event) {
      event.preventDefault()
    },
    dragEnterEvent(event) {
      let eventClassName = event.target.className || []

      event.dataTransfer.dropEffect = 'move'

      if (
        eventClassName.includes('grid-item') &&
        !eventClassName.includes('grid-item-disabled')
      ) {
        let { attributes: blockAttributes } = event.target || {}
        let blockIndex = parseInt(blockAttributes['block-index'].value)

        this.resizeHighlighter = {
          startTimeIdx: blockIndex,
          endTimeIdx: blockIndex,
        }

        event.target.style.background = '#f2fafc'
        event.target.parentElement.style.cursor = 'grabbing'
      }
    },
    dragLeaveEvent(event) {
      let eventClassName = event.target.className || []

      if (
        eventClassName.includes('grid-item') &&
        !eventClassName.includes('grid-item-disabled')
      ) {
        event.target.style.background = ''
        event.target.parentElement.style.cursor = ''
      }
    },
    async dropEvent(event) {
      if (!this.isDragging) return

      event.target.style.background = ''
      event.target.parentElement.style.cursor = ''

      let { attributes: blockAttributes } = event.target || {}
      let blockIndex = parseInt(blockAttributes['block-index'].value)
      let grpId = blockAttributes['group-id'].value
      let {
        eventId,
        grpId: eventGrpId,
        blockIndex: eventBlockIndex,
        draggedEvent: draggedDOMEvent,
      } = this.draggingElement || {}

      let dropingElement = this.dragedEventObj

      if (draggedDOMEvent) {
        draggedDOMEvent.style.opacity = ''
        draggedDOMEvent.style.zIndex = 1
        draggedDOMEvent.style.border = '1px solid rgb(0, 0, 0, 0.2)'
        draggedDOMEvent.style.boxShadow = '0px 3px 5px 0px rgb(0 0 0 / 30%)'
        this.activeEventTarget = draggedDOMEvent
      }

      let isValidDrop = this.dropValidation({
        grpId,
        eventGrpId,
        blockIndex,
        eventObj: dropingElement,
      })

      if (isValidDrop) {
        this.throwWarning()
      } else {
        let { id, name, isNeedConfirm } = dropingElement

        if (isNeedConfirm) {
          let value = await this.getConfirmation({ name, id })
          if (!value) {
            draggedDOMEvent.style.zIndex = ''
            draggedDOMEvent.style.border = ''
            draggedDOMEvent.style.boxShadow = ''
            this.activeEventTarget = null
            return
          }
        }

        if (draggedDOMEvent.className === 'sidebar-event') {
          let recordList = this.sideBarRecordDetails
          let recordIdx = (recordList || []).findIndex((r) => r.id === eventId)

          if (recordIdx > -1) {
            let record = dropingElement
            let eventObj = {
              ...record,
              blockIndex,
              startScope: true,
              className: '',
              cursor: 'wait',
              width: `calc(((100%/${this.blockDivision}) * ${1}) - 10px)`,
              startResizeDisabled: true,
              endResizeDisabled: true,
              draggable: false,
            }
            let grpIdToMove
            let { groupName, blockIndex: eventBlockIndex } =
              this.sideBarDetails || {}

            if (groupName) {
              grpIdToMove = grpId
              this.moveEvent({
                eventObj,
                blockIndex,
                eventBlockIndex,
                grpId,
                eventGrpId,
              })
            } else {
              let { startTime, endTime } =
                this.headerGridColumns[blockIndex] || {}

              grpIdToMove = parseInt(eventGrpId) === -1 ? grpId : eventGrpId
              eventObj = {
                ...eventObj,
                workStart: startTime,
                workEnd: endTime,
                cursor: 'wait',
                startResizeDisabled: true,
                endResizeDisabled: true,
                draggable: false,
              }

              let { workEnd, workStart, id } = eventObj

              this.updateMovedEvent({
                grpId: grpIdToMove,
                eventObj,
                blockIndex,
              })
              this.constructEventPosition(grpId)
              this.updateEvent(
                {
                  groupFieldId: grpIdToMove,
                  workEnd,
                  workStart,
                  id,
                },
                [grpIdToMove]
              )
            }

            this.sideBarRecordDetails.splice(recordIdx, 1)
            this.scrollCurrentBlock(`grid-event-${grpIdToMove}-${blockIndex}`)
            this.$forceUpdate()
          }
        } else {
          let curRowEvents = this.eventList[eventGrpId] || []
          let curEventList = curRowEvents[eventBlockIndex] || []
          let eventIdx = curEventList.findIndex((event) => event.id === eventId)

          if (eventIdx === -1) return

          let eventObj = curEventList[eventIdx] || {}
          eventObj = {
            ...eventObj,
            cursor: 'wait',
            startResizeDisabled: true,
            endResizeDisabled: true,
            draggable: false,
          }

          this.moveEvent({
            eventObj,
            blockIndex,
            eventBlockIndex,
            grpId,
            eventGrpId,
          })
        }
      }

      this.isDragging = false
      this.draggingElement = null
      this.resizeHighlighter = { startTimeIdx: -1, endTimeIdx: -1 }
    },
    dropValidation({ grpId, eventGrpId, blockIndex, eventObj }) {
      let {
        hasAssignEnabled,
        hasRescheduleEnabled,
        hasReAssignEnabled,
        disabledWeekend,
        weekendIndex,
        disabledPastDate,
        headerGridColumns,
      } = this
      let { endTime } = headerGridColumns[blockIndex] || {}
      let currentTime = this.getTimeStamp().valueOf()
      let { blockSpan } = eventObj || {}
      let eventEndBlockIdx = blockIndex + (blockSpan - 1)

      return (
        ((!hasRescheduleEnabled ||
          (hasRescheduleEnabled && grpId !== eventGrpId)) &&
          (!hasReAssignEnabled ||
            (hasReAssignEnabled &&
              [parseInt(eventGrpId), parseInt(grpId)].includes(-1))) &&
          (!hasAssignEnabled ||
            (hasAssignEnabled && parseInt(eventGrpId) !== -1))) ||
        (disabledWeekend &&
          (weekendIndex.includes(blockIndex) ||
            weekendIndex.includes(eventEndBlockIdx))) ||
        (disabledPastDate && currentTime > endTime)
      )
    },
    throwWarning: debounce(function () {
      let { displayName: viewDisplayName } = this.viewDetails || {}

      ftoast.warning(
        `${viewDisplayName} has unauthorized to perform last action`
      )
    }, 500),
    updateMovedEvent(details) {
      let { eventObj, blockIndex, eventBlockIndex, grpId, eventGrpId } =
        details || {}
      let { id } = eventObj

      if (eventGrpId) {
        let rowEvents = this.eventList[eventGrpId] || {}
        let blockEvents = rowEvents[eventBlockIndex] || {}
        let eventIndex = blockEvents.findIndex((evnt) => evnt.id === id)

        if (eventIndex > -1) {
          blockEvents.splice(eventIndex, 1)
          this.$set(rowEvents, eventBlockIndex, blockEvents)
          this.$set(this.eventList, eventGrpId, rowEvents)
        }
      }
      let { maxResultPerCell } = this
      let rowEvents = this.eventList[grpId] || {}
      let blockEvents = rowEvents[blockIndex] || {}

      blockEvents.push(eventObj)
      blockEvents = sortBy(blockEvents, ['workStart']).slice(
        0,
        maxResultPerCell
      )
      this.$set(rowEvents, blockIndex, blockEvents)
      this.$set(this.eventList, grpId, rowEvents)

      let rowEventPosition = this.eventsPositionMap[grpId] || {}
      rowEventPosition[id] = 0
      this.$set(this.eventsPositionMap, grpId, rowEventPosition)
    },
    moveEvent(details) {
      let { eventObj, blockIndex, eventBlockIndex, grpId, eventGrpId } =
        details || {}
      let { workStart, workEnd, id } = eventObj || {}
      let isEventMoved = eventBlockIndex !== blockIndex || grpId !== eventGrpId

      if (!isEventMoved) return

      if (eventBlockIndex > blockIndex) {
        let dayDiff = (eventBlockIndex - blockIndex) * this.blockTime
        workStart -= dayDiff
        workEnd -= dayDiff
      } else {
        let dayDiff = (blockIndex - eventBlockIndex) * this.blockTime
        workStart += dayDiff
        workEnd += dayDiff
      }

      this.updateMovedEvent(details)
      let grpList = [eventGrpId]
      let groupFieldId = grpId

      if (grpId !== eventGrpId) {
        grpList.push(grpId)
      }

      this.updateEvent({ groupFieldId, workEnd, workStart, id }, grpList)
    },
    async updateEvent(data, grpList) {
      let { startDateField, endDateField, groupByField } =
        this.viewDetails || {}
      let { name: startTimeKey } = startDateField || {}
      let { name: endTimeKey } = endDateField || {}
      let { name: groupByKey, dataType } = groupByField || {}
      let { workEnd, workStart, groupFieldId, id } = data || {}
      let payload = {
        id,
        data: {
          id,
          [startTimeKey]: workStart,
          ...(endTimeKey && { [endTimeKey]: workEnd }),
        },
      }

      if (groupFieldId) {
        let grpId = parseInt(groupFieldId)

        if (grpId !== -1) {
          let { ENUM, SYSTEM_ENUM, LOOKUP } = dataTypes || {}
          if ([ENUM, SYSTEM_ENUM].includes(dataType)) {
            payload.data[groupByKey] = grpId
          } else if (dataType === LOOKUP) {
            payload.data[groupByKey] = { id: grpId }
          }
        } else {
          payload.data[groupByKey] = null
        }
      }

      this.saving = true
      this.$emit('updateGrpEvents', grpList, payload)
    },
    async getConfirmation(eventObj) {
      let { startDateField, endDateField } = this.viewDetails || {}
      let { displayName: startDateFieldName = '' } = startDateField || {}
      let { displayName: endDateFieldName = '' } = endDateField || {}

      return await fDialog.warning({
        title: 'Warning',
        description: `${eventObj.name}(${eventObj.id}) has ${endDateFieldName}(end time field) before ${startDateFieldName}(start time field). As default value, end time will be 1 hour ahead of start time. Performing actions will change actual end time. Do you want to update?`,
        saveText: 'Confirm',
        cancelText: 'Cancel',
      })
    },
    resetActiveElementStyle() {
      if (this.activeEventTarget) {
        this.activeEventTarget.style.zIndex = ''
        this.activeEventTarget.style.left = ''
        this.activeEventTarget.style.border = ''
        this.activeEventTarget.style.boxShadow = ''
      }
    },
    removeDragEventListener() {
      document.removeEventListener('dragstart', this.dragStartEvent)
      document.removeEventListener('dragend', this.dragEndEvent)
      document.removeEventListener('dragover', this.dragOverEvent)
      document.removeEventListener('dragenter', this.dragEnterEvent)
      document.removeEventListener('dragleave', this.dragLeaveEvent)
      document.removeEventListener('drop', this.dropEvent)
    },
  },
}
</script>
