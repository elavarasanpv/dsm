const baseStyle = {
  color: '$colors.neutralFont80',
  padding: '$spacing.containerXLarge',
  fontFamily: '$typography.baseReg14.fontFamily',
  fontSize: '$typography.baseReg14.fontSize',
  fontWeight: '$typography.baseReg14.fontWeight',
  lineHeight: '$typography.baseReg14.lineHeight',
  margin: '$spacing.containerMedium $spacing.containerNone',
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'start ',
  gap: '$spacing.containerLarge',
  borderRadius: '$border.medium',
  '&:hover': {
    backgroundColor: '$colors.backgroundAccentBlueSubtle',
  },
  '&[selected]': {
    backgroundColor: '$colors.backgroundAccentBlueSubtle',
  },
}

const unselectable = {
  true: {
    padding: '$spacing.containerXLarge',
    cursor: 'not-allowed',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: '0.4',
    '&:hover': {
      backgroundColor: '$colors.backgroundCanvas',
    },
  },
}

export default { baseStyle, unselectable }
