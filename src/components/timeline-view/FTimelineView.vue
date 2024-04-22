<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <FContainer overflow="hidden" flexGrow="1">
    <FContainer display="grid" overflow="auto" height="100%">
      <FSpinner v-if="loading" :size="20"></FSpinner>
      <FContainer
        v-else
        height="max-content"
        display="flex"
        flexDirection="column"
        backgroundColor="backgroundContainer"
      >
        <div @dragover.prevent="dragOver" @drop="drop">
          <FContainer
            position="sticky"
            top="0"
            height="40px"
            backgroundColor="backgroundContainer"
            zIndex="4"
            display="flex"
            flexGrow="1"
          >
            <FContainer
              border="1px solid"
              :borderTop="withoutBorder && '0px'"
              :borderLeft="withoutBorder && '0px'"
              :left="!isRTL && '0px'"
              :right="isRTL && '0px'"
              borderColor="borderNeutralBaseSubtler"
              class="grid-item-sidebar grid-item"
            >
              <FText
                appearance="captionMed12"
                color="textMain"
                padding="containerMedium containerLarge"
              >
                {{ groupName }}
              </FText>
              <slot name="group-by-actions"></slot>
            </FContainer>
            <FContainer
              v-for="(headerGrid, index) in headerGridColumns"
              :id="`header-${index}`"
              :key="`sidebar-${index}`"
              padding="containerXLarge"
              border="1px solid"
              borderColor="borderNeutralBaseSubtler"
              borderLeft="0px solid"
              :borderTop="withoutBorder && '0px'"
              class="grid-item"
              color="textDescription"
              hover-backgroundColor="backgroundAccentBlueSubtle"
              hover-color="backgroundPrimaryDefault"
              :cursor="!isDayView ? 'pointer' : ''"
              :class="{
                'highlight-grid-item':
                  resizeHighlighter.startTimeIdx <= index &&
                  resizeHighlighter.endTimeIdx >= index,
                'today-highlight': todayIndex === index,
              }"
              @click="switchView(headerGrid)"
            >
              <FText
                appearance="captionMed10"
                width="100%"
                lineHeight="130%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="medium"
                class="header-grid-item"
              >
                {{
                  isDayView
                    ? headerGrid.time
                    : isYearView
                    ? headerGrid.week
                    : `${headerGrid.day} ${headerGrid.date}`
                }}
              </FText>
            </FContainer>
          </FContainer>
          <template v-for="(eventDetails, name) in totalEventList">
            <template v-for="rowGrpId in groupingListIds">
              <template v-if="eventDetails[rowGrpId]">
                <FContainer
                  :key="`${name}-${rowGrpId}`"
                  display="flex"
                  flexGrow="1"
                  height="88px"
                  :class="{ 'pinned-grid': name === 'pinnedRow' }"
                >
                  <FContainer
                    border="1px solid"
                    borderColor="borderNeutralBaseSubtler"
                    borderTop="0px solid"
                    :borderLeft="withoutBorder && '0px'"
                    :left="!isRTL && '0px'"
                    :right="isRTL && '0px'"
                    class="grid-item-sidebar grid-item"
                    @click="togglePinnedGrp(rowGrpId)"
                  >
                    <FText appearance="headingMed14" color="textMain">
                      {{ getGroupLabelById(rowGrpId) }}
                    </FText>
                    <FIcon
                      group="default"
                      name="pin"
                      size="16"
                      :pressable="true"
                      :color="
                        rowGrpId === pinnedGrpObj.value
                          ? 'iconNeutralGrey01Darkest'
                          : 'iconNeutralGrey01Medium'
                      "
                      :class="
                        rowGrpId != pinnedGrpObj.value && 'sidebar-pin-icon'
                      "
                    />
                  </FContainer>
                  <div
                    style="
                      display: flex;
                      flex-grow: 1;
                      height: 88px;
                      position: relative;
                    "
                    @mousemove.stop="mouseMoveEvent"
                    @mouseup.stop="mouseUpEvent"
                  >
                    <FContainer
                      v-for="(gridEventList, gridEventIdx) in eventDetails[
                        rowGrpId
                      ]"
                      :id="`grid-event-${rowGrpId}-${gridEventIdx}`"
                      :key="`grid-event-${gridEventIdx}`"
                      class="grid-item"
                      :class="{
                        'grid-item-disabled': getGridBlockDisplay(gridEventIdx),
                      }"
                      v-bind="bindElementDetails(gridEventIdx, rowGrpId)"
                      borderBottom="1px solid"
                      borderColor="borderNeutralBaseSubtler"
                    >
                      <template v-if="gridEventList.length > 0">
                        <div
                          v-for="eventObj in gridEventList"
                          :key="`${eventObj.name}-${eventObj.id}-${gridEventIdx}-${rowGrpId}`"
                          class="event-class"
                          :class="[
                            `${eventObj.className}`,
                            !eventObj.startScope &&
                              !hasActionOngoing &&
                              'invisible',
                          ]"
                          :group-id="rowGrpId"
                          :event-id="eventObj.id"
                          :style="{
                            width: eventObj.width,
                            top: `${getEventTopPosition(
                              rowGrpId,
                              eventObj.id
                            )}px`,
                            'background-color': eventObj.eventColor,
                            cursor: eventObj.cursor,
                          }"
                          :draggable="
                            !eventObj.isLocked &&
                            !isResized &&
                            eventObj.draggable
                          "
                          v-bind="
                            bindElementDetails(
                              gridEventIdx,
                              rowGrpId,
                              eventObj.id,
                              eventObj.startScope
                            )
                          "
                          @dragstart="(e) => dragStart(e, eventObj)"
                        >
                          <FIcon
                            v-if="eventObj.hasBeforeLimit"
                            group="dsm"
                            name="double-chevron-left"
                            size="16"
                            :pressable="false"
                            color="backgroundContainer"
                          />
                          <div
                            v-else-if="!eventObj.startResizeDisabled"
                            class="item-resize"
                            v-bind="
                              bindElementDetails(
                                gridEventIdx,
                                rowGrpId,
                                eventObj.id,
                                eventObj.startScope,
                                'start'
                              )
                            "
                            @mousedown.stop="mouseDownEvent($event, eventObj)"
                          >
                            ||
                          </div>
                          <FContainer
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            flexGrow="1"
                            marginLeft="containerMedium"
                            color="backgroundContainer"
                            v-bind="
                              bindElementDetails(
                                gridEventIdx,
                                rowGrpId,
                                eventObj.id,
                                eventObj.startScope
                              )
                            "
                            @click="
                              openSummary(eventObj, {
                                id: rowGrpId,
                                name: getGroupLabelById(rowGrpId),
                              })
                            "
                          >
                            <FText appearance="captionReg12">
                              {{ eventObj.name || eventObj.displayName }}
                            </FText>
                          </FContainer>
                          <FIcon
                            v-if="eventObj.hasAfterLimit"
                            group="dsm"
                            name="double-chevron-right"
                            size="16"
                            :pressable="false"
                            color="backgroundContainer"
                          />
                          <div
                            v-else-if="!eventObj.endResizeDisabled"
                            class="item-resize"
                            v-bind="
                              bindElementDetails(
                                gridEventIdx,
                                rowGrpId,
                                eventObj.id,
                                eventObj.startScope,
                                'end'
                              )
                            "
                            @mousedown.stop="mouseDownEvent($event, eventObj)"
                          >
                            ||
                          </div>
                        </div>
                        <FContainer
                          v-if="
                            eventCount[rowGrpId] &&
                            eventCount[rowGrpId].rowCount[gridEventIdx] >
                              maxResultPerCell
                          "
                          hover-color="borderPrimaryHovered"
                          position="absolute"
                          bottom="0px"
                          width="inherit"
                          display="flex"
                          justifyContent="center"
                          cursor="pointer"
                          @click="
                            openSideBarList({
                              grpId: rowGrpId,
                              blockIndex: gridEventIdx,
                            })
                          "
                        >
                          <FText
                            appearance="captionReg12"
                            color="borderPrimaryDefault"
                          >
                            {{ i18nText.viewMore }}
                          </FText>
                        </FContainer>
                      </template>
                    </FContainer>
                  </div>
                </FContainer>
              </template>
            </template>
          </template>
        </div>
      </FContainer>
    </FContainer>
  </FContainer>
</template>
<script>
import { FContainer, FSpinner, FIcon, FText } from '../../index'
import { isEmpty } from '../../utils/validation'
import getProperty from 'dlv'
import { cloneDeep } from 'lodash'
import EventHandlerMixin from './EventHandlerMixin.vue'
import DataConstructionMixin from './DataConstructionMixin.vue'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'

const calenderViews = {
  1: 'Day',
  2: 'Week',
  3: 'Month',
  4: 'Year',
}
const intervalObj = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  '1H': 'hours',
}

export default {
  components: { FContainer, FSpinner, FIcon, FText },
  mixins: [EventHandlerMixin, DataConstructionMixin, ThemeMixin],
  props: {
    timezone: {
      type: String,
      default: '',
    },
    viewDetails: {
      type: Object,
      default: () => ({}),
    },
    timeStamp: {
      type: Object,
      default: () => ({}),
    },
    groupList: {
      type: Array,
      default: () => [],
    },
    schedulerData: {
      type: Object,
      default: () => ({}),
    },
    metaInfo: {
      type: Object,
      default: () => ({}),
    },
    preservedTimeLimit: {
      type: Object,
      default: () => ({ startTime: null, endTime: null }),
    },
    grpByPerPage: {
      type: Number,
      default: 10,
    },
    mainFieldName: {
      type: String,
      default: 'name',
    },
    updatePermission: {
      type: Boolean,
      default: false,
    },
    sideBarRecordList: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    withoutBorder: {
      type: Boolean,
      default: false,
    },
    i18nText: {
      type: Object,
      default: () => ({
        viewMore: 'View More',
        noPermission: "You don't have permission to edit this record",
      }),
    },
  },
  data() {
    return {
      groupingListArr: [],
      currentTimeLimit: { startTime: null, endTime: null },
      pinnedGrpObj: {},
      currentTime: this.getTimeStamp().valueOf(),
    }
  },
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
    groupName() {
      return getProperty(this.viewDetails, 'groupByField.displayName')
    },
    currentView: {
      get() {
        let { currentView } = this.$attrs || {}
        let { defaultCalendarView } = this.viewDetails || {}
        return currentView || defaultCalendarView
      },
      set(value) {
        this.$emit('update:currentView', value)
      },
    },
    todayIndex() {
      let { getTimeStamp, headerGridColumns } = this
      let value = getTimeStamp().valueOf()

      return headerGridColumns.findIndex((grid) => {
        return grid.startTime <= value && grid.endTime >= value
      })
    },
    getUnGrouped() {
      let { pinnedGrpObj, page } = this
      let { value } = pinnedGrpObj || {}

      return page === 1 || parseInt(value) === -1
    },
    totalEventList() {
      let { eventList, pinnedGrpObj } = this
      let clonedEventList = { ...eventList }
      let pinnedRow = {}

      if (!isEmpty(pinnedGrpObj)) {
        let { value } = pinnedGrpObj
        pinnedRow = { [value]: clonedEventList[value] }
        delete clonedEventList[value]
      }

      return { pinnedRow, eventList: clonedEventList }
    },
    isDayView() {
      return calenderViews[this.currentView] === 'Day'
    },
    isYearView() {
      return calenderViews[this.currentView] === 'Year'
    },
  },
  watch: {
    groupList: {
      handler(newValue) {
        let { displayName } = this.viewDetails?.groupByField || {}
        let clonedGrpList = cloneDeep(newValue)
        this.setGrpData(clonedGrpList || [], displayName)
      },
      immediate: true,
    },
    canEnableEventListener: {
      handler(newVal) {
        newVal && this.addDragEventListener()
      },
      immediate: true,
    },
    sideBarRecordList: {
      handler(newVal) {
        this.sideBarRecordDetails = newVal
      },
      immediate: true,
    },
    timeStamp(newVal) {
      let { value } = newVal || {}
      let [startTime, endTime] = value || []

      this.currentTimeLimit = { startTime, endTime }
      this.currentTime = startTime
      this.constructData()
    },
    currentView() {
      this.init()
    },
    schedulerData: {
      handler() {
        this.constructSchedulerData()
        this.resetActiveElementStyle()
      },
      immediate: true,
    },
    todayIndex(value) {
      if (value > -1 && !this.loading) {
        this.scrollCurrentBlock(`header-${value}`)
      }
    },
  },
  async created() {
    this.currentTimeLimit = this.preservedTimeLimit
  },
  beforeDestroy() {
    this.removeDragEventListener()
  },
  methods: {
    dragStart(event, item) {
      let { data } = item || {}
      item = { ...item, ...data }
      event.dataTransfer.setData('application/json', JSON.stringify(item))
    },
    setGrpData(groupingListArr, displayName) {
      let { value, label } = this.pinnedGrpObj || {}
      let isPinnedGrpPresent = groupingListArr.find(
        (item) => item.value === value
      )
      if (this.getUnGrouped) {
        let unGroupIndex = groupingListArr.findIndex(
          (item) => item.value === -1
        )
        let unGroupList = { value: -1, label: `No ${displayName}` }
        if (unGroupIndex !== -1)
          groupingListArr.splice(unGroupIndex, 1, unGroupList)
        else groupingListArr.unshift(unGroupList)
      }
      if (value > 0 && !isPinnedGrpPresent) {
        groupingListArr.unshift({ value, label })
      }
      this.groupingListArr = groupingListArr
      this.init()
    },
    init() {
      let { currentTime, currentTimeLimit } = this
      let { startTime, endTime } = currentTimeLimit || {}
      let isInCurrentTimeLimit =
        (!startTime && !endTime) ||
        (startTime <= currentTime && endTime >= currentTime)
      let date = isInCurrentTimeLimit ? currentTime : startTime

      this.changeTS(date)
    },
    changeTS(date, currentView = this.currentView) {
      this.currentView = currentView

      this.setTimeLimit(date)
      this.$emit('viewChanged', {
        view: calenderViews[currentView].toUpperCase(),
        startTime: this.currentTimeLimit?.startTime,
      })
      this.constructData()
    },
    setTimeLimit(date) {
      let { currentView, getTimeStamp } = this
      let view = calenderViews[currentView].toLowerCase()
      let start = getTimeStamp(date).startOf(view).valueOf()
      let end = getTimeStamp(date).endOf(view).valueOf() - 1

      this.$set(this.currentTimeLimit, 'startTime', start)
      this.$set(this.currentTimeLimit, 'endTime', end)
    },
    getNextTimeStamp(timeStamp, interval, weekVal) {
      if (weekVal === '1' && interval === 'WEEK') {
        timeStamp = this.getTimeStamp(timeStamp).startOf('week').valueOf()
      }
      return this.getTimeStamp(timeStamp)
        .add(1, intervalObj[interval])
        .valueOf()
    },
    todayClicked() {
      let { startTime, endTime } = this.currentTimeLimit || {}
      let currentTime = this.getTimeStamp().valueOf()
      let hasCurrentLimit = startTime <= currentTime && endTime >= currentTime

      if (!hasCurrentLimit) {
        this.changeTS(currentTime) //go to current data handling
      } else {
        this.scrollCurrentBlock(`header-${this.todayIndex}`)
      }
    },
    switchView({ startTime }) {
      if (this.isYearView) {
        let weekView = 2
        this.changeTS(startTime, weekView)
      } else if (!this.isDayView) {
        let dayView = 1
        this.changeTS(startTime, dayView)
      }
    },
    getGroupLabelById(id) {
      let filterList = (this.groupingListArr || []).find(
        (listItem) => listItem.value === id
      )
      return (filterList || {}).label
    },
    scrollCurrentBlock(elementId) {
      let currentBlockToScroll = document.getElementById(elementId)
      currentBlockToScroll?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },
    togglePinnedGrp(pinnedGrpId) {
      if (this.pinnedGrpObj.value !== pinnedGrpId) {
        let label = this.getGroupLabelById(pinnedGrpId)
        this.pinnedGrpObj = { value: pinnedGrpId, label }
      } else {
        this.pinnedGrpObj = {}
      }
    },
    bindElementDetails(blockIdx, grpId, eventId, startScope, sidePosition) {
      let bindDetails = {
        'block-index': blockIdx,
        'group-id': grpId,
      }

      if (eventId) {
        bindDetails['event-id'] = eventId
        bindDetails['start-scope'] = startScope
      }
      if (sidePosition) {
        bindDetails['side-position'] = sidePosition
      }
      return bindDetails
    },
    getGridBlockDisplay(gridIdx) {
      let {
        disabledWeekend,
        weekendIndex,
        disabledPastDate,
        headerGridColumns,
        currentViewTime,
      } = this
      let { endTime } = headerGridColumns[gridIdx] || {}
      let hasDisabledWeekend = disabledWeekend && weekendIndex.includes(gridIdx)
      let hasDisabledPastDate = disabledPastDate && currentViewTime > endTime

      return hasDisabledWeekend || hasDisabledPastDate
    },
    openSideBarList({ grpId, blockIndex }) {
      let groupName = this.getGroupLabelById(grpId)
      let { startTime, endTime } = this.headerGridColumns[blockIndex] || {}
      let title = ''

      if (!this.isDayView) {
        title = this.getTimeStamp(startTime).format('DD MMM')
      } else {
        title = this.getTimeStamp(startTime).format('hh:mm:ss a')
      }

      this.sideBarDetails = {
        title,
        groupName,
        startTime,
        endTime,
        grpId,
        blockIndex,
        currentView: this.currentView,
      }
      this.$emit('sideBarDetails', this.sideBarDetails)
    },
    openSummary(eventObj, grpObj) {
      this.$emit('openSummary', eventObj, grpObj)
    },
    getEventTopPosition(rowGrpId, eventObjId) {
      let eventPosition = getProperty(
        this.eventsPositionMap,
        `${rowGrpId}.${eventObjId}`
      )
      return eventPosition * 24 + (eventPosition + 1) * 4
    },
  },
}
</script>
<style lang="scss" scoped>
.today-highlight {
  .header-grid-item {
    background-color: var(--colors-backgroundPrimaryDefault);
    color: var(--colors-textInverseDefault);
  }
  &:hover .header-grid-item {
    background-color: transparent;
    color: var(--colors-backgroundPrimaryDefault);
  }
}
.grid-item {
  min-width: 100px;
  width: 100px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover .item-resize {
    visibility: visible;
  }
}
.grid-item-sidebar {
  width: 240px;
  position: sticky;
  background: var(--colors-backgroundContainer);
  /* left: 0; */
  flex-grow: 0;
  z-index: 2;
  padding: var(--spacing-containerMedium) var(--spacing-containerXLarge);
  .sidebar-pin-icon {
    visibility: hidden;
  }
  &:hover .sidebar-pin-icon {
    visibility: visible;
  }
}
.grid-item-disabled {
  cursor: not-allowed;
  background-color: var(--colors-backgroundMidgroundMedium);
}
.event-class {
  position: absolute;
  height: 24px;
  cursor: grab;
  display: flex;
  margin: 0px var(--spacing-containerLarge);
  align-items: center;
  transition: all 0.5s ease;
  border-radius: var(--spacing-containerMedium);

  &.transparent {
    opacity: 0;
    z-index: 1;
    margin: var(--spacing-containerMedium) 0px;
  }
  .item-resize {
    width: 10px;
    height: 100%;
    cursor: col-resize;
    color: var(--colors-backgroundContainer);
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
  }
}
.pinned-grid {
  position: sticky;
  top: 40px;
  z-index: 3;
  background-color: var(--colors-backgroundContainer);
}
</style>
