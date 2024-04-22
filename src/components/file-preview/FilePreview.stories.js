import { FFilePreview } from '../../index.js'

export default {
  title: 'Components/Display/FilePreview',
  component: FFilePreview,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FFilePreview },
  data: () => ({
    preview: {
      uid: 'vc-upload-1695480217089-6',
      lastModified: 1694841282693,
      lastModifiedDate:
        '[native Date Sat Sep 16 2023 10:44:42 GMT+0530 (India Standard Time)]',
      name: 'Screenshot 2023-09-16 at 10.44.37 AM.png',
      size: 538817,
      contentType: 'image/png',
      percent: 0,
      originFileObj: '[object File]',
      url: 'https://picsum.photos/seed/picsum/1200/1000',
    },
    filesList: [
      {
        uid: 'vc-upload-1695301662278-2',
        lastModified: 1687769347797,
        lastModifiedDate:
          '[native Date Mon Jun 26 2023 14:19:07 GMT+0530 (India Standard Time)]',
        name: 'Screenshot 2023-06-26 at 2.19.02 PM.png',
        size: 545754,
        contentType: 'image/png',
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
        contentType: 'image/png',
        percent: 0,
        originFileObj: '[object File]',
        url: 'https://picsum.photos/id/237/200/300',
      },
      {
        uid: 'vc-upload-1695480217089-2',
        lastModified: 1680182134877,
        lastModifiedDate:
          '[native Date Thu Mar 30 2023 18:45:34 GMT+0530 (India Standard Time)]',
        name: 'brian-stalter-luaa13lUwuk-unsplash.jpg',
        size: 12401369,
        contentType: 'image/jpeg',
        percent: 0,
        originFileObj: '[object File]',
        url: 'https://www.tutorialkart.com/sample_image_small.jpg',
      },
      {
        uid: 'vc-upload-1695480217089-4',
        lastModified: 1694843127039,
        lastModifiedDate:
          '[native Date Sat Sep 16 2023 11:15:27 GMT+0530 (India Standard Time)]',
        name: 'Screenshot 2023-09-16 at 11.15.21 AM.png',
        size: 225464,
        contentType: 'image/png',
        percent: 0,
        originFileObj: '[object File]',
        url: 'https://picsum.photos/id/237/200/300',
      },
      {
        uid: 'vc-upload-1695480217089-6',
        lastModified: 1694841282693,
        lastModifiedDate:
          '[native Date Sat Sep 16 2023 10:44:42 GMT+0530 (India Standard Time)]',
        name: 'Screenshot 2023-09-16 at 10.44.37 AM.png',
        size: 538817,
        contentType: 'image/png',
        percent: 0,
        originFileObj: '[object File]',
        url: 'https://picsum.photos/seed/picsum/200/300',
      },
      {
        uid: 'vc-upload-1695480217089-8',
        lastModified: 1694841282693,
        lastModifiedDate:
          '[native Date Sat Sep 16 2023 10:44:42 GMT+0530 (India Standard Time)]',
        name: 'ScreenRecord 2023-09-16 at 10.44.37 AM.mp4',
        size: 538817,
        contentType: 'video/mp4',
        percent: 0,
        originFileObj: '[object File]',
        url: 'http://techslides.com/demos/sample-videos/small.mp4',
      },
      {
        uid: 'vc-upload-1695480217089-9',
        lastModified: 1694841282693,
        lastModifiedDate:
          '[native Date Sat Sep 16 2023 10:44:42 GMT+0530 (India Standard Time)]',
        name: 'DollyPoppy 2023-09-16.mp4',
        size: 538817,
        contentType: 'video/mp4',
        percent: 0,
        originFileObj: '[object File]',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      },
    ],
    showPreview: true,
  }),
  methods: {
    handleClick(file) {
      console.log('clicked', file)
    },
    onclose() {
      console.log('clicked')
      this.showPreview = false
    },
  },
  template: `<FFilePreview :files="filesList" :openPreview="showPreview"  :previewFile="preview" @close="onclose" @onFileDownload="handleClick"/>`,
})

export const Default = Template.bind({})
