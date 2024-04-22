<script>
import { isFunction } from 'lodash'
import { FContainer, FText } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FSegmentedControl',
  mixins: [ThemeMixin],
  props: {
    value: {
      type: String,
      default: '1',
    },
    tabsList: {
      type: Array,
      default: () => [],
    },
    tabWidth: {
      type: String,
      default: 'fit-content',
    },
  },
  data() {
    return {}
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    customTabSlot(tab) {
      const { $scopedSlots = {} } = this
      const slotFn = $scopedSlots[`tab.${tab.value}`]
      if (isFunction(slotFn)) {
        return slotFn(tab)
      }
      return null
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    tabsContainer(tab) {
      let { modelValue, tabWidth } = this
      let { value } = tab
      let isSelectedTab = modelValue === value
      const Tab = styled(FContainer)`
        ${this.getStyle('tab')};
        ${isSelectedTab && this.getStyle('selectedTab')};
      `
      return (
        <Tab vOn:click={() => this.onTabClick(tab)} width={tabWidth}>
          {this.customTabSlot(tab) || (
            <FText appearance="captionMed12">{tab.label}</FText>
          )}
        </Tab>
      )
    },
    checkForSlot(tab) {
      let { $scopedSlots } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        let keyList = (key || '').split('.')
        if (!isEmpty(keyList)) {
          let { value } = tab || {}
          let [type, headerName] = keyList || []
          if (type === 'tab' && value === headerName) {
            currSlot = $scopedSlots[key]
          }
        }
      })
      if (!isEmpty(currSlot)) {
        return currSlot(tab)
      } else return false
    },
    onTabClick(tab) {
      let { value, disabled = false } = tab || {}
      if (!disabled) {
        this.modelValue = value
        this.$emit('change', value)
      }
    },
  },
  render() {
    let { styleProps, tabsList } = this || {}
    const Element = styled(FContainer)`
      ${styleProps};
      ${this.getStyle('container')}
    `
    return (
      <Element width="100%">
        {tabsList.map((tab) => this.tabsContainer(tab))}
      </Element>
    )
  },
}
</script>

<style scoped></style>
