<script>
import { FText, FPopover } from '../../index'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FBreadcrumb',
  components: { FText, FPopover },
  mixins: [ThemeMixin],
  props: {
    appearance: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'back'].includes(value)
      },
    },
    path: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    pathLength() {
      let { path } = this
      return path?.length || 0
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
    clickHandler(path) {
      let { disabled } = path || {}
      if (!disabled) this.$emit('click', path)
    },
    back() {
      let Breadcrumb = styled('div')`
        ${this.getStyle('breadcrumb')}
      `
      return (
        <Breadcrumb vOn:click={() => this.clickHandler({ name: 'back' })}>
          <fc-icon group="navigation" name="left" size="12"></fc-icon>
          <FText hover-color="backgroundPrimaryDefault">
            {this.$t('actions.back', 'Back')}
          </FText>
        </Breadcrumb>
      )
    },
    defaultPath() {
      let Breadcrumb = styled('div')`
        ${this.getStyle('breadcrumb')}
      `
      return this.path.map((item) => {
        return (
          <Breadcrumb vOn:click={() => this.clickHandler(item)}>
            {isEmpty(item.options) && (
              <FText
                hover-color={
                  item.disabled ? 'textMain' : 'backgroundPrimaryDefault'
                }
                color="textMain"
                appearance="captionReg12"
                cursor={item.disabled ? 'not-allowed' : ''}
                opacity={item.disabled ? '0.4' : '1'}
              >
                {item.name}
              </FText>
            )}
            <fc-icon
              size="10"
              group="navigation"
              name="accordion-right"
              color="#4F5A63"
            ></fc-icon>
          </Breadcrumb>
        )
      })
    },
  },
  render() {
    let { styleProps } = this
    let Element = styled('div')`
      ${styleProps}
    `

    return (
      <Element>
        {this.appearance === 'back' ? this.back() : this.defaultPath()}
      </Element>
    )
  },
}
</script>

<style scoped></style>
