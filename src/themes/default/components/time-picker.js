const baseStyle = {}

const timePanelContainer = {
  boxShadow: '$shadows.elevation1',
  backgroundColor: '$colors.white',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'left',
  justifyContent: 'left',
  width: '100%',
}

const scrollableContainer = {
  height: '200px',
  overflow: 'scroll',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const timeRow = {
  padding: '10px 0px 10px 12px',
  display: 'flex',
  justifyContent: 'left',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$colors.blue5',
    color: '$colors.neutralFont80',
  },
}

const timeRowSelected = {
  padding: '3px 0px',
  display: 'flex',
  justifyContent: 'left',
  backgroundColor: '$colors.blue5',
  color: '$colors.neutralFont80',
  cursor: 'pointer',
}

export default {
  baseStyle,
  timePanelContainer,
  scrollableContainer,
  timeRow,
  timeRowSelected,
}
