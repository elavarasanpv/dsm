<script>
import {
  FContainer,
  FWidgetCard,
  FText,
  FIcon,
  FRecordDetails,
  FModal,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FSummaryWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['large', 'medium'].includes(value)
      },
    },
    title: {
      type: String,
      default: '',
    },
    recordDetails: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visiblity: false,
    }
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    availableSlots() {
      let { $scopedSlots } = this || {}
      if (!isEmpty($scopedSlots)) {
        let slots = Object.keys($scopedSlots).filter((key) => !isEmpty(key))
        return slots
      } else return []
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    resize() {
      this.visiblity = true
    },
    handleCancel() {
      this.visiblity = false
    },
    renderHeaderCell(name, record) {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        if (!isEmpty(key)) {
          if (key === name) {
            currSlot = $scopedSlots[key]
          }
        }
      })
      let props = {
        record,
      }
      if (!isEmpty(currSlot)) {
        return currSlot(props)
      }
    },
    generateScopedSlots() {
      return this.availableSlots.reduce((scopedSlots, columnName) => {
        scopedSlots[columnName] = ({ record }) =>
          this.renderHeaderCell(columnName, record)

        return scopedSlots
      }, {})
    },
  },
  render() {
    let { computedStyleProps } = this
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `
    return (
      <Container>
        <FWidgetCard size={this.size}>
          <FContainer
            width="100%"
            height="100%"
            display="flex"
            gap="containerXLarge"
            flexDirection="column"
          >
            <FContainer
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              height="24px"
            >
              <FText appearance="headingMed14">{this.title}</FText>
              <FIcon
                group="navigation"
                name="diagonal-expand"
                size="14"
                vOn:click={() => this.resize()}
              />
            </FContainer>
            <FContainer
              backgroundColor="backgroundMidgroundSubtle"
              height="100%"
              borderRadius="high"
              padding="containerXxLarge"
              overflow="hidden"
            >
              <FContainer height="100%" overflow="hidden">
                {this.recordDetails.map((rec) => {
                  return (
                    <FRecordDetails
                      record={rec.record}
                      fields={rec.fields}
                      title={rec.title}
                      layout={rec.layout}
                      scopedSlots={this.generateScopedSlots()}
                      vOn:onFieldClick={(field) =>
                        this.$emit('onFieldClick', field)
                      }
                    ></FRecordDetails>
                  )
                })}
              </FContainer>
            </FContainer>
          </FContainer>
        </FWidgetCard>
        <FModal
          title={this.title}
          visible={this.visiblity}
          size="XL"
          hideFooter={true}
          vOn:cancel={() => {
            this.handleCancel()
          }}
        >
          <FContainer padding="containerXxLarge sectionSmall">
            {this.recordDetails.map((rec) => {
              return (
                <FRecordDetails
                  record={rec.record}
                  fields={rec.fields}
                  title={rec.title}
                  layout={rec.layout}
                  scopedSlots={this.generateScopedSlots()}
                ></FRecordDetails>
              )
            })}
          </FContainer>
        </FModal>
      </Container>
    )
  },
}
</script>

<style scoped></style>
