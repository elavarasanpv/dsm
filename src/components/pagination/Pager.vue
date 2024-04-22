<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { FContainer, FText } from '../../index'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'Pager',
  components: { FContainer, FText },
  mixins: [ThemeMixin],
  props: {
    currentPage: Number,
    pageCount: Number,
    disabled: Boolean,
    type: String,
    withoutCount: Boolean,
    getStyle: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      pagerCount: 5,
      quicknextIconObj: {
        name: 'options-horizontal',
        group: 'action',
        hoverColor: 'backgroundMidgroundMedium',
      },
      quickprevIconObj: {
        name: 'options-horizontal',
        group: 'action',
        hoverColor: 'backgroundMidgroundMedium',
      },
      textHoverColor: 'textInverseMain',
    }
  },
  computed: {
    pagers() {
      let { pagerCount } = this || {}
      const halfPagerCount = (pagerCount - 1) / 2

      const currentPage = Number(this.currentPage)
      const pageCount = Number(this.pageCount)

      let showPrevMore = false
      let showNextMore = false

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }

      const array = []

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push({ value: i })
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push({ value: i })
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push({ value: i })
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push({ value: i })
        }
      }

      this.showPrevMore = showPrevMore
      this.showNextMore = showNextMore
      return array
    },
  },
  watch: {
    showPrevMore(val) {
      if (!val)
        this.quickprevIconObj = {
          name: 'options-horizontal',
          group: 'action',
          hoverColor: 'backgroundMidgroundMedium',
        }
    },

    showNextMore(val) {
      if (!val)
        this.quicknextIconObj = {
          name: 'options-horizontal',
          group: 'action',
          hoverColor: 'backgroundMidgroundMedium',
        }
    },
  },
  methods: {
    onPagerClick(event) {
      let { pageCount, currentPage, pagerCount } = this || {}
      const target = event.target
      if (this.disabled) return
      let newPage = Number(event.target.textContent)
      const pagerCountOffset = pagerCount - 2

      if (target.className && target.className.indexOf('hydrated') !== -1) {
        if (target.name.indexOf('double-arrow-left') !== -1) {
          newPage = currentPage - pagerCountOffset
        } else if (target.name.indexOf('double-arrow-right') !== -1) {
          newPage = currentPage + pagerCountOffset
        }
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }

        if (newPage > pageCount) {
          newPage = pageCount
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage)
      }
    },

    onMouseEnter(direction) {
      if (this.disabled) return
      if (direction === 'left') {
        this.quickprevIconObj = {
          name: 'double-arrow-left',
          group: 'navigation',
          hoverColor: 'backgroundPrimaryDefault',
        }
      } else if (direction === 'right') {
        this.quicknextIconObj = {
          name: 'double-arrow-right',
          group: 'navigation',
          hoverColor: 'backgroundPrimaryDefault',
        }
      }
    },
    onMouseLeave(direction) {
      if (this.disabled) return
      this.quickprevIconObj = {
        name: 'options-horizontal',
        group: 'action',
        hoverColor: 'backgroundMidgroundMedium',
      }
      this.quicknextIconObj = {
        name: 'options-horizontal',
        group: 'action',
        hoverColor: 'backgroundMidgroundMedium',
      }
      if (direction === 'left') {
        this.quickprevIconObj.hoverColor = 'backgroundMidgroundMedium'
      } else if (direction === 'right') {
        this.quicknextIconObj.hoverColor = 'backgroundMidgroundMedium'
      }
    },
    getHoverColor(activeObj) {
      if (isEmpty(activeObj)) {
        return 'backgroundMidgroundMedium'
      } else {
        return activeObj.bgColor
      }
    },
    getPageCell(position) {
      let { currentPage, pageCount } = this || {}
      let isFirst = position === 'first'
      let isActive = isFirst ? currentPage === 1 : currentPage === pageCount
      let activeObj = {}
      if (isActive)
        activeObj = {
          bgColor: 'backgroundPrimaryDefault',
          color: 'textInverseMain',
        }
      const Cell = styled(FContainer)`
        ${this.getStyle('cell')}
        ${this.disabled && this.getStyle('disabledContainer')}
      `
      return (
        <Cell
          backgroundColor={activeObj.bgColor}
          vOn:click={() => this.onPagerClick(event)}
          hover-backgroundColor={this.getHoverColor(activeObj)}
        >
          <FText color={activeObj.color}>{isFirst ? 1 : pageCount}</FText>
        </Cell>
      )
    },
  },
  render() {
    let {
      styleProps,
      pageCount,
      showPrevMore,
      pagers,
      showNextMore,
      currentPage,
    } = this || {}
    const Element = styled(FContainer)`
      ${styleProps}
      ${this.disabled && this.getStyle('disabledContainer')}
    `
    const Span = styled('span')`
      ${this.getStyle('cell')}
      ${this.disabled && this.getStyle('disabledContainer')}
    `
    const Cell = styled(FContainer)`
      ${this.getStyle('cell')}
      ${this.disabled && this.getStyle('disabledContainer')}
    `
    return (
      <FContainer>
        {this.type === 'simple' ? (
          <Element display="flex">
            <Cell cursor="default">
              <FText>{currentPage}</FText>
            </Cell>
            {!this.withoutCount && (
              <Span>
                <Cell maxWidth="10px" minWidth="10px" cursor="default">
                  <FText>/</FText>
                </Cell>
                <Cell cursor="default">
                  <FText>{this.pageCount}</FText>
                </Cell>
              </Span>
            )}
          </Element>
        ) : (
          <Element display="flex">
            {pageCount > 0 && this.getPageCell('first')}
            {showPrevMore && (
              <Span
                vOn:mouseenter={() => this.onMouseEnter('left')}
                vOn:mouseleave={() => this.onMouseLeave()}
                vOn:click={() => this.onPagerClick(event)}
              >
                <fc-icon
                  group={this.quickprevIconObj.group}
                  name={this.quickprevIconObj.name}
                  color={this.quickprevIconObj.hoverColor}
                  size="13"
                ></fc-icon>
              </Span>
            )}
            {pagers.map(({ value }) => {
              let activeObj = {}
              if (currentPage === value) {
                activeObj = {
                  bgColor: 'backgroundPrimaryDefault',
                  color: 'textInverseMain',
                }
              }
              return (
                <div
                  vOn:mouseenter={() => (this.textHoverColor = 'red')}
                  vOn:mouseleave={() => (this.textHoverColor = '#008000')}
                >
                  <Cell
                    background-color={activeObj.bgColor}
                    vOn:click={() => this.onPagerClick(event)}
                    hover-backgroundColor={this.getHoverColor(activeObj)}
                  >
                    <FText color={activeObj.color}>{value}</FText>
                  </Cell>
                </div>
              )
            })}
            {showNextMore && (
              <Span
                vOn:mouseenter={() => this.onMouseEnter('right')}
                vOn:mouseleave={() => this.onMouseLeave()}
                vOn:click={() => this.onPagerClick(event)}
              >
                <fc-icon
                  group={this.quicknextIconObj.group}
                  name={this.quicknextIconObj.name}
                  color={this.quicknextIconObj.hoverColor}
                  size="13"
                ></fc-icon>
              </Span>
            )}
            {pageCount > 1 && this.getPageCell('last')}
          </Element>
        )}
      </FContainer>
    )
  },
}
</script>
