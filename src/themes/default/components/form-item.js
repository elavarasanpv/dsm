const baseStyle = {
  display: 'flex',
  width: '100%',
}

const position = {
  left: {
    flexDirection: 'row',
  },
  top: {
    flexDirection: 'column',
  },
}

const labelStyle = {
  left: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    marginRight: '$spacing.containerMedium',
  },
  top: {
    width: '100%',
    display: 'flex',
    marginBottom: '$spacing.containerMedium',
  },
}

const fieldStyle = {
  width: '100%',
}

export default { baseStyle, position, labelStyle, fieldStyle }
