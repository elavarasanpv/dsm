import {
  FGridstackSubgrid,
  FGridstackItem,
  FGridstackLayout,
} from '../../index.js'

export default {
  title: 'Components/Surfaces/GridstackSubgrid',
  component: FGridstackSubgrid,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    'gs-layout': FGridstackLayout,
    'gs-item': FGridstackItem,
    'gs-subgrid': FGridstackSubgrid,
  },
  template: `<div style="width:1028px;margin:0 auto">
   <gs-layout
      :column="12"
      :minRow="8"
      :layout="gridLayout"
      :cellHeight="4"
      margin="0px"
    >
    <gs-item
     v-for="subgrid in gridLayout"
     :ref="subgrid.id"
      :key="subgrid.id"
      :no-resize="true"
      :no-scroll="true"
      :id="subgrid.id"
      :x="0"
      :y="0"
      :w="12"
      :h="getHeight(subgrid.children)"
      :subGridItems="subgrid.children"
      :minH="40"
    >
    <div>I am section {{subgrid.id}}</div>
      <gs-subgrid
        :key="subgrid.id"
        :column="subgrid.column"
        :items="subgrid.children"
        margin="8px"
        :cellHeight="4"
        :minRow="40"
        :accept="['nested']"
      >
        <gs-item
          v-for="item in subgrid.children"
          :key="item.id"
          class="nested"
          :no-resize="(item.w===3 || item.w===4) ? true:false"
          :no-scroll="true"
          :id="item.id"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :maxW="item.s === 's' || item.s=='xs' ? item.w : 12"
          :minW="(item.s==='s' || item.s==='xs') ? item.w :6"
        >
          <div ref="container" :w="item.w" style="height:100%;width:100%;padding:8px;border:1px solid;border-radius:4px">hello grid {{item.id}}</div>
        </gs-item>
      </gs-subgrid>
      </gs-item>
    </gs-layout>
    </div>`,
  data() {
    return {
      gridLayout: [
        {
          id: 1,
          column: 12,
          children: [
            { x: 0, y: 0, w: 4, h: 31, id: 100, s: 'xs' },
            { x: 4, y: 0, w: 4, h: 31, id: 110, s: 'xs' },
            { x: 8, y: 0, w: 4, h: 31, id: 120, s: 'xs' },
            // { x: 9, y: 0, w: 3, h: 31, id: 13, s: 'xs' },
            { x: 0, y: 31, w: 6, h: 93, id: 122, s: 'm' },
            { x: 6, y: 31, w: 6, h: 93, id: 344, s: 'm' },
          ],
        },
        {
          id: 2,
          column: 12,

          children: [
            { x: 0, y: 0, w: 4, h: 93, id: 200, s: 's' },
            { x: 4, y: 0, w: 4, h: 93, id: 210, s: 's' },
            { x: 8, y: 0, w: 4, h: 93, id: 220, s: 's' },
            { x: 0, y: 93, w: 4, h: 31, id: 10, s: 'xs' },
            { x: 4, y: 93, w: 4, h: 31, id: 11, s: 'xs' },
            { x: 8, y: 93, w: 4, h: 31, id: 12, s: 'xs' },
            // { x: 9, y: 93, w: 3, h: 31, id: 13, s: 'xs' },
            { x: 0, y: 124, w: 8, h: 93, id: 30, s: 'l' },
          ],
        },
        {
          id: 3,
          column: 12,

          children: [
            { x: 0, y: 0, w: 6, h: 93, id: 30 },
            { x: 6, y: 0, w: 6, h: 93, id: 31 },
          ],
        },
        // {
        //   id: 4,
        //   column: 12,
        //   itemClass: 'non-xs',
        //   children: [{ x: 0, y: 0, w: 12, h: 25, id: 40 }],
        // },
      ],
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.resize)
    if (this.$refs['container']) {
      let el = this.$refs['container']
      this.resizeObserver.observe(el)
    }
  },
  methods: {
    resize() {
      console.log('im being resized')
    },
    getHeight(items) {
      return (
        items.reduce((max, item) => {
          const height = item.h + item.y
          return height > max ? height : max
        }, 0) + 16
      )
    },
  },
})

export const Default = Template.bind({})
