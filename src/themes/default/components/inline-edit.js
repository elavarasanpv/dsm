import typography from '../tokens/typography'
const appearance = {
  ...typography,
}
const baseStyle = {
  border: 'solid 1px',
  height: '100%',
  width: '100%',
  outline: 'none',
  borderRadius: '$border.medium',
  padding: '$spacing.containerMedium',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundMedium',
    borderColor: '$colors.backgroundMidgroundMedium',
    boxShadow: 'unset',
  },
  '&:focus': {
    borderRadius: '$border.medium',
    borderColor: '$colors.backgroundPrimaryDefault',
  },
  '&::placeholder': {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: '$colors.textCaption',
  },
}
const inputBorder = {
  border: '1px solid',
  borderRadius: '$border.medium',
  borderColor: '$colors.backgroundPrimaryDefault',
}
export default { baseStyle, appearance, inputBorder }
