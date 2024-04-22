<script>
import { FButton, FContainer, FIcon, FText, FAvatar } from '../../index'
import { Modal } from 'ant-design-vue'
import 'ant-design-vue/lib/modal/style/index.css'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { isFunction, isEmpty } from '../../utils/validation'
import { v4 as uuid } from 'uuid'
import Vue from 'vue'
import { FBreadcrumb } from '../../index'
Vue.use(Modal)

const SIZE = {
  XS: {
    maxHeight: '100px',
    width: '420px',
  },
  S: {
    maxHeight: '432px',
    width: '520px',
  },
  M: {
    maxHeight: '432px',
    width: '800px',
  },
  L: {
    maxHeight: '564px',
    width: '1028px',
  },
  XL: {
    maxHeight: '564px',
    width: '1280px',
  },
}
const ICON = {
  info: {
    name: 'circle-warning',
    color: 'backgroundPrimaryDefault',
  },
  warning: {
    name: 'triangle-warning',
    color: 'backgroundSemanticOrangeMedium',
  },
  danger: {
    name: 'critical',
    color: 'backgroundSemanticRedLight',
  },
  success: {
    name: 'circle-tick-filled',
    color: 'backgroundSemanticGreenMedium',
  },
}

export default {
  name: 'FModal',
  mixins: [ThemeMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    saveText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
    hideSave: {
      type: Boolean,
      default: false,
    },
    cancelButtonProp: {
      type: Object,
      default: () => ({}),
    },
    saveButtonProp: {
      type: Object,
      default: () => ({}),
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'M',
      validator: (value) => {
        return ['XS', 'S', 'M', 'L', 'XL'].includes(value)
      },
    },
    type: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['info', 'warning', 'danger', 'default', 'success'].includes(
          value
        )
      },
    },
    breadCrumbProps: {
      type: Object,
      default: () => ({}),
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    isCentered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: null,
      modalHeight: '50%',
    }
  },
  computed: {
    sizeObj() {
      let { size = 'M' } = this || {}
      return SIZE[size]
    },
    iconStyle() {
      let { type = 'default' } = this || {}
      return ICON[type]
    },
  },
  watch: {
    visible(value) {
      if (value) {
        document.dispatchEvent(
          new CustomEvent('dsm.modal.open', { detail: { modalId: this.id } })
        )
        this.$nextTick(() => {
          let modalBody = document.querySelector('.ant-modal')
          if (!isEmpty(modalBody)) {
            let { clientHeight: height } = modalBody || {}
            if (height > 1) {
              this.modalHeight = `${50 - (6 - Math.round(height / 100))}%`
              console.log('height', height)
              if (height >= 600) {
                this.modalHeight = '50%'
              }
            }
          }
        })
      } else {
        document.dispatchEvent(
          new CustomEvent('dsm.modal.close', { detail: { modalId: this.id } })
        )
      }
    },
  },
  created() {
    this.id = uuid()
  },
  methods: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    handleOk() {
      this.$emit('ok')
    },
    handleCancel(val) {
      this.$emit('cancel', val)
    },
    slotStyle(type) {
      return this.getCustomStyle({ property: 'slots', value: type })
    },
    bgColors(type) {
      return this.getCustomStyle({ property: 'backgrounds', value: type })
    },
    getSlot(prop) {
      let { $scopedSlots } = this || {}
      let { [prop]: component } = $scopedSlots || {}

      if (isFunction(component)) {
        return component && component()
      }
    },
    footer() {
      let { saveText, cancelText } = this || {}
      return !isEmpty(this.getSlot('footer')) ? (
        this.getSlot('footer')
      ) : (
        <FContainer
          display="flex"
          padding="containerXLarge sectionSmall"
          width="100%"
          borderTop="solid 1px"
          borderColor="borderNeutralBaseSubtler"
          justifyContent="flex-end"
        >
          {!this.hideCancel && (
            <FButton
              appearance="secondary"
              vOn:click={this.handleCancel}
              props={this.cancelButtonProp}
            >
              {cancelText
                ? cancelText
                : this.$t('dsm.attachment.cancel', 'Cancel')}
            </FButton>
          )}
          <FContainer marginLeft="containerLarge" />
          {!this.hideSave && (
            <FButton
              vOn:click={this.handleOk}
              loading={this.confirmLoading}
              props={this.saveButtonProp}
            >
              {saveText ? saveText : this.$t('dsm.attachment.save', 'Save')}
            </FButton>
          )}
        </FContainer>
      )
    },
    header() {
      let { title, iconStyle } = this
      let { name, color } = iconStyle || {}
      return (
        <FContainer
          display="flex"
          padding="containerXLarge sectionSmall"
          width="100%"
          borderBottom={this.hideHeader ? 'none' : 'solid 1px'}
          borderColor="borderNeutralBaseSubtler"
          justifyContent="space-between"
          alignItems="center"
        >
          <FContainer>
            <FBreadcrumb
              props={this.breadCrumbProps}
              vOn:click={(obj) => this.$emit('path', obj)}
            />
            {!isEmpty(this.breadCrumbProps) && (
              <FContainer marginTop="containerLarge"></FContainer>
            )}
            {!isEmpty(this.getSlot('header')) ? (
              this.getSlot('header')
            ) : (
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerLarge"
                color="textMain"
              >
                {!isEmpty(iconStyle) && (
                  <FAvatar
                    icongroup="alert"
                    iconname={name}
                    bgColor={color}
                    iconColor="backgroundCanvas"
                    size="M"
                    shape="square"
                  />
                )}
                <FText appearance="headingMed16" color="textMain">
                  {title}
                </FText>
              </FContainer>
            )}
          </FContainer>
          <FContainer>
            {!isEmpty(this.getSlot('close-icon')) ? (
              this.getSlot('close-icon')
            ) : (
              <FIcon
                vOn:click={() => this.handleCancel('cross')}
                group="default"
                name="close"
                size="14"
              />
            )}
          </FContainer>
        </FContainer>
      )
    },
    body() {
      let { sizeObj } = this || {}
      let { maxHeight } = sizeObj || {}
      return (
        <FContainer width="100%" maxHeight={maxHeight} overflow="scroll">
          {this.children()}
        </FContainer>
      )
    },
  },

  render() {
    let { styleProps, sizeObj, hideFooter, isCentered, modalHeight } =
      this || {}
    let { width } = sizeObj || {}
    const headerStyle = this.slotStyle('header')
    const footerStyle = this.hideFooter
      ? this.slotStyle('hideFooter')
      : this.slotStyle('footer')
    const Element = styled(Modal)`
      .ant-modal {
        top: ${isCentered ? `${modalHeight}` : 'var(--modal-height)'};
        ${isCentered && 'transform-origin: unset;'}
        ${isCentered && 'padding-bottom: 0px;'}
        ${isCentered && 'left: 50%;'}
        ${isCentered && 'position: fixed;'}
      }
      .ant-modal-content {
        ${isCentered &&
        'animation: fadeIn 200ms ease-in-out forwards !important;'}
        ${styleProps}
        .ant-modal-header {
          ${headerStyle}
        }
        .ant-modal-body {
          width: ${width};
          ${'overflow-y:auto'}
        }
        .ant-modal-footer {
          ${footerStyle}
        }
      }
    `
    return (
      <Element
        class="f-modal-container"
        visible={this.visible}
        width={width}
        maskClosable={this.maskClosable}
        closable={false}
        onCancel={() => this.handleCancel()}
        {...{
          scopedSlots: {
            footer: () => {},
          },
        }}
      >
        {this.header()}
        {this.body()}
        {!hideFooter && this.footer()}
      </Element>
    )
  },
}
</script>

<style lang="scss">
/* .ant-modal-content {
  animation: fadeIn 200ms ease-in-out forwards !important;
} */
.f-modal-container {
  .ant-modal-footer {
    padding: 0px;
  }
  .ant-modal-header {
    padding: 0px;
  }
  .ant-modal-body {
    padding: 0px;
    line-height: unset;
    word-wrap: unset;
    font-size: unset;
  }
}
@keyframes fadeIn {
  0% {
    transform: translate(-100%, -100%);
    opacity: 0;
  }
  20% {
    transform: translate(-55%, -55%);
    opacity: 0.2;
  }
  40% {
    transform: translate(-50%, -50%);
    opacity: 0.4;
  }
  60% {
    transform: translate(-50%, -50%);
    opacity: 0.6;
  }
  80% {
    transform: translate(-50%, -50%);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>
