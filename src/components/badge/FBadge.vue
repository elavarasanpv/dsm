<script>
import { FContainer, FText, FIcon } from '../../index'
import styled from 'vue-emotion'
export default {
  name: 'FBadge',
  props: {
    content: {
      type: Number || String,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    shape: {
      type: String,
      default: 'square',
      validator: (value) => {
        return ['square', 'circle', 'dot'].includes(value)
      },
    },
    dotColor: {
      type: String,
      default: 'iconAccentViolet',
    },
  },
  computed: {
    isMax() {
      if (this.max > 0 && this.content > this.max && !this.isDot) {
        return true
      }
      return false
    },
    isDot() {
      return this.shape === 'dot'
    },
  },
  render() {
    let { styleProps } = this
    const Element = styled(FContainer)`
      ${styleProps};
      border-radius: ${['circle', 'dot'].includes(this.shape) ? '40px' : '2px'};
      min-height: ${this.isDot ? '8px' : '16px'};
      min-width: ${this.isDot ? '8px' : '16px'};
    `
    return (
      <Element
        padding="containerMedium"
        border={!this.isDot ? '0.5px solid' : ''}
        borderColor={!this.isDot ? 'borderNeutralBaseLight' : ''}
        letterSpacing="0.5px"
        backgroundColor={
          this.isDot ? this.dotColor : 'backgroundMidgroundMedium'
        }
        lineHeight="110%"
        fontSize="10px"
        width="fit-content"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {!this.isDot ? (
          <FText
            minWidth="containerLarge"
            minHeight="containerLarge"
            maxHeight="containerLarge"
            appearance="captionReg10"
          >
            {this.isMax ? this.max : this.content}
          </FText>
        ) : (
          ''
        )}
        {this.isMax && (
          <FIcon
            group="sign-symbols"
            name="addition"
            size="7"
            pressable={false}
          />
        )}
      </Element>
    )
  },
}
</script>
