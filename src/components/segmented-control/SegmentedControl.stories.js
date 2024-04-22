import { FSegmentedControl } from '../../index.js'

export default {
  title: 'Components/Navigation/SegmentedControl',
  component: FSegmentedControl,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSegmentedControl },
  data: () => ({
    val: '1',
    tabsLists: [
      { label: 'Label-1', value: '1' },
      { label: 'Label-2', value: '2' },
      { label: 'Label-3', value: '3' },
      { label: 'Label-4', value: '4' },
    ],
  }),
  template: `<FSegmentedControl v-model="val" :tabsList="tabsLists">
  <template #tab.2="prop">#{{ prop.label }}</template>
  </FSegmentedControl>`,
})

const CustomTabTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSegmentedControl },
  data: () => ({
    val: 'info',
    tabsLists: [
      {
        label: 'Guides',
        value: 'guides',
      },
      { label: 'Info', value: 'info' },
    ],
  }),
  methods: {
    renderIcon(iconName) {
      return `<fc-icon size="16" group="action" name="${iconName}"></fc-icon>`
    },
  },
  template: `<FSegmentedControl v-model="val" :tabsList="tabsLists">
    <template #tab.guides="tab">
      <div style="display:flex;align-items:center;"><span style="line-height:10px;padding-right:4px;" v-html="renderIcon(tab.value)"/> <span>{{tab.label}}</span></div>
    </template>
    <template #tab.info="tab">
      <div style="display:flex;align-items:center;"><span style="line-height:10px;padding-right:4px;" v-html="renderIcon(tab.value)"/> <span>{{tab.label}}</span></div>
    </template>
  </FSegmentedControl>`,
})

export const Default = Template.bind({})
export const WithIconButton = CustomTabTemplate.bind({})
