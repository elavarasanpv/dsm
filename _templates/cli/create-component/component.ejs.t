---
to: src/components/<%= h.changeCase.paramCase(component) %>/F<%=h.changeCase.pascalCase(component)%>.vue
---
<script>
export default {
  name:'F<%=h.changeCase.pascalCase(component)%>',
  data() {
    return {
      msg: 'Open F<%= h.changeCase.pascalCase(component) %>.vue file to make changes for your component'
    }
  },
  render(){
    return (<div>{this.msg}</div>)
  },
}
</script>

<style scoped></style>


