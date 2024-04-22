import { FAccordionSelect } from '../../index.js'

export default {
  title: 'Components/Inputs/AccordionSelect',
  component: FAccordionSelect,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FAccordionSelect },
  template: `<FAccordionSelect :loading="true"   v-model="val" :options="optionsArray" />`,
  data() {
    return {
      val: 1212922,
      optionsArray: [
        {
          label: 'Choice 1',
          value: 1,
          children: [
            { label: 'alpha', value: 111 },
            { label: 'delta', value: 121 },
          ],
        },
        {
          label: 'Choice 2',
          value: 2,
          children: [
            { label: 'gamma', value: 122221 },
            { label: 'sigma', value: 121222 },
          ],
        },
        {
          label: 'Choice 3',
          value: 3,
          children: [
            { label: 'theta', value: 1222291 },
            { label: 'beta', value: 1212229 },
          ],
        },
        {
          label: 'Choice 4',
          value: 4,
          children: [
            { label: 'tau', value: 1222021 },
            { label: 'lambda', value: 1201222 },
          ],
        },
        {
          label: 'Choice 5',
          value: 5,
          children: [
            { label: 'omicron', value: 1722221 },
            { label: 'iota', value: 1217222 },
          ],
        },
        {
          label: 'Choice 6',
          value: 6,
          children: [
            { label: 'psi', value: 1282221 },
            { label: 'upsilon', value: 1218222 },
          ],
        },
        {
          label: 'Choice 7',
          value: 7,
          children: [
            { label: 'eta', value: 1229221 },
            { label: 'kappa', value: 1212922 },
          ],
        },
      ],
    }
  },
})

export const Default = Template.bind({})
