import { FAvatarGroup } from '../../index.js'

export default {
  title: 'Components/Display/AvatarGroup',
  component: FAvatarGroup,
  argTypes: {
    size: {
      options: ['XS', 'S', 'M', 'L', 'XL'],
      control: { type: 'radio' },
      defaultValue: 'M',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FAvatarGroup },
  data: () => ({
    files: [
      { userName: 'kgf' },
      { iconname: 'happy-level5-filled', icongroup: 'dsm' },
      {
        userName: 'John',
        avatarUrl: 'https://www.tutorialkart.com/sample_image_small.jpg',
      },
      { iconname: 'happy-level5-filled', icongroup: 'dsm' },
      { userName: 'Vue' },
      { userName: 'Atlas' },
      { userName: 'React' },
    ],
  }),
  template: `<FAvatarGroup :size="size" :userObject="files"/>`,
})

export const Default = Template.bind({})
