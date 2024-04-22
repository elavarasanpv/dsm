<script>
import { FContainer, FText } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
export default {
  name: 'FTimeline',
  mixins: [ThemeMixin],
  props: {
    records: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getDefaultSlot(data) {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        if (!isEmpty(key)) {
          if (key === 'default') {
            currSlot = $scopedSlots[key]
          }
        }
      })
      if (!isEmpty(currSlot)) {
        return currSlot(data)
      } else {
        return <FText>{data.id}</FText>
      }
    },
    sectionContainer(data, index) {
      let { records } = this || []
      let lastIndex = records.length - 1
      const OuterCircle = styled(FContainer)`
        ${this.getStyle('outer')};
      `
      const InnerCircle = styled(FContainer)`
        ${this.getStyle('inner')};
      `
      return (
        <FContainer
          height="100%"
          width="100%"
          display="flex"
          gap="containerXLarge"
          marginBottom="containerSmall"
        >
          <FContainer
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            gap="containerSmall"
          >
            <OuterCircle height="24px" width="24px">
              <InnerCircle height="12px" width="12px" />
            </OuterCircle>
            {lastIndex !== index && (
              <FContainer
                backgroundColor="backgroundMidgroundDark"
                min-height="25px"
                width="2px"
                height="calc(100% - 30px)"
              />
            )}
          </FContainer>{' '}
          <FContainer height="100%" width="100%">
            {this.getDefaultSlot(data)}
          </FContainer>
        </FContainer>
      )
    },
  },
  render() {
    let { records } = this || []
    const Container = styled(FContainer)``
    return (
      <Container height="100%" width="100%">
        {records.map((data, index) => this.sectionContainer(data, index))}
      </Container>
    )
  },
}
</script>

<style scoped></style>
