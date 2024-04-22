const baseStyle = {
  display: 'flex',
  alignItems: 'center',
}
const mainContainer = {
  height: '100%',
  width: '100%',
  overflow: 'auto',
}
const tableContainer = {
  height: '100%',
  width: '100%',
  overflow: 'auto',
  border: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  borderRadius: '7px',
}
const table = {
  width: ' fit-content',
  minWidth: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: '0',
}
const bodyRow = {
  height: '40px',
  backgroundColor: '$colors.backgroundCanvas',
  '&:hover': {
    backgroundColor: '$colors.backgroundCanvas',
  },
}
const hoveredRow = {
  '&:hover': {
    zIndex: '8',
    position: 'relative',
    boxShadow: '$elevation.lightLow02',
    td: {
      backgroundColor: '$colors.backgroundCanvas',
    },
  },
}
const disabledRow = {
  backgroundColor: '$colors.backgroundMidgroundMedium',
  cursor: 'not-allowed',
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundMedium',
    td: {
      backgroundColor: '$colors.backgroundMidgroundMedium',
    },
  },
}
const bodyBgColor = {
  '&:hover': {
    backgroundColor: '$colors.backgroundMidgroundMedium',
  },
}
const headerRow = {
  borderRight: '1px solid',
  borderBottom: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  textAlign: 'left',
  background: '$colors.backgroundMidgroundMedium',
  color: '$colors.textMain',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  fontFamily: '$typography.headingMed14.fontFamily',
  lineHeight: '$typography.headingMed14.lineHeight',
  fontSize: '$typography.headingMed14.fontSize',
  fontWeight: '$typography.headingMed14.fontWeight',
  position: 'sticky',
  top: '0px',
  zIndex: '3',
}
const headerCell = {
  height: '42px',
  backgroundColor: '$colors.backgroundMidgroundMedium',
}
const headerCellCompact = {
  height: '40px',
  backgroundColor: '$colors.backgroundMidgroundMedium',
}
const bodyCell = {
  textAlign: 'left',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  borderBottom: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  backgroundColor: '$colors.backgroundCanvas',
}
const fixedColumn = {
  position: 'sticky',
  zIndex: '2',
}
const fixedRightColumn = {
  position: 'sticky',
  zIndex: '2',
}
const fixedHeader = {
  position: 'sticky',
  zIndex: '5',
}
const header = {
  zIndex: '10',
  position: 'sticky',
  top: '0px',
}
const actionCell = {
  position: 'sticky',
  zIndex: '2',
  width: 'fit-content',
  right: '0px',
  backgroundColor: 'transparent',
}
const fixedActionCell = {
  ...actionCell,
  padding: '$spacing.containerNone',
  width: '100%',
}
const readOnlyCell = {
  borderRight: '1px solid',
  borderColor: '$colors.backgroundMidgroundMedium',
}
const resizer = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: '5px',
  cursor: 'col-resize',
  userSelect: 'none',
  borderRight: '1px solid',
  borderColor: '$colors.iconPrimaryHovered',
  '&:hover': {
    borderRight: '1px solid',
    borderColor: '$colors.iconPrimaryHovered',
  },
}
const resizer1 = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '5px',
  cursor: 'col-resize',
  userSelect: 'none',
  borderLeft: '1px solid',
  borderColor: '$colors.iconPrimaryHovered',
  '&:hover': {
    borderLeft: '1px solid',
    borderColor: '$colors.iconPrimaryHovered',
  },
}
const resizeBorder = {
  height: '40px',
  width: '5px',
  right: '0px',
  backgroundColor: '$colors.iconPrimaryHovered',
}
const resizeBorder1 = {
  height: '40px',
  width: '5px',
  left: '0px',
  backgroundColor: '$colors.iconPrimaryHovered',
}
const readCellHeader = {
  backgroundColor: '$colors.backgroundMidgroundMedium',
}
const scrollTop = {
  position: 'sticky',
  top: '0',
  zIndex: '9',
  boxShadow: '$elevation.lightMed',
}
const resizediv = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: '6px',
  borderRight: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  '&:hover': {
    borderRight: '1px solid',
    borderColor: '$colors.iconPrimaryHovered',
    cursor: 'col-resize',
  },
}
const resizediv1 = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '6px',
  borderLeft: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtler',
  '&:hover': {
    borderLeft: '1px solid',
    borderColor: '$colors.iconPrimaryHovered',
    cursor: 'col-resize',
  },
}
const floatContainer = {
  display: 'flex',
  justifyContent: 'center',
  position: 'sticky',
  bottom: '0',
  zIndex: '8',
  left: '0',
}
const floatBar = {
  zIndex: '8',
  position: 'absolute',
  bottom: '25px',
}
const numberBox = {
  height: '26px',
  backgroundColor: '$colors.iconPrimaryHovered',
  padding: '7px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '8px',
}
export default {
  baseStyle,
  tableContainer,
  mainContainer,
  table,
  bodyRow,
  headerRow,
  bodyCell,
  headerCell,
  fixedColumn,
  fixedHeader,
  resizediv,
  actionCell,
  fixedActionCell,
  resizer,
  resizeBorder,
  readOnlyCell,
  scrollTop,
  readCellHeader,
  floatBar,
  numberBox,
  floatContainer,
  header,
  hoveredRow,
  bodyBgColor,
  disabledRow,
  fixedRightColumn,
  headerCellCompact,
  resizer1,
  resizediv1,
  resizeBorder1,
}
