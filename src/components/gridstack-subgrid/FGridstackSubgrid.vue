<script>
import { GridStack } from 'gridstack'
export default {
  inject: {
    getMasterGridOptions: { type: Function },
    getStoredItem: { type: Function },
    storeItem: { type: Function },
  },
  props: {
    column: {
      type: Number,
      default: 4,
      validator: (value) => value >= 1 && value <= 12,
    },
    margin: {
      type: String,
      default: '10px',
      validator: (value) => /^\d+px$/.test(value),
    },
    autoScale: {
      type: String,
      default: 'none',
      validator: (value) => {
        return ['onResize', 'onRelease', 'none'].includes(value)
      },
    },
    autoScaleOffset: {
      type: Number,
      validator: (value) => Number.isInteger(value),
      default: 0,
    },
    minRow: {
      type: Number,
      validator: (value) => value >= 0 && Number.isInteger(value),
      default: 0,
    },
    cellHeight: {
      type: [Number, String],
      default: 1,
    },
    items: {
      type: Array,
      required: true,
    },
    accept: {
      type: Array,
      default: () => [],
    },
    staticGrid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      subGrid: null,
      loaded: false,
    }
  },
  computed: {
    defaultSlot() {
      return this.$slots?.default
    },
    layoutHash() {
      const layoutHash = this.items.reduce((hashMap, item) => {
        hashMap[item.id] = item
        return hashMap
      }, {})
      return layoutHash
    },
  },
  created() {
    console.log('subgrid created -> ', this._uid)
    this.$nextTick(() => {
      this.loaded = true
      this.$nextTick(() => {
        this.subGrid = GridStack.addGrid(this.$el, {
          ...this.getMasterGridOptions(),
          margin: this.margin,
          column: this.column,
          minRow: 100,
          maxRow: 0,
          acceptWidgets: (el) => {
            const classList = new Set(el.classList)
            this.accept.forEach((classes) => {
              if (classList.has(classes)) {
                return true
              }
            })
            return false
          },
        })
        this.attachEventListeners()
      })
    })
  },
  methods: {
    getGridWidth() {
      return this.$el.clientWidth
    },
    getNumberOfColumns() {
      return this.subGrid.getColumn()
    },
    getSingleColumnSize() {
      const gridWidth = this.getGridWidth()
      const numberOfColumns = this.getNumberOfColumns()
      return gridWidth / numberOfColumns
    },
    removeItemFromModel(id) {
      const index = this.items.findIndex((item) => item.id == id)
      if (index >= 0) {
        // 'splice' is a mutating method, yes, I am mutating a prop.
        // eslint-disable-next-line vue/no-mutating-props
        const [removedItem] = this.items.splice(index, 1)
        this.storeItem(removedItem)
      }
    },
    removeItem(id) {
      // Removes item from the 'view'.
      const item = this.$el.querySelector(`.grid-stack-item[gs-id="${id}"]`)
      this.subGrid.removeWidget(item, true) // RemoveDOM = false, don't remove DOM.
    },
    attachEventListeners() {
      const self = this
      this.subGrid.on('added change', (event, items) => {
        ;(items || []).forEach((item) => {
          const { x, y, w, h, id } = item || {}
          if (self.layoutHash[id]) {
            Object.assign(self.layoutHash[id], { x, y, w, h })
          } else {
            if (event.type == 'added') {
              // A new item has been added to the grid...
              const storedItem = self.getStoredItem()
              if (id == storedItem.id) {
                // An item was moved into this grid from some other grid...
                Object.assign(storedItem, { x, y, w, h }) // Update item's position and dimension.
                // eslint-disable-next-line vue/no-mutating-props
                self.items.push(storedItem)
              }
            }
          }
        })
        self.scale(self.getMaxHeight())
      })
      this.subGrid.on('removed', (event, items) => {
        ;(items || []).forEach((item) => {
          this.removeItemFromModel(item.id)
        })
        this.scale(this.getMaxHeight())
      })
      if (this.autoScale == 'onResize') {
        this.subGrid.on('resize drag', (event, el) => {
          // In case of 'resize' and 'drag' we won't get an object with
          // the dimension and position instead we will get an html element, lame.
          // We have to manually extract dimension and position from that html element.
          let element = el || {}
          const id = element.getAttribute('gs-id')
          const h = element.getAttribute('gs-h')
          const y = element.getAttribute('gs-y')
          const maxHeight = Object.keys(this.layoutHash).reduce((max, key) => {
            const getHeight = () => {
              if (key == id) {
                return Number(y) + Number(h)
              } else {
                const item = this.layoutHash[key]
                return Number(item.h) + Number(item.y)
              }
            }
            const height = getHeight()
            return height > max ? height : max
          }, 0)
          this.scale(maxHeight)
        })
      }
    },
    getMaxHeight() {
      return this.items.reduce((max, item) => {
        const height = item.h + item.y
        return height > max ? height : max
      }, 0)
    },
    scale(height) {
      console.log('height -> ', height, 'element -> ', this.$el)
      if (this.autoScale != 'none') {
        if (height > 0 && Number.isInteger(height)) {
          const { subGrid, masterGrid } = this.$parent.$parent.$parent
          const el = this.$parent.$parent.$el
          if (subGrid) {
            // This subgrid is inside of another subgrid...
            subGrid.update(el, { h: height + Number(this.autoScaleOffset) })
          } else if (masterGrid) {
            // This subgrid is inside of the master grid.
            masterGrid.update(el, { h: height + Number(this.autoScaleOffset) })
          }
        } else {
          console.warn(
            `Unable to scale, the height supplied (${height}) should be a positive integer.`
          )
        }
      }
    },
  },
  mounted() {},
  render() {
    if (this.loaded) {
      return (
        <div class="grid-stack" ref="subgrid">
          {this.defaultSlot}
        </div>
      )
    } else {
      return null
    }
  },
}
</script>

<style lang="scss" scoped></style>
