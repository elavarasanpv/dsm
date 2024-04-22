const baseStyle = {
  whiteSpace: 'nowrap',
  fontWeight: '700',
}

const cell = {
  margin: '0px $spacing.containerSmall',
  borderRadius: '$border.medium',
  minWidth: '24px',
  height: '26px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  padding: '$spacing.containerSmall $spacing.containerMedium',
}
const inActive = {
  '&:hover': {
    color: 'red',
  },
}
const disabledContainer = {
  cursor: 'not-allowed',
  opacity: '0.4',
}

export default {
  baseStyle,
  cell,
  disabledContainer,
  inActive,
}
