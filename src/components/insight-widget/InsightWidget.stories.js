import { FText, FIcon, FInsightWidget, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/InsightWidget',
  component: FInsightWidget,
  argTypes: {
    widgetHeader: { type: 'boolean', defaultValue: true },
    size: {
      options: ['medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'large',
    },
    title: {
      type: 'text',
      defaultValue: 'Table Name',
    },
    description: {
      type: 'text',
      defaultValue: 'Description for the card inside table widget',
    },
    showRightAction: {
      type: 'boolean',
      defaultValue: false,
    },
    showLIcon: {
      type: 'boolean',
      defaultValue: false,
    },
    showInfoIcon: {
      type: 'boolean',
      defaultValue: false,
    },
    tooltipText: {
      type: 'text',
      defaultValue: 'Table info icon',
    },
    showTag: {
      type: 'boolean',
      defaultValue: false,
    },
    showPagination: {
      type: 'boolean',
      defaultValue: false,
    },
    showTab: {
      type: 'boolean',
      defaultValue: false,
    },
    paginationType: {
      options: ['series', 'simple'],
      control: { type: 'radio' },
      defaultValue: 'series',
    },
    dTitle: {
      control: 'text',
      defaultValue:
        'F DSM provides plenty of UI components to enrich your web applications ',
    },
    dCaption: {
      control: 'text',
      defaultValue:
        'DSM provides plenty of UI components to enrich your web applications',
    },
    dSubText: {
      control: 'text',
      defaultValue:
        'DSM provides plenty of UI components to enrich your web applications',
    },
    dSubTextIcon: {
      type: 'object',
      defaultValue: {
        group: 'dsm',
        name: 'warning',
      },
    },
    dCaptionIcon: {
      type: 'object',
      defaultValue: {
        group: 'dsm',
        name: 'warning',
      },
    },
    dTitleIcon: {
      type: 'object',
      defaultValue: {
        group: 'money-currency',
        name: 'rupee',
      },
    },
    dShowLeftIcon: {
      type: 'boolean',
      defaultValue: true,
    },
    dLeftAvatarProps: {
      type: 'object',
      defaultValue: { iconname: 'happy-level5-filled', icongroup: 'dsm' },
    },
    dShowRightAction: {
      type: 'boolean',
      defaultValue: true,
    },
    dAvatar: {
      type: 'array',
      defaultValue: [{ userName: 'kirsh' }, { userName: 'playboy' }],
    },
    dShowTag: {
      type: 'boolean',
      defaultValue: true,
    },
    dShowAvatar: {
      type: 'boolean',
      defaultValue: true,
    },
    dTags: {
      type: 'array',
      defaultValue: [
        {
          text: 'tag label',
          variant: 'simple',
        },
        { text: 'tag3', variant: 'simple' },
      ],
    },
    record: {
      type: 'array',
      defaultValue: [
        {
          title: 'dsm warning fjnljh kbnddhlj kjbbo',
          description: 'warning fjnljh kbnddhlj kjbbo',
          showRightAction: true,
          showMoreDetails: true,
          userObject: [{ userName: 'kirsh' }, { userName: 'playboy' }],
          duration: '4h',
          subTextIcon: {
            group: 'time-date',
            name: 'time',
          },
          rightActionButton: [
            {
              text: 'crear',
              appearance: 'secondary',
              clickAction: 'onRecordClick',
            },
          ],
          user: {
            userName: 'Money',
            shape: 'square',
          },
          showTags: true,
          tags: [
            { appearance: 'simple', text: 'Tag text', statusType: 'success' },
            { appearance: 'status', text: 'Tag2 text', statusType: 'danger' },
          ],
        },
        {
          title: 'fsm',
          description: 'warning',
          user: {
            userName: 'Lohit',
            shape: 'circle',
          },
        },
        {
          title: 'ksm',
          type: 'tag',
          description: 'warning',
          showTags: true,
          tags: [
            { appearance: 'simple', text: 'Tag text', statusType: 'success' },
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
    paginationProps: {
      type: 'object',
      description: `Pass all the pagination props as a object ex: {total: 200,
        type: 'series,
        currentPage: 1,
        pageSize: 10,}`,
      default: {
        total: 200,
        type: 'series',
        currentPage: 1,
        pageSize: 10,
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FInsightWidget, FText, FIcon, FContainer },
  data: () => ({
    selectedListItems: [],
    rightActionButton: [
      { text: 'crear', clickAction: 'onCreate', appearance: 'secondary' },
      {
        iconButton: true,
        iconGroup: 'dsm',
        iconName: 'upload',
        clickAction: 'onUpload',
        appearance: 'secondary',
      },
    ],
    leftIcon: {
      group: 'default',
      name: 'contact',
    },
    tag: [{ text: 'tag label', variant: 'simple' }],
    tabsLists: [
      { label: 'Label-1', value: '1' },
      { label: 'Label-2', value: '2' },
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
    selected: '4',
    actionColumn: '130',
    tableProp: {
      selectType: 'bulk',
      showSelectBar: false,
      actionColumnWidth: '100',
    },
    paginationProp: {
      total: 200,
      type: 'series',
      currentPage: 1,
      pageSize: 10,
    },
  }),
  methods: {
    validate() {
      console.log('button click')
    },
    pageChanged(page) {
      console.log(page, 'page')
    },
    onChange() {
      console.log(this.selected, 'tab changed')
    },
  },
  template: `<FContainer width='600px'><FInsightWidget 
  v-model="selected"
  @onPageChange="pageChanged"
  @onTabChange="onChange"
  :dLeftAvatarProps="dLeftAvatarProps"
  :dShowLeftIcon="dShowLeftIcon"
  :dTitle="dTitle"
  :dAvatar="dAvatar"
  :size='size'
  :dShowAvatar="dShowAvatar"
  :dTags="dTags"
  :record="record"
  :dTitleIcon="dTitleIcon"
  :dShowRightAction="dShowRightAction"
  :dCaption="dCaption"
  :dSubText="dSubText"
  :dShowTag="dShowTag"
  :dSubTextIcon="dSubTextIcon"
  :dCaptionIcon="dCaptionIcon"
  :widgetHeader="widgetHeader"
  :paginationProps="paginationProp"
  :showTab="showTab"
   :showRightAction="showRightAction"
   :actionColumnWidth="actionColumn"
   :showLIcon="showLIcon"
    :tags="tag"
     :tabsList="tabsLists"
   :showInfoIcon="showInfoIcon"
    :showTag="showTag"
   :showPagination="showPagination"
    :tooltipText="tooltipText"
  :rightActionButtonProps="rightActionButton"
   :title="title"
    :description="description"
    :leftIconProps="leftIcon"
  @onCreate="validate">
  <template #rightAction><FIcon group="dsm" name="open-window" size="16"></FIcon></template>
</FInsightWidget></FContainer>`,
})

export const Default = Template.bind({})
