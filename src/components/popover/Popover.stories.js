import {
  FPopover,
  FButton,
  FText,
  FSelect,
  FMenuItem,
  FDropdownMenu,
  FContainer,
} from '../../index.js'

export default {
  title: 'Components/Display/Popover',
  component: FPopover,
  argTypes: {
    title: { type: 'text' },
    trigger: {
      options: ['hover', 'clickToOpen'],
      control: { type: 'radio' },
      defaultValue: 'clickToOpen',
    },
    placement: {
      options: [
        'top',
        'bottom',
        'right',
        'left',
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      control: { type: 'radio' },
      defaultValue: 'bottom',
    },
    containerWidth: { type: 'boolean' },
    showArrow: { type: 'boolean', defaultValue: true },
    disabled: { type: 'boolean' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    FPopover,
    FButton,
    FText,
    FSelect,
    FMenuItem,
    FDropdownMenu,
    FContainer,
  },
  data: () => ({
    visible: false,
    visible2: false,
    optionsArray: [
      { label: 'Choice 1', value: 1 },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
      { label: 'Choice 4', value: 4 },
    ],
  }),
  template: `
  <div
  style="
    padding: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  "
>
  <FPopover
    :trigger="trigger"
    :showArrow="showArrow"
    :placement="placement"
    :title="title"
    :visible="visible2"
    :disable="disabled"
    :containerWidth="containerWidth"
    @visibleChange="(val)=>visible = val"
  >
    <FContainer slot="content" width="200px">
      <FDropdownMenu :menuList="optionsArray" uniqueId="1">
        <FMenuItem
          v-for="tab in optionsArray"
          :value="tab.value"
          :key="tab.value"
          >{{tab.label}}</FMenuItem
        >
      </FDropdownMenu>
    </FContainer>
    <FButton type="primary">Primary Button</FButton>
  </FPopover>
</div>

`,
})

export const Default = Template.bind({})
