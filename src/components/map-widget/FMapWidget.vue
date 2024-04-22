<script>
import { FContainer, FWidgetCard, FText, FIcon } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import GmapVue, { components } from 'gmap-vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import dlv from 'dlv'
import Vue from 'vue'

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyAJ9myxeE3qCem4Yx-ksyp0TVR7jvBAHFA',
    libraries: 'places,visualization,drawing',
    v: 3.42,
  },
  installComponents: true,
})

Vue.component('gmap-cluster', components.Cluster)

const SIZE_HASH = {
  small: 20,
  medium: 30,
  large: 40,
}

export default {
  name: 'FMapWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    mapProperties: {
      type: Object,
      default: () => ({
        center: {
          address:
            'Kathipara Flyover, Gandhi Nagar Alandur, Chennai 600016, Tamil Nadu, India',
          lat: 13.00773,
          lng: 80.204798,
        },
        location: {
          address:
            'Kathipara Flyover, Gandhi Nagar Alandur, Chennai 600016, Tamil Nadu, India',
          lat: 13.00773,
          lng: 80.204798,
        },
        zoom: 15,
      }),
    },
    moreDetails: {
      type: Boolean,
      default: false,
    },
    showRightIcon: {
      type: Boolean,
      default: false,
    },
    svg: {
      type: undefined,
      default: `<svg width="400" height="510" viewBox="0 0 40 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse opacity="0.1" cx="19.8264" cy="48.3832" rx="8.08224" ry="1.76598" fill="#192432"/>
<path d="M36.7653 0H2.88959C1.29372 0 0 1.29372 0 2.88959V36.194C0 37.7899 1.29372 39.0836 2.88959 39.0836H12.4098L18.0105 47.7002C18.862 49.0104 20.7792 49.0104 21.6307 47.7002L27.2313 39.0836H36.7626C38.3585 39.0836 39.6522 37.7899 39.6522 36.194V2.88959C39.6522 1.29372 38.3585 0 36.7626 0H36.7653Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9525 38.0836L18.8489 47.1552C19.3061 47.8586 20.3351 47.8587 20.7922 47.1553L26.6887 38.0836H36.7626C37.8062 38.0836 38.6522 37.2376 38.6522 36.194V2.88959C38.6522 1.84601 37.8062 1 36.7626 1H2.88959C1.84601 1 1 1.84601 1 2.88959V36.194C1 37.2376 1.84601 38.0836 2.88959 38.0836H12.9525ZM36.7653 0C38.3599 0.00148337 39.6522 1.29464 39.6522 2.88959V36.194C39.6522 37.7899 38.3585 39.0836 36.7626 39.0836H27.2313L21.6307 47.7002C20.7792 49.0104 18.862 49.0104 18.0105 47.7002L12.4098 39.0836H2.88959C1.29372 39.0836 0 37.7899 0 36.194V2.88959C0 1.29372 1.29372 0 2.88959 0H36.7653Z" fill="#DBDBDB"/>
<path d="M33.1418 4.29883H6.50929C5.323 4.29883 4.36133 5.2605 4.36133 6.44679V32.6344C4.36133 33.8207 5.323 34.7823 6.50929 34.7823H33.1418C34.3281 34.7823 35.2898 33.8207 35.2898 32.6344V6.44679C35.2898 5.2605 34.3281 4.29883 33.1418 4.29883Z" fill="#0059D6"/>
<path d="M27.3655 15.0172C27.3655 15.0172 20.5697 15.0275 20.4767 15.0482V12.1254C20.4767 11.2681 19.7848 10.5762 18.9275 10.5762C18.7933 10.5762 11.9355 12.4249 11.9355 12.4249C11.2642 12.6108 10.7891 13.2201 10.7891 13.9224V27.0184C10.7891 27.8756 11.481 28.5676 12.3383 28.5676H27.3655C28.2227 28.5676 28.9147 27.8756 28.9147 27.0184V16.5664C28.9147 15.7092 28.2227 15.0172 27.3655 15.0172ZM19.1857 27.2869H12.3383C12.1937 27.2869 12.0801 27.1733 12.0801 27.0287V13.9328C12.0801 13.8192 12.1627 13.7159 12.266 13.6849L18.8552 11.8878C18.8552 11.8878 18.8965 11.8878 18.9275 11.8878C19.0618 11.8878 19.1857 12.0014 19.1857 12.146V27.2972V27.2869ZM27.6237 27.0287C27.6237 27.1733 27.5101 27.2869 27.3655 27.2869H20.5284V16.5664C20.5284 16.4218 20.642 16.3082 20.7866 16.3082H27.3758C27.5204 16.3082 27.634 16.4218 27.634 16.5664V27.0184L27.6237 27.0287ZM17.7605 24.5706V25.3452C17.7605 25.4898 17.6469 25.6034 17.5023 25.6034H13.8875C13.7429 25.6034 13.6293 25.4898 13.6293 25.3452V24.5706C13.6293 24.426 13.7429 24.3124 13.8875 24.3124H17.5023C17.6469 24.3124 17.7605 24.426 17.7605 24.5706ZM17.7605 14.883V15.6576C17.7605 15.8021 17.6469 15.9158 17.5023 15.9158H13.8875C13.7429 15.9158 13.6293 15.8021 13.6293 15.6576V14.883C13.6293 14.7384 13.7429 14.6248 13.8875 14.6248H17.5023C17.6469 14.6248 17.7605 14.7384 17.7605 14.883ZM17.7605 18.1053V18.8799C17.7605 19.0245 17.6469 19.1381 17.5023 19.1381H13.8875C13.7429 19.1381 13.6293 19.0245 13.6293 18.8799V18.1053C13.6293 17.9607 13.7429 17.8471 13.8875 17.8471H17.5023C17.6469 17.8471 17.7605 17.9607 17.7605 18.1053ZM17.7605 21.3276V22.1022C17.7605 22.2468 17.6469 22.3604 17.5023 22.3604H13.8875C13.7429 22.3604 13.6293 22.2468 13.6293 22.1022V21.3276C13.6293 21.183 13.7429 21.0694 13.8875 21.0694H17.5023C17.6469 21.0694 17.7605 21.183 17.7605 21.3276ZM23.193 24.55V25.3246C23.193 25.4692 23.0794 25.5828 22.9348 25.5828H22.1395C21.9949 25.5828 21.8813 25.4692 21.8813 25.3246V24.55C21.8813 24.4054 21.9949 24.2918 22.1395 24.2918H22.9348C23.0794 24.2918 23.193 24.4054 23.193 24.55ZM23.193 18.095V18.8696C23.193 19.0142 23.0794 19.1278 22.9348 19.1278H22.1395C21.9949 19.1278 21.8813 19.0142 21.8813 18.8696V18.095C21.8813 17.9504 21.9949 17.8368 22.1395 17.8368H22.9348C23.0794 17.8368 23.193 17.9504 23.193 18.095ZM23.193 21.3173V22.0919C23.193 22.2365 23.0794 22.3501 22.9348 22.3501H22.1395C21.9949 22.3501 21.8813 22.2365 21.8813 22.0919V21.3173C21.8813 21.1727 21.9949 21.0591 22.1395 21.0591H22.9348C23.0794 21.0591 23.193 21.1727 23.193 21.3173ZM26.405 24.5396V25.3142C26.405 25.4588 26.2914 25.5724 26.1468 25.5724H25.3516C25.207 25.5724 25.0934 25.4588 25.0934 25.3142V24.5396C25.0934 24.395 25.207 24.2814 25.3516 24.2814H26.1468C26.2914 24.2814 26.405 24.395 26.405 24.5396ZM26.405 18.0846V18.8592C26.405 19.0038 26.2914 19.1174 26.1468 19.1174H25.3516C25.207 19.1174 25.0934 19.0038 25.0934 18.8592V18.0846C25.0934 17.94 25.207 17.8264 25.3516 17.8264H26.1468C26.2914 17.8264 26.405 17.94 26.405 18.0846ZM26.405 21.307V22.0816C26.405 22.2262 26.2914 22.3398 26.1468 22.3398H25.3516C25.207 22.3398 25.0934 22.2262 25.0934 22.0816V21.307C25.0934 21.1624 25.207 21.0488 25.3516 21.0488H26.1468C26.2914 21.0488 26.405 21.1624 26.405 21.307Z" fill="#FCFEFF"/>
</svg>`,
    },
  },
  data: () => ({
    mapOptions: {
      maxZoom: 16,
      gestureHandling: 'cooperative',
      disableDefaultUI: true,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      scrollwheel: false,
      streetViewControl: false,
      zoomControl: false,
    },
    mapStyle: {
      width: '100%',
      height: '100%',
    },
    defaultIcon: false,
  }),
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    isFooterRequired() {
      let { title, description } = this
      return !isEmpty(title) || !isEmpty(description)
    },
    sizeUnit() {
      let { size = 'medium' } = this
      return SIZE_HASH[size]
    },
    getCustomIcon() {
      let { sizeUnit } = this
      const googleMaps = dlv(window, 'google.maps')
      if (googleMaps) {
        let icon = {
          url:
            'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.svg),
          scaledSize: new window.google.maps.Size(sizeUnit, sizeUnit + 10),
        }
        return icon
      } else return null
    },
  },
  mounted() {
    setTimeout(() => {
      this.defaultIcon = true
    }, 350)
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
  },
  render() {
    const Container = styled(FContainer)``
    return (
      <FWidgetCard size={this.size}>
        <FContainer
          height="100%"
          width="100%"
          display="flex"
          flexDirection={this.size !== 'small' ? 'column' : 'row-reverse'}
          gap="containerXLarge"
          overflow="hidden"
          justifyContent="center"
        >
          <Container
            overflow="hidden"
            borderRadius="high"
            minHeight="76px"
            minWidth="76px"
            flex="1"
          >
            <gmap-map
              center={this.mapProperties.center}
              zoom={this.mapProperties.zoom}
              options={this.mapOptions}
              style={this.mapStyle}
              ref="mapView"
            >
              <gmap-cluster>
                {this.defaultIcon && (
                  <gmap-marker
                    class="gmarker"
                    position={this.mapProperties.location}
                    clickable={true}
                    draggable={false}
                    icon={this.getCustomIcon}
                  ></gmap-marker>
                )}
              </gmap-cluster>
            </gmap-map>
          </Container>
          {this.isFooterRequired && (
            <FContainer
              borderRadius="high"
              backgroundColor={
                this.size !== 'small'
                  ? 'backgroundMidgroundSubtle'
                  : 'backgroundCanvas'
              }
              padding="containerLarge"
              display="flex"
              flexDirection="column"
              gap="containerMedium"
              overflow="hidden"
              justifyContent="center"
            >
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerMedium"
                justifyContent="space-between"
              >
                <FText
                  color="textDescription"
                  appearance="captionReg12"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {this.description}
                </FText>{' '}
                {this.showRightIcon && (
                  <FIcon
                    group="map-travel"
                    name="direction"
                    size="16"
                    color="iconPrimaryDefault"
                    pressable={false}
                    cursor="pointer"
                    vOn:click={() => this.$emit('onDirectionClick')}
                  ></FIcon>
                )}
              </FContainer>
              <FContainer>
                <FText appearance="captionMed12" class="map-widget-title">
                  {this.title}
                </FText>
              </FContainer>
              {this.moreDetails && (
                <FContainer display="flex" alignItems="center">
                  Component need to be build
                </FContainer>
              )}
            </FContainer>
          )}
        </FContainer>
      </FWidgetCard>
    )
  },
}
</script>

<style scoped>
.map-widget-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
