import { FPopoverDetails } from '../../index.js'

export default {
  title: 'Components/Display/PopoverDetails',
  component: FPopoverDetails,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FPopoverDetails },
  template: `<FPopoverDetails :columns="column" :fields="datas" :headerText="headerTexts" :recordId="recordIds" :tag="tags" :mainField="mainFields" :avatar="avatars" :canShowRedirect="canShowRedirects"></FPopoverDetails>`,
  data: () => ({
    datas: {
      first_name: 'Water Tank',
      age: 'Enabled',
      link: '01:06 PM, 09/06/2023',
      status: '01:06 PM, 09/06/2023',
      specialText: {
        text: 'specialText',
        disabled: false,
        color: 'textDescription',
        fontWeight: '',
      },
    },
    column: [
      { displayName: 'Category', name: 'first_name', type: 'specialText' },
      { displayName: 'Type', name: 'age', type: 'specialText' },
      { displayName: 'Created Time', name: 'status', type: 'specialText' },
      { displayName: 'Modified Time', name: 'link', type: 'specialText' },
    ],
    headerTexts: 'Glimpse',
    recordIds: 1295845,
    mainFields: {
      name: 'Category',
      value: 'Water Tank',
    },
    tags: {
      displayName: 'Active',
      type: 'success',
    },
    avatars: {
      avatarUrl: '/api/v2/files/download/56749671',
      name: 'Spider man',
    },
    canShowRedirects: true,
  }),
})

export const Default = Template.bind({})
