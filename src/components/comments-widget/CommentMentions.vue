<script>
import {
  FContainer,
  FSpinner,
  FMenuItem,
  FText,
  FAvatar,
  FDivider,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import debounce from 'lodash/debounce'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FComments',
  mixins: [ThemeMixin],
  props: {
    editor: {
      type: Object,
      required: false,
    },

    items: {
      type: Object,
      required: true,
    },
    query: {
      type: String,
      required: false,
    },

    command: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
      visible: true,
      isLoading: false,
      recordsList: [],
      clientContact: null,
    }
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    isPeopleSelection() {
      let { items } = this
      let { type } = items || {}
      return type === 'people'
    },
  },
  watch: {
    query() {
      this.searchRecords()
    },
  },
  async created() {
    let { items } = this
    let { type } = items
    this.isLoading = true
    let data = await this.items.triggerFunction(this.query, type)
    this.isLoading = false
    this.recordsList = data
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    searchRecords: debounce(async function () {
      this.isLoading = true
      let data = await this.items.triggerFunction(this.query)
      this.isLoading = false
      this.recordsList = data
    }, 400),
    getSpinner() {
      return <FSpinner show={this.isLoading} size={30}></FSpinner>
    },
    selectItem(index) {
      let { items } = this
      let { moduleName } = items || {}
      const item = this.recordsList[index]
      if (item) {
        if (this.isPeopleSelection) {
          this.command({
            id: `${moduleName}~${item.id}`,
            label: `${item.name}`,
          })
        } else {
          this.command({
            id: `${moduleName}~${item.id}`,
            label: `${item.id}`,
          })
        }
      }
    },
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },
    upHandler() {
      let minIndex = 0
      if (this.selectedIndex - 1 < minIndex) {
        this.selectedIndex = minIndex
      } else {
        this.selectedIndex = this.selectedIndex - 1
      }
    },

    downHandler() {
      let maxIndex = this.recordsList.length - 1
      if (this.selectedIndex + 1 > maxIndex) {
        this.selectedIndex = maxIndex
      } else {
        this.selectedIndex = this.selectedIndex + 1
      }
    },
    enterHandler() {
      this.selectItem(this.selectedIndex)
    },
  },
  render() {
    let { styleProps, isPeopleSelection } = this
    const Container = styled(FContainer)`
      ${styleProps};
    `
    return (
      <Container
        maxWidth="350px"
        overflow="scroll"
        maxHeight="300px"
        backgroundColor="backgroundContainer"
        borderRadius="medium"
        boxShadow="lightMed"
      >
        {this.isLoading ? (
          <FContainer
            width="240px"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {this.getSpinner()}
          </FContainer>
        ) : isPeopleSelection ? (
          <FContainer class="comment-mentions-popover">
            {' '}
            {this.recordsList.map((option, index) => {
              return (
                <FMenuItem
                  value={`${option.id}`}
                  key={`${option.id}`}
                  isSelected={this.selectedIndex == index}
                  vOn:click={() => this.selectItem(index)}
                >
                  <FContainer
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="containerLarge"
                  >
                    <FAvatar size="S" userName={option.name}></FAvatar>
                    {option.name}
                    {!isEmpty(option.subtitle) && <FDivider height="10px" />}

                    <FText appearance="captionReg10" color="textCaption">
                      {option.subtitle}
                    </FText>
                  </FContainer>
                </FMenuItem>
              )
            })}
          </FContainer>
        ) : (
          <FContainer class="comment-mentions-popover">
            {this.recordsList.map((option, index) => {
              return (
                <FMenuItem
                  value={`${option.id}`}
                  key={`${option.id}`}
                  isSelected={this.selectedIndex == index}
                  vOn:click={() => this.selectItem(index)}
                >
                  <FContainer
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="containerLarge"
                  >
                    <FText appearance="headingMed14" color="textCaption">
                      {option.id}
                    </FText>
                    <FDivider height="10px" />
                    {option.name}
                  </FContainer>
                </FMenuItem>
              )
            })}
          </FContainer>
        )}
      </Container>
    )
  },
}
</script>
