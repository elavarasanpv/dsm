<script>
import { FContainer, FInput, FIcon } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import debounce from 'lodash/debounce'
import { isEmpty } from '../../utils/validation'

const HEIGHT = {
  small: 'containerNone',
  medium: 'containerNone',
  large: 'containerMedium',
}
export default {
  name: 'FSearch',
  mixins: [ThemeMixin],
  props: {
    placeholder: {
      type: String,
      default: 'search',
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    width: {
      type: String,
      default: '240',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    inputText: '',
    opened: false,
    isCleared: false,
    setWidth: false,
    openInput: false,
  }),
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  watch: {
    inputText: {
      handler(val) {
        let debounceMethod = debounce(() => {
          this.$emit('change', val || '')
        }, 60)
        debounceMethod()
      },
    },
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside)
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    clearValue() {
      this.isCleared = true
      this.inputText = ''
    },
    openp() {
      this.opened = true
      this.setWidth = true
      setTimeout(() => {
        this.openInput = true
      }, 5)
    },
    onClickOutside(event) {
      const myDiv = document.querySelector('.f-search-input-box')
      if (
        !myDiv.contains(event.target) &&
        this.opened &&
        !this.isCleared &&
        isEmpty(this.inputText)
      ) {
        this.setWidth = false
        this.openInput = false
        setTimeout(() => {
          this.opened = false
        }, 230)
      }
      this.isCleared = false
    },
  },
  render() {
    let { styleProps, computedStyleProps, disabled } = this
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `
    const Button = styled(FContainer)`
      ${styleProps};
      ${disabled && this.getStyle('disabled')}
    `
    const Prefix = styled(FContainer)`
      ${this.size === 'small' && 'margin-left: -4px;'}
    `
    return (
      <Container
        class="f-search-input-box"
        transition="all 0.5s ease"
        maxWidth={this.setWidth ? `${this.width}px` : '50px'}
        position="relative"
      >
        <FContainer
          position="absolute"
          left="0px"
          zIndex="10"
          display={this.opened ? 'none' : 'flex'}
        >
          <Button
            vOn:click={() => {
              this.openp()
            }}
          >
            <FIcon
              name="search"
              group="action"
              pressable={false}
              size="16"
              position="relative"
              right="-1px"
            />
          </Button>
        </FContainer>
        <FContainer
          display={this.opened ? 'flex' : 'none'}
          width={this.openInput ? `${this.width}px` : '50px'}
          position="relative"
          transition="all 0.5s ease"
        >
          <FInput
            v-model={this.inputText}
            placeholder={this.placeholder}
            size={this.size}
            clearable={true}
            clearValue={this.clearValue}
            vOn:enterPress={() => this.$emit('enterPress', this.inputText)}
          >
            <template slot="prefix">
              <Prefix
                padding={`containerNone containerNone containerNone ${
                  HEIGHT[this.size]
                }`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FIcon
                  group="action"
                  name="search"
                  size="16"
                  pressable={false}
                />
              </Prefix>
            </template>
          </FInput>
        </FContainer>
      </Container>
    )
  },
}
</script>
<style></style>
