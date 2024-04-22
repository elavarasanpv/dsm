const baseStyle = {
  display: 'flex',
  width: 'fit-content',
  background: '$colors.backgroundCanvas',
  // boxShadow: '$elevation.lightMed',
  borderRadius: '$border.medium',
  padding: '$spacing.containerXLarge',
  gap: '$spacing.containerMedium',
}
const column = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flexStart',
  overflowY: 'scroll',
  position: 'relative',
}
const border = {
  height: '1px',
  position: 'absolute',
  width: '100%',
  borderTop: '1px solid',
  borderColor: '$colors.borderPrimaryDefault',
  zIndex: '2',
}
const cell = {
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  padding: '$spacing.containerNone $spacing.containerMedium',
  height: '32px',
  borderRadius: '$border.medium',
  cursor: 'pointer',
  justifyContent: 'center',
  zIndex: '1',
}
const text = {
  overflow: 'hidden',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
}
export default { baseStyle, column, cell, text, border }
