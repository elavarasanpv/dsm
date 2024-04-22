<script>
import { cloneDeep } from 'lodash'
export default {
  name: 'GridstackItem',
  props: {
    item: {
      type: Object,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    noMove: {
      type: Boolean,
      default: false,
    },
    noScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      dimension: {},
      config: {},
    }
  },
  computed: {
    defaultSlot() {
      return this.$slots?.default
    },
  },
  created() {
    // Make a copy of the props given, and supply it to gridstack in the template...
    // gridstack tends to change the input supplied...
    this.config = cloneDeep({
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      id: this.id,
      noMove: this.noMove,
      noResize: this.noResize,
    })
    this.$nextTick(() => {
      // makeWidget should be called after the template has been loaded...
      this.loaded = true
      this.$nextTick(() => {
        const { $parent } = this || {}
        const { masterGrid: newMasterGrid, subGrid: newsubGrid } = $parent || {}
        const masterGrid = newMasterGrid
        const subGrid = newsubGrid
        if (subGrid) {
          // This subgrid exists inside of another subgird.
          subGrid.makeWidget(this.$el)
        } else if (masterGrid) {
          // This subgrid exists inside of the master grid.
          masterGrid.makeWidget(this.$el)
        }
      })
    })
  },
  methods: {
    resize(dimensions) {
      const { $parent } = this || {}
      const { masterGrid, subGrid } = $parent || {}
      if (subGrid) {
        subGrid.update(this.$el, dimensions)
      } else {
        masterGrid.update(this.$el, dimensions)
      }
    },
  },
  render() {
    if (this.loaded) {
      return (
        <div
          class="grid-stack-item"
          gs-x={this.config.x}
          gs-y={this.config.y}
          gs-w={this.config.w}
          gs-h={this.config.h}
          gs-id={this.config.id}
          gs-no-resize={this.config.noResize}
          gs-no-move={this.config.noMove}
        >
          <div
            class="grid-stack-item-content"
            style={{ overflowY: this.noScroll ? 'hidden' : 'auto' }}
          >
            {this.defaultSlot}
          </div>
        </div>
      )
    } else {
      return null
    }
  },
}
</script>
