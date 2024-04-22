const inputStyle = {
  width: '100%',
  borderColor: 'transparent',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '0px',
  font: 'revert',
  fontSize: '$typography.bodyReg14.fontSize',
  fontWeight: '$typography.bodyReg14.fontWeight',
  fontFamily: '$typography.bodyReg14.fontFamily',
  color: '$colors.textMain !important',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  outline: 'none',
  '&::placeholder': {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: '$colors.textCaption',
    letterSpacing: 'normal',
  },
}

const baseStyle = {
  display: 'flex',
  alignItems: 'stretch',
  fontFamily: '$typography.bodyReg14.fontFamily',
  fontSize: '$typography.bodyReg14.fontSize',
  borderRadius: '$border.medium',
  border: 'solid 1px',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
}

const appearance = {
  default: {
    borderColor: '$colors.borderNeutralBaseSubtle',
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: '$colors.borderNeutralBaseMedium',
    },
    '&:focus-within': {
      borderColor: '$colors.borderPrimaryFocused',
      boxShadow: 'none',
    },
  },
  error: {
    borderColor: '$colors.borderSemanticRedMedium',
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: '$colors.borderSemanticRedMedium',
    },
    '&:focus-within': {
      borderColor: '$colors.borderSemanticRedMedium',
      boxShadow: 'none',
    },
  },
  disabled: {
    borderColor: '$colors.borderNeutralBaseSubtle',
    backgroundColor: '$colors.backgroundMidgroundSubtle',
    '&:hover': {
      borderColor: '$colors.borderNeutralBaseSubtle',
      backgroundColor: '$colors.backgroundMidgroundSubtle',
    },
    '&:focus-within': {
      borderColor: '$colors.borderNeutralBaseSubtle',
      backgroundColor: '$colors.backgroundMidgroundSubtle',
      boxShadow: 'none',
    },
  },
}

const slots = {
  prefix: {
    display: 'flex',
    alignItems: 'center',
    zIndex: '9',
    padding: '$spacing.containerLarge',
  },
  suffix: {
    display: 'flex',
    alignItems: 'center',
    zIndex: '9',
    padding: '$spacing.containerLarge',
  },
}

export default {
  baseStyle,
  slots,
  appearance,
  inputStyle,
}
