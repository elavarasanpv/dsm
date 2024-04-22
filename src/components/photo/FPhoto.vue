<script>
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { FModal, FText, FMenuItem, FButton, FContainer } from '../../index'
import { isEmpty } from '../../utils/validation'
import { Dropdown, Menu, Upload } from 'ant-design-vue'

export default {
  name: 'FPhoto',
  mixins: [ThemeMixin],
  props: {
    uploadPhoto: {
      type: Function,
      default: () => {},
    },
    removePhoto: {
      type: Function,
      default: () => {},
    },
    value: {
      type: undefined,
      default: null,
    },
  },
  data() {
    return {
      showPhotoDialog: false,
      isUploading: false,
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    },
    openPhoto() {
      if (this.hasGetUserMedia()) {
        this.showPhotoDialog = true
        this.$nextTick(() => {
          let player = this.$refs.player
          const constraints = {
            video: { width: { exact: 600 }, height: { exact: 350 } },
          }
          navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            ;(player || {}).srcObject = stream
          })
        })
      }
    },
    closePhotoDialog() {
      let player = this.$refs.player
      if (player.srcObject) {
        player.srcObject.getVideoTracks().forEach((track) => track.stop())
      }
      this.showPhotoDialog = false
    },
    captureImg() {
      this.$emit('uploading')
      let canvasElement = this.$refs.canvas
      let player = this.$refs.player
      let canvasContext = canvasElement.getContext('2d')
      canvasContext.drawImage(
        player,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      )
      this.$nextTick(() => {
        let dataUrl = canvasElement.toDataURL('image/png')
        this.modelValue = dataUrl
        fetch(dataUrl)
          .then((res) => res.blob())
          .then(async (blob) => {
            blob.name = blob.name || `file 1.png`
            this.addImgFile(blob)
          })
        player.srcObject.getVideoTracks().forEach((track) => track.stop())
        this.showPhotoDialog = false
      })
    },
    async addImgFile(blob) {
      this.isUploading = true
      await this.uploadPhoto(blob)
      this.isUploading = false
    },
    deletePhoto() {
      this.modelValue = null
      if (!isEmpty(this.removePhoto)) this.removePhoto()
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    uploadPhotoFile(fileObj) {
      let { file } = fileObj || {}
      const fileReader = new FileReader()
      fileReader.addEventListener('load', (event) => {
        this.modelValue = event.target.result
      })
      fileReader.readAsDataURL(file)
      this.addImgFile(file)
    },
  },
  render() {
    let { styleProps, modelValue } = this || {}
    const Wrapper = styled('div')`
      ${this.getStyle('wrapper')}
    `
    const Element = styled('div')`
      ${styleProps}
    `
    const SelectedPhotoContainer = styled('div')`
      ${this.getStyle('selectedPhotoContainer')}
    `
    const ImageContainer = styled('img')`
      ${this.getStyle('imageContainer')}
    `

    return (
      <div>
        {!isEmpty(modelValue) ? (
          <Dropdown style="width:200px">
            <SelectedPhotoContainer>
              <ImageContainer src={this.modelValue} />
            </SelectedPhotoContainer>
            <Menu
              slot="overlay"
              style="padding:0px"
              multiple
              selectable
              id="dsm-facilio-dropdown"
            >
              <FMenuItem value="1" vOn:click={() => this.deletePhoto()}>
                {this.$t('dsm.attachment.remove', 'Remove')}
              </FMenuItem>
            </Menu>
          </Dropdown>
        ) : (
          <Wrapper>
            <Element vOn:click={this.openPhoto}>
              <fc-icon
                group="dsm"
                name="camera"
                size="30"
                style="margin-bottom:4px"
              ></fc-icon>
              <FText>{this.$t('dsm.attachment.add_photo', 'Add Photo')}</FText>
            </Element>
            <Upload
              name="file"
              style="width:100%"
              showUploadList={false}
              customRequest={this.uploadPhotoFile}
              accept="image/png, image/jpeg"
            >
              <Element>
                <FText marginBottom="containerLarge">
                  {this.$t(
                    'dsm.attachment.single_file_upload',
                    'Single File Upload'
                  )}
                </FText>
                <FButton>
                  {this.$t('dsm.attachment.browse_files', 'Browse Files')}
                </FButton>
              </Element>
            </Upload>
          </Wrapper>
        )}

        <FModal
          title="Add Photo"
          visible={this.showPhotoDialog}
          confirmLoading={this.isUploading}
          cancelText={this.cancelText}
          width={650}
          saveText={this.saveText}
          vOn:ok={this.captureImg}
          vOn:cancel={this.closePhotoDialog}
        >
          <FContainer
            padding="containerXLarge sectionSmall"
            display="flex"
            justifyContent="center"
          >
            <video ref="player" autoplay></video>
            <canvas
              ref="canvas"
              width="320"
              height="240"
              style="display: none"
            ></canvas>
          </FContainer>
        </FModal>
      </div>
    )
  },
}
</script>
