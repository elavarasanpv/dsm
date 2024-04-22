import { Extension } from '@tiptap/core'
import { AllSelection, TextSelection } from 'prosemirror-state'

const applyIndent =
  (direction) =>
  () =>
  ({ tr, state, dispatch }) => {
    const { selection } = state
    tr = tr.setSelection(selection)
    tr = updateIndentLevel(tr, direction)

    if (tr.docChanged) {
      dispatch?.(tr)
      return true
    }

    return false
  }

const updateIndentLevel = (tr, delta) => {
  const { doc, selection } = tr

  if (
    doc &&
    selection &&
    (selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    const { from, to } = selection
    doc.nodesBetween(from, to, (node, pos) => {
      if (options.types.includes(node.type.name)) {
        tr = setNodeIndentMarkup(tr, pos, delta)
        return false
      }

      return true
    })
  }

  return tr
}

const setNodeIndentMarkup = (tr, pos, delta) => {
  const node = tr?.doc?.nodeAt(pos)

  if (node) {
    const nextLevel = (node.attrs.indent || 0) + delta
    const { minLevel, maxLevel } = options
    const indent =
      nextLevel < minLevel
        ? minLevel
        : nextLevel > maxLevel
        ? maxLevel
        : nextLevel

    if (indent !== node.attrs.indent) {
      const { indent: oldIndent, ...currentAttrs } = node.attrs
      const nodeAttrs =
        indent > minLevel ? { ...currentAttrs, indent } : currentAttrs
      return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
    }
  }
  return tr
}

const options = {
  types: ['listItem', 'paragraph'],
  minLevel: 0,
  maxLevel: 8,
}

const Indent = Extension.create({
  name: 'indent',

  defaultOptions: options,

  addGlobalAttributes() {
    return [
      {
        types: options.types,
        attributes: {
          indent: {
            renderHTML: (attributes) => {
              return attributes?.indent > options.minLevel
                ? {
                    'data-indent': attributes.indent,
                    class: 'indentMore',
                    style: `margin-left: ${attributes.indent * 40}px`,
                  }
                : null
            },
            parseHTML: (element) => {
              const level = Number(element.getAttribute('data-indent'))
              return level && level > options.minLevel ? level : null
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent: applyIndent(1),
      outdent: applyIndent(-1),
    }
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.indent()
      },
      'Shift-Tab': () => {
        return this.editor.commands.outdent()
      },
    }
  },
})

export default Indent
