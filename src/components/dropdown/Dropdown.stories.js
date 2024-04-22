import { FDropdown } from '../../index.js'

export default {
  title: 'Components/Navigation/Dropdown',
  component: FDropdown,
  argTypes: {
    name: { control: 'text', defaultValue: 'Dropdown List' },
    split: { type: 'boolean', defaultValue: true },
    loading: { type: 'boolean', defaultValue: false },
    contentWidth: { control: 'text', defaultValue: '200px' },
    selectable: { type: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDropdown },
  data: () => ({
    optionsArray: [
      { label: 'Choice 1', value: 1 },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
      { label: 'Choice 4', value: 4 },
      { label: 'Choice 5', value: 5 },
      { label: 'Choice 6', value: 6 },
      { label: 'Choice 7', value: 7 },
      { label: 'Choice 8', value: 8 },
    ],
  }),
  computed: {
    buttonPropsObj() {
      return {
        appearance: 'primary',
      }
    },
  },
  methods: {
    handleDropdown(option) {
      console.log(option)
    },
    handleClick() {
      console.log('clicked')
    },
  },
  template: `
  <FDropdown
    :loading="loading"
    :buttonProps="buttonPropsObj"
    :name="name"
    :options="optionsArray"
    :split="split"
    :contentWidth="contentWidth"
    :selectable="selectable"
    @dropdown="handleDropdown"
    @click="handleClick"
  >
  
  </FDropdown>
  `,
})

const CustomDropdownTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDropdown },
  data: () => ({
    optionsArray: [
      { label: 'Choice 1', value: 1 },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
    ],
  }),
  computed: {
    buttonPropsObj() {
      return {
        appearance: 'primary',
      }
    },
  },
  methods: {
    handleDropdown(option) {
      console.log(option)
    },
    handleClick() {
      console.log('clicked')
    },
  },
  template: `
    <FDropdown
      :loading="loading"
      :buttonProps="buttonPropsObj"
      :name="name"
      :options="optionsArray"
      :split="split"
      :contentWidth="contentWidth"
      @dropdown="handleDropdown"
      @click="handleClick"
      maxHeight="200px"
    >
    <template v-for="option in optionsArray" #[\`menu.\${option.value}\`]="option">
      <span>
        <svg width="12" height="12">
          <rect width="12" height="12" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
        </svg>
        <span>{{ option.label }} </span>
      </span>
    </template>
    </FDropdown>
  `,
})

export const Default = Template.bind({})

export const DropdownTemplate = CustomDropdownTemplate.bind({})
