import colors from '../themes/tokens/color'
import aliasColors from '../themes/default/tokens/colors'
import spacing from '../themes/tokens/spacing'
import aliasSpacing from '../themes/default/tokens/spacing'
import borderRadius from '../themes/tokens/border'
import aliasBorderRadius from '../themes/default/tokens/border'
import defaultElevation from '../themes/default/tokens/elevation'

class Utils {
  globalColors = {}
  aliasColors = {}
  globalSpacing = {}
  aliasSpacing = {}
  globalBr = {}
  aliasBr = {}
  defaultElevation = {}
  constructor() {
    this._setGlobalColors()
    this._setAliasColors()
    this.globalSpacing = spacing
    this.aliasSpacing = this._setAliasTokens(aliasSpacing, spacing, 'spacing')
    this.globalBr = borderRadius
    this.aliasBr = this._setAliasTokens(
      aliasBorderRadius,
      borderRadius,
      'border'
    )
    this.defaultElevation = defaultElevation
  }
  _setGlobalColors() {
    let list = [
      'backdrops',
      'blue',
      'neutral01',
      'neutral02',
      'cyan',
      'green',
      'orange',
      'pink',
      'purple',
      'red',
      'violet',
      'yellow',
    ]
    let finalObj = {}
    Object.entries(colors).forEach(([key, value]) => {
      let currItem = list.find((item) => key.includes(item))
      if (finalObj[currItem]) {
        finalObj[currItem] = { ...finalObj[currItem], [key]: value }
      } else {
        finalObj[currItem] = { [key]: value }
      }
    })
    this.globalColors = finalObj
  }
  _setAliasColors() {
    let list = ['background', 'border', 'text', 'icon']
    let finalObj = {}
    Object.entries(aliasColors).forEach(([key, value]) => {
      let currItem = list.find((item) => key.includes(item))
      value = value.replace('$global.colors.', '')
      if (finalObj[currItem]) {
        finalObj[currItem] = { ...finalObj[currItem], [key]: colors[value] }
      } else {
        finalObj[currItem] = { [key]: colors[value] }
      }
    })
    this.aliasColors = finalObj
  }
  _setAliasTokens(objectProps, actualObjProps, tokenName) {
    let finalObj = {}
    Object.entries(objectProps).forEach(([key, value]) => {
      value = value.replace(`$global.${tokenName}.`, '')
      finalObj[key] = actualObjProps[value]
    })
    return finalObj
  }
}

export default new Utils()
