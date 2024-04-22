import { FDataWidget, FContainer, FIcon } from '../../index.js'

export default {
  title: 'Components/Widgets/DataWidget',
  component: FDataWidget,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    showAvatar: {
      type: 'boolean',
      defaultValue: true,
    },
    showTag: {
      type: 'boolean',
      defaultValue: true,
    },
    showStrip: {
      type: 'boolean',
      defaultValue: true,
    },
    showLeftIcon: {
      type: 'boolean',
      defaultValue: true,
    },
    showRightAction: {
      type: 'boolean',
      defaultValue: true,
    },
    stripColor: {
      options: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'pink',
        'cyan',
        'violet',
        'purple',
        'gray',
      ],
      control: { type: 'radio' },
      defaultValue: 'red',
    },
    type: {
      options: ['top-bottom', 'left-right'],
      control: { type: 'radio' },
      defaultValue: 'left-right',
    },
    column: {
      options: [1, 2],
      control: { type: 'radio' },
      defaultValue: 1,
    },
    title: {
      control: 'text',
      defaultValue:
        'F DSM provides plenty of UI components to enrich your web applications ',
    },
    caption: {
      control: 'text',
      defaultValue:
        'DSM provides plenty of UI components to enrich your web applications',
    },
    subText: {
      control: 'text',
      defaultValue:
        'DSM provides plenty of UI components to enrich your web applications',
    },
    subTextIcon: {
      type: 'object',
      defaultValue: {
        group: 'dsm',
        name: 'warning',
      },
    },
    captionIcon: {
      type: 'object',
      defaultValue: {
        group: 'dsm',
        name: 'warning',
      },
    },
    titleIcon: {
      type: 'object',
      defaultValue: {
        group: 'money-currency',
        name: 'rupee',
      },
    },
    tags: {
      type: 'array',
      defaultValue: [
        {
          text: 'tag label',
          variant: 'simple',
        },
        { text: 'tag3', variant: 'simple' },
      ],
    },
    avatar: {
      type: 'array',
      defaultValue: [{ userName: 'kirsh' }, { userName: 'playboy' }],
    },
    leftAvatarProps: {
      type: 'object',
      defaultValue: { iconname: 'happy-level5-filled', icongroup: 'dsm' },
    },
    record: {
      type: 'array',
      defaultValue: [
        {
          title: 'dsm warning fjnljh kbnddhlj kjbbo',
          description: 'warning fjnljh kbnddhlj kjbbo',
          user: {
            userName: 'kirsh',
          },
        },
        {
          title: 'fsm',
          description: 'warning',
          user: {
            userName: 'kirsh',
          },
        },
        {
          title: 'ksm',
          type: 'tag',
          description: 'warning',
          tag: [
            { appearance: 'simple', text: 'Tag text', statusType: 'success' },
            { appearance: 'status', text: 'Tag2 text', statusType: 'danger' },
          ],
        },
        {
          title: 'psm',
          description: 'warning',
        },
        {
          title: 'title',
          description: 'warning',
        },
        {
          title: 'title',
          description: 'warning',
        },
      ],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FDataWidget, FContainer, FIcon },
  data: () => ({}),
  template: `<FContainer width="400px"><FDataWidget :size="size" :showLeftIcon="showLeftIcon" :leftAvatarProps="leftAvatarProps" :showRightAction="showRightAction" :titleIcon="titleIcon" :captionIcon="captionIcon" :showStrip="showStrip" :stripColor="stripColor" :tags="tags" :column="column" :avatar="avatar" :record="record" :title="title" :showAvatar="showAvatar" :showTag="showTag" :type="type" :caption="caption" :subText="subText" :subTextIcon="subTextIcon">
  <template #rightAction><FIcon group="dsm" name="open-window" size="16"></FIcon></template>
  </FDataWidget></FContainer>`,
})

export const Default = Template.bind({})
