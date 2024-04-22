import { FButtonGroup, FButton } from '../../index.js'

export default {
  title: 'Components/Inputs/ButtonGroup',
  component: FButtonGroup,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FButtonGroup, FButton },
  template: `<FButtonGroup :moreOptions="true">
    <template #buttons>
    <FButton appearance="tertiary">
    <fc-icon group="action" name="add-column"></fc-icon>
    </FButton>
      <FButton appearance="secondary">
          Button 1
    </FButton>
      <FButton appearance="primary">
      Button 2
    </FButton>
    </template>
    <template #options>
      <div style="display:flex;flex-direction:column;gap:40px;">
        <span>Click me</span>
         <span>Click me</span>
          <span>Click me</span>
           <span>Click me</span>
            <span>Click me</span>
             <span>Click me</span>
      </div>
    </template>
  </FButtonGroup>
  `,
})

export const Default = Template.bind({})
