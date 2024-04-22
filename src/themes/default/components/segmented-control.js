const baseStyle = {
  display: 'flex',
  alignItems: 'center',
}
const container = {
  display: 'flex',
  padding: '$spacing.containerMedium',
  alignItems: 'flex-start',
  border: '1px solid',
  borderRadius: '$border.high',
  borderColor: '$colors.borderNeutralBaseSubtle',
  // width: 'fit-content',
  gap: '8px',
  backgroundColor: '$colors.backgroundMidgroundSubtle',
  cursor: 'pointer',
}
const tab = {
  display: 'flex',
  padding: '$spacing.containerMedium $spacing.containerLarge',
  alignItems: 'flex-start',
  // border: '1px solid',
  borderRadius: '$border.medium',
  borderColor: '$colors.backgroundMidgroundSubtle',
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundDark',
    borderColor: '$colors.backgroundMidgroundDark',
  },
  '&:active': {
    borderColor: '$colors.backgroundPrimaryDefault',
  },
  '&:focus': {
    borderColor: '$colors.backgroundPrimaryDefault',
  },
}
const selectedTab = {
  borderRadius: '$border.medium',
  backgroundColor: '$colors.backgroundCanvas',
  borderColor: '$colors.backgroundCanvas',
  boxShadow: '$elevation.lightLow02',
}
export default {
  baseStyle,
  container,
  tab,
  selectedTab,
}
