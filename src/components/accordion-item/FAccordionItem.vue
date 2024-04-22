<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty, isFunction } from '../../utils/validation'
import { FContainer } from '../../index'

export default {
  name: 'FAccordionItem',
  mixins: [ThemeMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    showPanel: {
      type: Boolean,
      default: false,
    },
    showHeaderBorder: {
      type: Boolean,
      default: true,
    },
    showBoxShadow: {
      type: Boolean,
      default: false,
    },
    showSuffix: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      open: this.showPanel,
      hover: false,
      showSuffixHover: false,
    }
  },
  watch: {
    showPanel: {
      handler(newVal) {
        this.open = newVal
      },
    },
    open: {
      handler(val) {
        this.$emit('panelState', val)
      },
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
    toggle() {
      this.open = !this.open
    },
    slot(type) {
      let { $scopedSlots } = this
      let { [type]: component } = $scopedSlots || {}
      if (type === 'prefix') {
        this.showSuffixHover = isEmpty(component)
      }
      if (isFunction(component) && type === 'header') {
        let SlotElement = styled('div')`
          ${this.getCustomStyle({ property: 'header' })}
        `
        return <SlotElement>{component && component()}</SlotElement>
      } else if (isFunction(component) && type === 'panel') {
        const AccordionPanel = styled('div')`
          ${this.getCustomStyle({ property: 'panelContainer' })}
          ${this.open && this.getStyle('panelOpenContainer')}
        `
        return <AccordionPanel>{component && component()}</AccordionPanel>
      } else if (isFunction(component) && type === 'prefix') {
        let SlotElement = styled('div')`
          ${this.getCustomStyle({ property: 'prefix' })}
        `

        return (
          <SlotElement>
            {component &&
              component({ open: this.open, showPanel: this.showPanel })}
          </SlotElement>
        )
      } else if (isFunction(component) && type === 'suffix') {
        let SlotElement = styled('div')`
          ${this.getCustomStyle({ property: 'prefix' })}
        `
        return (
          <SlotElement>
            {component &&
              component({ open: this.open, showPanel: this.showPanel })}
          </SlotElement>
        )
      }
    },
    hoverHandler(val) {
      this.hover = val
    },
  },
  render() {
    let { styleProps, open, showBoxShadow, showHeaderBorder, bgColor } = this
    const AccordionHeader = styled(FContainer)`
      ${styleProps};
    `
    const Container = styled('div')`
      ${this.getStyle('container')}
      ${this.disabled && this.getStyle('disabledContainer')}
      ${open && this.getStyle('openStateContainer')}
      ${open && showBoxShadow && this.getStyle('containerShadow')}
      ${showHeaderBorder && this.getStyle('accordionBorder')}
    `

    return (
      <Container>
        <AccordionHeader
          vOn:mouseenter={() => this.hoverHandler(true)}
          vOn:mouseleave={() => this.hoverHandler(false)}
          vOn:click={this.toggle}
          hover-backgroundColor="backgroundNeutralDefault"
          backgroundColor={
            bgColor ? 'backgroundNeutralDefault' : 'backgroundCanvas'
          }
        >
          {this.slot('prefix')}
          {this.slot('header')}
          {(this.showSuffix || this.hover || this.showSuffixHover) &&
            this.slot('suffix')}
        </AccordionHeader>
        {this.open && this.slot('panel')}
      </Container>
    )
  },
}
</script>

<style scoped></style>
