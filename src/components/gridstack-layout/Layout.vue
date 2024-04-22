<script>
import {
  FGridstackSubgrid,
  FGridstackItem,
  FGridstackLayout,
} from '../../index'
import Widget from './components/Widget.vue'
import FColumn from './components/FColumn.vue'
import FSection from './components/FSection.vue'
import FWidget from './components/FWidget.vue'
export default {
  name: 'Layout',
  components: {
    FSection,
    FColumn,
    Widget,
    FWidget,
    'gs-item': FGridstackItem,
    'gs-layout': FGridstackLayout,
    'gs-subgrid': FGridstackSubgrid,
  },
  data() {
    return {
      layout: [
        {
          id: 1,
          x: 0,
          y: 0,
          w: 6,
          h: 9,
          children: [
            {
              id: 2,
              x: 3,
              y: 4,
              w: 6,
              h: 4,
              children: [
                {
                  id: 3,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 4,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 5,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 6,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 7,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 8,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 9,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 10,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
          ],
        },
        {
          id: 11,
          x: 0,
          y: 0,
          w: 6,
          h: 9,
          children: [
            {
              id: 12,
              x: 3,
              y: 4,
              w: 6,
              h: 4,
              children: [
                {
                  id: 13,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 14,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 15,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 16,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 17,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 18,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 19,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 20,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
          ],
        },
      ],
      page: {},
    }
  },
  computed: {
    prettyData() {
      return JSON.stringify(this.layout, null, 2)
    },
  },
  created() {
    const storedLayout = JSON.parse(localStorage.getItem('layout'))
    if (storedLayout?.length > 0) {
      this.layout = storedLayout
    }
  },
  mounted() {
    // console.log('App.vue mounted => ', this._uid)
  },
  methods: {
    getSingleColumnSizeForMasterGrid() {
      alert(
        'The single column size of master grid in px is ' +
          this.$refs['gs-master-grid'].getSingleColumnSize() +
          'px'
      )
    },
    getSingleColumnSizeForSubGrid11() {
      alert(
        'The single column size of subgrid 11 in px is ' +
          this.$refs['gs-subgrid-11'].getSingleColumnSize() +
          'px'
      )
    },

    updateHeightOfWidget13() {
      this.$refs['gs-widget-13'].resize({ h: 12 })
    },
    clearStorage() {
      localStorage.setItem('layout', JSON.stringify([]))
    },
    remove(item) {
      const { itemId, gridId } = item
      if (gridId == 'gs-master-grid') {
        this.$refs['gs-master-grid'].removeItem(itemId)
      } else {
        this.$refs[`gs-subgrid-${gridId}`].removeItem(itemId)
      }
    },
    addColumn() {
      this.layout.push({
        id: Date.now() * 1,
        x: 0,
        y: 0,
        w: 5,
        h: 2,
        children: [
          {
            id: Date.now() * 1,
            x: 0,
            y: 0,
            w: 5,
            h: 2,
            children: [{ id: Date.now() * 1, x: 0, y: 0, w: 2, h: 2 }],
          },
        ],
      })
      const layout = this.layout
      this.$set(this.layout, layout)
    },
    addSection() {
      // console.log(subGridId)
    },
    prettifyJson(json) {
      return JSON.stringify(json, null, 2)
    },
  },

  render() {
    return (
      <div class="row">
        <div class="col-8">
          <gs-layout
            ref="gs-master-grid"
            layout={this.layout}
            onLayoutUpdate={(newLayout) => {
              this.layout = newLayout
            }}
            accept={['gs-column']}
            disableOneColumnMode={true}
            cellHeight={50}
            min-row={2}
          >
            {this.layout.map((column) => {
              return (
                <gs-item
                  class="gs-column"
                  id={column.id}
                  x={column.x}
                  y={column.y}
                  w={column.w}
                  h={column.h}
                  noResize={true}
                  noScroll={true}
                >
                  <f-column
                    id={column.id}
                    on-remove={() =>
                      this.remove({
                        gridId: 'gs-master-grid',
                        itemId: column.id,
                      })
                    }
                  >
                    <gs-subgrid
                      items={column.children}
                      accept={['gs-section']}
                      ref={`gs-subgrid-${column.id}`}
                      auto-scale={'onResize'}
                      min-row={2}
                    >
                      {column.children.map((section) => {
                        return (
                          <gs-item
                            class="gs-section"
                            id={section.id}
                            x={section.x}
                            y={section.y}
                            w={section.w}
                            h={section.y}
                            noResize={true}
                            noScroll={true}
                          >
                            <f-section
                              id={section.id}
                              on-remove={() => {
                                this.remove({
                                  gridId: column.id,
                                  itemId: section.id,
                                })
                              }}
                            >
                              <gs-subgrid
                                items={section.children}
                                accept={['gs-widget']}
                                ref={`gs-subgrid-${section.id}`}
                                auto-scale={'onResize'}
                                min-row={2}
                              >
                                {section.children.map((widget) => {
                                  return (
                                    <gs-item
                                      class="gs-widget"
                                      id={widget.id}
                                      w={widget.w}
                                      h={widget.h}
                                      x={widget.x}
                                      y={widget.y}
                                      ref={`gs-widget-${widget.id}`}
                                    >
                                      <f-widget
                                        id={widget.id}
                                        on-remove={() => {
                                          this.remove({
                                            itemId: widget.id,
                                            gridId: section.id,
                                          })
                                        }}
                                      >
                                        <h4> I am widget</h4>
                                      </f-widget>
                                    </gs-item>
                                  )
                                })}
                              </gs-subgrid>
                            </f-section>
                          </gs-item>
                        )
                      })}
                    </gs-subgrid>
                  </f-column>
                </gs-item>
              )
            })}
          </gs-layout>
        </div>
        <div class="col-4">
          <div>
            <button on-click={this.updateHeightOfWidget13}>
              Update height of widget 13
            </button>
          </div>
          <div>
            <button on-click={this.getSingleColumnSizeForMasterGrid}>
              Get single column's size in px for master grid
            </button>
            <button on-click={this.getSingleColumnSizeForSubGrid11}>
              Get single column's size in px for sub grid 11 (column)
            </button>
          </div>
          <div>
            <button on-click={this.clearStorage}>Clear localStorage</button>
            <button on-click={this.addColumn}>Add column</button>
            <div>
              <select></select>
              <button on-click={this.addSection}>Add section</button>
            </div>
          </div>
          <div>
            <pre>{this.prettifyJson(this.layout)}</pre>
          </div>
        </div>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}
.col-8 {
  width: 80%;
}
.col-4 {
  padding-left: 20px;
  width: 20%;
}
</style>

<style lang="scss">
:root {
  font-size: 16px;
}
</style>
<style>
.grid-stack {
  border: 1px solid red;
}
.grid-stack-item {
  border: 1px solid black;
}
</style>
