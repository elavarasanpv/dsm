import { FButton, ftoast, FContainer } from '../../index'

export default {
  title: 'Components/Display/Toast',
  argTypes: {
    menuType: {
      options: ['toast', 'alerts'],
      control: { type: 'radio' },
      defaultValue: 'toast',
    },
    manualClear: {
      type: 'boolean',
      defaultValue: false,
      description:
        'Enabling this disables timeout, users have to manually clear toasts.',
    },
    timeout: {
      type: 'number',
      description: 'Timeout until toast will be visible.',
      defaultValue: 5000,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FButton, FContainer },
  data: () => ({
    title: "Make sure you know how these changes won't affect your store.",
  }),
  computed: {
    options() {
      return {
        title: 'Notification Title',
        manualClear: this.manualClear,
        menuType: this.menuType,
        timeout: this.timeout,
      }
    },
  },
  methods: {
    successNotification() {
      let { title, options } = this
      let { id, list } = ftoast.success(title, options)
      setTimeout(() => {
        ftoast.destroy(id, list)
      }, 3000)
    },
    dangerNotification() {
      let { title, options } = this
      ftoast.critical(title, options)
    },
    warningNotification() {
      let { title, options } = this
      ftoast.warning(title, options)
    },
    infoNotification() {
      let { title, options } = this
      ftoast.information(title, options)
    },
  },
  template: `
  <FContainer display="flex" gap="containerXxLarge">
  <FButton @click="successNotification">Sucess Toast</FButton>
  <FButton @click="dangerNotification">Danger Toast</FButton>
  <FButton @click="warningNotification">Warning Toast</FButton>
  <FButton @click="infoNotification">Information Toast</FButton>
  </FContainer>
  `,
})

export const Default = Template.bind({})
