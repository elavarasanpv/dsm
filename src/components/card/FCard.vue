<script>
import { isEmpty } from '../../utils/validation'
import { FContainer, FText } from '../../index.js'

export default {
  name: 'FCard',
  props: {
    header: {
      type: String,
      default: '',
    },
    footer: {
      type: String,
      default: '',
    },
    hideBorder: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    headerSlot() {
      let { $slots } = this || {}
      let { header } = $slots || {}
      return header
    },
    footerSlot() {
      let { $slots } = this || {}
      let { footer } = $slots || {}
      return footer
    },
  },
  render() {
    let { hideBorder } = this || {}
    return (
      <FContainer
        width="100%"
        border={hideBorder ? '' : 'solid 1px'}
        borderColor="borderNeutralBaseSubtler"
        borderRadius="high"
        backgroundColor="backgroundCanvas"
      >
        {!isEmpty(this.headerSlot())
          ? this.headerSlot()
          : !isEmpty(this.header) && (
              <FContainer
                padding="containerXLarge"
                borderBottom={hideBorder ? '' : 'solid 1px'}
                borderColor="borderNeutralBaseSubtler"
              >
                <FText appearance="headingMed14">{this.header}</FText>
              </FContainer>
            )}
        {this.children()}

        {!isEmpty(this.footerSlot())
          ? this.footerSlot()
          : !isEmpty(this.footer) && (
              <FContainer
                padding="containerXLarge"
                borderTop={hideBorder ? '' : 'solid 1px'}
                borderColor="borderNeutralBaseSubtler"
              >
                <FText appearance="headingMed14">{this.footer}</FText>
              </FContainer>
            )}
      </FContainer>
    )
  },
}
</script>

<style scoped></style>
