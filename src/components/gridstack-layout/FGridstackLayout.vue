<script>
import { GridStack } from 'gridstack'
import { cloneDeep, isEmpty } from 'lodash'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'
export default {
  name: 'GridstackLayout',
  provide() {
    return {
      getMasterGridOptions: () => cloneDeep(this.gridOptions),
      storeItem: (item) => {
        if (isEmpty(this.storedItem)) {
          this.storedItem = cloneDeep(item)
          this.$nextTick(() => {
            this.storedItem = null
          })
        }
      },
      getStoredItem: () => cloneDeep(this.storedItem),
    }
  },
  props: {
    column: {
      type: Number,
      default: 12,
      validator: (value) => value >= 1 && value <= 12,
    },
    minRow: {
      type: Number,
      validator: (value) => value >= 0 && Number.isInteger(value),
      default: 0,
    },
    layout: {
      type: Array,
      required: true,
    },
    accept: {
      type: Array,
      default: () => [],
    },
    cellHeight: {
      type: [Number, String],
      default: 10, // '10px', 1 row size..
    },
    disableOneColumnMode: { type: Boolean, default: true },
    margin: {
      type: String,
      default: '10px',
      validator: (value) => /^\d+px$/.test(value),
    },
    float: {
      type: Boolean,
      default: true,
    },
    staticGrid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      masterGrid: null,
      storedItem: null,
    }
  },
  computed: {
    gridOptions() {
      return {
        cellHeight: this.cellHeight,
        disableOneColumnMode: this.disableOneColumnMode,
        minRow: this.minRow,
        margin: this.margin,
        float: this.float,
      }
    },
    defaultSlot() {
      return this.$slots?.default
    },
    layoutHash() {
      const layoutHash = this.layout.reduce((hashMap, item) => {
        hashMap[item.id] = item
        return hashMap
      }, {})
      return layoutHash
    },
  },
  created() {
    this.$nextTick(() => {
      // init() should be executed after the template has been loaded...
      this.masterGrid = GridStack.init({
        ...this.gridOptions,
        column: this.column,
        acceptWidgets: (el) => {
          const classList = new Set(el.classList)
          for (let i = 0; i < this.accept.length; i++) {
            const accept = this.accept[i]
            if (classList.has(accept)) {
              return true
            }
          }
          return false
        },
      })
      this.attachEventListeners()
    })
  },
  methods: {
    getGridWidth() {
      return this.$el.clientWidth
    },
    getNumberOfColumns() {
      return this.masterGrid.getColumn()
    },
    getGridHeight() {
      return this.$el.clientHeight
    },
    getSingleColumnSize() {
      const gridWidth = this.getGridWidth()
      const numberOfColumns = this.getNumberOfColumns()
      return gridWidth / numberOfColumns
    },
    getSingleColumnHeight() {
      const gridHeight = this.getGridHeight()
      const numberOfColumns = this.getNumberOfColumns()
      return gridHeight / numberOfColumns
    },
    removeItemFromModel(id) {
      const index = this.layout.findIndex((item) => item.id == id)
      if (index >= 0) {
        // 'splice' is a mutating method, yes, I am mutating a prop.
        // eslint-disable-next-line vue/no-mutating-props
        this.layout.splice(index, 1)
      }
    },
    removeItem(id) {
      // Removes item from 'view'.
      const item = this.$el.querySelector(`.grid-stack-item[gs-id="${id}"]`)
      this.masterGrid.removeWidget(item, true) // RemoveDOM = false, don't remove DOM.
    },
    updateLayout(newLayout) {
      this.$emit('layoutUpdate', newLayout)
    },
    attachEventListeners() {
      this.masterGrid.on('change added', (event, items) => {
        ;(items || []).forEach((item) => {
          const { id, w, h, x, y } = item
          if (this.layoutHash[id]) {
            Object.assign(this.layoutHash[id], { w, h, x, y })
          }
        })
      })
      this.masterGrid.on('removed', (event, items) => {
        ;(items || []).forEach((item) => {
          this.removeItemFromModel(item.id)
        })
      })
    },
    detachEventListeners() {},
  },
  render() {
    return <div class="grid-stack">{this.defaultSlot}</div>
  },
}
</script>
