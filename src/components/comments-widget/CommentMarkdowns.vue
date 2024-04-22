<script>
import { FModal, FTable, FContainer, FIcon, ftoast } from '../../index'
export default {
  name: 'MarkdownList',
  components: { FModal, FTable, FContainer, FIcon },
  props: {
    markdownshow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      columns: [
        {
          displayName: 'Element',
          name: 'element',
          id: 1,
          alignment: 'center',
        },
        {
          displayName: 'Syntax',
          name: 'syntax',
          id: 3,
          alignment: 'center',
        },
      ],
      data: [
        {
          key: 'bold',
          element: 'Bold',
          output: '',
          syntax: '**Hi There**',
        },
        {
          key: 'h1',
          element: 'H1',
          output: '',
          syntax: '# Hi There',
        },
        {
          key: 'h2',
          element: 'H2',
          output: '',
          syntax: '## Hi There',
        },
        {
          key: 'italics',
          element: 'Italics',
          output: '',
          syntax: '*Hi There*',
        },
        {
          key: 'strike',
          element: 'Strike',
          output: '',
          syntax: '~~Hi There~~',
        },
        {
          key: 'underline',
          element: 'Underline',
          output: '',
          syntax: '++Hi There++',
        },
        {
          key: 'list',
          element: 'List',
          output: '',
          syntax: '- Hi There',
        },
        {
          key: 'blockquote',
          element: 'Blockquote',
          output: '',
          syntax: '> Hi There',
        },
        {
          key: 'hyperlink',
          element: 'Hyperlink',
          output: '',
          syntax: '[Hi There](URL)',
        },
        {
          key: 'highlight',
          element: 'Highlight',
          output: '',
          syntax: '`Hi There`',
        },
        {
          key: 'hr',
          element: 'Horizontal Line	',
          output: '',
          syntax: '---',
        },
      ],
    }
  },
  methods: {
    async copyLinkName(copy, p) {
      console.log(p)
      await navigator.clipboard.writeText(copy.syntax)
      ftoast.success('Copied to clipboard!')
    },
  },
  render() {
    return (
      <FModal
        title="Markdowns"
        visible={this.markdownshow}
        hideFooter={true}
        size="S"
        vOn:cancel={() => this.$emit('closeMark')}
      >
        <FContainer height="425px" overflow="hidden">
          <FTable
            columns={this.columns}
            data={this.data}
            rounded={false}
            hideBorder={true}
            {...{
              scopedSlots: {
                'cell.action': ({ row, prop }) => (
                  <FContainer style="display: flex" slot="cell.action">
                    <FIcon
                      group="files"
                      name="copy"
                      size="16"
                      vOn:click={() => this.copyLinkName(row, prop)}
                    />
                  </FContainer>
                ),
              },
            }}
          ></FTable>
        </FContainer>
      </FModal>
    )
  },
}
</script>
