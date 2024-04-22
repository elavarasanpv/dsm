<script>
import { isEmpty } from '../../utils/validation'
import { FContainer, FIcon } from '../../index'
export default {
  name: 'FColorSwatch',
  props: {
    selectedColorName: {
      type: String,
      default: '',
    },
    hideSet: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      palettes: [
        {
          name: 'greyDark',
          color: 'backgroundNeutralGrey01Darker',
          borderColor: 'backgroundNeutralGrey01Darkest',
          textColor: 'textInverseDefault',
          hex: '#384A62',
          iconColor: '#FCFEFF',
        },

        {
          name: 'blueDark',
          color: 'backgroundAccentBlueDarker',
          borderColor: 'backgroundAccentBlueDarkest',
          textColor: 'textInverseDefault',
          hex: '#0047AB',
          iconColor: '#FCFEFF',
        },
        {
          name: 'cyanDark',
          color: 'backgroundAccentCyanDark',
          borderColor: 'backgroundAccentCyanDarkest',
          textColor: 'textInverseDefault',
          hex: '#0C6068',
          iconColor: '#FCFEFF',
        },
        {
          name: 'greenDark',
          color: 'backgroundSemanticGreenDark',
          borderColor: 'backgroundSemanticGreenDarkest',
          textColor: 'textInverseDefault',
          hex: '#0F6F06',
          iconColor: '#FCFEFF',
        },
        {
          name: 'yellowDark',
          color: 'backgroundAccentYellowDark',
          borderColor: 'backgroundAccentYellowDarkest',
          textColor: 'textInverseDefault',
          hex: '#8D7500',
          iconColor: '#FCFEFF',
        },
        {
          name: 'redDark',
          color: 'backgroundSemanticRedDark',
          borderColor: 'backgroundSemanticRedDarkest',
          textColor: 'textInverseDefault',
          hex: '#870000',
          iconColor: '#FCFEFF',
        },
        {
          name: 'pinkDark',
          color: 'backgroundAccentPinkDark',
          borderColor: 'backgroundAccentPinkDarkest',
          textColor: 'textInverseDefault',
          hex: '#AB185A',
          iconColor: '#FCFEFF',
        },

        {
          name: 'violetDark',
          color: 'backgroundAccentVioletDark',
          borderColor: 'backgroundAccentVioletDarkest',
          textColor: 'textInverseDefault',
          hex: '#3C229D',
          iconColor: '#FCFEFF',
        },
        {
          name: 'purpleDark',
          color: 'backgroundAccentPurpleDark',
          borderColor: 'backgroundAccentPurpleDarkest',
          textColor: 'textInverseDefault',
          hex: '#5B1D6F',
          iconColor: '#FCFEFF',
        },

        {
          name: 'greyMedium',
          color: 'backgroundNeutralGrey01Medium',
          borderColor: 'backgroundNeutralGrey01Dark',
          textColor: 'textDefault',
          hex: '#9CAFCA',
          iconColor: '#283648',
        },
        {
          name: 'blueMedium',
          color: 'backgroundAccentBlueMedium',
          borderColor: 'backgroundAccentBlueDark',
          textColor: 'textInverseDefault',
          hex: '#3D8BFA',
          iconColor: '#FCFEFF',
        },

        {
          name: 'cyanMedium',
          color: 'backgroundAccentCyanMedium',
          borderColor: 'backgroundAccentCyanDark',
          textColor: 'textDefault',
          hex: '#34C0CE',
          iconColor: '#283648',
        },
        {
          name: 'greenMedium',
          color: 'backgroundSemanticGreenMedium',
          borderColor: 'backgroundSemanticGreenDark',
          textColor: 'textDefault',
          hex: '#49B83F',
          iconColor: '#283648',
        },

        {
          name: 'yellowMedium',
          color: 'backgroundAccentYellowMedium',
          borderColor: 'backgroundAccentYellowDark',
          textColor: 'textDefault',
          hex: '#E2BC00',
          iconColor: '#283648',
        },
        {
          name: 'redMedium',
          color: 'backgroundSemanticRedMedium',
          borderColor: 'backgroundSemanticRedDark',
          textColor: 'textInverseDefault',
          hex: '#B61919',
          iconColor: '#FCFEFF',
        },
        {
          name: 'pinkMedium',
          color: 'backgroundAccentPinkMedium',
          borderColor: 'backgroundAccentPinkDark',
          textColor: 'textInverseDefault',
          hex: '#F5519B',
          iconColor: '#FCFEFF',
        },
        {
          name: 'violetMedium',
          color: 'backgroundAccentVioletMedium',
          borderColor: 'backgroundAccentVioletDark',
          textColor: 'textInverseDefault',
          hex: '#7D63DC',
          iconColor: '#FCFEFF',
        },
        {
          name: 'purpleMedium',
          color: 'backgroundAccentPurpleMedium',
          borderColor: 'backgroundAccentPurpleDark',
          textColor: 'textInverseDefault',
          hex: '#A160B7',
          iconColor: '#FCFEFF',
        },
        {
          name: 'greyLight',
          color: 'backgroundNeutralGrey01Subtle',
          borderColor: 'backgroundNeutralGrey01Medium',
          textColor: 'textDefault',
          hex: '#EDF5FF',
          iconColor: '#283648',
        },
        {
          name: 'blueLight',
          color: 'backgroundAccentBlueLight',
          borderColor: 'backgroundAccentBlueMedium',
          textColor: 'textDefault',
          hex: '#CCE2FF',
          iconColor: '#283648',
        },
        {
          name: 'CyanLight',
          color: 'backgroundAccentCyanLight',
          borderColor: 'backgroundAccentCyanMedium',
          textColor: 'textDefault',
          hex: '#C6F4F8',
          iconColor: '#283648',
        },
        {
          name: 'greenLight',
          color: 'backgroundSemanticGreenSubtle',
          borderColor: 'backgroundSemanticGreenMedium',
          textColor: 'textDefault',
          hex: '#F1FFF0',
          iconColor: '#283648',
        },
        {
          name: 'yellowLight',
          color: 'backgroundAccentYellowSubtle',
          borderColor: 'backgroundAccentYellowMedium',
          textColor: 'textDefault',
          hex: '#FFFAE0',
          iconColor: '#283648',
        },
        {
          name: 'redLight',
          color: 'backgroundSemanticRedSubtle',
          borderColor: 'backgroundSemanticRedLight',
          textColor: 'textDefault',
          hex: '#F7CCCC',
          iconColor: '#283648',
        },
        {
          name: 'pinkLight',
          color: 'backgroundAccentPinkLight',
          borderColor: 'backgroundAccentPinkMedium',
          textColor: 'textDefault',
          hex: '#FFDBED',
          iconColor: '#283648',
        },
        {
          name: 'violetLight',
          color: 'backgroundAccentVioletLight',
          borderColor: 'backgroundAccentVioletMedium',
          textColor: 'textDefault',
          hex: '#DDD5FA',
          iconColor: '#283648',
        },
        {
          name: 'purpleLight',
          color: 'backgroundAccentPurpleLight',
          borderColor: 'backgroundAccentPurpleMedium',
          textColor: 'textDefault',
          hex: '#EBD4F3',
          iconColor: '#283648',
        },
      ],
      selectedColor: '',
    }
  },
  created() {
    let { selectedColorName } = this || {}
    if (!isEmpty(selectedColorName)) {
      this.selectedColor = selectedColorName
    }
  },
  watch: {
    selectedColorName(newVal, oldVal) {
      if (newVal !== oldVal && !isEmpty(newVal)) {
        this.selectedColor = selectedColorName
      }
    },
  },
  methods: {
    handleClick(palette) {
      this.selectedColor = palette.name
      let { name, color, textColor } = palette || {}
      let newObject = { name, color, textColor }
      this.$emit('selectedColor', palette.hex, newObject)
    },
    checkForSet(name) {
      const parts = name.split(/(?=[A-Z])/)
      let set = parts[1]
      let present = this.hideSet.find(
        (name) => name.toLowerCase() === set.toLowerCase()
      )
      if (isEmpty(present)) {
        return true
      } else return false
    },
  },
  render() {
    return (
      <FContainer
        borderRadius="medium"
        display="flex"
        flexWrap="wrap"
        padding="containerXLarge"
        gap="containerXLarge"
        width="248px"
        borderStyle="solid"
        borderWidth="1px"
        borderColor="borderNeutralBaseSubtler"
        backgroundColor="backgroundContainer"
      >
        {this.palettes.map((palette) => {
          return (
            this.checkForSet(palette.name) && (
              <FContainer
                padding="containerSmall"
                cursor="pointer"
                hover-boxShadow="lightLow02"
                backgroundColor={palette.color}
                border="1px solid"
                borderColor={palette.borderColor}
                height="14px"
                width="14px"
                borderRadius="low"
                display="flex"
                alignItems="center"
                justifyContent="center"
                vOn:click={() => this.handleClick(palette)}
                color={
                  palette.iconColor === '#FCFEFF'
                    ? 'iconNeutralInverse'
                    : 'iconNeutralDefault'
                }
              >
                {this.selectedColor === palette.name && (
                  <FIcon
                    group="action"
                    name="tick"
                    size="12"
                    color="currentColor"
                    pressable={false}
                  ></FIcon>
                )}
              </FContainer>
            )
          )
        })}
      </FContainer>
    )
  },
}
</script>

<style scoped></style>
