import { FTable, FIcon, FButton, FContainer, FText } from '../../index.js'

export default {
  title: 'Components/Display/Table',
  component: FTable,
  argTypes: {
    selectType: {
      options: ['bulk', 'single'],
      control: { type: 'radio' },
      defaultValue: 'bulk',
    },
    striped: { type: 'boolean' },
    readOnly: { type: 'boolean' },
    hideBorder: { type: 'boolean', defaultValue: false },
    showSelect: { type: 'boolean', defaultValue: true },
    rounded: { type: 'boolean', defaultValue: true },
    tableType: {
      options: ['compact', 'default'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTable, FIcon, FButton, FContainer, FText },
  data: () => ({
    column: [
      {
        displayName: 'Name',
        name: 'first_name',
        id: 1,
        fixed: true,
        alignment: 'center',
        resize: true,
      },
      {
        displayName: 'Age',
        name: 'age',
        id: 2,
        resize: true,
        width: 200,
      },
      {
        displayName: 'Occupation asdasdas asdasd asdasdasdasd',
        name: 'occupation',
        id: 3,
        width: 150,
        resize: true,
        clickable: true,
      },
      {
        displayName: 'Hobbies',
        name: 'hobby',
        id: 4,
        type: 'status',
        width: 270,
        resize: true,
        alignment: 'right',
      },
      {
        displayName: 'Link',
        name: 'mainfield',
        id: 5,
        resize: true,
        type: 'mainfield',
      },
      {
        displayName: 'Tag',
        name: 'tag',
        id: 6,
        type: 'tag',
        resize: true,
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
        occupation: '123456789012345678901234',
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
  }),
  methods: {
    redirect(data) {
      let { e } = data
      console.log('redirect', data)
      e.preventDefault()
    },

    handleSelection(a) {
      console.log(a)
    },
    validate() {
      let { datas, column } = this || {}
      this.datas = [
        ...datas,
        {
          id: 919,
          first_name: 'kiran',
          age: 70,
          occupation: 'DevOps',
          hobby: ['Football', 'Teaching'],
          status: { mode: false },
        },
      ]
      this.column = [
        ...column,
        {
          displayName: 'Hobbies',
          name: 'hobby',
          id: 4,
          type: 'status',
          width: 270,
        },
      ]
      setTimeout(() => {
        this.datas[0].first_name = 'samples'
        this.column[1].resize = true
      }, 1)
    },
    cellClicked(data) {
      console.log(data)
    },
    rowMouseOverHandler() {
      console.log('mouse over')
    },
    OnColumnResize(data) {
      console.log(data, 'data')
    },
  },
  template: `
  <div style="display: flex">
  
  <div style="width: 800px;height: 350px">
  <FTable
    :columns="column"
    :data="datas"
    :selectType="selectType"
    :striped="striped"
    :readOnly="readOnly"
    :hideBorder="hideBorder"
    :showSelectBar="showSelect"
    :rounded="rounded"
    :selectedList="selectedListItems"
    :tableType="tableType"
    @recordSelected="handleSelection"
    @onCellClick="cellClicked"
    @rowMouseOver="rowMouseOverHandler"
    @OnColumnResize="OnColumnResize"
  >
    <template #cell.first_name="{ row, prop }"><FText>#{{ row[prop] }}</FText></template>
    <template #cell.age="{ row, prop }"><FText>#{{ row[prop] }}</FText></template>
    <template #header.age="{ header }">
      <div>{{ header.displayName }}</div>
    </template>
    <template #float-bar>
    <FContainer gap="containerLarge" display="flex">
      <FButton appearance="secondary">Delete</FButton>
      <FButton appearance="secondary">Update</FButton>
      </FContainer>
    </template>
    <template #cell.action>
      <div style="display: flex">
        <FIcon group="default" name="edit" size="12" />
        <FIcon group="default" name="trash-can" size="12" />
      </div> </template
  >
  </FTable>
  </div>
  <FButton @click="validate">Click Me</FButton>
</div>
  `,
})

export const Default = Template.bind({})
