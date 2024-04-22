import { FModal, FButton, FText, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/Modal',
  component: FModal,
  argTypes: {
    cancelText: { control: 'text' },
    saveText: { control: 'text' },
    size: {
      options: ['XS', 'S', 'M', 'L', 'XL'],
      control: { type: 'radio' },
      defaultValue: 'M',
    },
    hideFooter: { type: 'boolean' },
    hideHeader: { type: 'boolean' },
    isCentered: { type: 'boolean', defaultValue: false },
    type: {
      options: ['info', 'warning', 'danger', 'default'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
    maskClosable: { type: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FModal, FButton, FText, FContainer },
  data() {
    return {
      ModalText: 'Content of the modal',
      visiblity: false,
      loading: false,
      pathData: [
        {
          name: 'Breadcrumb 1',
        },
        {
          name: 'Breadcrumb 2',
        },
      ],
    }
  },
  methods: {
    showModal() {
      this.visiblity = true
    },
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds'
      this.loading = true
      setTimeout(() => {
        this.visiblity = false
        this.loading = false
      }, 2000)
    },
    handleCancel() {
      console.log('Clicked cancel button')
      this.visiblity = false
    },
    handlePath(val) {
      console.log(val)
    },
  },
  template: `
  <div>
    <FButton type="primary" @click="showModal">
      Open Modal
    </FButton>
    <FModal
      title="Title"
      :visible="visiblity"
      :isCentered="isCentered"
      :confirmLoading="loading"
      :cancelText="cancelText"
      :saveText="saveText"
      :size="size"
      :hideFooter="hideFooter"
      :breadCrumbProps="{path:pathData}"
      :type="type"
      @ok="handleOk"
      @cancel="handleCancel"
      @path="handlePath"
      padding="containerNone"
      
    >
    <FContainer 
    padding="containerXLarge sectionSmall" height="200px">
      <FText>{{ ModalText }}</FText>
      </FContainer>
 
    </FModal>
  </div>
  `,
})

export const Default = Template.bind({})
