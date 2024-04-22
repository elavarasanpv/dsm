<script>
import { FButton, FText, FSpinner, FIcon, FContainer } from '../../index'
import { Upload } from 'ant-design-vue'
import styled from 'vue-emotion'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import { defineCustomElements as fcIcon } from '@facilio/icons/dist/loader'
import dlv from 'dlv'
fcIcon(window)

export default {
  name: 'FAttachment',
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
    multiple: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '100%',
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
      const { multiple, height } = this || {}

      const EmptyContainer = styled('div')`
        ${this.getStyle('emptyContainer')}
        height:${height};
      `
      const UploadFButton = styled(FButton)`
        margin: 5px 0px 8px;
      `
      return (
        <Upload
          name="file"
          multiple={multiple}
          vOn:change={this.setModel}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
        >
          <EmptyContainer>
            {this.$t('dsm.attachment.drag_drop_here', 'Drag & drop here')}
            <br />
            {this.$t('dsm.attachment.or', 'or')}
            <UploadFButton>
              {this.$t('dsm.attachment.browse_files', 'Browse Files')}
            </UploadFButton>
          </EmptyContainer>
        </Upload>
      )
    },
    filesListComponent() {
      let { modelValue, multiple, filesStatus, styleProps } = this || {}
      const Element = styled('div')`
        ${styleProps}
      `
      const UploadFButton = styled(FButton)`
        margin: 0px 8px 0px 0px;
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
                          color="iconNeutralMain"
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
          <div style="display:flex;align-items:center">
            <Upload
              name="file2"
              multiple={multiple}
              vOn:change={this.setModel}
              showUploadList={false}
              defaultFileList={this.modelValue}
              fileList={this.modelValue}
              beforeUpload={this.beforeUpload}
            >
              <UploadFButton disabled={this.disabled}>
                {multiple
                  ? this.$t('dsm.attachment.browse_files', 'Browse Files')
                  : this.$t(
                      'dsm.attachment.upload_new_file',
                      'Upload New File'
                    )}
              </UploadFButton>
            </Upload>{' '}
            <FText color="textDescription">
              {this.$t(
                'dsm.attachment.file_size',
                'The file size must be less than 5 MB'
              )}
            </FText>
          </div>
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
