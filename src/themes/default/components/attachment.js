const baseStyle = {
  width: '100%',
}

const emptyContainer = {
  width: '100%',
  border: 'dotted 1px',
  borderColor: '$colors.borderNeutralGrey02Dark',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '26px 40px',
  borderRadius: '$border.medium',
  backgroundColor: '$colors.backgroundAccentBlueSubtle',
  textAlign: 'center',
  cursor: 'pointer',
  fontFamily: '$typography.bodyReg14.fontFamily',
  fontSize: '$typography.bodyReg14.fontSize',
  fontWeight: '$typography.bodyReg14.fontWeight',
  lineHeight: '$typography.bodyReg14.lineHeight',
  flexDirection: 'column',
  '&:hover': {
    borderColor: '$colors.borderNeutralGrey02Darkest',
  },
}

const fileItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$spacing.containerXxLarge $spacing.containerXLarge',
  width: '100%',
  fontFamily: '$typography.bodyReg14.fontFamily',
  fontSize: '$typography.bodyReg14.fontSize',
  fontWeight: '$typography.bodyReg14.fontWeight',
  lineHeight: '$typography.bodyReg14.lineHeight',
  '&:hover': {
    '.f-upload-delete-icon': {
      visibility: 'hidden',
    },
  },
}

const fileContainer = {
  display: 'flex',
  backgroundColor: '$colors.backgroundMidgroundSubtle',
  margin: '0px 0px $spacing.containerXLarge',
  borderRadius: '4px',
  flexDirection: 'column',
  width: '100%',
}

const deleteSizeContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default {
  baseStyle,
  fileItem,
  fileContainer,
  deleteSizeContainer,
  emptyContainer,
}
