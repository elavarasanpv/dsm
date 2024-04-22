import { FSteps } from '../../index.js'

export default {
  title: 'Components/Navigation/Steps',
  component: FSteps,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSteps },
  template: `<FSteps :steps="stepsData" :currentStep="2"/>`,
  data() {
    return {
      stepsData: ['Step1', 'Step2', 'Step3'],
    }
  },
})

export const Default = Template.bind({})
