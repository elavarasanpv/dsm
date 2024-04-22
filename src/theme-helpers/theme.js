import merge from 'lodash/merge'
import themesList from '../themes/index'
import flatten from 'flat'
import getProperty from 'dlv'
import { getGlobalScope } from '../utils/helpers'
import { isEmpty, isObject } from 'lodash'

export const themes = {
  DEFAULT: 'default',
}

class ThemeInstance {
  theme = {
    type: '',
    config: {},
    styles: {},
  }
  constructor() {
    this.theme.type = themes['DEFAULT']
    let globalScope = getGlobalScope()
    this.theme.styles = this.setModifiedTheme()
    const API_CONFIG = Symbol.for('@facilio/dsm/config')
    const globalSymbols = Object.getOwnPropertySymbols(globalScope)
    const hasInstance = globalSymbols.includes(API_CONFIG)

    if (!hasInstance) {
      globalScope[API_CONFIG] = this
    }

    return globalScope[API_CONFIG]
  }
  useInstance({ type, config }) {
    this.theme.type = type
    this.theme.config = config
    this.theme.styles = this.setModifiedTheme()
  }
  getInstance() {
    let { theme } = this || {}
    return theme
  }
  setModifiedTheme() {
    let { theme } = this || {}
    let { type, config } = theme || {}
    let { global } = themesList || {}

    let selectedTheme = { global, ...themesList[type] }
    let mergedTheme = merge(selectedTheme, config)
    this.insertTokens(this.setGlobalPlaceholders(mergedTheme), type)
    return this.setPlaceholders(mergedTheme)
  }
  insertTokens(theme, type) {
    let element = document.getElementById('facilio-dsm-stylesheet')
    if (!isEmpty(element)) {
      element.remove()
    }
    let styleHtml = ':root{'
    Object.entries(theme).forEach(([key, value]) => {
      if (!['global', 'components'].includes(key)) {
        Object.entries(value).forEach(([tokenKey, tokenValue]) => {
          if (!isObject(tokenValue)) {
            let tokenName = `--${key}-${tokenKey}`
            styleHtml = `${styleHtml}${tokenName}: ${tokenValue};`
          } else {
            Object.entries(tokenValue).forEach(
              ([subTokenKey, subTokenValue]) => {
                let tokenName = `--${key}-${tokenKey}-${subTokenKey}`
                styleHtml = `${styleHtml}${tokenName}: ${subTokenValue};`
              }
            )
          }
        })
      }
    })
    styleHtml = `${styleHtml}--modal-height: 64px;--shadow: inset -10px 0 8px -8px rgba(29, 56, 78, 0.14);}`
    var head = document.head
    var styleSheet = document.createElement('style')
    styleSheet.innerHTML = styleHtml
    styleSheet.setAttribute('data-dsm', true)
    styleSheet.setAttribute('data-theme', type)
    styleSheet.setAttribute('id', `facilio-dsm-stylesheet`)

    head.appendChild(styleSheet)
  }
  setGlobalPlaceholders(object) {
    let flatObject = flatten(object)
    Object.entries(flatObject).forEach(([key, value]) => {
      if (typeof value == 'string' && value.includes('$global')) {
        flatObject[key] = getProperty(object, `${value.substring(1)}`)
      }
    })

    return flatten.unflatten(flatObject)
  }
  setPlaceholders(object) {
    object = this.setGlobalPlaceholders(object)
    let flatObject = flatten(object)

    Object.entries(flatObject).forEach(([key, value]) => {
      if (typeof value == 'string' && value.includes('$')) {
        let splitValues = value.split(' ')
        splitValues = splitValues.map((val) => {
          if (val.includes('$')) {
            let subval = val.substring(1)
            subval = subval.split('.').join('-')
            return `var(--${subval})`
          } else {
            return val
          }
        })
        flatObject[key] = splitValues.join(' ')
      }
    })

    return flatten.unflatten(flatObject)
  }
  get _theme() {
    let { theme } = this || {}
    return theme
  }
}

export default new ThemeInstance()
