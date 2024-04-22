<script>
import { FContainer, FWidgetCard, FText, FIcon } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import styled from 'vue-emotion'
const WEATHER_DATA = {
  default: {
    label: 'Cloudy Day',
    iconLabel: 'cloudy-day',
  },
  1: {
    label: 'Clear Day',
    iconLabel: 'clear-day',
  },
  2: {
    label: 'Clear Night',
    iconLabel: 'clear-night',
  },
  3: { iconLabel: 'rain', label: 'Rain' },
  4: {
    label: 'Snow',
    iconLabel: 'snow',
  },
  5: {
    label: 'Sleet',
    iconLabel: 'sleet',
  },
  6: {
    label: 'Wind',
    iconLabel: 'wind',
  },
  7: {
    label: 'Fog',
    iconLabel: 'fog',
  },
  8: {
    label: 'Cloudy Day',
    iconLabel: 'cloudy-day',
  },
  9: {
    label: 'Partly Cloudy Day',
    iconLabel: 'partly-cloudy-day',
  },
  10: {
    label: 'Partly Cloudy Night',
    iconLabel: 'partly-cloudy-night',
  },
  11: {
    label: 'Hail',
    iconLabel: 'hail',
  },
  12: {
    label: 'Thunderstorm',
    iconLabel: 'thunderstorm',
  },
  13: {
    label: 'Tornado',
    iconLabel: 'tornado',
  },
}
export default {
  name: 'FWeatherWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'large', 'medium'].includes(value)
      },
    },
    currentWeatherData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    currentWeather() {
      let { currentWeatherData = {} } = this
      let { icon } = currentWeatherData || {}
      return WEATHER_DATA[icon || 'default']
    },
    getWeatherIconName() {
      let { currentWeather } = this || {}
      let { iconLabel } = currentWeather || {}
      return iconLabel
    },
    getWeatherName() {
      let { currentWeather } = this || {}
      let { label } = currentWeather || {}
      return label
    },
    gradient() {
      let { getWeatherIconName } = this
      if (getWeatherIconName === 'clear-day') {
        return 'neutralLow'
      } else if (getWeatherIconName === 'clear-night') {
        return 'neutralHigh'
      } else return 'neutralMedium'
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
  },
  render() {
    let { computedStyleProps, currentWeatherData } = this
    let { temperature, unit, location } = currentWeatherData || {}
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `
    return (
      <Container>
        <FWidgetCard size={this.size}>
          <FContainer
            borderRadius="high"
            height="100%"
            width="100%"
            overflow="hidden"
          >
            {this.size === 'large' && (
              <FContainer
                display="flex"
                alignItems="center"
                gradient={this.gradient}
                flexDirection="column"
                justifyContent="center"
                height="100%"
                gap="containerXxLarge"
              >
                <FContainer
                  height="100px"
                  width="120px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <fc-image
                    name={this.getWeatherIconName}
                    height={100}
                  ></fc-image>
                </FContainer>
                <FContainer
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap="containerMedium"
                  width="100%"
                >
                  <FContainer
                    display="flex"
                    flexDirection="column"
                    gap="containerSmall"
                    width="100%"
                    alignItems="center"
                  >
                    {!isEmpty(temperature) && (
                      <FText
                        appearance="headingMed20"
                        color={
                          this.gradient === 'neutralHigh'
                            ? 'textInverseDefault'
                            : 'textDefault'
                        }
                      >
                        {temperature}&deg; {unit}
                      </FText>
                    )}
                    <FText
                      color={
                        this.gradient === 'neutralHigh'
                          ? 'textInverseDefault'
                          : 'textDefault'
                      }
                    >
                      {this.getWeatherName}
                    </FText>
                  </FContainer>
                  {!isEmpty(location) && (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerSmall"
                    >
                      <FIcon
                        group="map-travel"
                        name="location"
                        size="16"
                        color={
                          this.gradient === 'neutralHigh'
                            ? 'iconNeutralInverse'
                            : 'iconNeutralDefault'
                        }
                        pressable={false}
                      />
                      <FText
                        appearance="captionReg12"
                        color={
                          this.gradient === 'neutralHigh'
                            ? 'textInverseDefault'
                            : 'textDefault'
                        }
                      >
                        {location}
                      </FText>
                    </FContainer>
                  )}
                </FContainer>
              </FContainer>
            )}
            {this.size === 'medium' && (
              <FContainer
                padding="sectionSmall containerXxLarge"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gradient={this.gradient}
                height="100%"
              >
                <FContainer
                  display="flex"
                  flexDirection="column"
                  gap="containerMedium"
                >
                  <FContainer
                    display="flex"
                    flexDirection="column"
                    gap="containerSmall"
                  >
                    {!isEmpty(temperature) && (
                      <FText
                        appearance="headingMed20"
                        color={
                          this.gradient === 'neutralHigh'
                            ? 'textInverseDefault'
                            : 'textDefault'
                        }
                      >
                        {temperature}&deg; {unit}
                      </FText>
                    )}
                    <FText
                      color={
                        this.gradient === 'neutralHigh'
                          ? 'textInverseDefault'
                          : 'textDefault'
                      }
                    >
                      {this.getWeatherName}
                    </FText>
                  </FContainer>
                  {!isEmpty(location) && (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerSmall"
                    >
                      <FIcon
                        group="map-travel"
                        name="location"
                        size="16"
                        color={
                          this.gradient === 'neutralHigh'
                            ? 'iconNeutralInverse'
                            : 'iconNeutralDefault'
                        }
                        pressable={false}
                      />
                      <FText
                        appearance="captionReg12"
                        color={
                          this.gradient === 'neutralHigh'
                            ? 'textInverseDefault'
                            : 'textDefault'
                        }
                      >
                        {location}
                      </FText>
                    </FContainer>
                  )}
                </FContainer>
                <FContainer width="64px" height="64px">
                  <fc-image
                    name={this.getWeatherIconName}
                    height={64}
                  ></fc-image>
                </FContainer>
              </FContainer>
            )}
            {this.size === 'small' && (
              <FContainer
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
              >
                <FContainer
                  display="flex"
                  flexDirection="column"
                  gap="containerMedium"
                >
                  <FContainer
                    display="flex"
                    flexDirection="column"
                    gap="containerSmall"
                  >
                    {!isEmpty(temperature) && (
                      <FText appearance="headingMed20">
                        {temperature}&deg; {unit}
                      </FText>
                    )}
                    <FText color="textDescription">{this.getWeatherName}</FText>
                  </FContainer>
                  {!isEmpty(location) && (
                    <FContainer
                      display="flex"
                      alignItems="center"
                      gap="containerSmall"
                    >
                      <FIcon
                        group="map-travel"
                        name="location"
                        size="16"
                        pressable={false}
                        color="iconNeutralLight"
                      />
                      <FText appearance="captionReg12" color="textCaption">
                        {location}
                      </FText>
                    </FContainer>
                  )}
                </FContainer>
                <FContainer
                  height="76px"
                  width="76px"
                  gradient={this.gradient}
                  borderRadius="high"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FContainer height="40px" width="40px">
                    <fc-image
                      name={this.getWeatherIconName}
                      height={40}
                    ></fc-image>
                  </FContainer>
                </FContainer>
              </FContainer>
            )}
          </FContainer>
        </FWidgetCard>
      </Container>
    )
  },
}
</script>

<style scoped></style>
