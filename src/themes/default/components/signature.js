const baseStyle = {
  border: 'solid 1px',
  borderColor: '$colors.borderNeutralBaseSubtle',
  position: 'relative',
  borderRadius: '$border.medium',
}

const footer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: 'solid 1px',
  borderColor: '$colors.borderNeutralBaseSubtle',
  padding: '$spacing.containerLarge',
  alignItems: 'center',
}

const footerActions = {
  display: 'flex',
  alignItems: 'center',
}

const colorContainer = {
  display: 'flex',
  width: '100px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$spacing.containerMedium',
}

const colorButton = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  cursor: 'pointer',
  marginRight: '$spacing.containerLarge',
}

const colorItem = {
  display: 'flex',
  width: '20px',
  height: '20px',
  borderRadius: '10px',
  margin: '5px',
  cursor: 'pointer',
}

export default {
  baseStyle,
  footer,
  colorContainer,
  colorItem,
  footerActions,
  colorButton,
}
