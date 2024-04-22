const baseStyle = {
  height: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
const type = {
  link: {
    backgroundColor: 'transparent',
    color: '$colors.$colors.backgroundPrimaryDefault',
    border: 'solid 1px',
    borderColor: 'transparent',
    '&:hover': {
      textDecoration: 'underline !important',
    },
    '&:focus': {},
    '&:active': {},
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  popover: {
    padding: '$spacing.containerLarge $spacing.containerXLarge',
    display: 'flex',
    alignItems: 'center',
  },
}
const flexCenter = {
  alignItems: 'center',
  display: 'flex',
}
const linkButton = {
  button: {
    justifyContent: 'flex-start',
  },
}
const container = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
export default {
  baseStyle,
  type,
  flexCenter,
  container,
  linkButton,
}
