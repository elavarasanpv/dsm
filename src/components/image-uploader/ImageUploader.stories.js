import { FImageUploader, FContainer } from '../../index.js'

export default {
  title: 'Components/Inputs/ImageUploader',
  component: FImageUploader,
  argTypes: {
    value: {
      description:
        'Input v-model, which stores the uploaded file object or an array of file objects depending on type.',
    },
    uploadFile: {
      type: 'func',
      description:
        'Async function which will be triggered when file is added. You can make async api calls here, for which loading will be shown until the promise is resolved',
    },
    removeFile: {
      type: 'func',
      description: 'Will be triggered when file is removed.',
    },
    maxCount: {
      type: 'number',
      defaultValue: 5,
    },
    emptyCard: {
      type: 'boolean',
      defaultValue: true,
    },
    title: {
      type: String,
      default: 'Photos',
      description:
        'If a title is not required, you can provide an empty string as the title prop.',
    },
    description: {
      type: String,
      default: 'Supported Formats - JPEG, PNG',
      description:
        'If a description is not required, you can provide an empty string as the description prop.',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FImageUploader, FContainer },
  data: () => ({
    files: [
      {
        // uid: 'vc-upload-1695301662278-2',
        id: 'vc-upload-1695301662278-2',
        lastModified: 1687769347797,
        lastModifiedDate:
          '[native Date Mon Jun 26 2023 14:19:07 GMT+0530 (India Standard Time)]',
        name: 'Screenshot 2023-06-26 at 2.19.02 PM.png',
        size: 545754,
        type: 'image/png',
        percent: 0,
        originFileObj: '[object File]',
        url: 'https://www.tutorialkart.com/sample_image_small.jpg',
      },
      {
        uid: 'vc-upload-1695301662278-5',
        lastModified: 1688382333516,
        lastModifiedDate:
          '[native Date Mon Jul 03 2023 16:35:33 GMT+0530 (India Standard Time)]',
        name: 'Screenshot 2023-07-03 at 4.33.44 PM.png',
        size: 508634,
        type: 'image/png',
        percent: 0,
        originFileObj: '[object File]',
        url: 'https://picsum.photos/id/237/200/300',
      },
    ],
    // files: [],
    model: {},
    images: [
      'https://www.tutorialkart.com/sample_image_small.jpg',
      'https://picsum.photos/id/237/200/300',
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/200/300?grayscale',
      'https://loremflickr.com/320/240',
    ],
    count: -1,
  }),
  methods: {
    async setUploadTimeout(val) {
      console.log(val)
      this.count = this.count + 1
      if (this.count == 5) {
        this.count = 0
      }
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      let k = val.map((e, index) => {
        return {
          ...e,
          url: this.images[index],
        }
      })
      return k
    },
    async removeFileHandler(val) {
      console.log('hey')
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      return val
    },
    downloadFile(file) {
      console.log(file)
    },
    onMoreClick(file) {
      console.log(file)
    },
    imageClick(file) {
      console.log(file)
    },
  },
  template: `<FImageUploader  v-model="files" :uploadFile="setUploadTimeout" :emptyCard="emptyCard" :maxCount="maxCount" :title="title" :description="description" :removeFile="removeFileHandler" @onFileDownload="downloadFile"
     @onViewMoreClick="onMoreClick" @onImageClick="imageClick"/>`,
})

export const Default = Template.bind({})
