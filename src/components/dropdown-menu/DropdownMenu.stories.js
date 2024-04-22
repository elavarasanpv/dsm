import { FDropdownMenu, FMenuItem, FContainer, FButton } from '../../index.js'

export default {
  title: 'Components/Navigation/DropdownMenu',
  component: FDropdownMenu,
  argTypes: {
    selectType: {
      options: ['bulk', 'single', ''],
      control: { type: 'radio' },
      defaultValue: 'bulk',
    },
    uniqueId: {
      description:
        'UniqueId is for differentating one component from another , so provide a different uniqueId value which no one have used such name in our app, it might be of any type string,number etc',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDropdownMenu, FMenuItem, FContainer, FButton },
  data: () => ({
    menuLists: [
      { label: 'Label-1', value: '1' },
      { label: 'Label-2', value: '2' },
      {
        label: 'Lab',
        value: '3',
        iconGroup: 'communication',
        iconName: 'mail',
      },
      { label: 'Label-4', value: '4' },
    ],
    selectedValues: [{ label: 'Label-4', value: '4' }],
    menuLists1: [
      { label: 'Label1', value: '1' },
      { label: 'Label2', value: '2' },
      {
        label: 'Lab3',
        value: '3',
        iconGroup: 'communication',
        iconName: 'mail',
      },
      { label: 'Label4', value: '4' },
    ],
    selectedValues1: [{ label: 'Label4', value: '4' }],
  }),
  methods: {
    recordSelected(a) {
      console.log(a)
    },
    applyClick() {
      this.selectedValues = [
        {
          label: 'Lab',
          value: '3',
          iconGroup: 'communication',
          iconName: 'mail',
        },
      ]
    },
  },
  template: `
  <FContainer>
  <FDropdownMenu
  :menuList="menuLists"
  :selectType="selectType"
  width="400px"
  :selectedValue="selectedValues"
  @change="recordSelected"
  uniqueId="1"
>
  <FMenuItem v-for="tab in menuLists" :value="tab.value" :key="tab.value"
    >{{tab.label}}</FMenuItem
  >
  <FContainer display="flex" justifyContent="flex-end" margin="containerLarge containerNone"><FButton @click="applyClick">Apply</FButton></FContainer>
</FDropdownMenu>
<FDropdownMenu
  :menuList="menuLists1"
  :selectType="selectType"
  width="400px"
  :selectedValue="selectedValues1"
  uniqueId="2"
>
  <FMenuItem v-for="tab in menuLists1" :value="tab.value" :key="tab.value"
    >{{tab.label}}</FMenuItem
  >
</FDropdownMenu>
</FContainer>
  `,
})

export const Default = Template.bind({})
