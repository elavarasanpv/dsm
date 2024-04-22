const baseStyle = {
  backgroundColor: '$colors.backgroundCanvas',
  display: 'flex',
  gap: '$spacing.containerMedium',
  flexDirection: 'column',
}
const body = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 0 0',
  alignSelf: 'stretch',
  border: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtle',
  borderRadius: '$border.medium',
}
const uploadFile = {
  backgroundColor: '$colors.backgroundAccentBlueSubtle',
  display: 'flex',
  width: '80px',
  height: '80px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$spacing.containerXLarge',
  border: '1px dashed',
  borderColor: '$colors.borderPrimaryDefault',
  borderRadius: '$border.high',
}
const hoverIcon = {
  backgroundColor: '$colors.backgroundCanvas',
  display: 'flex',
  width: '24px',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$spacing.containerMedium',
  cursore: 'pointer',
  borderRadius: '$border.medium',
}

export default { baseStyle, body, uploadFile, hoverIcon }
