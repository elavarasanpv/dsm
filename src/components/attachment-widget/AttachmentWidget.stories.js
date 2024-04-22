import { FAttachmentWidget, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/AttachmentWidget',
  component: FAttachmentWidget,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FAttachmentWidget, FContainer },
  data: () => ({
    files: [
      {
        uid: 'vc-upload-1704275443782-2',
        lastModified: 1680182134877,
        lastModifiedDate:
          '[native Date Thu Mar 30 2023 18:45:34 GMT+0530 (India Standard Time)]',
        name: 'brian-stalter-luaa13lUwuk-unsplash.jpg',
        size: 12401369,
        type: 'image/jpeg',
        percent: 0,
        originFileObj: '[object File]',
        uploadedTime: 1704451476925,
        uploadedBy: 'elavarasan',
      },
      {
        uid: 'vc-upload-1704275443782-4',
        lastModified: 1699520453879,
        lastModifiedDate:
          '[native Date Thu Nov 09 2023 14:30:53 GMT+0530 (India Standard Time)]',
        name: "Bijju's Resume .pdf",
        size: 60349,
        type: 'application/pdf',
        percent: 0,
        originFileObj: '[object File]',
        uploadedTime: 1704451476925,
        uploadedBy: 'abhishekmishra',
      },
    ],
    model: {},
  }),
  methods: {
    async setUploadTimeout(val) {
      console.log(val, 'created')
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 4000)
      })
      let p = val.map((v) => ({
        ...v,
        id: `${v.name}1234`,
        uploadedTime: new Date().getTime(),
        uploadedBy: 'gopikiran',
      }))
      return p
    },
    async removeFileHandler(val) {
      console.log(val, 'deleted')
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      return val
    },
  },
  template: `<FContainer width="540px"><FAttachmentWidget v-model="files" :uploadFile="setUploadTimeout"  :removeFile="removeFileHandler"/></FContainer>`,
})

export const Default = Template.bind({})
