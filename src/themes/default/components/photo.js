const baseStyle = {
  width: '100%',
  border: 'dotted 1px',
  borderColor: '$colors.borderNeutralGrey02Dark',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '108px',
  margin: '5px',
  borderRadius: '4px',
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

const wrapper = {
  display: 'flex',
  flexDirection: 'row',
}

const imageContainer = {
  width: '200px',
  height: '200px',
}

const selectedPhotoContainer = {
  width: '100%',
  position: 'relative',
  div: {
    display: 'none',
  },
  '&:hover': {
    div: {
      display: 'flex',
    },
  },
}

export default {
  baseStyle,
  selectedPhotoContainer,
  wrapper,
  imageContainer,
}
