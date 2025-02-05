const baseStyle = {
  border: 'solid transparent',
  borderWidth: '4px',
  borderColor: '$colors.backgroundAccentBlueDarkest',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  animation: 'spin 1s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}

export default { baseStyle }
