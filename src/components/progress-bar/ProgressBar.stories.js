import { FProgressBar, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/ProgressBar',
  component: FProgressBar,
  argTypes: {
    progress: { type: 'number', defaultValue: 0 },
    max: { type: 'number', defaultValue: 100 },
    usage: {
      options: ['uploader', 'alerts', 'toast', 'table'],
      control: { type: 'radio' },
      defaultValue: 'uploader',
    },
    isTimeEnabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FProgressBar, FContainer },
  template: `<FContainer marginLeft="sectionSmall" height="100px" width="300px" display="flex" alignItems="center">
  <FProgressBar :progress="progress" :max="max" :usage="usage" :isTimeEnabled="isTimeEnabled"/>
  </FContainer>`,
})

export const Default = Template.bind({})
