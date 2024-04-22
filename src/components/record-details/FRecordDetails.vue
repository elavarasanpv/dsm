<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { FContainer, FTableCell, FText, FTags } from '../../index'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FRecordDetails',
  components: { FTableCell, FTags, FContainer, FText },
  mixins: [ThemeMixin],
  props: {
    record: {
      type: Object,
    },
    fields: {
      type: Array,
    },
    layout: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    fieldEvent(field) {
      let { type } = field || {}
      this.$emit('onFieldClick', field)
      if (type === 'file') {
        this.$emit('fileDownload')
      } else if (type === 'lookup') {
        this.$emit('lookupRedirect')
      }
    },
    getSlot(obj) {
      let { $scopedSlots, record } = this || {}
      let currSlot
      Object.keys($scopedSlots).forEach((key) => {
        let slotList = (key || '').split('.')
        if (!isEmpty(slotList)) {
          let [type, headerName, action] = slotList || []
          if (headerName == obj.name) {
            currSlot = $scopedSlots[key]
          }
        }
      })
      if (!isEmpty(currSlot)) {
        return currSlot({ record })
      }
    },
    getCells(ele) {
      let { $scopedSlots, record } = this
      let currSlot
      let slotName
      const Div = styled(FContainer)``
      const Text = styled(FText)``
      const Clickable = styled(FContainer)`
        ${ele.isClickable && this.getStyle('clickable')}
      `
      Object.keys($scopedSlots).forEach((key) => {
        let slotList = (key || '').split('.')
        if (!isEmpty(slotList)) {
          let [type, headerName, action] = slotList || []
          if (type === 'field' && headerName === ele.name) {
            if (isEmpty(action)) currSlot = $scopedSlots[key]
            if (action === 'popover') slotName = `cell.${ele.name}.popover`
          }
        }
      })
      return (
        <Div
          width="100%"
          display="flex"
          flexDirection="column"
          gap="containerMedium"
        >
          <Text appearance="captionMed12" color="textMain">
            {ele.displayName}
          </Text>
          <Clickable
            color="textDescription"
            vOn:click={() => ele.isClickable && this.fieldEvent(ele)}
          >
            {!isEmpty(this.getSlot(ele)) && !isEmpty(slotName) ? (
              <FTableCell
                type={ele.type}
                data={record}
                header={ele}
                {...{
                  scopedSlots: {
                    [slotName]: () => this.getSlot(ele),
                  },
                }}
              ></FTableCell>
            ) : !isEmpty(currSlot) ? (
              currSlot({ record })
            ) : (
              <FTableCell
                type={ele.type}
                data={record}
                header={ele}
              ></FTableCell>
            )}
          </Clickable>
        </Div>
      )
    },
    getTitle() {
      let { title } = this
      const Tags = styled(FTags)``
      return (
        <FContainer>
          <Tags text={title}></Tags>
        </FContainer>
      )
    },
  },
  render() {
    let { fields = [], title, layout } = this

    const Grid = styled(FContainer)`
      ${this.getStyle('gridStyle')}
    `

    return (
      <FContainer
        float="none"
        marginBottom="containerMedium"
        display="flex"
        flexDirection="column"
        gap="containerXxLarge"
      >
        {title && this.getTitle()}
        <Grid gap="containerXxLarge">
          {fields.map((ele) => {
            let widthFr = (10 / (layout / ele.span)) * 10
            const Div = styled('div')`
              ${this.getStyle('rowStyle')}
              ${`width : ${widthFr - 3}%`}
            `
            return <Div>{this.getCells(ele)}</Div>
          })}
        </Grid>
      </FContainer>
    )
  },
}
</script>

<style scoped></style>
