<script>
import { FButton, FPopover, FText } from '../../index'
import VueSignaturePad from 'vue-signature-pad'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FSignature',
  mixins: [ThemeMixin],
  props: {
    value: {
      type: Number,
      default: undefined,
    },
    saving: {
      type: Boolean,
      default: false,
    },
    saveType: {
      type: String,
      default: 'image/png',
    },
    showPalette: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      refKey: 'signature-field',
      colors: [
        '#000000',
        '#332AC7',
        '#EA5151',
        '#1A925E',
        '#46D0E1',
        '#C848A3',
      ],
      selectedColor: '#000000',
      isColorPopoverVisible: false,
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    options() {
      let { onEnd, selectedColor } = this || {}
      return {
        backgroundColor: `transparent`,
        penColor: selectedColor,
        onEnd: onEnd,
      }
    },
    clearStyle() {
      return this.getCustomStyle({ property: 'clearText' })
    },
  },
  methods: {
    getStyle(value) {
      return this.getCustomStyle({ property: value })
    },
    onEnd() {
      let signatureInstance = this.$refs['signature-field']
      let { isEmpty, data } = signatureInstance.saveSignature()
      if (!isEmpty) this.$emit('change', data)
    },
    clearSignature() {
      let signatureInstance = this.getSignatureInstance()
      signatureInstance.clearSignature()
      this.modelValue = null
      this.$emit('change', null)
    },
    getSignatureInstance() {
      let { $refs, refKey } = this
      if (!isEmpty(refKey) && !isEmpty($refs[refKey])) {
        let instance = $refs[refKey]
        return instance
      }
      return null
    },
    selectColor(color) {
      this.selectedColor = color
      this.isColorPopoverVisible = false
    },
  },
  render() {
    const { styleProps, getStyle, selectedColor } = this || {}
    const Element = styled('div')`
      ${styleProps}
    `
    const Footer = styled('div')`
      ${getStyle('footer')}
    `
    const FooterActions = styled('div')`
      ${getStyle('footerActions')}
    `

    const ColorContainer = styled('div')`
      ${getStyle('colorContainer')}
    `

    const ColorButton = styled('div')`
      ${getStyle('colorButton')}
      background-color: ${selectedColor}
    `
    const ColorItem = styled('div')`
      ${getStyle('colorItem')}
    `
    return (
      <Element class="f-signature-container">
        <VueSignaturePad
          ref={this.refKey}
          height="100px"
          saveType={this.saveType}
          customStyle={this.styleObj}
          options={this.options}
        ></VueSignaturePad>
        <Footer>
          <div>{this.saving && <FText>Saving...</FText>}</div>
          <FooterActions>
            {this.showPalette && (
              <FPopover
                visible={this.isColorPopoverVisible}
                vOn:visibleChange={(val) => (this.isColorPopoverVisible = val)}
                trigger="clickToOpen"
              >
                <ColorButton />
                <ColorContainer slot="content">
                  {this.colors.map((color) => {
                    return (
                      <ColorItem
                        vOn:click={() => this.selectColor(color)}
                        style={{ backgroundColor: color }}
                      />
                    )
                  })}
                </ColorContainer>
              </FPopover>
            )}
            <FButton
              size="small"
              appearance="link"
              vOn:click={this.clearSignature}
            >
              {this.$t('dsm.attachment.clear', 'Clear')}
            </FButton>
          </FooterActions>
        </Footer>
      </Element>
    )
  },
}
</script>
