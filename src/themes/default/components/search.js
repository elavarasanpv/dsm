const baseStyle = {
  borderRadius: '$border.medium',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'solid 1px',
  borderColor: 'transparent',
  color: '$colors.textDefault',
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundMedium',
    borderColor: 'transparent',
    color: '$colors.textMain',
    boxShadow: '$shadows.elevation1',
  },
  '&:active': {
    backgroundColor: '$colors.backgroundMidgroundDark',
    borderColor: 'transparent',
    color: '$colors.neutralFont80',
  },
}
const disabled = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  color: '$colors.textDefault',
  opacity: '0.4',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '$colors.textDefault',
  },
}
const size = {
  small: {
    padding: '$spacing.containerMedium $spacing.containerMedium',
    height: '24px',
    width: '24px',
  },
  medium: {
    padding: '$spacing.containerMedium $spacing.containerLarge',
    height: '32px',
    width: '32px',
  },
  large: {
    padding: '$spacing.containerLarge $spacing.containerXLarge',
    height: '40px',
    width: '40px',
  },
}
export default {
  size,
  baseStyle,
  disabled,
}
