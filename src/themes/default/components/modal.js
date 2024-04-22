const baseStyle = {
  borderRadius: '8px',
}
const backgrounds = {
  modalBackground: { backgroundColor: '$colors.backgroundBlanket' },
}

const slots = {
  header: {
    fontFamily: '$typography.headingMed16.fontFamily',
    fontSize: '$typography.headingMed16.fontSize',
    lineHeight: '$typography.headingMed16.lineHeight',
    fontWeight: '$typography.headingMed16.fontWeight',
    borderColor: 'transparent',
    borderTopLeftRadius: '$border.high',
    borderTopRightRadius: '$border.high',
    padding: '$spacing.containerXLarge $spacing.sectionSmall',
    borderBottom: 'solid 1px $colors.borderNeutralBaseSubtler',
  },
  footer: {
    fontFamily: '$typography.fontFamilies.display',
    borderColor: 'transparent',
    display: 'flex',
    borderRadius: '8px',
    justifyContent: 'flex-end',
  },
  hideFooter: {
    display: 'none',
  },
}

export default { baseStyle, slots, backgrounds }
