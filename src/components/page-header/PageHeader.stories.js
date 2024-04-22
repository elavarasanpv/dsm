import { FPageHeader, FButton, FContainer, FText } from '../../index.js'

export default {
  title: 'Components/Display/PageHeader',
  component: FPageHeader,
  argTypes: {
    description: {
      control: 'text',
      defaultValue:
        'This description can be longer enough to explain the pages need ',
    },
    heading: {
      control: 'text',
      defaultValue: 'Client/Statics',
    },
    captionText: {
      control: 'text',
      defaultValue: '#1691',
    },
    showAvatar: { type: 'boolean', defaultValue: true },
    avatarClickable: { type: 'boolean', defaultValue: false },
    withTabs: { type: 'boolean', defaultValue: false },
    showNotification: { type: 'boolean', defaultValue: true },
    showActionBar: { type: 'boolean', defaultValue: true },
    showButtonPanel: { type: 'boolean', defaultValue: true },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FPageHeader, FButton, FContainer, FText },
  methods: {
    handleCancel() {
      console.log('close notification')
      this.showNotification = false
    },
    avatarClicked() {
      console.log('avatar clicked')
    },
  },
  template: `
      <FPageHeader
      :breadCrumbProps="breadCrumbProp"
      :heading="heading"
      :captionText="captionText"
      :description="description"
      :showAvatar="showAvatar"
      :avatarClickable="avatarClickable"
      :tagProps="tagObj"
      :headingIcon="headingIco"
      :withTabs="withTabs"
      :showNotification="showNotification"
      :notificationDetails="notificationDetail"
      :showActionBar="showActionBar"
      :showButtonPanel="showButtonPanel"
      avatarUrl='https://www.tutorialkart.com/sample_image_small.jpg'
      @closeNotification="handleCancel"
      @onAvatarClick="avatarClicked"
    >
         <template #header-actions>
        <fc-icon group="user" name="user" size="12"></fc-icon>
      </template>   
      <template #tag-prefix>
        <fc-icon group="user" name="user" size="12"></fc-icon>
      </template>
      <template #buttons>
      <FContainer gap="containerXLarge" display="flex">
        <FButton appearance="tertiary" iconGroup="action" iconName="add-column" :iconButton="true">
        </FButton>
        <FButton appearance="secondary">Button 1</FButton>
        <FButton appearance="primary">Button 2</FButton>
        </FContainer>
      </template>
      <template #notificationButton> 
      <FContainer display="flex" gap="containerLarge" padding="containerNone containerLarge"><FButton appearance="secondaryInverse" size="small">Approve</FButton>
      <FButton appearance="secondaryInverse"  iconGroup="action" iconName="cross" :iconButton="true" iconPosition="prefix">Reject</FButton></FContainer>
      </template>
      <template #actionBar><FContainer gap="containerXLarge" display="flex">
      <FText>Test</FText>
      <FButton appearance="secondary">Button 1</FButton>
      <FButton appearance="primary">Button 2</FButton>
      </FContainer>
      </template>
      <template #buttonPanel>
      <FButton appearance="secondary">Button 1</FButton>
      <FButton appearance="primary">Button 2</FButton>
      <FButton appearance="secondary">Button 3</FButton>
      <FButton appearance="primary">Button 4</FButton>
      <FButton appearance="secondary">Button 5</FButton>
      <FButton appearance="primary">Button 6</FButton>
      <FButton appearance="secondary">Button 7</FButton>
      <FButton appearance="primary">Button 8</FButton>
      <FButton appearance="secondary">Button 9</FButton>
      <FButton appearance="primary">Button 10</FButton>
      <FButton appearance="secondary">Button 11</FButton>
      <FButton appearance="primary">Button 12</FButton>
      <FButton appearance="secondary">Button 13</FButton>
      <FButton appearance="primary">Button 14</FButton>
      <FButton appearance="primary">Button 15</FButton>
      </template>
    </FPageHeader>
  `,
  data() {
    return {
      tagObj: {
        text: 'tag label',
        variant: 'simple',
      },
      headingIco: {
        group: 'default',
        name: 'space',
        text: 'Decommisioned',
      },
      pathData: [
        {
          name: 'Breadcrumb 1',
        },
        {
          name: 'Breadcrumb 2',
        },
      ],
      notificationDetail: {
        title: 'Notification Title',
        description:
          'Replace component documentation, to display and visually represent tags or labels in web or mobile applications',
        hideCloseIcon: false,
      },
      notifiy: true,
    }
  },
  computed: {
    breadCrumbProp() {
      let { pathData } = this || {}
      return { path: pathData }
    },
  },
})

export const Default = Template.bind({})
