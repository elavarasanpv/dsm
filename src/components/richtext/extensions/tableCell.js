import TableCell from '@tiptap/extension-table-cell'

export default TableCell.extend({
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
    return [{ tag: 'td' }]
  },
})
