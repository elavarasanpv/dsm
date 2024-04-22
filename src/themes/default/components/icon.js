const baseStyle = {
  borderRadius: '$border.medium',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$colors.backgroundNeutralHovered',
  },
  '&:active': {
    backgroundColor: '$colors.backgroundNeutralPressed',
  },
}

const pressable = {
  false: {
    cursor: 'inherit',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
  },
}

export default { baseStyle, pressable }
