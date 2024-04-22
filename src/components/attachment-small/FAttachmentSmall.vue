<script>
import { FText, FSpinner, FIcon, FContainer } from '../../index'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'
import dlv from 'dlv'
import { Upload } from 'ant-design-vue'
import { isEmpty } from '../../utils/validation'
fcIcon(window)

export default {
  name: 'FAttachmentSmall',
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
    fileType: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    filesStatus: {},
    disabled: false,
  }),
  computed: {
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
  },
  watch: {
    modelValue: {
      async handler(newValue, oldValue) {
        let oldValueIds = (oldValue || []).map((file) => file.uid)
        let value = (newValue || []).filter(
          (file) => !oldValueIds.includes(file.uid)
        )
        this.filesStatus = value.reduce(
          (prevObj, file) => ({ ...prevObj, [file.uid]: 'UPLOADING' }),
          {}
        )
        await this.uploadFile(value)
        this.filesStatus = value.reduce(
          (prevObj, file) => ({ ...prevObj, [file.uid]: 'UPLOADED' }),
          {}
        )
      },
    },
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    beforeUpload() {
      return false
    },
    async setModel(val) {
      this.$emit('uploading')
      let { multiple } = this || {}
      let { file, fileList } = val || {}
      if (!multiple) {
        this.modelValue = [file]
      } else {
        this.modelValue = fileList
      }
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
    async deleteFile(activeFile) {
      let { modelValue, disabled } = this || {}
      if (!disabled) {
        if (!isEmpty(this.removeFile)) {
          this.disabled = true
          let removableFile = await this.removeFile(activeFile)
          this.modelValue = modelValue.filter(
            (file) => file.uid !== (removableFile || {}).uid
          )
          this.disabled = false
        } else {
          this.modelValue = modelValue.filter(
            (file) => file.uid !== activeFile.uid
          )
        }
      }
    },
    uploadComponent() {
      const EmptyContainer = styled('div')`
        ${this.getCustomStyle({ property: 'emptyContainer' })}
      `
      return (
        <Upload
          name="file"
          multiple={this.multiple}
          vOn:change={this.setModel}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          accept={this.fileType}
        >
          <EmptyContainer>
            <FText color="iconPrimaryHovered">
              {this.$t('dsm.attachment.upload_new_file', 'Upload file here')}
            </FText>
            <FIcon
              group="connectivity"
              name="upload"
              size="16"
              pressable={false}
              color="#1673f6ff"
            ></FIcon>
          </EmptyContainer>
        </Upload>
      )
    },
    filesListComponent() {
      let { modelValue, filesStatus, styleProps } = this || {}

      const Element = styled('div')`
        ${styleProps}
      `

      const FileContainer = styled('div')`
        ${this.getStyle('fileContainer')}
      `
      const FileItem = styled('div')`
        ${this.getStyle('fileItem')}
      `

      return (
        <Element>
          <FileContainer>
            {modelValue.map((file) => {
              return (
                <FileItem class="f-file-item-container">
                  <FContainer display="flex">
                    <FText marginRight="containerLarge">{file.name} </FText>
                    {filesStatus[file.uid] === 'UPLOADING' && (
                      <FSpinner size={16} />
                    )}
                  </FContainer>
                  <FContainer display="flex" alignItems="center">
                    <FContainer>
                      <FText appearance="captionReg12" color="textDescription">
                        {this.bytesToSize(file.size)}
                      </FText>
                    </FContainer>
                    <FContainer
                      class="f-upload-delete-icon"
                      vOn:click={() => this.deleteFile(file)}
                      display="flex"
                      cursor={!this.disabled ? 'pointer' : 'not-allowed'}
                    >
                      {filesStatus[file.uid] !== 'UPLOADING' && (
                        <FIcon
                          group="default"
                          name="trash-can"
                          size="14"
                          color="iconNeutralGrey01Light"
                          pressable={false}
                          margin="containerNone containerMedium"
                        />
                      )}
                    </FContainer>
                  </FContainer>
                </FileItem>
              )
            })}
          </FileContainer>
        </Element>
      )
    },
  },
  render() {
    const { isFilesEmpty } = this || {}
    return (
      <div>
        {isFilesEmpty ? this.uploadComponent() : this.filesListComponent()}
      </div>
    )
  },
}
</script>

<style scoped>
.f-upload-delete-icon {
  visibility: hidden;
}
.f-file-item-container:hover .f-upload-delete-icon {
  visibility: visible;
}
</style>
