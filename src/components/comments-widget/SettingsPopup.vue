<script>
import {
  FContainer,
  FButton,
  FPopover,
  FIcon,
  FText,
  FSwitch,
  FCheckboxGroup,
} from '../../index'
export default {
  name: 'SettingsPopup',
  props: {
    apps: {
      type: Array,
      default: () => [],
    },
    sharings: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      open: false,
      isPublic: false,
      selectedApps: [],
      public: false,
      appsArray: [],
    }
  },
  created() {
    let { sharings = [] } = this
    if (this.apps.length > 0) {
      this.appsArray = this.apps.map((app) => {
        const data = {
          ...app,
          label: app.label || app.name,
          value: app.value || app.id,
        }
        return data
      })
    }
    if (sharings && sharings.length > 0) {
      this.public = true
      this.isPublic = true
      sharings.forEach((share) => {
        this.selectedApps.push(share.appId.toString())
      })
    }
  },
  methods: {
    setAccess(val) {
      if (val) {
        let ids = []
        this.appsArray.forEach((app) => {
          ids.push(app.value.toString())
        })
        this.selectedApps = ids
        this.public = true
      } else {
        this.selectedApps = []
        this.public = false
      }
      this.$emit('setAccess', this.selectedApps)
    },
    setAppAccess() {
      if (this.selectedApps.length > 0) {
        this.public = true
        this.isPublic = true
      } else {
        this.public = false
        this.isPublic = false
      }
      this.$emit('setAccess', this.selectedApps)
    },
  },
  render() {
    let { apps = [] } = this
    return (
      <FContainer>
        <FPopover
          trigger="clickToOpen"
          v-model={this.open}
          placement="top"
          vOn:show={() => {
            this.open = true
          }}
        >
          <FContainer
            slot="content"
            display="flex"
            padding="containerXLarge"
            gap="containerXLarge"
            flexDirection="column"
          >
            <FContainer
              minWidth="177px"
              display="flex"
              flexDirection="column"
              gap="containerSmall"
            >
              <FContainer
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="18px"
              >
                <FText appearance="headingMed14">
                  {this.$t('actions.download', 'Public')}
                </FText>
                <FSwitch
                  v-model={this.isPublic}
                  vOn:change={(val) => this.setAccess(val)}
                  size="small"
                />
              </FContainer>
              <FText appearance="captionReg12" color="textCaption">
                Org & Portal Users can see this comment
              </FText>
            </FContainer>
            <FContainer>
              {apps.length > 0 && (
                <FCheckboxGroup
                  v-model={this.selectedApps}
                  vOn:change={this.setAppAccess}
                  options={this.appsArray}
                />
              )}
            </FContainer>
          </FContainer>
          <FContainer minWidth="112px">
            <FButton
              appearance="tertiary"
              iconGroup="action"
              iconName={this.public ? 'unlock' : 'lock'}
              iconPosition="prefix"
            >
              <FContainer
                display="flex"
                alignItems="center"
                gap="containerLarge"
                minWidth="70px"
                justifyContent="space-between"
              >
                {!this.public
                  ? this.$t('actions.download', 'Private')
                  : this.$t('actions.download', 'Public')}
                <FIcon
                  group="dsm"
                  name="chevron-down"
                  size="16"
                  pressable={false}
                ></FIcon>
              </FContainer>
            </FButton>
          </FContainer>
        </FPopover>
      </FContainer>
    )
  },
}
</script>
