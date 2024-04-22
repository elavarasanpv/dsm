---
to: src/index.js
inject: true
append: true
---
// F<%= h.changeCase.pascalCase(component) %>
export { default as F<%= h.changeCase.pascalCase(component) %> } from './components/<%= h.changeCase.paramCase(component) %>/F<%= h.changeCase.pascalCase(component) %>.vue'
export * from './components/<%= h.changeCase.paramCase(component) %>/F<%= h.changeCase.pascalCase(component) %>.vue'