<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { FContainer, FButton } from '../../index'
import Pager from '../pagination/Pager.vue'

export default {
  name: 'FPagination',
  components: { FContainer, Pager, FButton },
  mixins: [ThemeMixin],
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: Number,
    pageCount: Number,
    currentPage: {
      type: Number,
      default: 1,
    },
    disabled: Boolean,
    type: {
      type: String,
      default: 'series',
      validator: (val) => {
        return ['series', 'simple'].includes(val)
      },
    },
    disableNext: {
      type: Boolean,
      default: false,
    },
    withoutCount: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false,
      iconHoverColor: 'textMain',
    }
  },
  computed: {
    isDisabledNxtbtn() {
      let { disabled, internalCurrentPage, internalPageCount, disableNext } =
        this || {}
      return (
        disabled ||
        disableNext ||
        [internalCurrentPage, 0].includes(internalPageCount)
      )
    },
    isDisabledPrevbtn() {
      let { disabled, internalCurrentPage } = this || {}
      return disabled || internalCurrentPage <= 1
    },
    internalPageCount() {
      if (typeof this.total === 'number') {
        return Math.max(1, Math.ceil(this.total / this.internalPageSize))
      } else if (typeof this.pageCount === 'number') {
        return Math.max(1, this.pageCount)
      }
      return null
    },
  },

  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = this.getValidCurrentPage(val)
      },
    },

    pageSize: {
      immediate: true,
      handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val
      },
    },

    internalCurrentPage: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:currentPage', newVal)
        this.lastEmittedPage = -1
      },
    },

    internalPageCount(newVal) {
      const oldPage = this.internalCurrentPage
      if (newVal > 0 && oldPage === 0) {
        this.internalCurrentPage = 1
      } else if (oldPage > newVal) {
        this.internalCurrentPage = newVal === 0 ? 1 : newVal
        this.userChangePageSize && this.emitChange()
      }
      this.userChangePageSize = false
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    handleCurrentChange(val) {
      this.internalCurrentPage = this.getValidCurrentPage(val)
      this.userChangePageSize = true
      this.emitChange()
    },

    prev() {
      if (this.isDisabledPrevbtn) return
      const newVal = this.internalCurrentPage - 1
      this.internalCurrentPage = this.getValidCurrentPage(newVal)
      this.$emit('prevClick', this.internalCurrentPage)
      this.emitChange()
    },

    next() {
      if (this.isDisabledNxtbtn) return
      const newVal = this.internalCurrentPage + 1
      this.internalCurrentPage = this.getValidCurrentPage(newVal)
      this.$emit('nextClick', this.internalCurrentPage)
      this.emitChange()
    },

    getValidCurrentPage(value) {
      value = parseInt(value, 10)

      const havePageCount = typeof this.internalPageCount === 'number'

      let resetValue
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1
      } else {
        if (value < 1) {
          resetValue = 1
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1
      } else if (resetValue === 0) {
        resetValue = 1
      }

      return resetValue === undefined ? value : resetValue
    },

    emitChange() {
      this.$nextTick(() => {
        if (
          this.internalCurrentPage !== this.lastEmittedPage ||
          this.userChangePageSize
        ) {
          this.$emit('currentChange', this.internalCurrentPage)
          this.lastEmittedPage = this.internalCurrentPage
          this.userChangePageSize = false
        }
      })
    },
    navigationBtn(btnType) {
      let { isDisabledPrevbtn, isDisabledNxtbtn } = this || {}
      let isPrevBtn = btnType === 'prev'
      let isDisabledBtn = isPrevBtn ? isDisabledPrevbtn : isDisabledNxtbtn
      let iconName = isPrevBtn ? 'accordion-left' : 'accordion-right'
      const Item = styled('div')`
        ${this.getStyle('cell')}
        ${isDisabledBtn && this.getStyle('disabledContainer')}
        padding: 0px;
        min-width: 18px;
      `
      return (
        <Item
          vOn:mouseenter={() =>
            (this.iconHoverColor = 'backgroundPrimaryDefault')
          }
          vOn:mouseleave={() => (this.iconHoverColor = 'textMain')}
          vOn:click={isPrevBtn ? this.prev : this.next}
        >
          <fc-icon
            group="navigation"
            name={iconName}
            color={isDisabledBtn ? 'textInverseDefault' : this.iconHoverColor}
            size="14"
          ></fc-icon>
        </Item>
      )
    },
  },
  render() {
    let { styleProps } = this || {}
    const Element = styled(FContainer)`
      ${styleProps}
      ${this.disabled && this.getStyle('disabledContainer')}
    `
    return (
      <Element display="flex">
        {this.navigationBtn('prev')}
        <Pager
          currentPage={this.internalCurrentPage}
          pageCount={this.internalPageCount}
          vOn:change={this.handleCurrentChange}
          disabled={this.disabled}
          getStyle={this.getStyle}
          type={this.type}
          withoutCount={this.withoutCount}
        ></Pager>
        {this.navigationBtn('nxt')}
      </Element>
    )
  },
}
</script>

<style scoped></style>
