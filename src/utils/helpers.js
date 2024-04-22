import moment from 'moment-timezone'

export const textAppearance = [
  'headingMed20',
  'headingMed16',
  'headingMed14',
  'bodyReg14',
  'bodyRegUl14',
  'bodyRegSt14',
  'captionMed12',
  'captionReg12',
  'captionMed10',
  'captionReg10',
  'avatarS',
  'avatarXS',
]

export const getDuration = (value, format, padValue = 2) => {
  if (!value) {
    return {
      Hrs: 0,
    }
  }

  let duration = moment.duration(parseInt(value, 10), format)
  let days = parseInt(duration.asDays(), 10)
  let hours = duration.hours()
  let minutes = duration.minutes()
  let seconds = duration.seconds()

  const pad = (val) => String(val).padStart(padValue, '0')

  if (days > 0) {
    return hours
      ? {
          Days: pad(days),
          Hrs: pad(hours),
        }
      : {
          Days: pad(days),
        }
  } else if (hours > 0) {
    return minutes
      ? {
          Hrs: pad(hours),
          Mins: pad(minutes),
        }
      : {
          Hrs: pad(hours),
        }
  } else if (minutes > 0) {
    return minutes
      ? {
          Mins: pad(minutes),
        }
      : {
          Secs: pad(seconds),
        }
  } else {
    return {
      Secs: pad(seconds),
    }
  }
}

export const durationToSeconds = (obj) => {
  let durationObj = moment.duration(obj)
  let totalSec = durationObj.asSeconds()
  return totalSec
}

export const getGlobalScope = () => {
  if (typeof window != 'undefined') {
    // browser
    return window
  } else if (typeof self != 'undefined') {
    // electron
    return self
  } else if (typeof global != 'undefined') {
    // node js
    return global
  } else {
    // default - browser
    return window
  }
}
