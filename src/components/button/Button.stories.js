import { FButton } from '../../index.js'

export default {
  title: 'Components/Inputs/Button',
  component: FButton,
  argTypes: {
    appearance: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'link',
        'primaryInverse',
        'secondaryInverse',
      ],
      control: { type: 'radio' },
      defaultValue: 'primary',
    },
    content: { control: 'text' },
    disabled: { type: 'boolean' },
    split: { type: 'boolean' },
    loading: { type: 'boolean' },
    block: { type: 'boolean' },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    iconButton: {
      table: {
        category: 'icon',
      },
      type: 'boolean',
      default: false,
    },
    selected: {
      type: 'boolean',
      default: false,
    },
    iconPosition: {
      table: {
        category: 'icon',
      },
      options: ['suffix', 'prefix'],
      control: { type: 'radio' },
      defaultValue: 'suffix',
    },
    iconGroup: {
      table: {
        category: 'icon',
      },
      control: { control: 'text' },
      defaultValue: 'connectivity',
    },
    iconName: {
      table: {
        category: 'icon',
      },
      control: { control: 'text' },
      defaultValue: 'download',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FButton },
  methods: {
    onclick(event) {
      console.log(event)
    },
  },
  template: `
  <FButton
  :appearance="appearance"
  :disabled="disabled"
  :loading="loading"
  :block="block"
  :size="size"
  :split="split"
  :selected="selected"
  :iconGroup="iconGroup" :iconName="iconName"
  :iconButton="iconButton"
  :iconPosition="iconPosition"
  @click="onclick"
  >{{content || 'Click Me'}}</FButton
>
  `,
})

export const Default = Template.bind({})
