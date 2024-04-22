import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { isEmpty } from '../../../utils/validation'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

export function createDate(y, M = 0, d = 1, h = 0, m = 0, s = 0, ms = 0) {
  const date = new Date(y, M, d, h, m, s, ms)
  if (y < 100 && y >= 0) {
    date.setFullYear(y)
  }
  return date
}

export function getCalendar({ firstDayOfWeek, year, month }) {
  const arr = []
  // change to the last day of the last month
  const calendar = createDate(year, month, 0)
  const lastDayInLastMonth = calendar.getDate()
  // getDay() 0 is Sunday, 1 is Monday
  const firstDayInLastMonth =
    lastDayInLastMonth - ((calendar.getDay() + 7 - firstDayOfWeek) % 7)
  for (let i = firstDayInLastMonth; i <= lastDayInLastMonth; i++) {
    arr.push(createDate(year, month, i - lastDayInLastMonth))
  }
  // change to the last day of the current month
  calendar.setMonth(month + 1, 0)
  const lastDayInCurrentMonth = calendar.getDate()
  for (let i = 1; i <= lastDayInCurrentMonth; i++) {
    arr.push(createDate(year, month, i))
  }

  const lastMonthLength = lastDayInLastMonth - firstDayInLastMonth + 1
  const nextMonthLength = 6 * 7 - lastMonthLength - lastDayInCurrentMonth
  for (let i = 1; i <= nextMonthLength; i++) {
    arr.push(createDate(year, month, lastDayInCurrentMonth + i))
  }
  return arr
}
export function getMonths({ monthsArr, year }) {
  let currentYear = year
  let months = []
  for (let i = 0; i < monthsArr.length; i++) {
    let start = `${currentYear}-${i + 1}-1`
    let startDate = new Date(`${start}`)
    months.push(startDate)
  }
  return months
}
export function getWeeks({ year, startingDay }) {
  const weekStartingDates = []

  const firstDayOfYear = new Date(year, 0, 1)
  const lastDayOfYear = new Date(year, 11, 31)

  let currentDate = new Date(firstDayOfYear)

  while (currentDate <= lastDayOfYear) {
    if (currentDate.getDay() === startingDay) {
      weekStartingDates.push(new Date(currentDate))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return weekStartingDates
}

export function getWeekNumber(date, referenceDate, startingDay) {
  let year = referenceDate.getFullYear()
  let allWeeks = getWeeks({ year, startingDay })
  let ind = 0
  allWeeks.forEach((val, index) => {
    if (date.getTime() === val.getTime()) {
      ind = index + 1
    }
  })
  return ind
}
export function getQuarter({ year }) {
  const startingDates = []

  for (let quarter = 0; quarter < 4; quarter++) {
    const startDate = new Date(year, quarter * 3, 1)
    startingDates.push(startDate)
  }
  return startingDates
}
export function getYears(year) {
  const currentYear = new Date().getFullYear()
  const currentCenturyStartYear = Math.floor(currentYear / 100) * 100
  const startingDates = []
  for (
    let year = currentCenturyStartYear - 20;
    year < currentYear + 100;
    year++
  ) {
    const startDate = new Date(year, 0, 1)
    startingDates.push(startDate)
  }
  const splitedArray = []
  let chunkSize = 20
  for (let i = 0; i < startingDates.length; i += chunkSize) {
    splitedArray.push(startingDates.slice(i, i + chunkSize))
  }
  for (const subArray of splitedArray) {
    const yearsInSubArray = subArray.map((date) => date.getFullYear())
    if (yearsInSubArray.includes(year)) {
      return subArray
    }
  }
  return [] // Year not found in any sub-array
}

export function setMonth(dirtyDate, dirtyMonth) {
  const date = new Date(dirtyDate)
  const month =
    typeof dirtyMonth === 'function'
      ? dirtyMonth(date.getMonth())
      : Number(dirtyMonth)
  const year = date.getFullYear()
  const daysInMonth = createDate(year, month + 1, 0).getDate()
  const day = date.getDate()
  date.setMonth(month, Math.min(day, daysInMonth))
  return date
}

export function setYear(dirtyDate, dirtyYear) {
  const date = new Date(dirtyDate)
  const year =
    typeof dirtyYear === 'function' ? dirtyYear(date.getFullYear()) : dirtyYear
  date.setFullYear(year)
  return date
}
export function setWeek(year, lastMilli) {
  let startingDates = getWeeks({ year })
  let ind = 0
  startingDates.forEach((val, index) => {
    if (lastMilli.getTime() === val.getTime()) {
      ind = index + 1
    }
  })
  const selectedElements = startingDates[ind]
  let finalArr = selectedElements
  let lastIndex = startingDates.length - 1
  if (startingDates[lastIndex].getTime() === lastMilli.getTime()) {
    finalArr = new Date(year + 1, 0, 1)
  }
  return finalArr
}
export function getStartingWeekDate(year) {
  const startDate = new Date(year, 0, 1)

  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1)
  }

  return startDate
}
export function getEndDate(type, date) {
  let endDate = undefined
  if (type === 'day') {
    endDate = date.setHours(23, 59, 59, 999)
  } else if (type === 'week') {
    let currentDate = date.setDate(date.getDate() + 6)
    endDate = new Date(currentDate).setHours(23, 59, 59, 999)
  } else if (type === 'month') {
    let nextMonth = date.setMonth(date.getMonth() + 1)
    let day = new Date(nextMonth).setDate(0)
    endDate = new Date(day).setHours(23, 59, 59, 999)
  } else if (type === 'quarter') {
    let quarter = date.setMonth(date.getMonth() + 3)
    let day = new Date(quarter).setDate(0)
    endDate = new Date(day).setHours(23, 59, 59, 999)
  } else if (type === 'year') {
    const currentYear = date.getFullYear()
    const endOfYear = new Date(currentYear, 11, 31)
    endDate = endOfYear.setHours(23, 59, 59, 999)
  }
  return endDate
}
export function setRefsDate(type, date) {
  let [value0, value1] = date || []
  let startDate = new Date(value0).setHours(0, 0, 0, 0)
  let endDate = undefined
  if (type === 'day' || type === 'day-time') {
    endDate = new Date(value1).setHours(0, 0, 0, 0)
  } else if (type === 'week') {
    let startDay = new Date(value0).getDay()
    let date = new Date(value1)
    const day = date.getDay() // Get the day of the week (0 - 6, where 0 is Sunday)
    let diff

    if (startDay === 0) {
      diff = date.getDate() - day
    } else {
      diff = date.getDate() - day + (day === 0 ? -6 : 1)
    }
    const startDate = new Date(date)
    startDate.setDate(diff)
    // let newDate = new Date(value1)
    // let currentDate = newDate.setDate(newDate.getDate() - 6)
    endDate = new Date(startDate).setHours(0, 0, 0, 0)
  } else if (type === 'month') {
    const startOfMonth = new Date(value1)
    startOfMonth.setMonth(startOfMonth.getMonth())
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    endDate = startOfMonth
  } else if (type === 'quarter') {
    const startQuarterDate = new Date(value1)
    startQuarterDate.setMonth(startQuarterDate.getMonth() - 2)
    startQuarterDate.setDate(1)
    startQuarterDate.setHours(0, 0, 0, 0)
    endDate = startQuarterDate
  } else if (type === 'year') {
    const currentYear = new Date(value1).getFullYear()
    const startOfYear = new Date(currentYear, 0, 1)
    endDate = startOfYear.setHours(0, 0, 0, 0)
  }
  return [startDate, endDate]
}
export function setNextDate(type, dateRange) {
  let dateType = type
  let modifiedRefDate
  let [value0, value1] = dateRange || []
  if (type === 'quarter') {
    dateType = 'month'
  }
  if (type === 'day-time') {
    dateType = 'day'
  }
  let start = value0.setHours(0, 0, 0, 0)
  let end = value1.setHours(0, 0, 0, 0)
  let rangeDuration = dayjs(end).diff(dayjs(start), dateType) + 1
  if (type === 'quarter') {
    rangeDuration = rangeDuration + 2
  }
  const currentStartDate = dayjs(start)
  const currentEndDate = dayjs(end)
  const previousDate = currentStartDate.add(rangeDuration, dateType)
  const nextDate = currentEndDate.add(rangeDuration, dateType)
  modifiedRefDate = [previousDate.toDate(), nextDate.toDate()]
  return modifiedRefDate
}
export function setPrevioustDate(type, dateRange) {
  let dateType = type
  let modifiedRefDate
  let [value0, value1] = dateRange || []
  if (type === 'quarter') {
    dateType = 'month'
  }
  if (type === 'day-time') {
    dateType = 'day'
  }
  let start = value0.setHours(0, 0, 0, 0)
  let end = value1.setHours(0, 0, 0, 0)
  let rangeDuration = dayjs(end).diff(dayjs(start), dateType) + 1
  if (type === 'quarter') {
    rangeDuration = rangeDuration + 2
  }
  const currentStartDate = dayjs(start)
  const currentEndDate = dayjs(end)
  const previousDate = currentStartDate.subtract(rangeDuration, dateType)
  const nextDate = currentEndDate.subtract(rangeDuration, dateType)
  modifiedRefDate = [previousDate.toDate(), nextDate.toDate()]
  return modifiedRefDate
}
export function setCurrentValue(type, startingDay) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  let date
  if (type === 'day' || type === 'day-time') {
    let newDate = new Date().setHours(0, 0, 0, 0)
    date = new Date(newDate)
  } else if (type === 'month') {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).setHours(
      0,
      0,
      0,
      0
    )
    date = new Date(firstDayOfMonth)
  } else if (type === 'week') {
    const currentDayOfWeek = currentDate.getDay()
    let difference // 0 (Sunday) to 6 (Saturday)
    if (startingDay === 0) {
      difference = currentDayOfWeek
    } else if (startingDay === 1) {
      difference = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1
    }

    const currentWeekStartDate = new Date(currentDate)
    currentWeekStartDate.setDate(currentDate.getDate() - difference)
    currentWeekStartDate.setHours(0, 0, 0, 0)
    date = new Date(currentWeekStartDate)
  } else if (type === 'quarter') {
    let quarter = Math.floor(currentMonth / 3)
    date = new Date(currentYear, quarter * 3, 1)
  } else if (type === 'year') {
    date = new Date(currentYear, 0, 1)
  }
  return date
}

export function setDateForLabel(label, offset, operationOn, startDayOfWeek) {
  const currentDate = new Date()
  let date
  let endDate
  if (operationOn === 'day') {
    date = new Date(currentDate)
    date.setDate(currentDate.getDate() + offset)
    if (offset < -1) {
      let lenght = Math.abs(offset) - 1
      endDate = new Date(new Date(currentDate).setDate(date.getDate() + lenght))
      const today = new Date()
      const previousDay = new Date(today)
      previousDay.setDate(today.getDate() - 1)
      endDate = new Date(previousDay)
    } else {
      endDate = date
    }
  } else if (operationOn === 'week') {
    const currentDayOfWeek = currentDate.getDay()
    let difference
    if (startDayOfWeek === 0) {
      difference = currentDayOfWeek
    } else if (startDayOfWeek === 1) {
      difference = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1
    }
    difference = difference - offset * 7
    date = new Date(currentDate)
    date.setDate(currentDate.getDate() - difference)
    if (offset < -1) {
      let lenght = (Math.abs(offset) - 1) * 7
      const currentMonth = currentDate.getMonth()
      let forWardDate = new Date(
        new Date(currentDate).setDate(date.getDate() + lenght)
      )
      endDate = new Date(forWardDate.setMonth(currentMonth))
      const today = new Date()
      const lastWeekStart = new Date(today)
      const dayOfWeekDiff = today.getDay() - startDayOfWeek
      const daysAgo = dayOfWeekDiff < 0 ? 7 + dayOfWeekDiff : dayOfWeekDiff
      lastWeekStart.setDate(today.getDate() - daysAgo - 7)
      endDate = lastWeekStart
    } else {
      endDate = date
    }
  } else if (operationOn === 'month') {
    date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    )
    if (offset < -1) {
      const currentDate = new Date()
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    } else {
      endDate = date
    }
  } else if (operationOn === 'year') {
    date = new Date(currentDate.getFullYear() + offset, 0, 1)
    if (offset < -1) {
      endDate = new Date()
    } else {
      endDate = date
    }
  } else if (operationOn === 'quarter') {
    const quarterStartDate = new Date(
      currentDate.getFullYear(),
      Math.floor(currentDate.getMonth() / 3) * 3,
      1
    )
    date = new Date(quarterStartDate)
    date.setMonth(quarterStartDate.getMonth() + offset * 3)
    if (offset < -1) {
      endDate = new Date()
    } else {
      endDate = date
    }
  }
  date.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  return [new Date(date), new Date(endDate)]
}

export function getTimePickerProps(format) {
  let length = 24
  if (format) {
    length = 12
  }
  const hoursArray = Array.from({ length: length }, (_, index) => {
    let hour = index
    let label
    if (format) {
      if (hour == 0) hour = hour + 12
      label = hour.toString().padStart(2, '0')
    } else {
      label = index.toString().padStart(2, '0')
    }
    return { label, value: hour }
  })

  const minutesArray = Array.from({ length: 60 }, (_, index) => {
    const label = index.toString().padStart(2, '0')
    return { label, value: index }
  })

  // const secondsArray = Array.from({ length: 60 }, (_, index) => {
  //   const label = index.toString().padStart(2, '0')
  //   return { label, value: index.toString() }
  // })

  const column = [
    {
      title: 'HH',
      options: hoursArray,
    },
    {
      title: 'MM',
      options: minutesArray,
    },
    {
      options: [
        { label: 'am', value: 'AM' },
        { label: 'pm', value: 'PM' },
      ],
    },
  ]
  if (!format) {
    column.splice(-1, 1)
  }
  return column
}

export function setTimeForDate(date, time, is12Hour) {
  let milli = timeToMilliseconds(time, is12Hour)
  let dateMilli = date.getTime()
  return dateMilli + milli
}

export function timeToMilliseconds(timeString, is12HourFormat = true) {
  let [hours = 0, minutes = 0, meridiem = 'am'] = timeString || []
  hours = parseInt(hours, 10)
  minutes = parseInt(minutes, 10)

  if (is12HourFormat) {
    if (meridiem.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12
    } else if (meridiem.toLowerCase() === 'am' && hours === 12) {
      hours = 0
    }
  }

  const milliseconds = (hours * 60 + minutes) * 60 * 1000
  return milliseconds
}

export function millisecondsToTime(milliseconds, is12HourFormat = true) {
  const date = new Date(milliseconds)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  let arr = [hours, minutes]
  if (is12HourFormat) {
    if (hours === 0) {
      arr[0] = 12
    }
    if (hours > 12) {
      arr[0] = hours - 12
    }
    if (hours >= 12) {
      arr[2] = 'PM'
    } else {
      arr[2] = 'AM'
    }
  }
  if (hours === 0 && minutes === 0) {
    arr = []
  }
  return arr
}
export function findForCurrentDate(date, view, startinDate) {
  let isCurrentDate = false
  const currentDate = new Date(new Date().setHours(0, 0, 0, 0))
  const presentMonth = date.getMonth()
  const currentMonth = currentDate.getMonth()
  const presentDay = date.getDate()
  const currentDay = currentDate.getDate()
  const presentYear = date.getFullYear()
  const currentYear = currentDate.getFullYear()
  const currentDayOfWeek = currentDate.getDay()
  const daysToStartOfWeek = (currentDayOfWeek - startinDate + 7) % 7
  const startDateOfWeek = new Date(currentDate)
  startDateOfWeek.setDate(currentDate.getDate() - daysToStartOfWeek)
  if (
    view === 'month' &&
    presentMonth === currentMonth &&
    presentYear === currentYear
  ) {
    isCurrentDate = true
  } else if (
    view === 'day' &&
    presentDay === currentDay &&
    presentMonth === currentMonth &&
    presentYear === currentYear
  ) {
    isCurrentDate = true
  } else if (view === 'year' && presentYear === currentYear) {
    isCurrentDate = true
  } else if (view === 'week' && startDateOfWeek.getTime() === date.getTime()) {
    isCurrentDate = true
  } else if (
    view === 'quarter' &&
    Math.floor(currentMonth / 3) === Math.floor(presentMonth / 3) &&
    presentYear === currentYear
  ) {
    isCurrentDate = true
  }
  return isCurrentDate
}

export function convertToTZ(value, tz) {
  console.log('ctz: ', value, tz)
  if (value && tz) {
    if (Array.isArray(value)) {
      let [value0, value1] = value
      let formattedDate0 = dayjs(value0).format('MM/DD/YYYY HH:mm:ss')
      let formattedDate1 = dayjs(value1).format('MM/DD/YYYY HH:mm:ss')
      console.log('convertToTZ: ', formattedDate0, formattedDate1, tz)
      value0 = dayjs.tz(formattedDate0, 'MM/DD/YYYY HH:mm:ss', tz).valueOf()
      value1 = dayjs.tz(formattedDate1, 'MM/DD/YYYY HH:mm:ss', tz).valueOf()
      console.log('value0: ', value0, value1)
      return [value0, value1]
    } else {
      let formattedDate = dayjs(value).format('MM/DD/YYYY HH:mm:ss')
      console.log('convertToTZ: ', formattedDate, tz)
      value = dayjs.tz(formattedDate, 'MM/DD/YYYY HH:mm:ss', tz).valueOf()
      return value
    }
  }
  return value
}

export function convertToLocalTZ(value, tz) {
  console.log('ctlz: ', value, tz)
  if (!isEmpty(value) && tz) {
    if (Array.isArray(value)) {
      let [value0, value1] = value
      let formattedDate0 = dayjs.tz(value0, tz).format('MM/DD/YYYY HH:mm:ss')
      let formattedDate1 = dayjs.tz(value1, tz).format('MM/DD/YYYY HH:mm:ss')
      console.log('convertToLocalTZ: ', formattedDate0, formattedDate1, tz)
      value0 = dayjs(formattedDate0, 'MM/DD/YYYY HH:mm:ss').valueOf()
      value1 = dayjs(formattedDate1, 'MM/DD/YYYY HH:mm:ss').valueOf()
      return [value0, value1]
    } else {
      let formattedDate = dayjs.tz(value, tz).format('MM/DD/YYYY HH:mm:ss')
      console.log('convertToLocalTZ: ', formattedDate, tz)
      value = dayjs(formattedDate, 'MM/DD/YYYY HH:mm:ss').valueOf()
      return value
    }
  }
  return value
}
