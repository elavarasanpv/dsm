import { FPhoto } from '../../index.js'

export default {
  title: 'Components/Inputs/Photo',
  component: FPhoto,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FPhoto },
  data: () => ({
    val: '',
  }),
  methods: {
    async uploadFile(value) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      console.log(value)
    },
  },
  template: `<FPhoto v-model="val" :uploadPhoto="uploadFile" />`,
})

export const Default = Template.bind({})
