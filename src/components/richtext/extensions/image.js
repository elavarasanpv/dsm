import Image from '@tiptap/extension-image'

export default Image.extend({
  addOptions() {
    return {
      inline: false,
      allowBase64: true,
      HTMLAttributes: {},
    }
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      style: {
        default: null,
      },
    }
  },
})
