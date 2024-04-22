const baseStyle = {}

const datePanelContainer = {
  backgroundColor: '$colors.backdropsWhite',
  borderRadius: '$border.high',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // width: '252px',
}

const dateTimePanelContainer = {
  ...datePanelContainer,
  flexDirection: 'column',
}
const amMeridianContainer = {
  height: '39px',
  width: '39px',
  borderRadius: '$border.medium',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtle',
  cursor: 'pointer',
  backgroundColor: '$colors.backgroundCanvas',
}
const pmMeridianContainer = {
  ...amMeridianContainer,
  backgroundColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textInverseMain',
  border: '1px solid',
  borderColor: '$colors.backgroundPrimaryDefault',
}

const timePickerContainer = {
  display: 'flex',
  padding: '16px',
  backgroundColor: '$colors.neutralBg5',
  width: '100%',
  justifyContent: 'space-between',
}

const container = {
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
}
const rangePanelContainer = {
  ...datePanelContainer,
  flexDirection: 'row',
  width: 'fit-content',
  padding: '0px',
  borderRadius: '0',
}

const rangePickerContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
}

const footer = {
  backgroundColor: '$colors.backgroundMidgroundMedium',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '$spacing.containerLarge',
}

const commonCellStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$border.full',
  cursor: 'pointer',
  fontSize: '$typography.bodyReg14.fontSize',
  fontFamily: '$typography.bodyReg14.fontFamily',
  fontWeight: '$typography.bodyReg14.fontWeight',
  userSelect: 'none',
  width: '30px',
  height: '30px',
  color: '$colors.textMain',
}

const headerCell = {
  ...commonCellStyle,
  height: '28px',
  width: '36px',
  color: '$colors.neutralBg40',
  fontSize: '$typography.captionReg12.fontSize',
  fontFamily: '$typography.captionReg12.fontFamily',
  fontWeight: '$typography.captionReg12.fontWeight',
}

const dateCell = {
  ...commonCellStyle,
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundMedium',
  },
}

const nonCurrentDateCell = {
  ...commonCellStyle,
  opacity: '0.4',
}

const todayDateCell = {
  ...commonCellStyle,
  backgroundColor: '$colors.backgroundAccentBlueSubtle',
}

const activeDateCell = {
  ...commonCellStyle,
  backgroundColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textInverseMain',
}

const withinRange = {
  ...commonCellStyle,
  borderRadius: '0px',
  backgroundColor: '$colors.backgroundPrimaryHovered',
  color: '$colors.textInverseMain',
}
const conWithinRange = {
  borderRadius: '0px',
  backgroundColor: '$colors.backgroundPrimaryHovered',
  color: '$colors.textInverseMain',
}

const activeRangeCellStart = {
  ...commonCellStyle,
  backgroundColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textInverseMain',
  borderRadius: '0px',
  borderTopLeftRadius: '100px',
  borderBottomLeftRadius: '100px',
}
const startContainer = {
  width: '100%',
  backgroundColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textInverseMain',
  borderRadius: '0px',
  borderTopLeftRadius: '100px',
  borderBottomLeftRadius: '100px',
}
const activeRangeCellEnd = {
  ...commonCellStyle,
  backgroundColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textInverseMain',
  borderTopRightRadius: '100px',
  borderBottomRightRadius: '100px',
  borderRadius: '0px',
}
const endContainer = {
  width: '100%',
  backgroundColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textInverseMain',
  borderTopRightRadius: '100px',
  borderBottomRightRadius: '100px',
}
const segment = {
  display: 'flex',
  alignItems: 'center',
  // padding: '$spacing.containerMedium $spacing.containerLarge',
  gap: '$spacing.containerSmall',
  flex: '1 0 0',
}

export default {
  baseStyle,
  datePanelContainer,
  dateCell,
  headerCell,
  nonCurrentDateCell,
  todayDateCell,
  activeDateCell,
  rangePanelContainer,
  rangePickerContainer,
  footer,
  withinRange,
  activeRangeCellStart,
  activeRangeCellEnd,
  dateTimePanelContainer,
  amMeridianContainer,
  pmMeridianContainer,
  timePickerContainer,
  container,
  conWithinRange,
  startContainer,
  endContainer,
  segment,
}
