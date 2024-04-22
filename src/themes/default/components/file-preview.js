const baseStyle = {
  backgroundColor: '$colors.backgroundCanvas',
  position: 'fixed',
  zIndex: '900',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
}
const toolBar = {
  display: 'flex',
  padding: '$spacing.containerXLarge $spacing.sectionSmall',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '$spacing.containerLarge',
  alignSelf: 'stretch',
}
const bodyContainer = {
  display: 'flex',
  //   padding:
  //     '$spacing.containerXxLarge $spacing.sectionSmall 28px $spacing.sectionSmall',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
  alignSelf: 'stretch',
}
const arrow = {
  display: 'inline-flex',
  backgroundColor: '$colors.backgroundCanvas',
  padding: '$spacing.containerXLarge',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '$elevation.lightLow02',
  borderRadius: '$border.full',
}
const menuBar = {
  display: 'flex',
  width: '980px',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  alignItems: 'center',
  gap: '48px',
  borderRadius: '$border.high',
  backgroundColor: '$colors.backgroundMidgroundSubtle',
}

export default { baseStyle, toolBar, bodyContainer, arrow, menuBar }
