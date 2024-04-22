import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function timeStampToArray(timeStamp, showSeconds, is12Hour) {
  let updatedTimeStamp = dayjs.duration(timeStamp)
  let hour = updatedTimeStamp.hours()
  let minute = updatedTimeStamp.minutes()
  let seconds = updatedTimeStamp.seconds()
  let isPM = is12Hour && hour > 12
  if (isPM) {
    hour = hour - 12
  }
  let timeArray = [hour, minute]
  if (showSeconds) {
    timeArray.push(seconds)
  }
  if (is12Hour) {
    let amPm = isPM ? 'PM' : 'AM'
    timeArray.push(amPm)
  }
  return timeArray
}

export function arrayToTimeStamp(timeArray, showSeconds, is12Hour) {
  let hour = timeArray[0]
  let minute = timeArray[1]
  if (is12Hour) {
    if (timeArray[timeArray.length - 1] === 'PM') {
      hour += 12
    }
  }
  let startOfDay = dayjs().startOf('day')
  let selectedTime = startOfDay.add(hour, 'hour').add(minute, 'minute')
  if (showSeconds) {
    let secs = timeArray[2]
    selectedTime.add(secs, 'second')
  }
  let timestampInMilliseconds = selectedTime.diff(startOfDay)
  return timestampInMilliseconds
}
