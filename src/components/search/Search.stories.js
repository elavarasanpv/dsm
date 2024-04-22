import { FSearch, FContainer } from '../../index.js'

export default {
  title: 'Components/Inputs/Search',
  component: FSearch,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'large',
    },
    placeholder: { type: 'text', defaultValue: 'Search...' },
    disabled: { type: 'boolean', defaultValue: false },
    width: { type: 'text', defaultValue: '250' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSearch, FContainer },
  methods: {
    onchange(val) {
      console.log(val, 'changes')
    },
  },
  template: `<FContainer display="flex" width="300px" margin="sectionLarge"
  ><FSearch @change="onchange" :size="size" :disabled="disabled" :width="width" :placeholder="placeholder"/></FContainer>`,
})

export const Default = Template.bind({})
