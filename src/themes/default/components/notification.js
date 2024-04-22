const baseStyle = {
  padding: '$spacing.containerXLarge $spacing.containerXxLarge',
  display: 'flex',
  // zIndex: 2000,
  position: 'relative',
}
const toastMenu = {
  backgroundColor: '$colors.backgroundMidgroundSubtle',
  boxShadow: '$elevation.lightHigh',
}
const contentContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const actionContainer = {
  display: 'flex',
  alignItems: 'center',
}

const intentBar = {
  height: '100',
  width: '4px',
  display: 'flex',
}

const intentIconContainer = {
  margin: '14px 12px',
}

const rounded = {
  true: {
    borderRadius: '$border.medium',
  },
}

export default {
  baseStyle,
  rounded,
  contentContainer,
  actionContainer,
  intentBar,
  intentIconContainer,
  toastMenu,
}
