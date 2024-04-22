<script>
import styled from 'vue-emotion'
import { isEmpty, isFunction } from '../../../utils/validation'
import { FText, FIcon, FTags, FContainer, FTooltip } from '../../../index.js'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'
fcIcon(window)
export default {
  name: 'Card',
  components: { FText, FIcon, FTags },
  props: {
    getStyle: {
      type: Function,
      default: () => {},
    },
    card: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    showTooltip: false,
    showTimelineTooltip: false,
    showHeaderTooltip: false,
    resizeObserver: null,
  }),
  mounted() {
    this.resizeObserver = new ResizeObserver(this.resize)
    if (this.$refs['value']) {
      let el = this.$refs['value'].$el
      this.resizeObserver.observe(el)
    }
    if (this.$refs['timeline']) {
      let el = this.$refs['timeline'].$el
      this.resizeObserver.observe(el)
    }
    if (this.$refs['header']) {
      let el = this.$refs['header'].$el
      this.resizeObserver.observe(el)
    }
  },
  methods: {
    resize() {
      if (this.$refs['value']) {
        if (
          this.$refs['value'].$el.scrollWidth >
          this.$refs['value'].$el.clientWidth
        ) {
          this.showTooltip = true
        } else {
          this.showTooltip = false
        }
      }
      if (this.$refs['timeline']) {
        if (
          this.$refs['timeline'].$el.scrollWidth >
          this.$refs['timeline'].$el.clientWidth
        ) {
          this.showTimelineTooltip = true
        } else {
          this.showTimelineTooltip = false
        }
      }
      if (this.$refs['header']) {
        if (
          this.$refs['header'].$el.scrollWidth >
          this.$refs['header'].$el.clientWidth
        ) {
          this.showHeaderTooltip = true
        } else {
          this.showHeaderTooltip = false
        }
      }
    },
    getCardStyle(card) {
      let { styles, timeline, baseline, unit } = card || {}
      if (!isEmpty(styles)) {
        let { backgroundColor } = styles
        if (backgroundColor !== '#FFF')
          return {
            background: backgroundColor,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'var(--spacing-containerMedium)',
            padding:
              'var(--spacing-containerNone) var(--spacing-containerMedium)',
            height: !isEmpty(baseline)
              ? '23px'
              : !isEmpty(timeline)
              ? '32px'
              : '54px',
            gap: !isEmpty(unit)
              ? 'var(--spacing-containerMedium)'
              : 'var(--spacing-containerNone)',
          }
        return {}
      }
      return {
        gap: !isEmpty(unit)
          ? 'var(--spacing-containerMedium)'
          : 'var(--spacing-containerNone)',
      }
    },
    getBlinkClass(card) {
      let { styles } = card || {}
      if (!isEmpty(styles)) {
        let { blink } = styles
        if (blink) return 'card-blink'
        else return ''
      }
      return ''
    },
    getHeight(card) {
      let { timeline } = card
      if (!isEmpty(timeline)) {
        return '32px'
      } else {
        return '58px'
      }
    },
    slot(type) {
      let { $scopedSlots } = this
      let { [type]: component } = $scopedSlots || {}

      if (isFunction(component) && type === 'reading-card-icon') {
        const CardIcon = styled('div')`
          ${this.getStyle('cardIcon')}
        `
        if (!isEmpty(component()))
          return <CardIcon>{component && component()}</CardIcon>
        return ''
      }
    },
  },
  render() {
    return (
      <FContainer ref="card" flex="1" overflow="hidden" maxWidth="100%">
        <FContainer display="flex" flexDirection="column">
          <FContainer height="24px" display="flex" alignItems="center">
            <FContainer
              height="16px"
              alignItems="center"
              display="flex"
              width="70%"
            >
              <FTooltip placement="top">
                {this.showHeaderTooltip && (
                  <template slot="title">{this.card.heading}</template>
                )}
                <FText
                  color="textCaption"
                  appearance="captionReg12"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  ref="header"
                  cursor="default"
                >
                  {this.card.heading}
                </FText>
              </FTooltip>
            </FContainer>
          </FContainer>

          {!isEmpty(this.card.baseline) && (
            <FContainer display="flex" flexDirection="column">
              <FContainer
                display="flex"
                justifyContent="space-between"
                alignItems="normal"
                height="36px"
                gap="containerMedium"
              >
                <FContainer
                  overflow="hidden"
                  cursor="pointer"
                  height="36px"
                  display="flex"
                  alignItems="center"
                  gap="containerSmall"
                  flexGrow="1"
                  vOn:click={() => this.$emit('drilldown')}
                >
                  <FContainer
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                  >
                    <FContainer
                      display="flex"
                      alignItems="baseline"
                      style={this.getCardStyle(this.card)}
                      class={this.getBlinkClass(this.card)}
                    >
                      <FContainer
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        ref="value"
                        order={this.card.isLeft ? '1' : '0'}
                      >
                        <FTooltip placement="top">
                          {this.showTooltip && (
                            <template slot="title">
                              {this.card.reading}
                            </template>
                          )}

                          <FText color="textMain" appearance="headingMed16">
                            {this.card.reading}
                          </FText>
                        </FTooltip>
                      </FContainer>
                      <FText
                        color="textMain"
                        appearance={
                          this.card.isLeft ? 'headingMed16' : 'captionReg12'
                        }
                        order={this.card.isLeft ? '0' : '1'}
                      >
                        {this.card.unit}
                      </FText>
                    </FContainer>

                    <FTooltip>
                      {this.showTimelineTooltip && (
                        <template slot="title">
                          <FText appearance="captionReg12">
                            {this.card.timeline}
                          </FText>
                        </template>
                      )}
                      <FText
                        ref="timeline"
                        appearance="captionMedII10"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {this.card.timeline}
                      </FText>
                    </FTooltip>
                  </FContainer>
                </FContainer>
                {!isEmpty(this.card.baseline.percentage) && (
                  <FTags
                    appearance="accent"
                    text={this.card.baseline.percentage}
                    accentColor={
                      this.card.baseline.status === 'success' ? 'green' : 'red'
                    }
                    {...{
                      scopedSlots: {
                        prefix: () => {
                          return (
                            <fc-icon
                              group="navigation"
                              color={
                                this.card.baseline.status === 'success'
                                  ? '#49b83f'
                                  : '#870000'
                              }
                              name={
                                Number(this.card?.unformattedValue) >
                                Number(this.card.baseline?.unformattedValue)
                                  ? 'up-triangle-filled'
                                  : 'down-triangle-filled'
                              }
                              size="12"
                            ></fc-icon>
                          )
                        },
                      },
                    }}
                  />
                )}
              </FContainer>
              <FContainer
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="24px"
              >
                <FText color="textCaption" appearance="captionReg12">
                  {this.card.baseline.period}
                </FText>
                <FText color="textMain" appearance="captionMed12">
                  {this.card.baseline.value}
                </FText>
              </FContainer>
            </FContainer>
          )}
          {isEmpty(this.card.baseline) && (
            <FContainer
              display="flex"
              flexDirection="column"
              gap="containerSmall"
              marginTop="containerSmall"
            >
              <FContainer
                height={this.getHeight(this.card)}
                alignItems="center"
                borderRadius="medium"
                cursor="pointer"
                vOn:click={() => this.$emit('drilldown')}
                display="flex"
              >
                <FContainer
                  display="flex"
                  alignItems="baseline"
                  style={this.getCardStyle(this.card)}
                  overflow="hidden"
                  class={this.getBlinkClass(this.card)}
                  flexShrink="1"
                >
                  <FContainer
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    ref="value"
                    order={this.card.isLeft ? '1' : '0'}
                  >
                    <FTooltip placement="top">
                      {this.showTooltip && (
                        <template slot="title">{this.card.reading}</template>
                      )}
                      <FText
                        color="textMain"
                        appearance={
                          this.card.timeline ? 'headingMed20' : 'headingMed32'
                        }
                      >
                        {this.card.reading}
                      </FText>
                    </FTooltip>
                  </FContainer>
                  {!isEmpty(this.card.unit) ? (
                    <FText
                      color="textMain"
                      appearance={
                        this.card.isLeft ? 'headingMed16' : 'headingMed14'
                      }
                      order={this.card.isLeft ? '0' : '1'}
                    >
                      {this.card.unit}
                    </FText>
                  ) : (
                    <FText
                      color="textMain"
                      appearance="headingMed20"
                      order={this.card.isLeft ? '0' : '1'}
                    >
                      {this.card.unit}
                    </FText>
                  )}
                </FContainer>
              </FContainer>
              {!isEmpty(this.card.timeline) && (
                <FContainer display="flex" alignItems="center" height="24px">
                  <FContainer height="16px" display="flex" alignItems="center">
                    <FText color="textCaption" appearance="captionReg12">
                      {this.card.timeline}
                    </FText>
                  </FContainer>
                </FContainer>
              )}
            </FContainer>
          )}
        </FContainer>
      </FContainer>
    )
  },
}
</script>

<style lang="scss" scoped>
.card-blink {
  animation: blinker 1.5s linear infinite;
  &:hover {
    animation: step-end;
    background: #fff !important;
  }
}
@keyframes blinker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
