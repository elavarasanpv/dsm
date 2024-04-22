const baseStyle = {}

const calendarHeader = {
  width: '100%',
  visibility: 'visible',
  display: 'flex',
  cursor: 'pointer',
  pointerEvents: 'none',
  fontFamily: '$typography.captionReg12.fontFamily',
}

const dayHeader = {
  height: '40px',
  fontSize: '$typography.size.fontSize6',
  fontWeight: '$typography.weight.bold',
  color: '$colors.backgroundAccentBlueMedium',
  opacity: '0.8',
  alignItems: 'center',
}

const events = {
  color: '$colors.textMain',
  width: '100%',
  height: '40px',
  visibility: 'visible',
  fontSize: '$typography.captionReg10.fontSize',
  cursor: 'pointer',
  alignItems: 'start',
  display: 'flex',
}

const eventText = {
  display: 'inline !important',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const cellContent = {
  padding: '5px 5px 0px 0px',
  alignItems: 'end',
  visibility: 'visible',
  width: '100%',
  height: '36px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  color: '$colors.textMain',
}

const cellSelect = {
  height: '24px',
  width: '24px',
  padding: '5px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  // '&:hover': {
  //   backgroundColor: '$colors.gray2',
  //   borderColor: '$colors.gray2',
  //   borderRadius: '50%',
  // },
  // '&:focus': {
  //   backgroundColor: '$colors.gray2',
  //   borderColor: '$colors.gray2',
  //   borderRadius: '50%',
  // },
}

const weekdayHeading = {
  color: '$colors.textMain',
  visibility: 'visible',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  borderColor: '$colors.gray1',
  flexDirection: 'column',
}

const viewMore = {
  display: 'flex',
  cursor: 'pointer',
  color: '$colors.backgroundAccentBlueMedium',
  fontSize: '$typography.captionReg12.fontSize',
  fontFamily: '$typography.captionReg12.fontFamily',
  '&:hover': {
    color: '$colors.backgroundAccentBlueDark',
  },
}
const viewMoreWeek = {
  backgroundColor: '#e6e6fe',
  width: '100%',
  display: 'flex',
  paddingLeft: '4px',
  wordBreak: 'break-word',
}
const weekdayHeadingToday = {
  borderBottom: '0',
}
const weekTitle = {
  display: 'flex',
  width: '88%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '16px',
  paddingLeft: '$spacing.containerMedium',
  paddingRight: '$spacing.containerMedium',
  justifyContent: 'flex-start',
  alignItems: 'center',
}

const monthEvent = {
  paddingTop: '1px',
  height: '16px',
  overflow: 'hidden',
  display: 'block',
  alignItems: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontFamily: '$typography.headingMed14.fontFamily',
  color: '$colors.textMain',
}
const weekEvent = {
  display: 'flex',
  lineHeight: '1.25',
  flexDirection: 'column',
  fontFamily: '$typography.fontFamilies.display',
}
const timezone = {
  display: 'flex',
  borderRight: '1px solid #F1F2F4',
  height: '40px',
  width: '73px',
  position: 'absolute',
  alignItems: 'center',
  padding: '0px 5px',
  color: '$colors.textMain',
  justifyContent: 'center',
  fontSize: '$typography.captionReg10.fontSize',
}
const todayCell = {
  color: '$colors.backgroundCanvas',
  backgroundColor: '$colors.backgroundAccentBlueDark',
  borderRadius: '50%',
  fontWeight: '$typography.headingMed16.fontWeight',
  opacity: '1 !important',
}
const normalCell = {
  color: '$colors.textMain',
  fontWeight: 'normal !important',
}

export default {
  baseStyle,
  calendarHeader,
  events,
  cellContent,
  weekdayHeading,
  viewMore,
  eventText,
  monthEvent,
  dayHeader,
  weekEvent,
  timezone,
  viewMoreWeek,
  weekdayHeadingToday,
  cellSelect,
  todayCell,
  normalCell,
  weekTitle,
}
