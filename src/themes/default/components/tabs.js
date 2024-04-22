const baseStyle = {
  display: 'flex',
  alignItems: 'center',
}
const size = {
  large: {
    height: '40px',
    padding: '$spacing.containerLarge $spacing.containerXLarge',
  },
  medium: {
    height: '32px',
    padding: '$spacing.containerLarge $spacing.containerXLarge',
  },
  small: {
    height: '24px',
    padding: '$spacing.containerLarge $spacing.containerLarge',
  },
}
const appearance = {
  link: {
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '$border.medium',
    '&:hover': {},
    // '&:active': {
    //   borderColor: '$colors.backgroundPrimaryDefault',
    //   outlineStyle: 'solid',
    //   outlineColor: '$colors.borderPrimaryFocused',
    //   outlineWidth: 'thin',
    // },
    '&:focus': {
      borderRadius: '$border.medium',
      borderColor: '$colors.backgroundPrimaryDefault',
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    '&[disabled]': {
      opacity: '0.4',
      cursor: 'not-allowed',
    },
  },
  button: {
    cursor: 'pointer',
    borderRadius: '$border.medium',
    '&:hover': {
      backgroundColor: '$colors.backgroundMidgroundMedium',
    },
    // '&:active': {
    //   borderRadius: '$border.medium',
    //   outlineStyle: 'solid',
    //   outlineColor: '$colors.borderPrimaryFocused',
    //   outlineWidth: 'thin',
    // },
    '&:focus': {
      borderRadius: '$border.medium',
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    '&[disabled]': {
      opacity: '0.4',
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: '$colors.backgroundCanvas',
      },
    },
  },
}
const buttonPressed = {
  backgroundColor: '$colors.backgroundMidgroundDark',
  borderColor: '$colors.backgroundMidgroundDark',
}
const selectBorder = {
  position: 'absolute',
  height: '2px',
  width: '100%',
  backgroundColor: '$colors.backgroundPrimaryDefault',
  left: '0px',
  bottom: '-1px',
  transition: 'transform .3s cubic-bezier(.645,.045,.355,1)',
}
const selectButton = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundColor: '$colors.borderNeutralBaseLight',
  border: '1px solid',
  borderColor: '$colors.borderNeutralBaseLight',
  borderRadius: '$border.medium',
  left: '0px',
  bottom: '0px',
  transition: 'transform .3s cubic-bezier(.645,.045,.355,1)',
}
const container = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}
const border = {
  borderBottom: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtle',
}
const tabList = {
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  gap: '$spacing.containerLarge',
}
const menuItem = {
  gap: '$spacing.containerLarge',
  display: 'flex',
}
export default {
  baseStyle,
  tabList,
  container,
  appearance,
  buttonPressed,
  border,
  selectBorder,
  selectButton,
  menuItem,
  size,
}
