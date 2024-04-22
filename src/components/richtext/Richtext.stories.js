import { FRichtext, FContainer } from '../../index.js'

export default {
  title: 'Components/Inputs/Richtext',
  component: FRichtext,
  argTypes: {
    hideBorder: {
      type: 'boolean',
      defaultValue: false,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FRichtext, FContainer },
  data: () => ({
    html: '<p>Test</p>',
    tool: [],
  }),
  methods: {
    async setUploadTimeout(val) {
      console.log(val)
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      let k = 'https://www.tutorialkart.com/sample_image_small.jpg'
      return k
    },
  },
  template: `<FContainer height="400px" width="600px"><FRichtext v-model="html" :customToolOrder="tool" :hideBorder="hideBorder" :uploadFile="setUploadTimeout"/></FContainer>`,
})

export const Default = Template.bind({})
