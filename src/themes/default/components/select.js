const baseStyle = {
  cursor: 'pointer',
  '::-webkit-scrollbar': {
    width: '20px',
  },
}

const chipContainer = {
  display: 'flex',
  gap: '4px',
}

const addOption = {
  color: '$colors.nextFont80',
  padding: '10px',
  fontSize: '$typography.size.fontSize3',
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  aligmItems: 'center',
  '&[selected]': {
    backgroundColor: '$colors.white',
  },
}

const noDataLoadingDropdown = {
  fontFamily: '$typography.fontFamilies.display',
  backgroundColor: '$colors.white',
  boxShadow: '$shadows.elevation1',
  zIndex: '99',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}

export default {
  baseStyle,
  chipContainer,
  noDataLoadingDropdown,
  addOption,
}
