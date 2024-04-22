<script>
import { FContainer, FAvatar } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
export default {
  name: 'FAvatarGroup',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'M',
      validator: (value) => {
        return ['XS', 'S', 'M', 'L', 'XL'].includes(value)
      },
    },
    userObject: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
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
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
  },
  render() {
    let { styleProps, computedStyleProps, userObject, isRTL } = this
    let length = `+${(userObject || []).length - 3 || 0}`
    const Container = styled(FContainer)`
      ${styleProps};
      ${computedStyleProps}
    `
    return (
      <Container display="flex" position="relative">
        {userObject.map((value, index) => {
          let {
            userName = '',
            avatarUrl = '',
            iconname = '',
            icongroup = '',
          } = value || {}
          return (
            <FContainer
              left={!isRTL && `${index * -6}px`}
              right={isRTL && `${index * -6}px`}
              position="relative"
              zIndex={3 - index}
              display={index > 3 && 'none'}
              overflow="hidden"
              border-radius="200px"
            >
              {index < 3 && (
                <FAvatar
                  size={this.size}
                  userName={userName}
                  avatarUrl={avatarUrl}
                  iconname={iconname}
                  icongroup={icongroup}
                />
              )}
              {index === 3 && (
                <FAvatar size={this.size} count={true} userName={length} />
              )}
            </FContainer>
          )
        })}
      </Container>
    )
  },
}
</script>

<style scoped></style>
