<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { FText, FContainer } from '../../index'
import { isEmpty } from 'lodash'

const SIZE = {
  XS: {
    dimension: '16px',
    fontSize: 'avatarXS',
    iconSize: '12',
    activeDotSize: '4px',
    bottom: '-0.6px',
    right: '-0.6px',
  },
  S: {
    dimension: '24px',
    fontSize: 'avatarS',
    iconSize: '16',
    activeDotSize: '6px',
    bottom: '0px',
    right: '0px',
  },
  M: {
    dimension: '32px',
    fontSize: 'captionMed12',
    iconSize: '20',
    activeDotSize: '8px',
    bottom: '0px',
    right: '0px',
  },
  L: {
    dimension: '40px',
    fontSize: 'headingMed16',
    iconSize: '24',
    activeDotSize: '10px',
    bottom: '0.6px',
    right: '1px',
  },
  XL: {
    dimension: '56px',
    fontSize: 'headingMed20',
    iconSize: '32',
    activeDotSize: '12px',
    bottom: '3px',
    right: '1px',
  },
}

const STATUS = {
  nil: {
    color: '',
  },
  unavailable: {
    color: 'borderSemanticRedLight',
  },
  online: {
    color: 'textSemanticGreen',
  },
  offline: {
    color: 'borderNeutralGrey01Medium',
  },
}

export default {
  name: 'FAvatar',
  components: { FText, FContainer },
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'M',
      validator: (value) => {
        return ['XS', 'S', 'M', 'L', 'XL'].includes(value)
      },
    },
    userName: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    shape: {
      type: String,
      default: 'circle',
      validator: (value) => {
        return ['circle', 'square'].includes(value)
      },
    },
    userStatus: {
      type: String,
      default: 'nil',
      validator: (value) => {
        return ['nil', 'unavailable', 'online', 'offline'].includes(value)
      },
    },
    iconname: {
      type: String,
      default: 'user',
    },
    icongroup: {
      type: String,
      default: 'default',
    },
    count: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizeObj() {
      let { size = 'M' } = this
      return SIZE[size]
    },
    statusObj() {
      let { userStatus = 'nil' } = this
      return STATUS[userStatus]
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getAvatarName(name) {
      let parts = name.split(/[ -]/)

      let initials = ''
      let initialLen = 2
      let count = 0
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].trim() !== '') {
          initials += parts[i].charAt(0)
          count++
          if (count >= initialLen) {
            break
          }
        }
      }

      if (initials.length < initialLen && name.length >= initialLen) {
        initials = name.trim().substring(0, initialLen)
      }
      let avatarName = initials.toUpperCase()
      return avatarName
    },
    getRandomBgColor() {
      let colors = [
        'backgroundMidgroundDark',
        'backgroundNeutralGrey01Dark',
        'backgroundPrimaryDefault',
        'backgroundAccentYellowLight',
        'backgroundAccentVioletMedium',
      ]
      let color = 'backgroundMidgroundDark'
      let userKey = this.userName
      if (userKey) {
        let userUniqueNum = Array.from(userKey)
          .map((letter) => letter.charCodeAt(0))
          .reduce((current, previous) => previous + current)

        let colorIndex = userUniqueNum % colors.length
        color = colors[colorIndex]
      }
      if (!isEmpty(this.bgColor)) {
        color = this.bgColor
      }
      return color
    },
    getUserInitials(bgColor) {
      let { sizeObj, userName } = this || {}
      let color =
        bgColor === 'backgroundAccentYellowLight' ||
        bgColor === 'backgroundMidgroundDark'
          ? 'textDefault'
          : 'backgroundContainer'
      return (
        <FText appearance={sizeObj.fontSize} color={color}>
          {this.count ? userName : this.getAvatarName(userName)}
        </FText>
      )
    },
    getUserIcon(bgColor) {
      let { sizeObj, iconname, icongroup, iconColor } = this || {}
      let color =
        bgColor === 'backgroundAccentYellowLight' ||
        bgColor === 'backgroundMidgroundDark'
          ? 'iconNeutralGrey01Medium'
          : 'backgroundContainer'
      if (!isEmpty(iconColor)) {
        color = `var(--colors-${iconColor})`
      }
      return (
        <fc-icon
          name={iconname}
          group={icongroup}
          size={sizeObj.iconSize}
          color={color}
        ></fc-icon>
      )
    },
  },
  render() {
    let { styleProps, sizeObj, avatarUrl, userName, statusObj, clickable } =
      this || {}
    let bgColor = this.getRandomBgColor()
    const Element = styled(FContainer)`
      ${styleProps};
      overflow: hidden;
      border-radius: ${this.shape === 'circle' ? '200px' : '8px'};
    `
    const Image = styled('img')`
      ${styleProps}
    `
    const ActiveDot = styled(FContainer)`
      ${this.getStyle('activeContainer')}
    `
    return (
      <Element
        backgroundColor={bgColor}
        height={sizeObj.dimension}
        width={sizeObj.dimension}
        borderColor={statusObj.color}
        cursor={clickable ? 'pointer' : 'default'}
        vOn:click={() => {
          if (clickable) this.$emit('onClick')
        }}
      >
        {avatarUrl && (
          <Image
            src={avatarUrl}
            height={sizeObj.dimension}
            width={sizeObj.dimension}
          />
        )}
        {!avatarUrl && userName && this.getUserInitials(bgColor)}
        {!avatarUrl && !userName && this.getUserIcon(bgColor)}
        {!isEmpty(statusObj.color) && (
          <ActiveDot
            backgroundColor={statusObj.color}
            height={sizeObj.activeDotSize}
            width={sizeObj.activeDotSize}
            right={sizeObj.right}
            bottom={sizeObj.bottom}
          ></ActiveDot>
        )}
      </Element>
    )
  },
}
</script>

<style scoped></style>
