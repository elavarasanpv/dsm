import { FBreadcrumb } from '../../index.js'

export default {
  title: 'Components/Navigation/Breadcrumb',
  component: FBreadcrumb,
  argTypes: {
    appearance: {
      options: ['back', 'default'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FBreadcrumb },
  template: `<div>
   <FBreadcrumb :path="pathData" :appearance="appearance" @click="onClick"/>
  </div>
  `,
  data() {
    return {
      pathData: [
        {
          name: 'BreadCrumb 1',
          route: { path: '/' },
        },
        {
          name: 'BreadCrumb 2',
          route: { path: 'app/at/asset/viewmanager' },
        },
        {
          name: 'BreadCrumb 3',
          route: { path: 'app/at/asset/viewmanager' },
          disabled: true,
        },
      ],
    }
  },
  methods: {
    onClick(val) {
      console.log(val)
    },
  },
})

export const Default = Template.bind({})
