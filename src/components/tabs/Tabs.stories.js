import { FTabs, FTabPane, FIcon, FButton, FContainer } from '../../index.js'
export default {
  title: 'Components/Navigation/Tabs',
  component: { FTabs, FTabPane, FIcon, FButton },
  argTypes: {
    selectType: {
      options: ['link', 'button'],
      control: { type: 'radio' },
      defaultValue: 'link',
    },
    count: { control: 'number' },
    lazy: {
      type: 'boolean',
      defaultValue: false,
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTabs, FTabPane, FIcon, FButton, FContainer },
  data: () => ({
    loading: false,
    val: '1',
    tabsLists: [
      { label: 'Label-1', value: '1' },
      { label: 'Label-2', value: '2', disabled: true },
      {
        label: 'Lab',
        value: '3',
        iconGroup: 'communication',
        iconName: 'mail',
        path: '/www.w3schools.com',
      },
      { label: 'Label-4', value: '4' },
      { value: '5', iconGroup: 'communication', iconName: 'mail' },
    ],
  }),
  methods: {
    changeHandler() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        console.log('change')
      }, 1000)
    },
    handleClick() {
      this.tabsLists = [
        { label: 'Label-1', value: '1' },
        { label: 'Label-2', value: '2', disabled: true },
        {
          label: 'Lab',
          value: '3',
          iconGroup: 'communication',
          iconName: 'mail',
          path: 'news/javascript-void-keyword-explained/',
        },
      ]
    },
  },
  template: `
  <div>
  <FTabs
  v-model="val"
  :tabsList="tabsLists"
  :appearance="selectType"
  @change="changeHandler"
  :lazy="lazy"
  :size="size"
>
  <FTabPane v-for="tab in tabsLists" :activeKey="tab.value" :key="tab.value">
  <FContainer height="300px">
    <div v-if="loading">Loading</div>
    <div v-else>{{tab.label}}</div>
    </FContainer>
  </FTabPane>
</FTabs>
<FButton @click="handleClick">Remove Tab</FButton>
</div>

  `,
})

export const Default = Template.bind({})
