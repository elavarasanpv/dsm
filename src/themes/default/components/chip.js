const baseStyle = {
  width: 'max-content',
  borderRadius: '10px',
  border: '1px solid',
  borderColor: '$colors.blue60',
  height: '20px',
  padding: '0 8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'default',
  fontFamily: '$typography.fontFamilies.display',
  fontSize: '$typography.size.fontSize3',
  lineHeight: '$typography.lineHeights.lineHeight2',
}

const chipContainer = {
  ...baseStyle,
  '&:hover': {
    background: '$colors.blue5',
    cursor: 'pointer',
  },
}

const textContainer = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '60px',
}
const iconContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0px 0px 0px 3px',
}
export default { baseStyle, textContainer, iconContainer, chipContainer }
