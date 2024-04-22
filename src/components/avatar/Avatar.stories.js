import { FAvatar } from '../../index.js'

export default {
  title: 'Components/Display/Avatar',
  component: FAvatar,
  argTypes: {
    size: {
      options: ['XS', 'S', 'M', 'L', 'XL'],
      control: { type: 'radio' },
      defaultValue: 'M',
    },
    shape: {
      options: ['circle', 'square'],
      control: { type: 'radio' },
      defaultValue: 'circle',
    },
    clickable: { type: 'boolean' },
    avatarUrl: { control: 'text' },
    userName: { control: 'text' },
    bgColor: { control: 'text' },
    userStatus: {
      options: ['nil', 'unavailable', 'online', 'offline'],
      control: { type: 'radio' },
      defaultValue: 'nil',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FAvatar },
  methods: {
    clicked() {
      console.log('clicked')
    },
  },
  template: `<FAvatar :size=size :avatarUrl=avatarUrl :clickable='clickable'  :userName=userName :bgColor="bgColor" @onClick="clicked" :userStatus=userStatus :shape="shape"></FAvatar>`,
})

export const Default = Template.bind({})
