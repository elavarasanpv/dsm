<script>
import { FContainer, FWidgetCard, FText, FAvatar, FIcon } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
// import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FContactWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium'].includes(value)
      },
    },
    title: {
      type: String,
      default: 'Contact',
    },
    contactDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
  },
  render() {
    let { computedStyleProps, contactDetails, title } = this
    let { email = '--', phone = '--', userName = '' } = contactDetails || {}
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `
    const Text = styled(FText)`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
    return (
      <Container>
        <FWidgetCard size={this.size}>
          <FContainer height="100%" width="100%" overflow="hidden">
            {this.size === 'medium' && (
              <FContainer
                gap="containerXLarge"
                display="flex"
                height="100%"
                flexDirection="column"
              >
                <FContainer height="24px">
                  <FText appearance="headingMed14">{title}</FText>
                </FContainer>
                <FContainer
                  padding="containerLarge"
                  backgroundColor="backgroundMidgroundSubtle"
                  borderRadius="high"
                  display="flex"
                  gap="containerMedium"
                  flexDirection="column"
                  height="100%"
                  justifyContent="center"
                >
                  <FContainer
                    width="100%"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    gap="containerLarge"
                  >
                    <FAvatar size="XL" shape="square" props={contactDetails} />
                    <FContainer
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                      gap="containerMedium"
                      width="100%"
                    >
                      <Text
                        appearance="headingMed14"
                        width="100%"
                        textAlign="center"
                      >
                        {userName}
                      </Text>
                      <FContainer
                        display="flex"
                        alignItems="center"
                        gap="containerMedium"
                        justifyContent="center"
                        width="100%"
                      >
                        <FIcon
                          group="communication"
                          name="call"
                          size="12"
                          pressable={false}
                        />
                        <Text appearance="captionReg12" color="textDescription">
                          {phone}
                        </Text>
                      </FContainer>
                    </FContainer>
                  </FContainer>
                  <FContainer
                    display="flex"
                    alignItems="center"
                    gap="containerMedium"
                    justifyContent="center"
                  >
                    <FIcon
                      group="communication"
                      name="mail"
                      size="12"
                      pressable={false}
                    />
                    <Text appearance="captionReg12" color="textDescription">
                      {email}
                    </Text>
                  </FContainer>
                </FContainer>
              </FContainer>
            )}
            {this.size === 'small' && (
              <FContainer
                display="flex"
                padding="containerLarge"
                gap="containerMedium"
                backgroundColor="backgroundMidgroundSubtle"
                borderRadius="high"
                height="100%"
                flexDirection="column"
              >
                <FContainer
                  display="flex"
                  gap="containerMedium"
                  justifyContent="space-between"
                >
                  <FContainer
                    display="flex"
                    flexDirection="column"
                    overflow="hidden"
                    gap="containerMedium"
                  >
                    <Text appearance="headingMed14">{userName}</Text>
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerMedium"
                    >
                      <FIcon
                        group="communication"
                        name="call"
                        size="12"
                        pressable={false}
                      />
                      <Text appearance="captionReg12" color="textDescription">
                        {phone}
                      </Text>
                    </FContainer>
                  </FContainer>
                  <FContainer>
                    <FAvatar size="L" shape="square" props={contactDetails} />
                  </FContainer>
                </FContainer>
                <FContainer
                  display="flex"
                  alignItems="center"
                  gap="containerMedium"
                >
                  {' '}
                  <FIcon
                    group="communication"
                    name="mail"
                    size="12"
                    pressable={false}
                  />
                  <Text appearance="captionReg12" color="textDescription">
                    {email}
                  </Text>
                </FContainer>
              </FContainer>
            )}
          </FContainer>
        </FWidgetCard>
      </Container>
    )
  },
}
</script>

<style scoped></style>
