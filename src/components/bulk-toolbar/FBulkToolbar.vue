<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { FDivider, FText, FContainer, FIcon } from '../../index'

export default {
  name: 'FBulkToolbar',
  mixins: [ThemeMixin],
  props: {
    recordCount: {
      type: Number,
      default: 0,
    },
    animate: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    closePanel: 0,
    openDelay: false,
  }),
  computed: {
    canShowTool() {
      if (this.animate && this.closePanel > 0) {
        return true
      } else if (!this.animate) {
        return true
      } else return false
    },
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  watch: {
    recordCount: {
      handler(newVal, oldVal) {
        if (newVal === 0) {
          this.closePanel = oldVal
          let { $refs, animate } = this
          if (animate && $refs['toolbar']) {
            $refs['toolbar'].$el.style.bottom = '-140px'
          }
          if (this.animate) {
            setTimeout(() => {
              this.openDelay = false
              $refs['toolbar'].$el.style.display = 'none'
            }, 300)
          }
        } else {
          if (this.animate) {
            setTimeout(() => {
              this.openDelay = true
              $refs['toolbar'].$el.style.display = 'flex'
            }, 50)
          }
          this.closePanel = newVal
          let { $refs } = this
          if ($refs['toolbar']) {
            setTimeout(() => {
              $refs['toolbar'].$el.style.bottom = '0px'
            }, 100)
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.closePanel = this.recordCount
    let { $refs, animate } = this
    if (animate) {
      $refs['toolbar'].$el.style.bottom = '-140px'
    } else {
      this.openDelay = true
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return this.openDelay ? defaultChild : <FContainer></FContainer>
    },
    handleClose() {
      this.$emit('close')
    },
  },
  render() {
    let { styleProps, animate } = this || {}
    const Container = styled(FContainer)`
      ${styleProps}
      ${this.recordCount === 0 &&
      !this.openDelay &&
      animate &&
      'visibility:hidden'}
    `
    const NumberContainer = styled('div')`
      ${this.getStyle('numberContainer')}
    `
    return (
      <Container transition="bottom 400ms" ref="toolbar" position="relative">
        <NumberContainer>
          {this.animate && <FText>{this.closePanel}</FText>}
          {!this.animate && <FText>{this.recordCount}</FText>}
        </NumberContainer>
        <FContainer
          display="flex"
          alignItems="center"
          margin="containerNone containerXxLarge"
        >
          <FText>
            {this.$t('dsm.attachment.items_selected', 'Items Selected')}
          </FText>
          <FDivider height="20px" margin="containerNone containerLarge" />
          {this.children()}
          <FIcon
            group="action"
            name="cross"
            size="14"
            marginLeft={!this.isRTL ? 'containerLarge' : 'containerNone'}
            marginRight={this.isRTL ? 'containerLarge' : 'containerNone'}
            vOn:click={this.handleClose}
          />
        </FContainer>
      </Container>
    )
  },
}
</script>

<style scoped></style>
