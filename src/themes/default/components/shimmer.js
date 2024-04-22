const baseStyle = {
  background: '#f6f7f8',
  backgroundImage:
    'linear-gradient(270deg, #fafafa ,#eaeaea, #eaeaea , #fafafa)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  display: 'inline-block',
  position: 'relative',
  borderRadius: '5px',
  animationDuration: '2s',
  animationFillMode: 'none',
  animationDelay: '0s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
  animationPlayState: 'running',
  animationName: 'shimmer',
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '-1000px 0',
    },
    '100%': {
      backgroundPosition: '1000px 0',
    },
  },
}

const rounded = {
  true: {
    borderRadius: '50%',
  },
}

export default { baseStyle, rounded }
