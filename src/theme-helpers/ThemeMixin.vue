<script>
import config from '../theme-helpers/theme.js'
import { isEmpty } from '../utils/validation'

const tokenHash = {
  colors: ['backgroundColor', 'color', 'borderColor'],
  gradient: ['gradient'],
  spacing: [
    'padding',
    'margin',
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
    'paddingRight',
    'paddingLeft',
    'paddingTop',
    'paddingBottom',
    'gap',
    'rowGap',
    'columnGap',
  ],
  elevation: ['boxShadow'],
  border: ['borderRadius'],
}

export default {
  computed: {
    componentName() {
      let { $options } = this || {}
      let { name } = $options || {}
      return name
    },
    theme() {
      let { _theme } = config || {}
      return _theme
    },
    modifiedTheme() {
      let { theme } = this || {}
      return theme.styles
    },
    styleProps() {
      let { componentName } = this || {}
      let styles = this.getStyles({ componentName, useProps: true })
      let { baseStyle } = styles || {}
      return baseStyle
    },
  },
  destroyed() {
    document.removeEventListener('scroll', () => {}, true)
  },
  methods: {
    getComponentStyles(componentName) {
      let { modifiedTheme } = this || {}
      let { components } = modifiedTheme || {}
      let css = components[`${componentName}`]
      return css
    },
    getStyles(properties) {
      let { componentName, useProps } = properties || {}
      let styles = this.getComponentStyles(componentName)

      let { $props } = this || {}
      let { baseStyle, ...propStyles } = styles || {}
      // convert $props to array of objects
      let propertyList = Object.entries($props || {}).map(([key, value]) => ({
        key,
        value,
      }))
      let customProperties = {}
      if (!isEmpty(propStyles)) {
        Object.entries(propStyles).forEach(([key, value]) => {
          // Check if a component prop is exported as a style declaration
          let componentProp = (propertyList || []).find(
            (property) => property.key === key
          )
          if (!isEmpty(componentProp) && useProps) {
            let { value: propValue } = componentProp || {}
            let selectedStyle = value[propValue]
            // Check if we have styles for a prop's value
            if (!isEmpty(selectedStyle)) {
              baseStyle = { ...baseStyle, ...selectedStyle }
            }
          } else {
            // Spread other styles so that it can be used later
            customProperties = { ...customProperties, [key]: value }
          }
        })
      }
      return { baseStyle, ...customProperties }
    },
    computePlaceholderStyles(stylePropList) {
      let normalStyles = {}
      let hoverStyles = {}
      let presentBg = false
      if ('backgroundColor' in stylePropList || 'background' in stylePropList) {
        presentBg = true
      }

      Object.entries(stylePropList).forEach(([key, value]) => {
        let isHoverStyle = false
        if (key.includes('hover-')) {
          isHoverStyle = true
          key = key.replace('hover-', '')
        }

        Object.entries(tokenHash).forEach(([tokenKey, propList]) => {
          if (propList.includes(key) && !isEmpty(value)) {
            let splitValues = value.split(' ')
            splitValues = splitValues.map((val) => {
              return `var(--${tokenKey}-${val})`
            })
            value = splitValues.join(' ')
          }
        })
        if (isHoverStyle) hoverStyles[key] = value
        else if (key === 'gradient' && !presentBg) {
          normalStyles['background'] = value
        } else normalStyles[key] = value
      })

      let customStyleProperties = {
        ...normalStyles,
        '&:hover': {
          ...hoverStyles,
        },
      }
      return customStyleProperties
    },
    getCustomStyle(args) {
      let { property, value } = args || {}
      let { componentName } = this || {}

      let styles = this.getStyles({ componentName, useProps: false })

      let { [property]: customStyle } = styles || {}
      if (!isEmpty(value) && !isEmpty(customStyle)) {
        customStyle = customStyle[value]
      }
      return customStyle
    },
  },
}
</script>

<style></style>
