import { FTableCell } from '../../index.js'

export default {
  title: 'Components/Display/TableCell',
  component: FTableCell,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTableCell },
  argTypes: {
    content: { type: 'mainfield' },
  },
  data: () => ({
    datas: {
      first_name: 'chinnu',
      age: 70,
      title: 'Occupation',
      value: 'occupation',
      id: 3,
      mainfield: {
        text: 'facilio',
      },
      link: { text: 'Facilio App', url: 'https://app.facilio.com' },
      status: { mode: false },
      specialText: {
        disabled: false,
        color: 'textSemanticRed',
        appearance: 'headingMed16',
      },
      tags: [
        { appearance: 'default', text: 'Tag text', statusType: 'success' },
        { appearance: 'status', text: 'Tag text', statusType: 'danger' },
      ],
      user: { url: 'https://picsum.photos/id/17/200/300', name: 'Dhoni' },
      popover: { text: 'hover me to open', content: 'I am fine :)' },
    },
    column: { displayName: 'Name', name: 'mainfield', id: 1, fixed: true },
    types: 'mainfield',
  }),
  template: `<FTableCell :type="types" :data="datas" :header="column"><template #cell.first_name.popover="{ record }">{{ record.age }}</template
  ></FTableCell>`,
})

export const Default = Template.bind({})
