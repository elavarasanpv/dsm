import { FCascadeSelect } from '../../index.js'

export default {
  title: 'Components/Inputs/CascadeSelect',
  component: FCascadeSelect,
  argTypes: {},
}

//<fc-icon group="action" name="check-in"></fc-icon>
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FCascadeSelect },
  data() {
    return {
      abc: [
        {
          label: 'A',
          value: 'A',
          st: 'Hi',
          // iconGroup: 'action',
          // iconName: 'check-in',
          // iconPosition: 'prefix',
        },
        {
          label: 'B',
          value: 'b',
          st: 'Hello',
          children: [
            { label: 'C', value: 'c', st: 'u are' },
            { label: 'D', value: 'd', st: 'GR' },
          ],
        },
        {
          label: 'B',
          value: '3',
          st: 'Hello',
          children: [
            { label: 'C1', value: '4', st: 'u are' },
            { label: 'D1', value: '5', st: 'GR' },
          ],
        },
      ],
      placeholder1: 'Please Select',
      fieldNames1: {
        label: 'label',
        value: 'value',
        children: 'children',
      },
      selectedOptions: null,
    }
  },
  template: `
  <FCascadeSelect  
  v-model="selectedOptions"
  :options="abc" 
  :placeholder="placeholder1"
  :fieldNames="fieldNames1"
  filterable
  clearable
  />`,
})

export const Default = Template.bind({})
