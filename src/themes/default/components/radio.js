const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  input: {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
    color: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
  },
}
const states = {
  checked: {
    borderColor: '$colors.iconPrimaryDefault',
    borderWidth: '1px',
    '&:after': {
      backgroundColor: '$colors.iconPrimaryDefault',
    },
  },
  unchecked: {
    borderColor: '$colors.borderNeutralBaseSubtle',
    borderWidth: '1px',
  },
  hover: {
    borderColor: '$colors.iconPrimaryHovered',
  },
  disabled: {
    backgroundColor: 'transparent',
    borderColor: '$colors.borderNeutralBaseLight',
  },
}
export default { baseStyle, states }
