<script>
import { FContainer, FText } from '../../index'
import { defineCustomElements } from '@facilio/icons/dist/loader/index.es2017.js'

defineCustomElements(window)

const SIZE_HASH = {
  S: '80',
  M: '160',
}
//V - vertical , W - wide , N - narrow , T - true , F - false
const WIDTH_HASH = {
  MVTN: '320',
  MVTW: '520',
  MVFN: '520',
  MVFW: '620',
  SVTN: '280',
  SVTW: '380',
  SVFN: '380',
  SVFW: '480',
}

export default {
  name: 'FEmptyState',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'M',
      validator: (value) => {
        return ['S', 'M'].includes(value)
      },
    },
    illustration: {
      type: String,
      default: 'no-data',
      validator: (value) => {
        return [
          'add-item',
          'no-result',
          'broken-location',
          'end-of-list',
          'location',
          'no-activities',
          'no-data',
          'no-documents-found',
          'no-entries',
          'server',
          'no-data-on-dashboard',
          'enable-camera',
          'enable-location',
        ].includes(value)
      },
    },
    type: {
      type: String,
      default: 'wide',
      validator: (value) => {
        return ['wide', 'narrow'].includes(value)
      },
    },
  },
  computed: {
    sizeUnit() {
      let { size = 'M' } = this
      return SIZE_HASH[size]
    },
    width() {
      let { size = 'M', vertical, type = 'wide' } = this
      let name = `${size}V${vertical.toString().charAt(0).toUpperCase()}${type
        .charAt(0)
        .toUpperCase()}`
      return WIDTH_HASH[name]
    },
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  methods: {
    buttons() {
      let { $scopedSlots } = this || {}
      let { buttons } = $scopedSlots || {}
      if (buttons) return buttons()
    },
    emptyImage() {
      let { $scopedSlots } = this || {}
      let { image } = $scopedSlots || {}
      if (image) return image()
    },
  },
  render() {
    let { size = 'M' } = this
    let isMarginLeft = !this.vertical && !this.isRTL
    return (
      <FContainer
        display="flex"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <FContainer
          display="flex"
          alignItems="center"
          flexDirection={this.vertical ? 'column' : 'row'}
          justifyContent="center"
          height="100%"
          width={`${this.width}px`}
        >
          <fc-illustration
            name={this.illustration}
            size={this.size}
          ></fc-illustration>
          <FContainer
            marginLeft={isMarginLeft && !this.vertical ? 'sectionSmall' : ''}
            marginRight={!isMarginLeft && !this.vertical ? 'sectionSmall' : ''}
            marginTop={!this.vertical ? '' : 'containerLarge'}
            display="flex"
            flexDirection="column"
            alignItems={this.vertical ? 'center' : ''}
          >
            <FText appearance={size === 'M' ? 'headingMed16' : 'headingMed14'}>
              {this.title}
            </FText>
            <FText
              appearance={size === 'M' ? 'bodyReg14' : 'captionReg12'}
              marginTop="containerMedium"
              color="textCaption"
              textAlign={this.vertical ? 'center' : ''}
            >
              {this.description}
            </FText>
            <FContainer marginTop="containerXLarge">
              {this.buttons()}
            </FContainer>
          </FContainer>
        </FContainer>
      </FContainer>
    )
  },
}
</script>

<style scoped></style>
