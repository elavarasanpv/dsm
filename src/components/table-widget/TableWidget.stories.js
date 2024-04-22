import { FTableWidget, FText, FIcon } from '../../index.js'

export default {
  title: 'Components/Widgets/TableWidget',
  component: FTableWidget,
  argTypes: {
    selectType: {
      options: ['bulk', 'single', ''],
      control: { type: 'radio' },
      defaultValue: '',
    },
    showSelectBar: { type: 'boolean', defaultValue: false },
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
    tableProps: {
      type: 'object',
      description: 'Pass all the table props as a object',
      default: {
        selectType: 'bulk',
        showSelectBar: false,
        actionColumnWidth: '100',
      },
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
  components: { FTableWidget, FText, FIcon },
  data: () => ({
    column: [
      {
        displayName: 'Name',
        name: 'first_name',
        id: 1,
        fixed: true,
      },
      {
        displayName: 'Age',
        name: 'age',
        id: 2,
        resize: true,
        width: 200,
      },
      {
        displayName: 'Occupation',
        name: 'occupation',
        id: 3,
        width: 250,
        clickable: true,
      },
      {
        displayName: 'Hobbies',
        name: 'hobby',
        id: 4,
        type: 'status',
        width: 270,
        alignment: 'right',
      },
      {
        displayName: 'Link',
        name: 'mainfield',
        id: 5,
        type: 'mainfield',
      },
      {
        displayName: 'Tag',
        name: 'tag',
        id: 6,
        type: 'tag',
        collapsedTag: true,
      },
    ],
    datas: [
      {
        id: 1,
        first_name: 'John Doe',
        age: 30,
        occupation:
          'Software Engineer At Facilio adasdasdas asdasdasda asdasdasdasd asdasdasdas asdasdasd',
        hobby: ['Sports', 'Science'],
        status: { mode: false },
        mainfield: {
          text: 'facilio main field test',
          url: 'https://app.facilio.com',
        },
        link: {
          text: 'Facilio App asdasd asdasd asdasdsad ',
          url: 'https://app.facilio.com',
        },
        tag: [
          {
            text: 'Multi Select fdklfdjaklfh',
          },
          {
            text: 'Multi Select 2',
          },
          { text: 'Multi Select 3' },
          { text: 'Multi Select 4' },
          { text: 'Multi Select 5' },
        ],
      },
      {
        id: 2,
        first_name: 'Jane Smith',
        age: 25,
        occupation: 'Data Scientist',
        hobby: ['Music', 'Learning'],
        status: { mode: true },
      },
      {
        id: 3,
        first_name: 'Bob Johnson',
        age: 40,
        occupation: 'Web Developer',
        hobby: ['Football', 'Teaching'],
        status: { mode: false },
        // checkBoxdisable: true,
      },
      {
        id: 4,
        first_name: 'Bobboy',
        age: 90,
        occupation: '',
        hobby: ['Football', 'Teaching'],
        status: { mode: true },
      },
      {
        id: 5,
        first_name: 'chinnu',
        age: 70,
        occupation: 'DevOps',
        hobby: ['Football', 'Teaching'],
        status: { mode: false },
      },
      {
        id: 6,
        first_name: 'chinnu',
        age: 70,
        occupation: 'DevOps',
        hobby: ['Football', 'Teaching'],
        status: { mode: false },
      },
      {
        id: 7,
        first_name: 'chinnu',
        age: 70,
        occupation: 'DevOps',
        hobby: ['Football', 'Teaching'],
        status: { mode: false },
      },
    ],
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
  template: `<FTableWidget :columns="column"
  v-model="selected"
  @onPageChange="pageChanged"
  @onTabChange="onChange"
  :tableProps="tableProp"
  :paginationProps="paginationProp"
  :showTab="showTab"
   :showRightAction="showRightAction"
   :actionColumnWidth="actionColumn"
   :showLIcon="showLIcon"
    :tags="tag"
     :tabsList="tabsLists"
  :data="datas"
   :showInfoIcon="showInfoIcon"
    :showTag="showTag"
   :showPagination="showPagination"
    :tooltipText="tooltipText"
  :rightActionButtonProps="rightActionButton"
  :selectType="selectType"
   :title="title"
    :description="description"
    :leftIconProps="leftIcon"
  @onCreate="validate">
  <template #header.age="{ header }">
  <div>#{{ header.displayName }}</div>
</template>
<template #cell.first_name="{ row, prop }"><FText>#-{{ row[prop] }}</FText></template>
    <template #cell.occupation="{ row, prop }"><FText>#-{{ row[prop] }}</FText></template>
    <template #cell.action>
      <div style="display: flex">
        <FIcon group="default" name="edit" size="16" />
        <FIcon group="default" name="trash-can" size="16" />
      </div> </template>
</FTableWidget>`,
})

export const Default = Template.bind({})
