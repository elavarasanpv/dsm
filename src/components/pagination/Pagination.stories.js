import { FPagination } from '../../index.js'

export default {
  title: 'Components/Navigation/Pagination',
  component: FPagination,
  argTypes: {
    pageSize: { control: 'text' },
    total: { control: 'text' },
    pageCount: { control: 'text' },
    disabled: Boolean,
    currentPage: { control: 'text' },
    type: {
      options: ['series', 'simple'],
      control: { type: 'radio' },
      defaultValue: 'simple',
    },
    withoutCount: {
      type: 'boolean',
      defaultValue: false,
    },
    disableNext: {
      type: 'boolean',
      defaultValue: false,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FPagination },
  template: `<FPagination  
  :pageSize="pageSize1"
  :pageCount="pageCount1"
  :disabled='disabled1'
  :currentPage.sync='currentPage1'
   :total="total1"
  :type="type"
  :withoutCount="withoutCount"
  @nextClick='nextClicked'
  :disableNext="disableNext"
  @prevClick='prevClicked'
  @currentChange='currentChanged'></FPagination>`,
  data() {
    return {
      pageSize1: 10,
      pageCount1: 5,
      total1: 1220,
      currentPage1: 2,
      disabled1: false,
    }
  },
  methods: {
    nextClicked(event) {
      console.log('nextClick', event)
    },
    prevClicked(event) {
      console.log('prevClick', event)
    },
    currentChanged(event) {
      console.log('currentChange', event)
    },
  },
})

export const Default = Template.bind({})
