<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import {
  FCard,
  FText,
  FTags,
  FRecordDetails,
  FAvatar,
  FContainer,
  FIcon,
} from '../../index.js'

export default {
  name: 'FPopoverDetails',
  components: {
    FCard,
    FText,
    FTags,
    FRecordDetails,
    FAvatar,
    FContainer,
    FIcon,
  },
  mixins: [ThemeMixin],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Object,
      default: () => {},
    },
    headerText: {
      type: String,
      default: '',
    },
    recordId: {
      type: Number,
      default: null,
    },
    mainField: {
      type: Object,
      default: () => {},
    },
    tag: {
      type: Object,
      default: () => {},
    },
    avatar: {
      type: Object,
      default: () => {},
    },
    canShowRedirect: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    content() {
      let { $slots } = this || {}
      let { content } = $slots || {}
      return content
    },
    headerSlot() {
      let { $slots } = this || {}
      let { header } = $slots || {}
      return header
    },
    onRedirect() {
      this.$emit('onClickRedirect')
    },
  },
  render() {
    let {
      headerText,
      recordId,
      mainField,
      tag,
      avatar,
      canShowRedirect,
      hideHeader,
    } = this

    return (
      <FCard style={{ minWidth: '320px', border: 'none' }}>
        {!hideHeader && (
          <template slot="header">
            <FContainer
              justifyContent="space-between"
              display="flex"
              padding="containerLarge containerXLarge"
              borderBottom="1px solid"
              borderColor="borderNeutralBaseSubtler"
              alignItems="center"
            >
              <FText
                appearance={'bodyReg14'}
                color={'textMain'}
                fontWeight="bold"
              >
                {headerText}
              </FText>
              {canShowRedirect && (
                <FIcon
                  group="navigation"
                  name="open-window"
                  color="iconPrimaryDefault"
                  size="16"
                  vOn:click={this.onRedirect}
                ></FIcon>
              )}
            </FContainer>
          </template>
        )}
        {!isEmpty(this.children()) ? (
          this.children()
        ) : (
          <template slot="default">
            <FContainer
              display="flex"
              alignItems="center"
              gap="containerXLarge"
              padding="containerXLarge"
            >
              <FText>{'#' + recordId}</FText>
              {!isEmpty(tag?.displayName) && (
                <FTags
                  text={tag?.displayName}
                  appearance={'status'}
                  statusType={tag?.type}
                ></FTags>
              )}
            </FContainer>
            <FContainer
              display="flex"
              gap="containerXLarge"
              padding="containerXLarge containerXLarge containerNone"
            >
              {!isEmpty(avatar?.avatarUrl) && (
                <FAvatar
                  size={'L'}
                  avatarUrl={avatar.avatarUrl}
                  userName={avatar.name}
                />
              )}
              {mainField ? (
                <FContainer
                  display="flex"
                  flexDirection="column"
                  gap="containerLarge"
                >
                  <FText>{mainField.name}</FText>
                  <FText color={'textDescription'}>{mainField.value}</FText>
                </FContainer>
              ) : (
                <div></div>
              )}
            </FContainer>
            {!isEmpty(this.content()) ? (
              this.content()
            ) : (
              <FRecordDetails
                data={this.fields}
                columns={this.columns}
              ></FRecordDetails>
            )}
          </template>
        )}
      </FCard>
    )
  },
}
</script>
