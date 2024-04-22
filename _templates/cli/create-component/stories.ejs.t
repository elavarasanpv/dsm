---
to: src/components/<%= h.changeCase.paramCase(component) %>/<%=h.changeCase.pascalCase(component)%>.stories.js
---
import  {F<%=h.changeCase.pascalCase(component)%>}  from '../../index.js'

export default {
  title: 'Components/<%=h.changeCase.pascalCase(component)%>',
  component: F<%=h.changeCase.pascalCase(component)%>,
  argTypes: { },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { F<%=h.changeCase.pascalCase(component)%> },
  template: `<F<%=h.changeCase.pascalCase(component)%> />`,
})

export const Default = Template.bind({})




