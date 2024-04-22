<script>
import { FContainer, FIcon, FModal, FText, FButton } from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import { v4 as uuid } from 'uuid'
import styled from 'vue-emotion'
export default {
  name: 'FFilePreview',
  mixins: [ThemeMixin],
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    previewFile: {
      type: Object,
      default: () => {},
    },
    isLockedState: {
      type: Boolean,
      default: false,
    },
    isTaskClosed: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    openPreview: {
      type: Boolean,
      default: true,
    },
    hideDownload: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    currentFile: {},
    canShowNext: true,
    canShowPrevious: true,
    zoom: 100,
  }),
  computed: {},
  watch: {
    zoom(newVal, oldVal) {
      let { $refs, currentFile } = this
      if (newVal !== oldVal && !isEmpty($refs[currentFile.uid])) {
        const container = document.getElementById(currentFile.uid)
        container.style.zoom = `${this.zoom}%`
      }
    },
  },
  created() {
    let { previewFile, files } = this
    if (isEmpty(previewFile)) {
      this.currentFile = files[0]
    } else {
      this.currentFile = previewFile
      this.checkForStatus()
    }
    if (!isEmpty(this.currentFile) && isEmpty(this.currentFile.uid)) {
      this.currentFile = {
        ...this.currentFile,
        uid: this.currentFile.id,
        kd: uuid(),
      }
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    checkForStatus() {
      let { files } = this || []
      const index = this.files.findIndex(
        (obj) => obj.uid === this.currentFile.uid
      )
      if (index !== -1 && index === 0) {
        this.canShowPrevious = false
      } else {
        this.canShowPrevious = true
      }
      if (index !== -1 && index === files.length - 1) {
        this.canShowNext = false
      } else {
        this.canShowNext = true
      }
    },
    closePhotoDialog() {
      this.$emit('close')
    },
    download() {
      this.$emit('onFileDownload', this.currentFile)
    },
    zoomImage(val) {
      this.zoom = this.zoom + val * 10
    },
    getFileType() {
      let { currentFile } = this || {}
      let { contentType } = currentFile
      if (contentType.includes('image')) {
        return 'image'
      } else if (contentType.includes('video')) {
        return 'video'
      }
    },
    plusSlides(val) {
      const index = this.files.findIndex(
        (obj) => obj.uid === this.currentFile.uid
      )
      if (index !== -1) {
        this.currentFile = this.files[index + val]
      }
      if (!isEmpty(this.currentFile) && isEmpty(this.currentFile.uid)) {
        this.currentFile = { ...this.currentFile, uid: this.currentFile.id }
      }
      this.checkForStatus()
    },
    getBodyContent() {
      const Body = styled(FContainer)`
        ${this.getStyle('bodyContainer')};
      `
      const Arrow = styled(FContainer)`
        ${this.getStyle('arrow')};
      `
      const MenuBar = styled(FContainer)`
        ${this.getStyle('menuBar')};
      `
      return (
        <Body
          height="564px"
          justifyContent="center"
          flexDirection="row"
          position="relative"
          overflow="hidden"
        >
          <MenuBar
            position="absolute"
            top="16px"
            justifyContent="space-between"
          >
            <FContainer
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="containerLarge"
            >
              <FIcon
                group="action"
                name="zoom-out"
                size="16"
                vOn:click={() => this.zoomImage(-1)}
              />
              <FIcon
                group="action"
                name="zoom-in"
                size="16"
                vOn:click={() => this.zoomImage(1)}
              />
            </FContainer>
            {!this.hideDownload && (
              <FContainer
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="containerLarge"
              >
                <FIcon
                  group="connectivity"
                  name="download"
                  size="16"
                  vOn:click={() => this.download()}
                />{' '}
                <FText>{this.$t('actions.download', 'Download')}</FText>
              </FContainer>
            )}
          </MenuBar>
          <Arrow
            cursor="pointer"
            position="absolute"
            left="24px"
            vOn:click={() => this.plusSlides(-1)}
            visibility={this.canShowPrevious ? 'visible' : 'hidden'}
          >
            <FIcon
              group="dsm"
              name="chevron-left"
              size="16"
              pressable={false}
            />
          </Arrow>
          <FContainer
            width="1028px"
            height="576px"
            overflow="scroll"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {this.getFileType() === 'image' && (
              <img
                key={this.currentFile.url}
                src={this.currentFile.url}
                ref={this.currentFile.uid}
                id={this.currentFile.uid}
                class="f-image-content"
              />
            )}
            {this.getFileType() === 'video' && (
              <video
                controls
                style="max-width: 533px;max-height: 355px;"
                key={this.currentFile.url}
              >
                <source
                  src={this.currentFile.url}
                  type={this.currentFile.type}
                />
                {this.$t(
                  'dsm.attachment.not_supported_file',
                  'Not supported file'
                )}
              </video>
            )}
            {this.getFileType() !== 'video' &&
              this.getFileType() !== 'image' && (
                <FContainer
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap="containerXxLarge"
                  padding="containerXxLarge"
                  borderColor="borderNeutralBaseSubtler"
                  borderRadius="medium"
                >
                  <FText appearance="headingMed16">
                    {this.$t(
                      'dsm.attachment.no_preview_available',
                      'No preview available'
                    )}
                  </FText>
                  <FButton vOn:click={() => this.download()}>
                    {this.$t('dsm.attachment.download', 'Download')}
                  </FButton>
                </FContainer>
              )}
          </FContainer>
          <Arrow
            cursor="pointer"
            position="absolute"
            right="24px"
            vOn:click={() => this.plusSlides(1)}
            visibility={this.canShowNext ? 'visible' : 'hidden'}
          >
            <FIcon
              group="dsm"
              name="chevron-right"
              size="16"
              pressable={false}
            />
          </Arrow>
        </Body>
      )
    },
  },
  render() {
    return (
      <FModal
        title={this.currentFile.name}
        visible={this.openPreview}
        size="L"
        hideFooter={true}
        onCancel={() => this.closePhotoDialog()}
      >
        {this.getBodyContent()}
      </FModal>
    )
  },
}
</script>

<style scoped>
.f-image-content {
  max-height: 100%;
  max-width: 100%;
}
</style>
