import TableHeader from '@tiptap/extension-table-header'

export default TableHeader.extend({
  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute('colwidth')
          const value = colwidth ? [parseInt(colwidth, 10)] : null
          return value
        },
        renderHTML: () => {
          return {
            style: `font-weight: 400;`,
          }
        },
      },
    }
  },
  parseHTML() {
    return [{ tag: 'th' }]
  },
})
