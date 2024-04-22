import { FColorSwatch } from '../../index.js'

export default {
  title: 'Components/Inputs/ColorSwatch',
  component: FColorSwatch,
  argTypes: {
    selectedColorName: { control: 'text' },
    hideSet: {
      type: 'array',
      defaultValue: [],
      description:
        'Only three possible values you can provide in the string array that are dark, medium, and light.The given set will be hidden in the UI.',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FColorSwatch },
  methods: {
    selectedColors(hex, palette) {
      console.log(hex, palette)
    },
  },
  template: `<FColorSwatch @selectedColor="selectedColors" :selectedColorName="selectedColorName" :hideSet="hideSet"/>`,
})

export const Default = Template.bind({})
