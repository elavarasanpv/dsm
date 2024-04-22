const baseStyle = {
  position: 'relative',
}

const rowStyle = {
  display: 'flex',
}

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
  width: '100%',
}

const clickable = {
  backgroundColor: 'transparent',
  border: 'solid 1px',
  borderColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '$colors.backgroundPrimaryHovered',
  },
}

export default {
  baseStyle,
  rowStyle,
  gridStyle,
  clickable,
}
