import { FPicker } from '../../index.js'

export default {
  title: 'Components/Inputs/Picker',
  component: FPicker,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `  A custom picker component for selecting time, date, etc.

          ### Props

          - \`columnList\`: An array of objects representing columns in the picker.
          
            - **Type:** \`Array<Object>\`
            - **Format:**
              \`\`\`
              [
                {
                  title: 'Column Title',
                  options: [
                    { label: 'Option Label', value: 'Option Value' },
                    { label: '01', value: '1' },
                    // ... more options
                  ]
                },
                // ... more columns
              ]
              \`\`\`
              - \`v-model\`: The selected value in an array.['1']`,
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FPicker },
  data: () => ({
    val: ['4', '3', '0'],
    place: ['4', '3', '0'],
    column: [
      {
        title: 'HH',
        disable: true,
        options: [
          { label: '00', value: '0', disable: true },
          { label: '01', value: '1' },
          { label: '02', value: '2' },
          { label: '03', value: '3' },
          { label: '04', value: '4' },
          { label: '05', value: '5' },
          { label: '06', value: '6' },
          { label: '07', value: '7' },
          { label: '01', value: '8' },
          { label: '02', value: '9' },
          { label: '03', value: '10' },
          { label: '04', value: '11' },
          { label: '05', value: '12' },
          { label: '06', value: '13' },
          { label: '07', value: '14' },
        ],
      },
      {
        title: 'MM',
        options: [
          { label: '00', value: '0' },
          { label: '01', value: '1' },
          { label: '02', value: '2' },
          { label: '03', value: '3' },
          { label: '04', value: '4' },
          { label: '05', value: '5' },
          { label: '06', value: '6' },
          { label: '07', value: '7' },
        ],
      },
      {
        title: 'SS',
        options: [
          { label: 'am', value: '0' },
          { label: 'pm', value: '1' },
        ],
      },
    ],
  }),
  methods: {
    changeHandler(data) {
      console.log(data, this.column)
    },
  },
  template: `<FPicker  v-model="val" :columnList="column" :placeholder='place'  @change="changeHandler"/>`,
})

export const Default = Template.bind({})
