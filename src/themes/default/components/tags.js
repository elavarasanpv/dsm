const baseStyle = {
  borderRadius: '$border.medium',
  height: '20px',
  padding: '$spacing.containerSmall $spacing.containerMedium',
  width: 'max-content',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '$spacing.containerMedium',
  border: 'solid 1px',
  fontSize: '$typography.captionReg12.fontSize',
  fontWeight: '$typography.captionReg12.fontWeight',
  fontFamily: '$typography.captionReg12.fontFamily',
  lineHeight: '$typography.captionReg12.lineHeight',
  borderColor: '$colors.neutralBg30',
}

const appearance = {
  default: {
    cursor: 'default',
    background: '$colors.gray1',
  },
}

const focusStyle = {
  '&:focus': {
    outlineStyle: 'solid',
    outlineColor: '$colors.borderPrimaryFocused',
    outlineWidth: 'thin',
  },
}

const statusType = {
  information: {
    background: '$colors.backgroundAccentBlueSubtle',
    color: '$colors.neutralFont80',
    border: '1px solid',
    borderColor: '$colors.backgroundAccentBlueLight',
    '&:hover': {
      background: '$colors.backgroundAccentBlueLight',
    },
    '&:active': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    ...focusStyle,
  },
  default: {
    background: '$colors.backgroundNeutralDefault',
    color: '$colors.neutralFont80',
    border: '1px solid',
    borderColor: '$colors.borderNeutralBaseSubtle',
    '&:hover': {
      background: '$colors.backgroundNeutralHovered',
    },
    '&:active': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    ...focusStyle,
  },
  neutral: {
    background: '$colors.neutralBg10',
    color: '$colors.white',
    border: '1px solid',
    borderColor: '$colors.neutralBg50',
    '&:hover': {
      background: '$colors.neutralBg30',
    },
    '&:active': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    ...focusStyle,
  },
  success: {
    background: '$colors.backgroundSemanticGreenSubtle',
    borderColor: '$colors.borderSemanticGreenLight',
    color: '$colors.neutralFont80',
    border: '1px solid',
    '&:hover': {
      background: '$colors.backgroundSemanticGreenLight',
    },
    '&:active': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    ...focusStyle,
  },
  warning: {
    background: '$colors.backgroundAccentYellowSubtle',
    borderColor: '$colors.borderAccentYellowLight',
    color: '$colors.neutralFont80',
    border: '1px solid',
    '&:hover': {
      background: '$colors.backgroundAccentYellowLight',
    },
    '&:active': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    ...focusStyle,
  },
  danger: {
    background: '$colors.backgroundSemanticRedSubtler',
    borderColor: '$colors.borderSemanticRedLight',
    color: '$colors.neutralFont80',
    border: '1px solid',
    '&:hover': {
      background: '$colors.backgroundSemanticRedSubtle',
    },
    '&:active': {
      outlineStyle: 'solid',
      outlineColor: '$colors.borderPrimaryFocused',
      outlineWidth: 'thin',
    },
    ...focusStyle,
  },
}
const markerBackground = {
  information: {
    background: '$colors.backgroundAccentBlueMedium',
  },
  default: {
    background: '$colors.iconNeutralDefault',
  },
  neutral: {
    background: '$colors.textDefault',
  },
  success: {
    background: '$colors.backgroundSemanticGreenMedium',
  },
  warning: {
    background: '$colors.backgroundAccentYellowMedium',
  },
  danger: {
    background: '$colors.iconSemanticRed',
  },
}
const marker = {
  borderRadius: '50%',
  height: '8px',
  aspectRatio: '1',
}

const actionType = {
  default: {
    background: '$colors.backgroundNeutralDefault',
    color: '$colors.textDefault',
    position: 'relative',
    // maxWidth: '75px',
    height: '20px',
    textAlign: 'left',
    outline: 'none',
    fontFamily: '$typography.captionReg12.fontFamily',
    fontSize: '$typography.captionReg12.fontSize',
    fontWeight: '$typography.captionReg12.fontWeight',
    lineHeight: '$typography.captionReg12.lineHeight',
    '&:hover': {
      background: '$colors.backgroundNeutralHovered',
    },
    '&:active': {
      background: '$colors.backgroundNeutralPressed',
    },
    ...focusStyle,
  },
}

const accentBaseStyle = {
  textTransform: 'uppercase',
  fontSize: '$typography.captionMed10.fontSize',
  fontWeight: '$typography.captionMed10.fontWeight',
  fontFamily: '$typography.captionMed10.fontFamily',
  letterSpacing: '0.5px',
  cursor: 'default',
}

const generateAccent = (bgColor, border, color = '$colors.textDefault') => ({
  color: color,
  border: border ? `1px solid ${border}` : 'none',
  background: bgColor,
  '&:hover': {
    background: bgColor,
  },
})

const accentType = {
  baseStyle: accentBaseStyle,
  L1: {
    blue: generateAccent(
      '$colors.backgroundAccentBlueDark',
      undefined,
      '$colors.textInverseDefault'
    ),
    green: generateAccent('$colors.backgroundSemanticGreenMedium'),
    orange: generateAccent('$colors.backgroundSemanticOrangeMedium'),
    red: generateAccent(
      '$colors.backgroundSemanticRedDark',
      undefined,
      '$colors.textInverseDefault'
    ),
    yellow: generateAccent('$colors.backgroundAccentYellowMedium'),
    grey: generateAccent('$colors.backgroundNeutralPressed'),
    cyan: generateAccent('$colors.backgroundAccentCyanMedium'),
    purple: generateAccent(
      '$colors.backgroundAccentPurpleMedium',
      undefined,
      '$colors.textInverseDefault'
    ),
    violet: generateAccent(
      '$colors.backgroundAccentVioletMedium',
      undefined,
      '$colors.textInverseDefault'
    ),
    pink: generateAccent('$colors.backgroundAccentPinkMedium'),
  },
  L2: {
    blue: generateAccent('$colors.backgroundAccentBlueLight'),
    green: generateAccent('$colors.backgroundSemanticGreenLight'),
    orange: generateAccent('$colors.backgroundSemanticOrangeLight'),
    red: generateAccent('$colors.backgroundSemanticRedSubtle'),
    yellow: generateAccent('$colors.backgroundAccentYellowLight'),
    grey: generateAccent('$colors.backgroundMidgroundDark'),
    cyan: generateAccent('$colors.backgroundAccentCyanLight'),
    purple: generateAccent('$colors.backgroundAccentPurpleLight'),
    violet: generateAccent('$colors.backgroundAccentVioletLight'),
    pink: generateAccent('$colors.backgroundAccentPinkLight'),
  },
  L3: {
    blue: generateAccent(
      '$colors.backgroundAccentBlueSubtle',
      '$colors.backgroundAccentBlueLight'
    ),
    green: generateAccent(
      '$colors.backgroundSemanticGreenSubtle',
      '$colors.backgroundSemanticGreenLight'
    ),
    orange: generateAccent(
      '$colors.backgroundSemanticOrangeSubtle',
      '$colors.backgroundSemanticOrangeLight'
    ),
    red: generateAccent(
      '$colors.backgroundSemanticRedSubtler',
      '$colors.backgroundSemanticRedSubtle'
    ),
    yellow: generateAccent(
      '$colors.backgroundAccentYellowSubtle',
      '$colors.backgroundAccentYellowLight'
    ),
    grey: generateAccent(
      '$colors.backgroundMidgroundMedium',
      '$colors.backgroundMidgroundDark'
    ),
    cyan: generateAccent(
      '$colors.backgroundAccentCyanSubtle',
      '$colors.backgroundAccentCyanLight'
    ),
    purple: generateAccent(
      '$colors.backgroundAccentPurpleSubtle',
      '$colors.backgroundAccentPurpleLight'
    ),
    violet: generateAccent(
      '$colors.backgroundAccentVioletSubtle',
      '$colors.backgroundAccentVioletLight'
    ),
    pink: generateAccent(
      '$colors.backgroundAccentPinkSubtle',
      '$colors.backgroundAccentPinkLight'
    ),
  },
}

export default {
  baseStyle,
  appearance,
  marker,
  markerBackground,
  actionType,
  statusType,
  accentType,
}
