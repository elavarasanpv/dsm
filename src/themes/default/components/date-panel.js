const baseStyle = {}

const datePanelContainer = {
  backgroundColor: '$colors.backdropsWhite',
  borderRadius: '$border.high',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // width: '252px',
}
const dateHeader = {
  display: 'flex',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  alignItems: 'center',
  gap: '48px',
  alignSelf: 'stretch',
}
const title = {
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
  flex: '1 0 0',
}
const titleContainer = {
  display: 'flex',
  padding: '$spacing.containerMedium $spacing.containerLarge',
  alignItems: 'center',
  justifyContent: 'center',
  height: '32px',
}
const table = {
  display: 'flex',
  padding: '$spacing.containerXLarge',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '4px',
}
const nonCurrentDateCell = {
  opacity: '0.4',
}
const cell = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$border.medium',
}
const cellHover = {
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundMedium',
  },
}
const selected = {
  backgroundColor: '$colors.backgroundPrimaryDefault',
}
const segment = {
  display: 'flex',
  alignItems: 'center',
  gap: '$spacing.containerSmall',
  flex: '1 0 0',
}
const text = {
  color: '$colors.textInverseMain',
}
const activeRangeCellStart = {
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
}
const activeRangeCellEnd = {
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
}
export default {
  baseStyle,
  datePanelContainer,
  dateHeader,
  title,
  titleContainer,
  table,
  nonCurrentDateCell,
  cell,
  cellHover,
  segment,
  selected,
  text,
  activeRangeCellStart,
  activeRangeCellEnd,
}
