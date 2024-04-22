const baseStyle = {
  backgroundColor: '$colors.backgroundCanvas',
  fontSize: '$typography.captionReg12.fontSize',
  fontWeight: '$typography.captionReg12.fontWeight',
  fontFamily: '$typography.captionReg12.fontFamily',
  lineHeight: '$typography.captionReg12.lineHeight',
  color: '$colors.textMain',
}

const mainLayout = {
  // paddingLeft: '$spacing.sectionSmall',
  alignItems: 'center',
  gap: '$spacing.containerLarge',
  alignSelf: 'stretch',
  // margin: '$spacing.containerNone',
  listStyleType: 'none',
}
const innerContend = {
  // gap: '$spacing.containerLarge',
  alignItems: 'center',
  height: '24px',
  // padding: '$spacing.containerXLarge',
  alignSelf: 'stretch',
  display: 'flex',
  borderRadius: '$border.medium',
}
export default { baseStyle, mainLayout, innerContend }
