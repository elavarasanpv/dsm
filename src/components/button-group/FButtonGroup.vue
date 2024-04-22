<script>
import { FButton, FContainer, FPopover } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty, isFunction } from '../../utils/validation'

export default {
  name: 'FButtonGroup',
  components: { FButton, FPopover },
  mixins: [ThemeMixin],
  props: {
    moreOptions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    getStyle(property, value) {
      let obj = { property }
      if (!isEmpty(value)) {
        obj = { ...obj, value }
      }
      return this.getCustomStyle(obj)
    },
    slot(type) {
      let { $scopedSlots } = this
      let { [type]: component } = $scopedSlots || {}
      if (isFunction(component) && type === 'buttons') {
        let SlotElement = styled('div')`
          ${this.getStyle('buttons')}
        `
        return <SlotElement>{component && component()}</SlotElement>
      } else if (isFunction(component) && type === 'options') {
        let SlotElement = styled('div')`
          ${this.getStyle('options')}
        `
        return <SlotElement>{component && component()}</SlotElement>
      }
    },
    clickHandler() {
      this.visible = !this.visible
    },
  },
  render() {
    let { styleProps } = this
    let Element = styled('div')`
      ${styleProps}
    `
    let OptionsContainer = styled('div')`
      ${this.getStyle('ellipsis')}
    `
    let Seperator = styled('div')`
      ${this.getStyle('seperator')}
    `
    return (
      <Element>
        {this.slot('buttons')}
        {this.moreOptions && (
          <OptionsContainer>
            <Seperator />

            <FPopover placement="bottom" trigger="clickToToggle">
              <template slot="content">
                <div
                  style={{
                    width: '100px',
                    minHeight: '40px',
                    height: 'max-content',
                    maxHeight: '150px',
                    overflow: 'scroll',
                  }}
                >
                  {this.slot('options')}
                </div>
              </template>
              <FContainer cursor="pointer">
                <fc-icon
                  group="action"
                  size="16"
                  name="options-vertical"
                ></fc-icon>
              </FContainer>
            </FPopover>
          </OptionsContainer>
        )}
      </Element>
    )
  },
}
</script>

<style scoped></style>
