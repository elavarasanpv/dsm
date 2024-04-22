const baseStyle = {
  backgroundColor: '$colors.backgroundMidgroundSubtle',
  borderColor: '$colors.borderNeutralBaseLight',
  border: 'solid 1px',
  '&:hover': {
    backgroundColor: '$colors.backgroundNeutralGrey02Subtle',
  },
  '&:focus': {
    outlineStyle: 'solid',
    outlineColor: '$colors.borderPrimaryFocused',
    outlineWidth: 'thin',
  },
}

const states = {
  checked: {
    backgroundColor: '$colors.backgroundPrimaryDefault',
    borderColor: '$colors.backgroundPrimaryDefault',
    '&:after': {
      border: 'none',
    },
    '&:focus': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
      outlineOffset: '1px',
    },
  },
}
const size = {
  default: {
    height: '20px',
    minWidth: '48px',
    '&:after': {
      height: '16px',
      width: '16px !important',
      borderColor: '$colors.borderNeutralBaseLight',
      border: 'solid 1px',
    },
  },
  small: {
    height: '16px',
    minWidth: '36px',
    '&:after': {
      height: '12px',
      width: '12px !important',
      borderColor: '$colors.borderNeutralBaseLight',
      border: 'solid 1px',
    },
  },
}

export default { baseStyle, states, size }
