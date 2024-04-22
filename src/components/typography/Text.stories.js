import { FText } from '../../index.js'

export default {
  title: 'Components/Display/Text',
  component: FText,
  argTypes: {
    appearance: {
      options: [
        'headingMed20',
        'headingMed16',
        'headingMed14',
        'bodyReg14',
        'bodyRegUl14',
        'bodyRegSt14',
        'captionMed12',
        'captionReg12',
        'captionMed10',
        'captionReg10',
      ],
      control: { type: 'radio' },
      defaultValue: 'bodyReg14',
    },
    color: { control: 'text', defaultValue: 'backgroundPrimaryPressed' },
    muted: { control: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FText },
  template: `<FText :color="color" hover-color="blue60" :appearance="appearance">Text</FText>`,
})

export const Default = Template.bind({})
