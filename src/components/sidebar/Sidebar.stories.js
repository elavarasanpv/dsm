import { FSidebar, FAccordion, FText } from '../../index.js'

export default {
  title: 'Components/Navigation/Sidebar',
  component: FSidebar,
  argTypes: {
    sidebarWidth: { type: 'number', defaultValue: 200 },
    toggleText: { type: 'text', defaultValue: 'Sidebar' },
    title: { type: 'text', defaultValue: 'Sidebar' },
    defaultOpen: { type: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSidebar, FAccordion, FText },
  template: `
  <div style="height:90vh;width:100%">
  <FSidebar :sidebarWidth="sidebarWidth" :toggleText="toggleText" :title="title" :defaultOpen="defaultOpen">
    <template #sidebar>
     <FText>Sidebar</FText>
    </template>
    <template #title>
    <FText>new obtion</FText>
   </template>
    <template #content>
     <FText>Content</FText>
    </template>
  </FSidebar>
  </div>`,
})

export const Default = Template.bind({})
