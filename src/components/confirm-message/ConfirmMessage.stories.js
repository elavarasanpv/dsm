import { fDialog, FButton } from '../../index.js'

export default {
  title: 'Components/Display/ConfirmMessage',
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FButton },
  methods: {
    async triggerNotification() {
      let val = await fDialog.warning({
        title: 'Processing request!',
        description:
          'Thank you for using our platform. We are currently processing your request. Please wait a moment while we complete this task. If you have any questions or concerns, please contact our support team.',
        saveText: 'Yes',
        cancelText: 'No',
        cancelButtonProp: {
          iconGroup: 'connectivity',
          iconName: 'download',
          iconPosition: 'prefix',
        },
        subInfo: {
          title: 'Label',
          subText: 'Sub info ',
          tags: [
            { text: 'Tag info' },
            { text: 'Tag simple' },
            { text: 'Tag sample' },
            { text: 'Tag sample new' },
          ],
        },
      })
      console.log(val)
    },
  },
  template: `
  <div>
  <FButton @click="triggerNotification">Process Request</FButton>
  </div>
  `,
})
export const Default = Template.bind({})
