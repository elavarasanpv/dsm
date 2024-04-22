import { FSummaryWidget } from '../../index.js'

export default {
  title: 'Components/Widgets/SummaryWidget',
  component: FSummaryWidget,
  argTypes: {
    size: {
      options: ['medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Sample Title',
    },
    recordTitle: {
      control: { type: 'text' },
      defaultValue: 'Smile :-)',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSummaryWidget },
  data: () => ({
    recordDetail: [
      {
        title: 'smile',
        layout: 4,
        record: {
          first_name:
            'It is a long established fact that a reader will be distracted Eeeee',
          age: 'It is a long established fact that a reader will be distracted in it HAHAHA',
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
            { text: 'Tag', statusType: 'success' },
            { appearance: 'status', text: 'Tag1 text', statusType: 'danger' },
            { appearance: 'simple', text: 'Tag2 text', statusType: 'success' },
            { appearance: 'status', text: 'Tag4 text', statusType: 'danger' },
            { appearance: 'accent', text: 'Tag5 text', statusType: 'success' },
          ],
          sampleTag: [
            { appearance: 'simple', text: 'Tag text', statusType: 'success' },
            { appearance: 'status', text: 'Tag1 text', statusType: 'danger' },
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
        fields: [
          { displayName: 'Name', name: 'first_name', span: 2 },
          {
            displayName: 'Age',
            name: 'age',
            type: 'file',
            isClickable: true,
            span: 2,
          },
          { displayName: 'Status', name: 'status', type: 'status', span: 2 },
          { displayName: 'Link', name: 'link', type: 'link', span: 2 },
          { displayName: 'Tags', name: 'tags', type: 'tag', span: 2 },
          {
            displayName: 'IconText',
            name: 'first_name',
            type: 'iconText',
            span: 4,
          },
          { displayName: 'Popover', name: 'popover', type: 'popover', span: 4 },
          { displayName: 'Tags', name: 'sampleTag', type: 'tag', span: 1 },
          {
            displayName: 'Popover1',
            name: 'popover1',
            type: 'popover',
            span: 4,
          },
        ],
      },
      {
        title: 'Chennai',
        layout: 4,
        record: {
          fname:
            'It is a long established fact that a reader will be distracted Eeeee',
          age: 'It is a long established fact that a reader will be distracted in it HAHAHA',
          title: 'Occupation',
          value: 'occupation',
          id: 3,
        },
        fields: [
          { displayName: 'Name', name: 'fname', span: 2 },
          {
            displayName: 'Age',
            name: 'age',
            type: 'file',
            isClickable: true,
            span: 2,
          },
        ],
      },
    ],
  }),
  methods: {
    fieldclicked(ff) {
      console.log(ff, 'story')
    },
  },
  template: `<FSummaryWidget :size="size" :title="title" @onFieldClick="fieldclicked"  :recordDetails="recordDetail"  :layout='layouts'>
  <template #field.tags={record}><div>#record</div></template
  ><template #field.popover.popover={record}>--record--</template>
  <template #field.fname={record}>its my name</template></FSummaryWidget>`,
})

export const Default = Template.bind({})
