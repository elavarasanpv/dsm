import { FNotification } from '../../index'
import Vue from 'vue'
import styled from 'vue-emotion'
import uniqueId from 'lodash/uniqueId'
import { isEmpty } from 'lodash'

class ToastClass {
  toastList = []
  buttonStatus = ''
  container
  _onShow = (toggleShow) => {
    this._toggleShow = toggleShow
  }
  constructor() {
    const container = document.createElement('div')
    const root = document.createElement('div')
    container.setAttribute('id', 'f-toast-container')
    container.setAttribute(
      'style',
      'position:relative;display:flex;flex-direction:column;align-items:center;z-index:1001'
    )
    root.setAttribute(
      'style',
      'position:absolute;top:0px;right:0px;left:0px;margin:0 auto;display:flex;flex-direction:column;align-items:flex-end;width:fit-content;'
    )
    root.appendChild(container)
    document.body.appendChild(root)
    this.container = container
    this.root = root
  }
  showButtonClick(data, isCreate) {
    this.buttonStatus = data
    if (isCreate === false) {
      this.buttonStatus = false
    }
    let top = 10
    let count = 0
    let height = 0
    if (data === 'more' && this.toastList.length > 1) {
      let container = document.getElementById('f-toast-container')
      let children = container.getElementsByTagName('div')
      Array.from(children).forEach((child, index) => {
        if (child.className.includes('f-toast-popup')) {
          child.style.transition = `top 200ms ease-out ${index * 0.0001}s`
          if (height === 0) {
            height = child?.clientHeight
          }
        }
      })
      Array.from(children).forEach((child) => {
        if (child.className.includes('f-toast-popup')) {
          child.style.top = `${top}px`
          setTimeout(() => {
            child.addEventListener('transitionrun', () => {
              if (this.buttonStatus === 'more') {
                child.style.width = '433px'
              }
            })
          }, 0)
          count++
          top = count * height + (count + 1) * 10
        }
      })
      Array.from(children).forEach((child) => {
        setTimeout(() => {
          child.removeEventListener('transitionrun', () => {
            if (this.buttonStatus === 'more') {
              child.style.width = '433px'
            }
          })
        }, 100)
      })
    } else {
      this.arrangeToast('onClick')
    }
  }
  success = (description, props) => {
    let id = this.createToast({ description, intent: 'success', ...props })
    return id
  }
  critical = (description, props) => {
    let id = this.createToast({ description, intent: 'critical', ...props })
    return id
  }
  warning = (description, props) => {
    let id = this.createToast({ description, intent: 'warning', ...props })
    return id
  }
  information = (description, props) => {
    let id = this.createToast({ description, intent: 'information', ...props })
    return id
  }
  destroy = (id, list) => {
    this.closeToast(id, list)
  }
  closeToast(toastId, toastList) {
    let { buttonStatus } = this || ''
    const index = this.toastList.indexOf(toastId)
    const length = this.toastList.length
    this.toastList = toastList.filter((toast) => toast !== toastId)
    const toastElement = document.getElementById(toastId)
    toastElement.style.top = '-100px'
    setTimeout(() => {
      if (!isEmpty(toastElement)) {
        toastElement.remove()
        toastList.shift()
      }
    }, 100)
    if (toastList.length >= 1) {
      let prevId = toastList[0]
      let element = document.getElementById(prevId)
      this.container.style.width = `${element?.clientWidth + 10}px`
    }
    if (this.toastList.length <= 1) {
      let newElement = document.getElementById('my-button')
      if (newElement) {
        newElement.parentNode.removeChild(newElement)
      }
    }
    if (toastList.length === 0) {
      this.toastList = []
      this.buttonStatus = ''
    }
    if (
      index !== length - 1 &&
      !isEmpty(this.toastList) &&
      buttonStatus === 'more'
    ) {
      this.toastList.forEach((toast, ind) => {
        if (ind >= index) {
          const divElement = document.getElementById(toast)
          const topValue = parseInt(
            window.getComputedStyle(divElement).getPropertyValue('top')
          )
          let height = divElement.clientHeight
          let top = topValue - (height + ind * 10)
          divElement.style.top = `${top}px`
        }
      })
    }
    if (buttonStatus === 'less' || isEmpty(buttonStatus)) {
      this.arrangeToast()
    }
  }
  arrangeToast(data) {
    let container = document.getElementById('f-toast-container')
    let children = container.getElementsByTagName('div')
    let width = 100
    let top = 10
    let count = 1
    Array.from(children).forEach((child) => {
      let elementWidth = child?.clientWidth
      if (child.className.includes('f-toast-popup')) {
        width = elementWidth + 10
        if (data === 'onClick') {
          width = width - count * 10
        }
        const currentWidth = width
        setTimeout(() => {
          child.addEventListener('transitionrun', () => {
            if (this.buttonStatus === 'less') {
              child.style.width = `${currentWidth}px`
            }
          })
        }, 0)
        child.style.top = `${top}px`
        count++
        top = count * 10
      }
    })
  }
  createToast(props) {
    let {
      description,
      title,
      timeout = 3000,
      intent = 'success',
      manualClear = false,
      menuType = 'toast',
    } = props || {}
    let { toastList } = this || {}
    let { length } = toastList || {}
    let zIndex = 2000

    zIndex = Math.abs(zIndex - length)
    let width = '433px'
    let top = 0
    if (!isEmpty(toastList)) {
      let prevId = toastList[length - 1]
      let element = document.getElementById(prevId)
      if (!isEmpty(element)) {
        let elementWidth = element?.clientWidth
        width = `${elementWidth - 10}px`
        top = (length + 1) * 10
        const zIndexs = window
          .getComputedStyle(element)
          .getPropertyValue('z-index')
        const topValue = parseInt(
          window.getComputedStyle(element).getPropertyValue('top')
        )
        zIndex = zIndexs - length
        top = topValue + 10
      }
    }
    if (this.buttonStatus === 'more' && length >= 1) {
      width = '433px'
      top = length * 100 + (length + 1) * 10
    }

    const Element = styled(FNotification)`
      margin: 10px 5px 10px;
      ${zIndex ? `z-index: ${zIndex}` : ''};
      ${`width: ${width}`};
      /* ${`top: ${top}px`}; */
      ${'position:absolute'};
    `
    const div = document.createElement('div')
    const id = uniqueId('f-toast-')
    this.container.appendChild(div)
    new Vue({
      render: (h) =>
        h(Element, {
          props: {
            uniqueId: id,
            description,
            title,
            intent,
            menuType,
            animate: true,
            showProgress: !manualClear,
            maxTime: timeout,
            close: () => this.closeToast(id, this.toastList),
          },
        }),
    }).$mount(div)
    this.toastList.push(id)
    if (!manualClear) {
      setTimeout(() => {
        this.closeToast(id, toastList)
      }, timeout + this.toastList.length * 10)
    }
    this.showButtonClick('more')
    return {
      id: id,
      list: this.toastList,
    }
  }
}

const toast = new ToastClass()

export default toast
