const baseStyle = {
  padding: '$spacing.containerLarge $spacing.sectionLarge',
  borderRadius: '$border.medium',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'none',
  border: 'none',
  height: 'unset',
  transition: 'background-color 0.3s ease',
  fontFamily: '$typography.captionMed12.fontFamily',
}

const appearance = {
  primary: {
    backgroundColor: '$colors.backgroundPrimaryDefault',
    color: '$colors.textInverseMain',
    border: 'solid 1px',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: '$colors.backgroundPrimaryHovered',
      color: '$colors.textInverseMain',
      boxShadow: '$shadows.elevation1',
      borderColor: 'transparent',
    },
    '&:active': {
      backgroundColor: '$colors.backgroundPrimaryPressed',
      color: '$colors.textInverseMain',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '$colors.backgroundPrimaryDefault',
      color: '$colors.textInverseMain',
      borderColor: 'transparent',
    },
    '&[disabled]': {
      backgroundColor: '$colors.backgroundPrimaryDefault',
      color: '$colors.textInverseMain',
      borderColor: 'transparent',
      opacity: '0.4',
      '&:hover': {
        backgroundColor: '$colors.backgroundPrimaryDefault',
        color: '$colors.textInverseMain',
        border: 'solid 1px',
        borderColor: 'transparent',
      },
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    border: 'solid 1px',
    borderColor: '$colors.borderNeutralGrey02Medium',
    color: '$colors.textDefault',
    '&:hover': {
      backgroundColor: '$colors.backgroundNeutralGrey02Subtle',
      borderColor: '$colors.backgroundNeutralGrey02Medium',
      color: '$colors.textMain',
      boxShadow: '$shadows.elevation1',
    },
    '&:active': {
      backgroundColor: '$colors.borderNeutralGrey02Light',
      borderColor: '$colors.backgroundNeutralGrey02Light',
      color: '$colors.neutralFont80',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      border: 'solid 1px',
      borderColor: '$colors.borderNeutralGrey02Medium',
      color: '$colors.textDefault',
    },
    '&[disabled]': {
      backgroundColor: 'transparent',
      borderColor: '$colors.borderNeutralGrey02Medium',
      color: '$colors.textDefault',
      opacity: '0.4',
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: '$colors.borderNeutralGrey02Medium',
        color: '$colors.textDefault',
      },
    },
  },
  tertiary: {
    backgroundColor: 'transparent',
    border: 'solid 1px',
    borderColor: 'transparent',
    color: '$colors.textDefault',
    '&:hover': {
      backgroundColor: '$colors.backgroundNeutralGrey02Subtle',
      borderColor: 'transparent',
      color: '$colors.textMain',
      boxShadow: '$shadows.elevation1',
    },
    '&:active': {
      backgroundColor: '$colors.borderNeutralGrey02Light',
      borderColor: 'transparent',
      color: '$colors.neutralFont80',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      border: 'solid 1px',
      borderColor: 'transparent',
      color: '$colors.textDefault',
    },
    '&[disabled]': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '$colors.textDefault',
      opacity: '0.4',
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '$colors.textDefault',
      },
    },
  },
  link: {
    display: 'flex',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: 'transparent',
    color: '$colors.backgroundPrimaryDefault',
    border: 'solid 1px',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '$colors.backgroundPrimaryHovered',
      textDecoration: 'underline !important',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '$colors.backgroundPrimaryDefault',
    },
    '&:active': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '$colors.backgroundPrimaryPressed',
    },
    ':after': {
      display: 'none',
    },
  },
  primaryInverse: {
    backgroundColor: '$colors.backgroundContainer',
    color: '$colors.textDefault',
    border: 'solid 1px',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: '$colors.backgroundMidgroundMedium',
      color: '$colors.textDefault',
      borderColor: 'transparent',
    },
    '&:active': {
      backgroundColor: '$colors.backgroundMidgroundDark',
      color: '$colors.textDefault',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '$colors.backgroundContainer',
      color: '$colors.textDefault',
      borderColor: 'transparent',
    },
    '&[disabled]': {
      backgroundColor: '$colors.backgroundContainer',
      color: '$colors.textDefault',
      borderColor: 'transparent',
      opacity: '0.4',
      '&:hover': {
        backgroundColor: '$colors.backgroundContainer',
        color: '$colors.textDefault',
        border: 'solid 1px',
        borderColor: 'transparent',
      },
    },
  },
  secondaryInverse: {
    backgroundColor: 'transparent',
    color: '$colors.textInverseDefault',
    border: 'solid 1px',
    borderColor: '$colors.borderNeutralGrey01Subtle',
    '&:hover': {
      backgroundColor: '$colors.backgroundMidgroundSubtle',
      color: '$colors.textDefault',
      borderColor: 'transparent',
    },
    '&:active': {
      backgroundColor: '$colors.backgroundMidgroundDark',
      color: '$colors.textDefault',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      color: '$colors.textInverseDefault',
      borderColor: 'transparent',
    },
    '&[disabled]': {
      backgroundColor: 'transparent',
      color: '$colors.textInverseDefault',
      borderColor: '$colors.borderNeutralGrey01Subtle',
      opacity: '0.4',
      '&:hover': {
        backgroundColor: '$colors.transparent',
        color: '$colors.textDefault',
        border: 'solid 1px',
        borderColor: '$colors.borderNeutralGrey01Subtle',
      },
    },
  },
}

const size = {
  small: {
    padding: '$spacing.containerMedium $spacing.containerLarge',
    fontSize: '$typography.captionMed12.fontSize',
    fontWeight: '$typography.captionMed12.fontWeight',
    lineHeight: '$typography.captionMed12.lineHeight',
    height: '24px',
  },
  medium: {
    padding: '$spacing.containerMedium $spacing.containerLarge',
    fontSize: '$typography.headingMed14.fontSize',
    fontWeight: '$typography.headingMed14.fontWeight',
    lineHeight: '$typography.headingMed14.lineHeight',
    height: '32px',
  },
  large: {
    padding: '$spacing.containerLarge $spacing.containerXxLarge',
    fontSize: '$typography.headingMed14.fontSize',
    fontWeight: '$typography.headingMed14.fontWeight',
    lineHeight: '$typography.headingMed14.lineHeight',
    height: '40px',
  },
}

const splitButton = {
  container: {
    display: 'flex',
  },
  button: {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  buttonRtl: {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
  },
  dropdown: {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    borderLeft: 'none !important',
    cursor: 'pointer',
    padding: '0px 2px',
  },
  dropdownRtl: {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderRight: 'none !important',
    cursor: 'pointer',
    padding: '0px 2px',
  },
}

const selected = {
  backgroundColor: '$colors.backgroundSelection',
  border: 'solid 1px',
  borderColor: '$colors.backgroundPrimaryDefault',
  color: '$colors.textMain',
  '&:hover': {
    backgroundColor: '$colors.backgroundSelection',
    borderColor: '$colors.backgroundPrimaryDefault',
    color: '$colors.textMain',
    boxShadow: '$shadows.elevation1',
  },
  '&:active': {
    backgroundColor: '$colors.backgroundSelection',
    borderColor: '$colors.backgroundPrimaryDefault',
    color: '$colors.textMain',
  },
  '&:focus': {
    backgroundColor: '$colors.backgroundSelection',
    border: 'solid 1px',
    borderColor: '$colors.backgroundPrimaryDefault',
    color: '$colors.textMain',
  },
}

export default {
  baseStyle,
  appearance,
  size,
  splitButton,
  selected,
}
