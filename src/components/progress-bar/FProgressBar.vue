<script>
import { FContainer } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
export default {
  name: 'FProgressBar',
  mixins: [ThemeMixin],
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    usage: {
      type: String,
      default: 'uploader',
      validator: (value) => {
        return ['uploader', 'alerts', 'toast', 'table'].includes(value)
      },
    },
    intent: {
      type: String,
      default: 'success',
      validator: (value) => {
        return ['success', 'information', 'warning', 'critical'].includes(value)
      },
    },
    isTimeEnabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    progressWidth: '',
  }),
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    progressBarWidth() {
      return (this.progress / this.max) * 100 + '%'
    },
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  mounted() {
    let { isTimeEnabled } = this
    if (isTimeEnabled) {
      this.move()
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    move() {
      let id = setInterval(frame.bind(this), 4)
      let progress = 0
      function frame() {
        if (progress >= this.max) {
          clearInterval(id)
        } else {
          progress = progress + 4.1
          this.progressWidth = (progress / this.max) * 100 + '%'
        }
      }
    },
  },
  render() {
    let { styleProps, usage, isTimeEnabled, intent } = this
    let errorToast = intent === 'critical'
    const Container = styled(FContainer)`
      ${styleProps};
      ${usage === 'table' ? `height:12px` : 'height:4px'};
    `
    const ProgressBar = styled(FContainer)`
      ${`width:${isTimeEnabled ? this.progressWidth : this.progressBarWidth}`};
      ${usage === 'toast' &&
      !errorToast &&
      'background-image:linear-gradient(90deg, #49B83F 0%, #64D5E0 16.67%, #1673F6 32.84%, #5E3ED3 51.56%, #ED2780 67.71%, #FFD405 84.38%, #FF6700 100%)'};
      ${usage === 'toast' &&
      errorToast &&
      'background-image:linear-gradient(90deg, #500000 0%, #C93D3D 100%)'};
      background-size: 200%;
    `
    return (
      <Container
        backgroundColor={
          usage === 'alerts'
            ? 'backgroundContainerHalftone'
            : 'backgroundMidgroundMedium'
        }
        borderRadius={usage === 'table' ? 'full' : 'none'}
        overflow="hidden"
      >
        <ProgressBar
          class={!this.isRTL ? 'loading-progress' : 'rtl-loading-progress'}
          backgroundColor={
            usage === 'alerts'
              ? 'iconNeutralInverse'
              : 'backgroundPrimaryDefault'
          }
          transition="width 200ms"
          height="100%"
          borderRadius="none full full none"
        />
      </Container>
    )
  },
}
</script>
<style lang="scss">
.loading-progress {
  animation: moveGradient 1s linear infinite;
}
.rtl-loading-progress {
  animation: moveGradient 1s reverse infinite;
}
@keyframes moveGradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -200% 0%;
  }
}
</style>
