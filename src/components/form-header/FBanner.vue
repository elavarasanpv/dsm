<script>
import { isEmpty } from '../../utils/validation'
import { FContainer, FText, FButton } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
export default {
  name: 'FBanner',
  mixins: [ThemeMixin],
  props: {
    headerObject: {
      type: Object,
      default: () => {},
    },
    disableFormCloseAction: { type: Boolean, default: false },
  },
  computed: {
    getDirection() {
      let { headerObject } = this
      let { linearGradientObject } = headerObject || {}
      let { direction } = linearGradientObject || {}
      return !isEmpty(direction) ? direction : '344deg'
    },
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
    getGradient() {
      let { headerObject } = this
      let { gradient } = headerObject || {}
      return !isEmpty(gradient) ? gradient : ''
    },
    startColor() {
      let { headerObject } = this
      let { linearGradientObject } = headerObject || {}
      let { startColor } = linearGradientObject || {}
      return !isEmpty(startColor) ? startColor : '#311E77'
    },
    endColor() {
      let { headerObject } = this
      let { linearGradientObject } = headerObject || {}
      let { endColor } = linearGradientObject || {}
      return !isEmpty(endColor) ? endColor : '#7D63DC'
    },
    getHeader() {
      let { headerObject } = this
      let { title } = headerObject || {}
      return !isEmpty(title) ? title : 'No Header Configured'
    },
    getHeaderDescription() {
      let { headerObject } = this
      let { description } = headerObject || {}
      return !isEmpty(description) ? description : 'No Description Configured'
    },
    getStyle() {
      let { getDirection, endColor, startColor, getGradient: gradient } = this
      let defaultStyle = this.getCustomStyle({
        property: 'bannerContainerStyle',
      })
      let backgroundImage = `linear-gradient(${getDirection}, ${startColor} 0%, ${endColor} 100%)`
      return !isEmpty(gradient)
        ? { ...defaultStyle }
        : { ...defaultStyle, backgroundImage }
    },
    getInfoWidth() {
      let { headerObject = {} } = this
      let { infoWidth } = headerObject

      return !isEmpty(infoWidth) ? infoWidth : '50%'
    },
    getImageWidth() {
      let { headerObject = {} } = this
      let { imageWidth } = headerObject

      return !isEmpty(imageWidth) ? imageWidth : '50%'
    },
  },
  methods: {
    closeForm() {
      this.$emit('closeForm')
    },
    image() {
      let { $scopedSlots } = this
      let { image } = $scopedSlots || {}
      return !isEmpty(image) ? image() : ''
    },
    header() {
      let { $scopedSlots } = this
      let { header } = $scopedSlots || {}
      return !isEmpty(header) ? header() : ''
    },
    headerActions() {
      let { $scopedSlots } = this
      let { headerActions } = $scopedSlots || {}
      return !isEmpty(headerActions) ? headerActions() : ''
    },
  },
  render() {
    let {
      getStyle,
      getHeader,
      getHeaderDescription,
      disableFormCloseAction,
      getGradient,
    } = this
    const Element = styled(FContainer)`
      ${getStyle}
    `
    return (
      <Element borderRadius="high" gradient={getGradient}>
        <FContainer width={this.getInfoWidth} display="flex">
          <FContainer
            width="90%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            padding={
              this.isRTL
                ? 'sectionLarge sectionLarge sectionLarge containerNone'
                : 'sectionLarge containerNone sectionLarge sectionLarge'
            }
          >
            {!disableFormCloseAction && (
              <FContainer
                width="fit-content"
                display="flex"
                float="right"
                backgroundColor="backgroundCanvas"
                borderRadius="medium"
                marginBottom="containerXxLarge"
                vOn:click={() => this.closeForm()}
              >
                <FButton
                  appearance="tertiary"
                  size="small"
                  iconGroup="navigation"
                  iconName="left"
                  iconPosition="prefix"
                >
                  {this.$t('actions.back', 'Back')}
                </FButton>
              </FContainer>
            )}
            {this.header()}
            <FContainer>
              <FText
                appearance="headingMed20"
                display="block"
                paddingBottom="containerMedium"
                color="backgroundCanvas"
              >
                {' '}
                {getHeader}{' '}
              </FText>
              <FText appearance="bodyReg14" color="backgroundCanvas">
                {' '}
                {getHeaderDescription}{' '}
              </FText>
            </FContainer>
            <FContainer>{this.headerActions()}</FContainer>
          </FContainer>
        </FContainer>
        <FContainer width={this.getImageWidth}>{this.image()}</FContainer>
      </Element>
    )
  },
}
</script>
