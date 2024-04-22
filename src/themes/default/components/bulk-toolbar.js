const baseStyle = {
  width: 'fit-content',
  zIndex: '20',
  backgroundColor: 'rgba(255, 255, 255, 0.40)',
  borderRadius: '$border.medium',
  borderColor: '$colors.borderNeutralBaseSubtler',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '$elevation.lightMed',
  backdropFilter: 'blur(16px)',
  overflow: 'hidden',
}

const numberContainer = {
  backgroundColor: '$colors.backgroundPrimaryDefault',
  padding: '$spacing.sectionXSmall',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$colors.textInverseDefault',
}

export default { baseStyle, numberContainer }
