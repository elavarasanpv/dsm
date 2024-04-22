<script>
import { FContainer } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import { eventBus } from '../../utils/event-bus'
import { isEqual } from 'lodash'
export default {
  name: 'FDropdownMenu',
  mixins: [ThemeMixin],
  provide() {
    return {
      selectType: this.selectType,
      eventBus: eventBus,
      menuList: () => {
        return this.menuList
      },
      uniqueId: this.uniqueId,
    }
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    selectType: {
      type: String,
      default: '',
      validator: (val) => {
        return ['bulk', 'single', ''].includes(val)
      },
    },
    selectedValue: {
      type: Array,
      default: () => [],
    },
    uniqueId: {
      type: undefined,
      default: '',
    },
  },
  data() {
    return {
      selectedMenus: [],
    }
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
  },
  watch: {
    selectedMenus(newVal, oldVal) {
      if (isEqual(newVal, oldVal)) {
        this.selectMenu(true)
      }
    },
    menuList() {
      this.getSelectedMenus()
    },
    selectedValue(newVal) {
      this.clearRecord(newVal)
    },
  },
  mounted() {
    let { selectedValue } = this || []
    this.getSelectedMenus()
    if (!isEmpty(selectedValue)) {
      selectedValue.forEach((menu) => {
        let { value } = menu || ''
        this.selectedMenus.push(value)
      })
      this.selectMenu(true)
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getSelectedMenus() {
      let { menuList, uniqueId } = this || []
      menuList.forEach((menu) => {
        let { value } = menu || {}
        eventBus.$on(`menu-selected${value}${uniqueId}`, (props) => {
          if (!this.selectedMenus.includes(props)) {
            if (this.selectType !== 'bulk' && !isEmpty(this.selectedMenus)) {
              this.selectMenu(false)
              this.selectedMenus = []
            }
            setTimeout(() => {
              this.selectedMenus.push(props), 10
            })
          } else {
            const index = this.selectedMenus.indexOf(props)
            this.selectedMenus.splice(index, 1)
            eventBus.$emit(`selected-item${props}${uniqueId}`, false)
          }
        })
      })
    },
    defaultSlots() {
      let { $slots = {} } = this
      if (!isEmpty($slots)) {
        let slots = $slots?.default || []
        return slots
      } else return ''
    },
    selectMenu(value) {
      let { selectedMenus, menuList, uniqueId } = this || []
      if (!isEmpty(selectedMenus)) {
        selectedMenus.forEach((menu) => {
          eventBus.$emit(`selected-item${menu}${uniqueId}`, value)
        })
      }
      let selectedRecord = menuList.filter((menu) => {
        return selectedMenus.some((val) => menu.value === val)
      })
      if (value) {
        this.$emit('change', selectedRecord)
      }
    },
    clearRecord(record) {
      this.selectMenu(false)
      this.selectedMenus = []
      if (!isEmpty(record)) {
        record.forEach((menu) => {
          let { value } = menu || ''
          this.selectedMenus.push(value)
        })
        this.selectMenu(true)
      }
    },
  },
  render() {
    const Conatiner = styled(FContainer)`
      ${this.computedStyleProps}
    `
    return (
      <Conatiner display="flex" flexDirection="column" width="100%">
        {this.defaultSlots()}
      </Conatiner>
    )
  },
}
</script>

<style scoped></style>
