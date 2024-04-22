<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty, isFunction } from '../../utils/validation'
import {
  FText,
  FIcon,
  FTags,
  FPopover,
  FContainer,
  FTooltip,
} from '../../index.js'
import Card from './components/Card.vue'

export default {
  name: 'FReadingCard',
  components: { FText, FIcon, FTags, Card, FPopover, FTooltip },
  mixins: [ThemeMixin],
  props: {
    data: {
      type: Array,
      default: () => {},
    },
    heading: {
      type: String,
      default: '',
    },
    timelineFilter: {
      type: String,
      default: '',
    },
    statusTag: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      validator: (val) => ['tag', 'noTag', 'simple', 'icon'].includes(val),
      default: 'simple',
    },
    benchmark: {
      type: Object,
      default: () => {},
    },
    banner: {
      type: Object,
      default: () => ({}),
    },
    editDisabled: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showCardActions: false,
    }
  },
  computed: {
    layout() {
      return this.data.length
    },
    isBaselineCard() {
      let { data } = this
      return data.some((cardData) => !isEmpty(cardData?.baseline))
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
    slot(type) {
      let { $scopedSlots } = this
      let { [type]: component } = $scopedSlots || {}

      if (isFunction(component) && type === 'actions') {
        return component()
      }
    },
  },
  render() {
    return (
      <FContainer borderRadius="medium" position="relative">
        <FContainer position="absolute" top="0px" width="100%">
          <FContainer
            height="6px"
            borderRadius="medium medium none none"
            overflow="hidden"
            style={{
              backgroundColor: isEmpty(this.banner?.color)
                ? '#fff'
                : this.banner.color,
            }}
          ></FContainer>
        </FContainer>
        <FContainer
          padding="containerXLarge"
          height="108px"
          position="relative"
        >
          <FContainer
            position="absolute"
            top="8px"
            right="8px"
            display="flex"
            alignItems="center"
            gap="containerMedium"
          >
            {!isEmpty(this.helpText) && (
              <FTooltip placement="top">
                <template slot="title">
                  <FText
                    appearance="captionReg12"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {this.helpText}
                  </FText>
                </template>
                <FIcon size="16" group="action" name="info" pressable={true} />
              </FTooltip>
            )}
            {!this.editDisabled && (
              <FIcon
                size="16"
                group="edit"
                name="edit-box"
                pressable={true}
                vOn:click={() => this.$emit('edit')}
              />
            )}
            <FContainer>{this.slot('actions')}</FContainer>
          </FContainer>

          <FContainer display="flex" style={{ gap: '40px' }} overflow="hidden">
            {this.data.map((cardData, index) => {
              return (
                <Card
                  vOn:drilldown={() => this.$emit('drilldown', index)}
                  card={cardData}
                />
              )
            })}
          </FContainer>
        </FContainer>
      </FContainer>
    )
  },
}
</script>
