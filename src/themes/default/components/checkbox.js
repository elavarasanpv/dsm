const baseStyle = {
  display: 'flex',
  alignItems: 'center',
}
const states = {
  checked: {
    backgroundColor: '$colors.iconPrimaryDefault',
    borderColor: '$colors.iconPrimaryDefault',
    borderWidth: '1px',
  },
  indeterminate: {
    backgroundColor: '$colors.iconPrimaryDefault',
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
