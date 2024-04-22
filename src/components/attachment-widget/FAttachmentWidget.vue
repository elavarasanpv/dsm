<script>
import {
  FContainer,
  FWidgetCard,
  FText,
  FButton,
  FIcon,
  FProgressBar,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { Upload } from 'ant-design-vue'
import styled from 'vue-emotion'
import { isEmpty } from '../../utils/validation'
import dlv from 'dlv'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)
export default {
  name: 'FAttachmentWidget',
  mixins: [ThemeMixin],
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['medium', 'large'].includes(value)
      },
    },
    title: {
      type: String,
      default: 'Attachments',
    },
    uploadText: {
      type: String,
      default: 'Upload File',
    },
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
    fileType: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    timeZone: {
      type: String,
      default: 'Etc/UTC',
    },
  },
  data: () => ({
    filesStatus: {},
    disabled: false,
    isFileDelete: false,
    filesList: [],
    currentFiles: 0,
    sec: 0,
    fileindex: 0,
  }),
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    modelValue: {
      get() {
        return this.value || []
      },
      set(value) {
        this.$emit('input', value)
        let checkValid = dlv(this, '$parent.checkValid')
        if (!isEmpty(checkValid)) checkValid()
      },
    },
    isFilesEmpty() {
      let { modelValue } = this || {}
      return isEmpty(modelValue)
    },
    reverseList() {
      let { filesList = [] } = this
      return filesList.reverse()
    },
  },
  watch: {
    modelValue: {
      async handler(newValue, oldValue) {
        this.fileindex = 0
        if (!this.isFileDelete) {
          let timerInterval
          timerInterval = setInterval(() => {
            this.sec = this.sec + 1
          }, 50)
          let presentVal = oldValue.length
          let oldValueIds = (oldValue || []).map((file) => file.uid)
          let value = (newValue || []).filter(
            (file) => !oldValueIds.includes(file.uid)
          )
          console.log(newValue, oldValue, 'newold')
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
          console.log(fileUrl, 'fileUrl')
          if (!isEmpty(fileUrl)) {
            console.log(presentVal)
            const newArray = this.filesList.slice(-presentVal)
            console.log(newArray, 'newArray')
            this.filesList = []
            let updatedFile = fileUrl.map((object) =>
              isEmpty(object.uid) ? { ...object, uid: object.id } : object
            )
            this.filesList = [...newArray, ...updatedFile]
          }
          console.log('uploading over')
          clearInterval(timerInterval)
          this.sec = 200
          setTimeout(() => {
            this.filesStatus = value.reduce(
              (prevObj, file) => ({ ...prevObj, [file.uid]: 'UPLOADED' }),
              {}
            )
            this.sec = 0
          }, 500)
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
    beforeUpload() {
      return false
    },
    bytesToSize(bytes) {
      if (!isEmpty(bytes)) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]})`
        return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
      } else {
        return ''
      }
    },
    async setModel(val) {
      this.$emit('uploading')
      let { multiple } = this || {}
      let { file, fileList } = val || {}
      if (!multiple) {
        this.modelValue = [file]
      } else {
        this.modelValue = fileList.reverse()
        this.filesList.push(fileList[this.fileindex])
        this.fileindex = this.fileindex + 1
      }
    },
    async deleteFile(activeFile) {
      let { modelValue, disabled, filesList } = this || {}
      this.isFileDelete = true
      if (!disabled) {
        if (!isEmpty(this.removeFile)) {
          this.disabled = true
          await this.removeFile(activeFile)
          this.modelValue = modelValue.filter(
            (file) => file.uid !== (activeFile || {}).uid
          )
          this.filesList = filesList.filter(
            (file) => file.uid !== (activeFile || {}).uid
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
        this.filesList = this.filesList.reverse()
      }
    },
    getBody() {
      let { reverseList, filesStatus } = this || {}
      const Container = styled(FContainer)`
        ${this.getStyle('file')}
      `
      return reverseList.map((file) => {
        let type = file.type.split('/')
        return (
          <Container
            display="flex"
            padding="containerMedium"
            gap="containerLarge"
            class="main-container"
          >
            <FContainer>
              {' '}
              <FIcon
                group="file-extensions-colored"
                name={type[1]}
                size="20"
                pressable={false}
              />
            </FContainer>
            <FContainer
              overflow="hidden"
              textOverflow="ellipsis"
              display="flex"
              flexDirection="column"
              gap="containerSmall"
              width="100%"
            >
              {' '}
              <FContainer
                overflow="hidden"
                textOverflow="ellipsis"
                display="flex"
                justifyContent="space-between"
              >
                <FText
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  appearance="captionReg12"
                  height="24px"
                >
                  {file.name}
                </FText>
                <FContainer display="none" class="f-image-hover">
                  <FButton
                    appearance="tertiary"
                    size="small"
                    iconButton={true}
                    iconName="download"
                    iconGroup="connectivity"
                    vOn:click={() => {
                      this.$emit('onDownload', file)
                    }}
                  />
                  <FButton
                    appearance="tertiary"
                    size="small"
                    iconButton={true}
                    iconName="delete"
                    iconGroup="action"
                    vOn:click={() => {
                      this.deleteFile(file)
                    }}
                  />
                </FContainer>
              </FContainer>
              {filesStatus[file.uid] !== 'UPLOADING' && (
                <FContainer display="flex" alignItems="center">
                  <FContainer overflow="hidden" display="flex">
                    <FText
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      appearance="captionReg10"
                      color="textCaption"
                      title={`Uploaded by ${file.uploadedBy}`}
                    >
                      Uploaded by {file.uploadedBy}
                    </FText>
                  </FContainer>
                  <FContainer width="12px" height="4px">
                    <FContainer
                      borderRadius="high"
                      backgroundColor="iconNeutralLight"
                      height="4px"
                      width="4px"
                      margin="containerNone containerMedium"
                    />
                  </FContainer>
                  <FContainer>
                    <FText
                      whiteSpace="nowrap"
                      appearance="captionReg10"
                      color="textCaption"
                    >
                      {dayjs
                        .tz(file.uploadedTime, this.timeZone)
                        .format('DD/MM/YYYY HH:mm')}
                    </FText>
                  </FContainer>
                  <FContainer width="12px" height="4px">
                    <FContainer
                      borderRadius="high"
                      backgroundColor="iconNeutralLight"
                      height="4px"
                      width="4px"
                      margin="containerNone containerMedium"
                    />
                  </FContainer>
                  <FContainer>
                    <FText
                      whiteSpace="nowrap"
                      appearance="captionReg10"
                      color="textCaption"
                    >
                      {this.bytesToSize(file.size)}
                    </FText>
                  </FContainer>
                </FContainer>
              )}
              {filesStatus[file.uid] === 'UPLOADING' && (
                <FProgressBar max={200} progress={this.sec} />
              )}
            </FContainer>
          </Container>
        )
      })
    },
  },
  render() {
    let { computedStyleProps, title, uploadText } = this
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `
    return (
      <Container>
        <FWidgetCard size={this.FWidgetCard}>
          <FContainer
            display="flex"
            flexDirection="column"
            height="100%"
            gap="containerXLarge"
          >
            <FContainer
              height="24px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FText appearance="headingMed14">{title}</FText>
              <Upload
                name="file2"
                multiple={this.multiple}
                vOn:change={this.setModel}
                showUploadList={false}
                defaultFileList={this.modelValue}
                fileList={this.modelValue}
                beforeUpload={this.beforeUpload}
                accept={this.fileType}
              >
                <FButton
                  appearance="secondary"
                  size="small"
                  iconGroup="connectivity"
                  iconName="upload"
                  iconPosition="prefix"
                >
                  {uploadText}
                </FButton>
              </Upload>
            </FContainer>
            <FContainer
              height="100%"
              display="flex"
              border="1px solid"
              borderColor="borderNeutralBaseSubtler"
              borderRadius="high"
              padding="containerLarge"
              gap="containerMedium"
              flexDirection="column"
              overflow="scroll"
            >
              {this.getBody()}
            </FContainer>
          </FContainer>
        </FWidgetCard>
      </Container>
    )
  },
}
</script>

<style scoped>
.main-container:hover .f-image-hover {
  opacity: 1;
  display: flex;
}
</style>
