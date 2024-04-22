const baseStyle = {
  backgroundColor: '$colors.backgroundCanvas',
  height: '100%',
  width: '100%',
  color: '$colors.textMain',
  fontFamily: '$typography.bodyReg14.fontFamily',
}
const inputStyles = {
  height: '100%',
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
  'hr.ProseMirror-selectednode': {
    borderTop: '1px solid',
    borderColor: '$colors.borderNeutralBaseSubtle',
  },
  blockquote: {
    padding: '0px 0px 0px 1rem',
    borderLeft: '3px solid',
    borderColor: '$colors.borderNeutralGrey02Dark',
  },
}
const toolbar = {
  display: 'flex',
  padding: '$spacing.containerLarge $spacing.containerXLarge',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '$border.high',
  backgroundColor: '$colors.backgroundMidgroundSubtle',
}
export default {
  baseStyle,
  toolbar,
  inputStyles,
}
