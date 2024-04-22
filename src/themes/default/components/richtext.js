const baseStyle = {
  backgroundColor: '$colors.backgroundCanvas',
  border: '1px solid',
  borderColor: '$colors.borderNeutralBaseSubtle',
  borderRadius: '$border.high',
  display: 'flex',
  alignItems: 'center',
  padding: '$spacing.containerXLarge',
  gap: '$spacing.containerXLarge',
  height: '100%',
  width: '100%',
  color: '$colors.textMain',
  fontFamily: '$typography.bodyReg14.fontFamily',
}
const editor = {
  backgroundColor: '$colors.backgroundCanvas',
  width: '100%',
  overflow: 'auto',
  height: 'calc(100% - 50px)',
}
const toolbar = {
  display: 'flex',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  alignItems: 'center',
  // gap: '48px',
  alignSelf: 'stretch',
  borderRadius: '$border.high',
  backgroundColor: '$colors.backgroundMidgroundSubtle',
}
const inputStyles = {
  h1: {
    fontSize: '2.5em',
    margin: '0',
    fontWeight: 400,
  },
  p: {
    fontFamily: '$typography.bodyReg14.fontFamily',
    lineHeight: '130%',
    fontSize: '$typography.bodyReg14.fontSize',
    fontWeight: '$typography.bodyReg14.fontWeight',
    margin: '0px',
  },
  ol: {
    padding: '$spacing.containerNone $spacing.containerXxLarge',
    listStyle: 'auto',
  },
  ul: {
    padding: '$spacing.containerNone $spacing.containerXxLarge',
    listStyleType: 'disc',
  },
  a: {
    color: '$colors.backgroundPrimaryDefault',
  },
  h2: {
    fontSize: '1.85em',
    margin: '0',
    fontWeight: 400,
  },
  h3: {
    fontSize: '1.5em',
    margin: '0',
    fontWeight: 400,
  },
  table: {
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: '100%',
    margin: '0',
    overflow: 'hidden',
    p: {
      margin: '0px',
    },
  },
  td: {
    minWidth: '1em',
    border: '1px solid',
    borderColor: '$colors.borderNeutralBaseSubtler',
    padding: '3px 5px',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    position: 'relative',
    marginBottom: '0',
    p: {
      fontWeight: '400',
    },
  },
  th: {
    minWidth: '1em',
    border: '1px solid',
    borderColor: '$colors.borderNeutralBaseSubtler',
    padding: '3px 5px',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    position: 'relative',
    marginBottom: '0',
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: '$colors.backgroundMidgroundMedium',
    p: {
      fontWeight: '500',
    },
  },
  'hr.ProseMirror-selectednode': {
    borderTop: '1px solid',
    borderColor: '$colors.borderNeutralBaseSubtle',
  },
  blockquote: {
    padding: '0px 0px 0px 1rem',
    borderLeft: '3px solid',
    borderColor: '$colors.borderNeutralGrey02Dark',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}
export default {
  baseStyle,
  editor,
  toolbar,
  inputStyles,
}
