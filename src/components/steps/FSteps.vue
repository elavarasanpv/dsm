<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import { FContainer, FText } from '../../index'
export default {
  name: 'FSteps',
  mixins: [ThemeMixin],
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    currentStep: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  methods: {
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    getFillColor(index) {
      let { currentStep } = this
      if (index + 1 < currentStep) return 'backgroundSemanticGreenDark'
      else if (index + 1 == currentStep) return 'backgroundAccentBlueDark'
      else if (index + 1 > currentStep) return 'backgroundContainer'
    },
    getTextColor(index) {
      let { currentStep } = this
      if (index + 1 <= currentStep) return 'textInverseMain'
      else return 'textMain'
    },
    getBorder(index) {
      let { currentStep } = this
      if (index + 1 > currentStep) return '1px solid #EAE9E9'
      else return ''
    },
    getPillFill(index) {
      let { currentStep } = this
      if (index + 1 <= currentStep) return 'backgroundPrimaryDefault'
      else return 'backgroundMidgroundDark'
    },
  },
  render() {
    let { styleProps, isRTL } = this
    const Element = styled('div')`
      ${styleProps}
    `

    return (
      <Element>
        {this.steps.map((step, index) => {
          return (
            <FContainer
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="containerMedium"
            >
              {index !== 0 && (
                <FContainer
                  marginLeft={!isRTL ? 'containerMedium' : 'containerNone'}
                  marginRight={isRTL ? 'containerMedium' : 'containerNone'}
                  height="2px"
                  width="24px"
                  borderRadius="high"
                  backgroundColor={this.getPillFill(index)}
                ></FContainer>
              )}
              <FContainer
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="containerLarge"
              >
                <FContainer
                  height="20px"
                  width="20px"
                  borderRadius="full"
                  backgroundColor={this.getFillColor(index)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border={this.getBorder(index)}
                >
                  <FText
                    appearance="captionMed12"
                    color={this.getTextColor(index)}
                  >
                    {index + 1}
                  </FText>
                </FContainer>
                <FText color="textMain" appearance="captionMed12">
                  {step}
                </FText>
              </FContainer>
            </FContainer>
          )
        })}
      </Element>
    )
  },
}
</script>

<style scoped></style>
