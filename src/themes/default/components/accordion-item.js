const baseStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  height: '40px',
  gap: '$spacing.containerMedium',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  cursor: 'pointer',
  // '&:hover': {
  //   background: '$colors.backgroundNeutralDefault',
  // },
}

const container = {
  width: '100%',
  background: '$colors.backgroundCanvas',
  borderColor: 'transparent',
}
const accordionBorder = {
  borderBottom: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
}
const header = {
  fontWeight: '$typography.headingMed14.fontWeight',
  fontSize: '$typography.headingMed14.fontSize',
  fontFamily: '$typography.headingMed14.fontFamily',
  flexGrow: '1',
  width: '90%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}
const prefix = {
  display: 'flex',
  height: '16px',
  width: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const panelContainer = {
  width: '100%',
  fontWeight: '$typography.bodyReg14.fontWeight',
  fontSize: '$typography.bodyReg14.fontSize',
  fontFamily: '$typography.bodyReg14.fontFamily',
  background: '$colors.white',
}

const disabledContainer = {
  opacity: '0.4',
  cursor: 'not-allowed',
}

const openStateContainer = {
  borderRadius: '$border.none',
}
const containerShadow = {
  border: '1px solid $colors.borderNeutralBaseSubtler',
}

const panelOpenContainer = {
  borderRadius: '$border.none $border.none $border.high $border.high',
}

export default {
  baseStyle,
  panelContainer,
  header,
  disabledContainer,
  container,
  prefix,
  accordionBorder,
  openStateContainer,
  panelOpenContainer,
  containerShadow,
}
