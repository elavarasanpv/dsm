import { FModal, FText, FContainer, FTags } from '../../index'
import Vue from 'vue'
import { isEmpty } from '../../utils/validation'
class ConfirmMessage {
  container = ''
  value = false
  modalInstance = null
  constructor() {
    const container = document.createElement('div')
    const root = document.createElement('div')
    container.setAttribute('id', 'f-confirm-container')
    root.appendChild(container)
    document.body.appendChild(root)
    this.container = container
    this.root = root
  }

  default = (data, props) => {
    return this.createDialog({ ...data, intent: 'default', ...props })
  }
  info = (data, props) => {
    return this.createDialog({ ...data, intent: 'info', ...props })
  }
  success = (data, props) => {
    return this.createDialog({ ...data, intent: 'success', ...props })
  }
  danger = (data, props) => {
    return this.createDialog({ ...data, intent: 'danger', ...props })
  }
  warning = (data, props) => {
    return this.createDialog({ ...data, intent: 'warning', ...props })
  }
  save(val, text) {
    if (val) {
      this.value = {
        text: text,
        value: true,
      }
    } else {
      this.value = true
    }
    this.removeDialog()
  }
  close(val, text, type) {
    if (val) {
      this.value = {
        text: text,
        value: true,
      }
      if (type === 'cross') {
        this.value = {
          text: type,
          value: false,
        }
      }
    } else {
      this.value = false
    }
    this.removeDialog()
  }
  removeDialog() {
    let div = document.getElementById('f-modal')
    div.remove()
  }
  async createDialog(props) {
    return new Promise((resolve) => {
      let {
        title,
        description,
        intent,
        saveText,
        cancelText,
        subInfo,
        hideSave = false,
        hideCancel = false,
        isSpecial = false,
        cancelButtonProp = {},
        saveButtonProp = {},
      } = props || {}
      let { title: infoTitle, subText, tags = [] } = subInfo || {}
      const div = document.createElement('div')
      div.setAttribute('id', 'f-modal')
      this.container.appendChild(div)
      this.modalInstance = new Vue({
        render: (h) =>
          h(
            FModal,
            {
              props: {
                visible: true,
                isCentered: true,
                size: 'S',
                hideFooter: false,
                hideHeader: true,
                type: intent,
                hideSave,
                hideCancel,
                cancelButtonProp,
                saveButtonProp,
                saveText,
                cancelText,
              },
              attrs: {
                id: 'f-modal',
              },
              on: {
                cancel: (val) => {
                  this.close(isSpecial, cancelText, val)
                  resolve(this.value)
                },
                ok: () => {
                  this.save(isSpecial, saveText)
                  resolve(this.value)
                },
              },
            },
            [
              h(
                FContainer,
                {
                  attrs: {
                    padding:
                      'containerNone sectionSmall containerXLarge sectionSmall',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'containerLarge',
                  },
                },
                [
                  h(FText, {
                    domProps: { innerHTML: title },
                    attrs: {
                      lineHeight: 'unset',
                      color: 'textDescription',
                    },
                    props: {
                      appearance: 'headingMed16',
                    },
                  }),
                  h(FText, {
                    domProps: { innerHTML: description },
                    attrs: { lineHeight: 'unset', color: 'textDescription' },
                  }),
                  h(
                    FContainer,
                    {
                      style: {
                        display: isEmpty(subInfo) ? 'none' : 'flex',
                      },
                      attrs: {
                        border: '1px solid',
                        borderColor: 'borderNeutralBaseSubtler',
                        borderRadius: 'medium',
                        backgroundColor: 'backgroundMidgroundSubtle',
                        gap: 'containerLarge',
                        padding: 'containerLarge',
                        flexDirection: 'column',
                      },
                    },
                    [
                      h(FText, {
                        domProps: { innerHTML: infoTitle },
                        style: {
                          display: isEmpty(infoTitle) ? 'none' : 'block',
                        },
                        attrs: {
                          lineHeight: 'unset',
                          color: 'textDescription',
                        },
                        props: {
                          appearance: 'captionMed10',
                        },
                      }),
                      h(
                        FContainer,
                        {
                          style: {
                            display: isEmpty(tags) ? 'none' : 'flex',
                          },
                          attrs: {
                            gap: 'containerLarge',
                            flexWrap: 'wrap',
                          },
                        },
                        [
                          tags.map((tag, index) => {
                            return h(FTags, {
                              key: index,
                              props: { ...tag },
                            })
                          }),
                        ]
                      ),
                      h(FText, {
                        domProps: { innerHTML: subText },
                        style: {
                          display: isEmpty(subText) ? 'none' : 'block',
                        },
                        attrs: {
                          lineHeight: 'unset',
                          color: 'textCaption',
                        },
                        props: {
                          appearance: 'captionReg12',
                        },
                      }),
                    ]
                  ),
                ]
              ),
            ]
          ),
      }).$mount(div)
    })
  }
}

const message = new ConfirmMessage()

export default message
