const baseStyle = {
  backgroundColor: '$colors.backgroundCanvas',
}
const timelineHeader = {
  minWidth: '416px',
  display: 'flex',
  alignItems: 'center',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  justifyContent: 'center',
  backgroundColor: '$colors.backgroundCanvas',
  gap: '8px',
}
const quickRange = {
  backgroundColor: '$colors.backgroundFrostHigh',
  display: 'flex',
  backdropFilter: 'blur(40px)',
}
const timelineBody = {
  //   width: '420px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   flexDirection: 'column',
  //   padding: '$spacing.containerXxLarge',
  minHeight: '171px',
  backgroundColor: '$colors.backgroundCanvas',
}
const timelineFooter = {
  minWidth: '416px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  gap: '10px',
  borderTop: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  backgroundColor: '$colors.backgroundCanvas',
}
const buttonGroup = {
  display: 'flex',
  alignItems: 'flex-start',
  width: '56px',
  height: '32px',
  button: {
    width: '56px',
    height: '32px',
    gap: '6px',
  },
}
const bodyHeader = {
  display: 'flex',
  width: '276px',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  alignItems: 'center',
  gap: '48px',
}
const titleBox = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: '1 0 0',
}
const titleText = {
  display: 'flex',
  height: '32px',
  padding: '$spacing.containerMedium $spacing.containerLarge',
  justifyContent: 'center',
  alignItems: 'center',
}
const tagTitle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '$spacing.containerSmall $spacing.containerMedium',
  borderRadius: '$border.medium',
  backgroundColor: '$colors.borderNeutralBaseSubtle',
  borderColor: '$colors.borderNeutralBaseSubtle',
  fontSize: '$typography.captionReg12.fontSize',
  fontFamily: '$typography.captionReg12.fontFamily',
  fontWeight: '$typography.captionReg12.fontWeight',
  color: '$colors.textMain',
  lineHeight: 'normal',
}
export default {
  baseStyle,
  timelineHeader,
  timelineFooter,
  timelineBody,
  buttonGroup,
  bodyHeader,
  titleBox,
  titleText,
  tagTitle,
  quickRange,
}
