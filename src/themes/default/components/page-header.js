const baseStyle = {}

const leftContainer = {
  minWidth:"10%",
  flex:" 1 1 40%",
  padding: '$spacing.containerXLarge',
  display: 'flex',
  flexDirection: 'column',
}
const rightContainer = {
  overflow:'hidden',
  minWidth:"30%",
  flex:'1 1 60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  padding: '$spacing.containerXLarge',
  marginTop: 'auto',
}

const seperator = { height: '20px', width: '1px', background: '#D4D9DD' }
export default {
  baseStyle,
  leftContainer,
  rightContainer,
  seperator,
}
