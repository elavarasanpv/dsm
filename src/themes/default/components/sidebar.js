const baseStyle = {
  position: 'relative',
  height: '100%',
  width: '100%',
}

const sidebar = {
  position: 'absolute',
  top: '0',
  height: '100%',
  transition: 'left 300ms ease-in',
  borderRadius: '$border.high',
  border: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  zIndex: '70',
}

const toggle = {
  position: 'absolute',
  bottom: '0px',
  // left: '0px',
  zIndex: '11',
  color: '$colors.textInverseMain',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '$colors.backgroundNeutralInverse',
  padding: '8px 12px',
  borderRadius: '$border.medium',
  marginLeft: '$spacing.containerMedium',
  boxShadow: '$elevation.lightLow02',
}

const content = {
  position: 'absolute',
  height: '100%',
  top: '0',
  // right: '0',
  transition: 'width 300ms ease-in',
}

const title = {
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  borderBottom: 'solid 1px',
  borderColor: '$colors.borderNeutralBaseSubtle',
  display: 'flex',
  gap: '$spacing.containerLarge',
  alignItems: 'center',
}

export default {
  baseStyle,
  sidebar,
  toggle,
  content,
  title,
}
