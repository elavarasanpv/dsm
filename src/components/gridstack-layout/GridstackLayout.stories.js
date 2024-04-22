import Layout from './Layout.vue'

export default {
  title: 'Components/Surfaces/GridstackLayout',
  component: Layout,
  argTypes: {},
}

// <Layout /> is a dummy component and doesn't have any real life use cases, it has been created to
// showcase Gridstack components.
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Layout },
  template: `<Layout />`,
})

export const Default = Template.bind({})
