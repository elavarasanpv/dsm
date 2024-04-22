import { FRecordDetails } from '../../index.js'

export default {
  title: 'Components/Display/RecordDetails',
  component: FRecordDetails,
  argTypes: {
    layout: { control: 'text', defaultValue: 4 },
    title: { control: 'text' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FRecordDetails },
  template: `<FRecordDetails :record='data' :fields='fieldList' :title='title' :layout='layout' ><template #field.tags={record}><div>record</div></template
  ><template #field.popover.popover={record}>record</template></FRecordDetails>`,
  data: () => ({
    data: {
      first_name:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,',
      age: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,',
      title: 'Occupation',
      value: 'occupation',
      id: 3,
      link: {
        text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,',
        url: 'https://www.w3schools.com/tags/tag_a.asp',
        target: '_blank',
      },
      status: { mode: false },
      specialText: {
        text: 'specialText',
        disabled: false,
        color: 'red',
        fontWeight: 'bold',
      },
      tags: [
        { appearance: 'default', text: 'Tag text', statusType: 'success' },
        { appearance: 'status', text: 'Tag text', statusType: 'danger' },
        { appearance: 'default', text: 'Tag text', statusType: 'success' },
        { appearance: 'status', text: 'Tag text', statusType: 'danger' },
        { appearance: 'default', text: 'Tag text', statusType: 'success' },
        { appearance: 'status', text: 'Tag text', statusType: 'danger' },
        { appearance: 'default', text: 'Tag text', statusType: 'success' },
        { appearance: 'status', text: 'Tag text', statusType: 'danger' },
      ],
      sampleTag: [
        { appearance: 'default', text: 'Tag text', statusType: 'success' },
        { appearance: 'status', text: 'Tag text', statusType: 'danger' },
      ],

      user: { url: 'https://picsum.photos/id/17/200/300', name: 'Dhoni' },
      popover: {
        text: 'hover me to open',
        // content: 'I am fine :)',
        placement: 'bottom',
      },
      popover1: {
        text: 'hover me to open1',
        content: 'I am fine :)1',
        placement: 'bottom',
      },
    },
    fieldList: [
      { displayName: 'Name', name: 'first_name', span: 2 },
      {
        displayName: 'Age',
        name: 'age',
        type: 'file',
        isClickable: true,
        span: 2,
      },
      { displayName: 'Status', name: 'status', type: 'status', span: 2 },
      { displayName: 'Link', name: 'link', type: 'link', span: 1 },
      { displayName: 'Tags', name: 'tags', type: 'tag', span: 2 },
      {
        displayName: 'IconText',
        name: 'first_name',
        type: 'iconText',
        span: 4,
      },
      { displayName: 'Popover', name: 'popover', type: 'popover', span: 4 },
      { displayName: 'Tags', name: 'sampleTag', type: 'tag', span: 1 },
      { displayName: 'Popover1', name: 'popover1', type: 'popover', span: 4 },
    ],
  }),
})

export const Default = Template.bind({})
