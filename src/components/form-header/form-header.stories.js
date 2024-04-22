import { FBanner } from '../../index.js'
export default {
  title: 'Components/Display/FBanner',
  component: FBanner,
  argTypes: {
    headerObject: {
      type: 'object',
      defaultValue: {
        title: 'New Control Action',
        description:
          'Configure enhanced control Action for improved detection and response.',
        gradient: 'blue',
        infoWidth: '60%',
        imageWidth: '40%',
      },
    },
    disableFormCloseAction: { type: 'boolean', defaultValue: false },
  },
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FBanner },
  methods: {
    closeForm() {
      console.log('form Closed')
    },
  },
  template: `<FBanner  :disableFormCloseAction="false" :headerObject="headerObject" @closeForm="closeForm"/>`,
})
export const Default = Template.bind({})
