import { FAttachmentSmall } from '../../index.js'

export default {
  title: 'Components/Inputs/AttachmentSmall',
  component: FAttachmentSmall,
  argTypes: {
    value: {
      description:
        'Input v-model, which stores the uploaded file object or an array of file objects depending on type.',
    },
    multiple: { type: 'boolean', defaultValue: false },
    uploadFile: {
      type: 'func',
      description:
        'Async function which will be triggered when file is added. You can make async api calls here, for which loading will be shown until the promise is resolved',
    },
    removeFile: {
      type: 'func',
      description: 'Will be triggered when file is removed.',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FAttachmentSmall },
  data: () => ({
    files: [],
    model: {},
  }),
  methods: {
    async setUploadTimeout(val) {
      console.log(val)
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      return val
    },
    async removeFileHandler(val) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      return val
    },
  },
  template: `<FAttachmentSmall v-model="files" :uploadFile="setUploadTimeout" :multiple="multiple" :removeFile="removeFileHandler" />`,
})

export const Default = Template.bind({})
