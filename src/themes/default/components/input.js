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

// border bottom animation
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
  transition: 'border 250ms ease-out',
}

const appearance = {
  default: {
    borderColor: '$colors.borderNeutralBaseSubtle',
    backgroundColor: '$colors.backgroundCanvas',
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

const size = {
  small: {
    fontSize: '$typography.captionMed12.fontSize',
    fontWeight: '$typography.captionMed12.fontWeight',
    height: '24px',
  },
  medium: {
    fontSize: '$typography.bodyReg14.fontSize',
    fontWeight: '$typography.bodyReg14.fontWeight',
    height: '32px',
  },
  large: {
    fontSize: '$typography.headingMed14.fontSize',
    fontWeight: '$typography.headingMed14.fontWeight',
    borderRadius: '$border.medium',
    height: '40px',
  },
}

const slots = {
  prefix: {
    display: 'flex',
    alignItems: 'center',
    padding: '$spacing.containerLarge',
  },
  suffix: {
    display: 'flex',
    alignItems: 'center',
    padding: '$spacing.containerLarge',
  },
  clickable: {
    display: 'flex',
    alignItems: 'center',
    padding: '$spacing.containerLarge',
    borderLeft: 'solid 1px',
    borderColor: 'transparent',
    backgroundColor: '$colors.backgroundMidgroundMedium',
    transition: 'background-color 0.3s ease',
    userSlect: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '$colors.backgroundMidgroundDark',
    },
    '&:active': {
      backgroundColor: '$colors.backgroundMidgroundMedium',
    },
  },
}

export default {
  baseStyle,
  slots,
  appearance,
  inputStyle,
  size,
}
