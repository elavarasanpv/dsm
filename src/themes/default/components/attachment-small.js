const baseStyle = {
  width: '100%',
}

const emptyContainer = {
  width: '100%',
  border: 'dotted 1px',
  borderColor: '$colors.borderNeutralGrey02Dark',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$spacing.containerXLarge',
  borderRadius: '$border.medium',
  backgroundColor: '$colors.backgroundAccentBlueSubtle',
  textAlign: 'center',
  cursor: 'pointer',
  fontFamily: '$typography.bodyReg14.fontFamily',
  fontSize: '$typography.bodyReg14.fontSize',
  fontWeight: '$typography.bodyReg14.fontWeight',
  lineHeight: '$typography.bodyReg14.lineHeight',
  flexDirection: 'row',
  '&:hover': {
    borderColor: '$colors.borderNeutralGrey02Darkest',
  },
  height: '41px',
  minWidth: '200px',
}

const fileContainer = {
  display: 'flex',
  backgroundColor: '$colors.neutralBg5',
  borderRadius: '$border.medium',
  flexDirection: 'column',
  width: '100%',
}

const fileItem = {
  height: '42px',
  minWidth: '200px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$spacing.containerXxLarge $spacing.containerXLarge',
  width: '100%',
  backgroundColor: '$colors.backgroundMidgroundSubtle',
  '&:hover': {
    '.f-upload-delete-icon': {
      visibility: 'hidden',
    },
  },
}

export default {
  baseStyle,
  emptyContainer,
  fileContainer,
  fileItem,
}
