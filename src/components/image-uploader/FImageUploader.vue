<script>
import {
  FContainer,
  FText,
  FIcon,
  FEmptyState,
  FButton,
  FShimmer,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { Upload } from 'ant-design-vue'
import { isEmpty } from '../../utils/validation'
import dlv from 'dlv'
import styled from 'vue-emotion'
export default {
  name: 'FImageUploader',
  mixins: [ThemeMixin],
  props: {
    value: {
      type: undefined,
      default: '',
    },
    uploadFile: {
      type: Function,
      default: () => {},
    },
    removeFile: {
      type: Function,
      default: undefined,
    },
    height: {
      type: String,
      default: '100%',
    },
    maxCount: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: 'Photos',
    },
    description: {
      type: String,
      default: 'Supported Formats - JPEG, PNG',
    },
    emptyCard: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    emptyCardTitle: {
      type: String,
      default: 'No Images Yet',
    },
    emptyCardDescription: {
      type: String,
      default:
        'It seems like there are no images to display in this album or collection',
    },
  },
  data: () => ({
    filesStatus: {},
    disabled: false,
    filesList: [],
    currentFiles: 0,
    isFileDelete: false,
  }),
  computed: {
    modelValue: {
      get() {
        return this.value.map((object) =>
          isEmpty(object.uid) ? { ...object, uid: object.id } : object
        )
      },
      set(value) {
        this.$emit('input', value)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
  },
  watch: {
    modelValue: {
      async handler(newValue, oldValue) {
        if (!this.isFileDelete) {
          let presentVal = oldValue.length
          let oldValueIds = (oldValue || []).map((file) => file.uid)
          let value = (newValue || []).filter(
            (file) => !oldValueIds.includes(file.uid)
          )
          if (newValue.length === oldValue.length) {
            const newArray = newValue.filter(
              (element, index) => index > this.currentFiles - 1
            )
            presentVal = this.currentFiles
            value = newArray
          }
          this.filesStatus = value.reduce(
            (prevObj, file) => ({ ...prevObj, [file.uid]: 'UPLOADING' }),
            {}
          )
          let fileUrl = await this.uploadFile(value)
          if (!isEmpty(fileUrl)) {
            const newArray = this.filesList.slice(0, presentVal)
            this.filesList = []
            let updatedFile = fileUrl.map((object) =>
              isEmpty(object.uid) ? { ...object, uid: object.id } : object
            )
            this.filesList = [...newArray, ...updatedFile]
          }
          this.filesStatus = value.reduce(
            (prevObj, file) => ({ ...prevObj, [file.uid]: 'UPLOADED' }),
            {}
          )
        }
        setTimeout(() => {
          this.isFileDelete = false
        }, 1)
      },
    },
  },
  created() {
    if (!isEmpty(this.value)) {
      this.filesList = this.value
      this.filesList = this.filesList.map((object) =>
        isEmpty(object.uid) ? { ...object, uid: object.id } : object
      )
      this.currentFiles = this.filesList.length
    }
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    async setModel(val) {
      this.$emit('uploading')
      let { fileList } = val || {}
      this.modelValue = fileList
      this.filesList.push(fileList[fileList.length - 1])
    },
    beforeUpload() {
      return false
    },
    download(file) {
      this.$emit('onFileDownload', file)
    },
    onViewMoreClick(file) {
      this.$emit('onViewMoreClick', file)
    },
    async deleteFile(activeFile) {
      let { modelValue, disabled, filesList } = this || {}
      this.isFileDelete = true
      if (!disabled) {
        if (!isEmpty(this.removeFile)) {
          this.disabled = true
          let removableFile = await this.removeFile(activeFile)
          this.modelValue = modelValue.filter(
            (file) => file.uid !== (removableFile || {}).uid
          )
          this.filesList = filesList.filter(
            (file) => file.uid !== (removableFile || {}).uid
          )
          this.disabled = false
        } else {
          this.modelValue = modelValue.filter(
            (file) => file.uid !== activeFile.uid
          )
          this.filesList = filesList.filter(
            (file) => file.uid !== activeFile.uid
          )
        }
      }
    },
    getDefaultBody() {
      const Body = styled(FContainer)`
        ${this.getStyle('body')};
      `
      return (
        <Body padding="sectionSmall">
          <FEmptyState
            illustration="no-documents-found"
            vertical={false}
            size="S"
            title={this.emptyCardTitle}
            description={this.emptyCardDescription}
          >
            <template slot="buttons">
              <Upload
                name="file1"
                multiple={true}
                showUploadList={false}
                vOn:change={this.setModel}
                beforeUpload={this.beforeUpload}
                accept=".jpg,.jpeg,.png,.gif"
              >
                {' '}
                <FButton
                  appearance="secondary"
                  iconGroup="dsm"
                  iconName="upload"
                  iconPosition="prefix"
                >
                  <FText color="textMain" appearance="captionMed12">
                    Upload Image
                  </FText>
                </FButton>
              </Upload>
            </template>
          </FEmptyState>
        </Body>
      )
    },
    getUrl(file) {
      if (!isEmpty(file.url)) return file.url
      else return false
    },
    onImageClick(file) {
      this.$emit('onImageClick', file)
    },
    getContentBody() {
      let { maxCount } = this
      const UploadImage = styled(FContainer)`
        ${this.getStyle('uploadFile')};
      `
      const IconContainer = styled(FContainer)`
        ${this.getStyle('hoverIcon')};
      `
      return (
        <FContainer
          display="flex"
          alignItems="flex-start"
          gap="containerXLarge"
        >
          <Upload
            name="file2"
            multiple={true}
            showUploadList={false}
            vOn:change={this.setModel}
            beforeUpload={this.beforeUpload}
            defaultFileList={this.modelValue}
            fileList={this.modelValue}
            disabled={this.disable}
            accept=".jpg,.jpeg,.png,.gif"
          >
            <UploadImage
              cursor={this.disable ? 'not-allowed' : 'pointer'}
              opacity={this.disable ? '0.4' : '1'}
            >
              <FIcon
                group="action"
                name="circle-plus"
                size="24"
                pressable={false}
                color="iconPrimaryDefault"
              ></FIcon>
            </UploadImage>
          </Upload>
          {this.filesList.map((file, index) => {
            return (
              <FContainer
                height="80px"
                width="80px"
                justifyContent="center"
                alignItems="center"
                borderRadius="high"
                backgroundColor="backgroundCanvas"
                overflow="hidden"
                display={maxCount > 0 && index > maxCount - 1 ? 'none' : 'flex'}
              >
                {this.filesStatus[file.uid] === 'UPLOADING' ? (
                  <FContainer
                    height="80px"
                    width="80px"
                    backgroundColor="backgroundMidgroundDark"
                  >
                    <FShimmer height={80} width={80} />
                  </FContainer>
                ) : (
                  <FContainer
                    class="main-container"
                    position="relative"
                    height="80px"
                    width="80px"
                    backgroundImage={`url('${this.getUrl(file)}')`}
                    hover-backgroundColor="backgroundBlanket"
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    vOn:mouseleave={() => this.hoverHandler(file.uid, false)}
                    vOn:mouseover={() => this.hoverHandler(file.uid, true)}
                  >
                    <FContainer
                      height="100%"
                      width="100%"
                      alignItems="flex-end"
                      display="flex"
                      justifyContent="center"
                      id={file.uid}
                      visibility="hidden"
                    >
                      <FContainer
                        display="flex"
                        width="100%"
                        gap="containerXLarge"
                        padding="containerXLarge"
                      >
                        <IconContainer
                          zIndex="2"
                          cursor={!this.disabled ? 'pointer' : 'not-allowed'}
                          hover-backgroundColor="backgroundCanvas"
                          vOn:click={() => this.download(file)}
                        >
                          <FIcon
                            group="connectivity"
                            name="download"
                            size="16"
                            pressable={false}
                            color="iconNeutralDefault"
                          />
                        </IconContainer>
                        <IconContainer
                          zIndex="2"
                          cursor={!this.disabled ? 'pointer' : 'not-allowed'}
                          hover-backgroundColor="backgroundCanvas"
                          vOn:click={() => this.deleteFile(file)}
                        >
                          <FIcon
                            group="action"
                            name="delete"
                            size="16"
                            pressable={false}
                            color="iconNeutralDefault"
                          />
                        </IconContainer>
                      </FContainer>
                    </FContainer>
                    <FContainer
                      vOn:click={() => this.onImageClick(file)}
                      class="f-image-hover"
                      backgroundColor="backgroundBlanket"
                    ></FContainer>
                  </FContainer>
                )}
              </FContainer>
            )
          })}
          {maxCount > 0 && this.filesList.length > maxCount && (
            <FContainer
              height="80px"
              width="80px"
              justifyContent="center"
              alignItems="flex-end"
              display="flex"
              padding="containerXLarge"
              borderRadius="high"
              backgroundColor="backgroundBlanket"
              backdropFilter="blur(16px)"
              cursor="pointer"
              vOn:click={() => this.onViewMoreClick(this.filesList[maxCount])}
            >
              <FContainer
                backgroundColor="backgroundCanvas"
                padding="containerMedium containerLarge"
                borderRadius="medium"
              >
                <FText> + {this.filesList.length - maxCount}</FText>
              </FContainer>
            </FContainer>
          )}
        </FContainer>
      )
    },
    hoverHandler(id, val) {
      const myDiv = document.getElementById(id)
      if (val) {
        myDiv.style.visibility = 'visible'
      } else {
        myDiv.style.visibility = 'hidden'
      }
    },
  },
  render() {
    let { modelValue, styleProps, title, description, emptyCard } = this || {}
    const Container = styled(FContainer)`
      ${styleProps};
    `
    return (
      <Container>
        {!isEmpty(title) && (
          <FContainer>
            <FText
              appearance="captionReg12"
              color="textMain"
              hover-text-decoration="underline"
            >
              {title}
            </FText>
          </FContainer>
        )}
        {isEmpty(modelValue) && emptyCard
          ? this.getDefaultBody()
          : this.getContentBody()}
        {!isEmpty(description) && (
          <FContainer display="flex" gap="containerMedium">
            <FIcon
              group="dsm"
              name="info"
              size="14"
              pressable={false}
              color="iconNeutralLight"
            />
            <FText appearance="captionReg12" color="textCaption">
              {description}
            </FText>
          </FContainer>
        )}
      </Container>
    )
  },
}
</script>

<style scoped>
.main-container:hover .f-image-hover {
  opacity: 1;
}
.f-image-hover {
  position: absolute;
  z-index: 1;
  width: 80px;
  height: 80px;
  opacity: 0;
  transition: all 0.3s;
  top: 0px;
}
</style>
