<script>
import {
  FContainer,
  FWidgetCard,
  FIcon,
  FText,
  FTooltip,
  FButton,
  FDropdown,
  FAvatar,
  FDivider,
  FAvatarGroup,
  FInput,
  FTags,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { isEmpty } from '../../utils/validation'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { PluginKey } from 'prosemirror-state'
import { sanitize } from '../richtext/utils.js'
import Mention from '@tiptap/extension-mention'
import CommentMarkdowns from './CommentMarkdowns.vue'
import SettingsPopup from './SettingsPopup'
import { getSuggestions } from './comment-suggestions.js'
import cloneDeep from 'lodash/cloneDeep'
// import dlv from 'dlv'
import styled from 'vue-emotion'
const PEOPLE_MENTION_CLASS = 'comment-mentions-people'
const RECORD_MENTION_CLASS = 'comment-mentions-record'
const MENTIONS_TYPE_HASH = {
  people: 1,
  role: 2,
  team: 3,
  record: 4,
}
const SUGGESTIONS_TYPE = {
  PEOPLE: 'people',
  ROLE: 'role',
  TEAM: 'team',
  RECORD: 'record',
}
export default {
  name: 'FCommentsWidget',
  mixins: [ThemeMixin],
  props: {
    // value: {
    //   type: String,
    //   default: '',
    // },
    record: {
      type: Array,
      default: () => [],
    },
    getMentions: {
      type: Function,
      default: () => {},
    },
    uploadFile: {
      type: Function,
      default: () => {},
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => {
        return ['large'].includes(value)
      },
    },
    title: {
      type: String,
      default: 'Comments',
    },
    charLimit: {
      type: Number,
      default: 500,
    },
    placeholder: {
      type: String,
      default: 'Add a comment',
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
    moduleName: {
      type: String,
      default: 'workorder',
    },
    comments: {
      type: Array,
      default: () => {
        return []
      },
    },
    userObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    saveBtn: {
      type: String,
      default: 'Comment',
    },
    cancelBtn: {
      type: String,
      default: 'Clear',
    },
    apps: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editor: null,
      optionsArray: [
        { label: 'Private', value: 1 },
        { label: 'Public', value: 2 },
      ],
      selectedOption: 1,
      selectedText: 'Private',
      isAddingNotes: true,
      comment: { bodyHTML: '' },
      newCommand: false,
      value: '',
      isReplyEditor: false,
      replyComment: {},
      showReplies: false,
      commentReplies: {},
      isWidgetCrated: false,
      attachments: [],
      isFileUploading: false,
      markdownshow: false,
      isEdit: false,
      editComment: {},
      sharingOptions: [],
    }
  },
  computed: {
    computedStyleProps() {
      return this.computePlaceholderStyles(this.$attrs)
    },
    isDefault() {
      let { comments } = this
      return isEmpty(comments)
    },
    // modelValue: {
    //   get() {
    //     return this.value || []
    //   },
    //   set(value) {
    //     this.$emit('input', value)
    //     let checkValid = dlv(this, '$parent.checkValid')
    //     if (!isEmpty(checkValid)) checkValid()
    //   },
    // },
    atMention() {
      const CommentSuggestions = getSuggestions(this)
      return Mention.extend({ name: 'atMention' }).configure({
        HTMLAttributes: {
          class: PEOPLE_MENTION_CLASS,
        },
        renderLabel({ node }) {
          return `@${node.attrs.label ?? node.attrs.id}`
        },
        suggestion: {
          ...CommentSuggestions,
          char: '@',
          pluginKey: new PluginKey('atKey'),
          items: () => {
            return {
              triggerFunction: this.getMentions,
              type: 'people',
              moduleName: 'people',
            }
          },
        },
      })
    },
    slashMention() {
      const CommentSuggestions = getSuggestions(this)
      return Mention.extend({ name: 'slashMention' }).configure({
        HTMLAttributes: {
          class: RECORD_MENTION_CLASS,
        },
        renderLabel({ node }) {
          return `/${node.attrs.label ?? node.attrs.id}`
        },

        suggestion: {
          ...CommentSuggestions,
          parent: this,
          char: '/',
          pluginKey: new PluginKey('slashKey'),
          items: () => {
            return {
              triggerFunction: this.getMentions,
              type: 'record',
              moduleName: this.moduleName,
            }
          },
        },
      })
    },
  },
  created() {
    this.init()
  },
  mounted() {
    setTimeout(() => {
      this.isWidgetCrated = true
    }, 2000)
  },
  methods: {
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    init() {
      let { value, readOnly, placeholder, onUpdate, atMention, slashMention } =
        this

      this.editor = new Editor({
        content: value || '',
        editable: !readOnly,
        onUpdate,
        extensions: [
          StarterKit,
          Link,
          Placeholder.configure({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            placeholder: placeholder || 'Add a comment',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
          CharacterCount.configure({
            limit: this.charLimit,
          }),
          atMention,
          slashMention,
        ],
      })
      if (this.autofocus) {
        this.editor.chain().focus()
      }
    },
    onUpdate({ editor }) {
      let html = editor.getHTML()
      let isNotEmpty = !isEmpty(editor.getText)
      let hasChanged = sanitize(html) !== sanitize(this.content)

      if (isNotEmpty || hasChanged) {
        // this.content = html
        // this.$emit('input', isNotEmpty ? sanitize(html) : null)
        this.value = isNotEmpty ? sanitize(html) : null
      }
    },
    commentMoreOptions(comment) {
      let { userObj } = this || {}
      if ((comment.createdBy || {}).id === userObj.id) {
        return [
          { label: 'Edit', value: 'edit' },
          { label: 'Delete', value: 'delete' },
        ]
      }
      return false
    },
    triggerPeopleMention() {
      this.editor.chain().insertContent('@').focus().run()
    },
    recordMentionButton() {
      this.editor.chain().insertContent('/').focus().run()
    },
    getMentionIcon() {
      return (
        <FTooltip>
          <template slot="title">
            <FText>Mention People</FText>
          </template>
          <FIcon
            size="16"
            group="text-edit"
            name="at"
            color="iconNeutralDefault"
            vOn:click={() => this.triggerPeopleMention()}
          ></FIcon>
        </FTooltip>
      )
    },
    getSlashIcon() {
      return (
        <FTooltip>
          <template slot="title">
            {' '}
            <FText>Mention Record</FText>
          </template>
          <FIcon
            size="16"
            group="text-edit"
            name="record-mention"
            color="iconNeutralDefault"
            vOn:click={() => this.recordMentionButton()}
          ></FIcon>
        </FTooltip>
      )
    },
    getMarkdown() {
      return (
        <FTooltip>
          <template slot="title">
            <FText>Markdowns</FText>
          </template>
          <FIcon
            size="16"
            group="text-edit"
            name="markup"
            color="iconNeutralDefault"
            vOn:click={() => (this.markdownshow = true)}
          ></FIcon>
        </FTooltip>
      )
    },
    handleDropdown(option) {
      this.selectedText = option.label
    },
    getHeader() {
      let { title } = this
      return (
        <FContainer height="24px" display="flex" alignItems="center">
          <FText appearance="headingMed14">{title}</FText>
        </FContainer>
      )
    },
    getCommentHeader() {
      let { title } = this
      return (
        <FContainer
          height="24px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FText appearance="headingMed14">{title}</FText>
          <FButton
            size="small"
            appearance="secondary"
            vOn:click={() => this.openEditor()}
          >
            Add New {this.getSingular(title)}
          </FButton>
        </FContainer>
      )
    },
    getSingular(word) {
      if (word.endsWith('s')) {
        return word.slice(0, -1)
      }
      return word
    },
    getReplyHeader() {
      return (
        <FContainer
          height="24px"
          display="flex"
          alignItems="center"
          gap="containerLarge"
        >
          <FIcon
            group="navigation"
            name="left"
            size="12"
            vOn:click={() => this.onReplyClick({}, false)}
          />
          <FText appearance="headingMed14">Reply</FText>
        </FContainer>
      )
    },
    getCommentRepliesHeader() {
      return (
        <FContainer
          height="24px"
          display="flex"
          alignItems="center"
          gap="containerLarge"
        >
          <FIcon
            group="navigation"
            name="left"
            size="12"
            vOn:click={() => this.showReplie({}, false)}
          />
          <FText appearance="headingMed14">Replies</FText>
        </FContainer>
      )
    },
    openEditor() {
      this.newCommand = true
    },
    getFiles() {
      const Input = styled(FInput)`
        display: none !important;
      `
      return (
        <FTooltip>
          <template slot="title">
            <FText>Attach Files</FText>
          </template>
          <label>
            <Input
              class="hidden"
              type="file"
              multiple
              vOn:change={this.fileChange}
            />
            <FIcon
              size="16"
              group="text-edit"
              name="attachment"
              color="iconNeutralDefault"
            ></FIcon>
          </label>
        </FTooltip>
      )
    },
    async fileChange(event) {
      console.log(event, 'jii')
      let file = event.target.files
      this.isFileUploading = true
      let uploadingFileList = Array.from(file)

      if (!uploadingFileList.length) return

      let addFilePromises = []
      uploadingFileList.forEach(async (file) => {
        let attachment = {
          isUploading: true,
          isFailed: false,
          fileId: -1,
          fileName: file.name,
          fileSize: file.size,
          contentType: file.type,
          error: null,
          previewUrl: null,
          type: 1,
        }
        this.attachments.push(attachment)
        addFilePromises.push(this.addFile(file, attachment))
      })

      await Promise.all(addFilePromises).then(
        () => (this.isFileUploading = false)
      )
    },
    async addFile(file, attachment) {
      const formData = new FormData()
      formData.append('fileContent', file)
      let response = await this.uploadFile(formData)
      let { data, error } = response
      if (isEmpty(data)) {
        attachment.isFailed = true
        attachment.error = error?.message || 'Upload failed'
        attachment.isUploading = false
      } else {
        attachment.fileId = data.fileInfo.fileId
        attachment.isUploading = false
      }
    },
    getFooter() {
      let sharings = this.editComment ? this.editComment.commentSharing : []
      const Footer = styled(FContainer)`
        ${this.getStyle('toolbar')}
      `
      return (
        <Footer justifyContent="space-between">
          <FContainer display="flex" gap="containerLarge">
            {' '}
            {this.getMentionIcon()} {this.getSlashIcon()} {this.getFiles()}{' '}
            {this.getMarkdown()}
          </FContainer>
          <FContainer display="flex" gap="containerLarge">
            <SettingsPopup
              apps={this.apps}
              sharings={sharings}
              vOn:setAccess={(val) => this.setSharingPermissions(val)}
            />
            <FButton appearance="secondary" vOn:click={() => this.reset()}>
              {this.cancelBtn}
            </FButton>
            <FButton
              vOn:click={() => this.saveNote()}
              disabled={this.isFileUploading}
            >
              {this.saveBtn}
            </FButton>
          </FContainer>
        </Footer>
      )
    },
    getEditor() {
      const Editor = styled(EditorContent)`
        ${this.getStyle('inputStyles')};
        .comment-mentions-people,
        .comment-mentions-record {
          color: var(--colors-borderPrimaryDefault);
        }
        overflow: scroll;
      `
      return (
        <FContainer
          height="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Editor
            ref="NotesEditor"
            editor={this.editor}
            class="richtext-content"
          />
          <FContainer display="flex" alignItems="center">
            <FContainer
              flex="1"
              display="flex"
              gap="containerMedium"
              flexWrap="wrap"
            >
              {(this.attachments || []).map((attachment) => {
                return (
                  <FContainer>
                    <FTooltip
                      key={attachment.fileId}
                      style="pointer-events: all"
                    >
                      <template slot="title">
                        {attachment.isUploading
                          ? 'Uploading...'
                          : attachment.isFailed
                          ? attachment.error || 'Failed to upload'
                          : this.prettyBytes(attachment.fileSize)}
                      </template>
                      <FTags
                        text={
                          attachment.isFailed
                            ? '⚠ ' + attachment.fileName
                            : attachment.fileName
                        }
                        disabled={attachment.isUploading}
                        appearance="action"
                        actionType="removable"
                      ></FTags>
                    </FTooltip>
                  </FContainer>
                )
              })}
            </FContainer>
            <FText
              appearance="captionReg12"
              color="textCaption"
              width="125px"
              textAlign="right"
            >
              {this.editor.storage.characterCount.characters()}/{this.charLimit}{' '}
              characters
            </FText>
          </FContainer>
        </FContainer>
      )
    },
    prettyBytes(size) {
      let UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let absSize = Math.abs(size)
      let prettyBytes = ''

      if (Number.isFinite(size)) {
        if (absSize >= 1) {
          let exponent = Math.min(
            Math.floor(Math.log10(absSize) / 3),
            UNITS.length - 1
          )
          let numStr = Number(
            (absSize / Math.pow(1000, exponent)).toPrecision(3)
          )
          let unit = UNITS[exponent]
          prettyBytes = `${numStr} ${unit}`
        } else {
          prettyBytes = `${absSize} B`
        }
      }

      return size < 0 ? `-${prettyBytes}` : `${prettyBytes}`
    },
    setSharingPermissions(val) {
      if (!isEmpty(val)) {
        let ids = (val || []).forEach((app) => {
          let sample = { appId: parseInt(app) }
          this.sharingOptions.push(sample)
        })
      }
    },
    saveNote() {
      let comment = this.setupNewComment()
      let { isEdit, editComment } = this
      if (!comment || !comment.bodyHTML || !comment.body) return
      this.isAddingNotes = true
      console.log(comment, 'comment')
      let editObject = {}
      if (isEdit) {
        editObject = {
          edit: true,
          id: editComment.id || -1,
          parentId: editComment.parentId || -1,
        }
      }
      if (this.isReplyEditor) {
        editObject = {
          parentNote: this.replyComment,
        }
      }
      this.$emit('onsave', comment, editObject)
      this.isAddingNotes = false
      this.newCommand = false
      this.isEdit = false
      this.isReplyEditor = false
      this.replyComment = {}
      this.editComment = {}
      this.attachments = []
      this.sharingOptions = []
    },
    reset() {
      let editor = this.editor
      if (editor) {
        editor.commands.clearContent()
      }
      this.comment = {}
      this.newCommand = false
      this.editComment = {}
      this.attachments = []
      this.isReplyEditor = false
      this.replyComment = {}
    },
    editDeleteHandler(option, comment) {
      let { value: command } = option || {}
      if (command === 'delete') {
        this.$emit('delete', comment)
      }
      if (command === 'edit') {
        this.isEdit = true
        this.editComment = comment
        this.attachments = cloneDeep(comment?.attachments || [])
        const sanitizedHTML = sanitize(comment.bodyHTML)
        this.value = sanitizedHTML
        this.init()
        this.newCommand = true
      }
    },
    setupNewComment() {
      let {
        comment,
        parentNote,
        extractMentions,
        attachments,
        sharingOptions,
      } = this

      let editor = this.editor || {}

      if (!isEmpty(editor)) {
        if (!isEmpty(parentNote)) {
          comment.parentNote = parentNote
        }
        comment.body = editor.getText()
        comment.bodyHTML = editor.getHTML()
        comment.mentions = extractMentions()
        comment.attachments = attachments
        comment.commentSharing = sharingOptions
      }
      return comment
    },
    extractMentions() {
      let editor = this.editor || {}
      let mentions = []
      editor.getJSON()?.content?.forEach((element) => {
        element?.content?.forEach((item) => {
          if (item?.type === 'atMention' || item?.type === 'slashMention') {
            let MentionDetails = item?.attrs?.id.split('~')
            let MentionSource = MentionDetails[0]
            let recordId = MentionDetails[1]
            if (isNaN(MentionDetails[1])) {
              return
            }
            let mention = {
              mentionedRecordId: parseInt(recordId),
            }

            if (MentionSource in MENTIONS_TYPE_HASH) {
              this.$set(
                mention,
                'mentionType',
                MENTIONS_TYPE_HASH[MentionSource]
              )
            } else {
              this.$set(
                mention,
                'mentionType',
                MENTIONS_TYPE_HASH[SUGGESTIONS_TYPE.RECORD]
              )
              this.$set(mention, 'mentionedModuleName', MentionSource)
            }
            mentions.push(mention)
          }
        })
      })
      return mentions
    },
    commentContainer(comment) {
      let {
        createdBy,
        replyCount,
        commentSharing = [],
        replies = [],
        attachments = [],
      } = comment || {}
      let { name } = createdBy || {}
      let isReplyPresent = parseInt(replyCount) > 0
      let isCommentPrivate = isEmpty(commentSharing)
      let privacyIcon = isCommentPrivate ? 'lock' : 'unlock'
      let privacyText = isCommentPrivate ? 'Private' : 'Public'
      const sanitizedHTML = sanitize(comment.bodyHTML)
      const files =
        (replies || []).map((reply) => ({ userName: reply.createdBy.name })) ||
        []

      return (
        <FContainer display="flex" width="100%" gap="containerMedium">
          <FContainer
            width="40px"
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            alignItems="center"
            paddingBottom="containerXLarge"
            overflow="hidden"
            position="relative"
          >
            <FContainer>
              <FAvatar userName={name} />
            </FContainer>
            {isReplyPresent && <FDivider height="calc(100% - 40px)" />}
            {this.isReplyEditor && <FDivider height="calc(100% - 40px)" />}
            {this.showReplies && (
              <FDivider height="100%" position="absolute" top="32px" />
            )}
            {isReplyPresent && !this.isReplyEditor && (
              <FContainer position="relative" left="3px">
                <FAvatarGroup size="XS" userObject={files} />
              </FContainer>
            )}
          </FContainer>
          <FContainer
            width="100%"
            display="flex"
            flexDirection="column"
            gap="containerLarge"
            paddingBottom="containerXLarge"
          >
            <FContainer
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <FContainer
                display="flex"
                flexDirection="column"
                gap="containerSmall"
              >
                <FContainer
                  display="flex"
                  alignItems="center"
                  gap="containerMedium"
                >
                  {' '}
                  <FText appearance="headingMed14">{name}</FText>
                  <FIcon
                    group="communication"
                    name="reply-all-filled"
                    size="14"
                    pressable={false}
                  />
                </FContainer>
                <FContainer
                  height="16px"
                  display="flex"
                  gap="containerMedium"
                  alignItems="center"
                >
                  <FText appearance="captionReg12" color="textCaption">
                    Added 2 hr ago
                  </FText>
                  <FContainer
                    height="4px"
                    width="4px"
                    backgroundColor="iconNeutralMedium"
                    borderRadius="full"
                  />
                  <FContainer
                    display="flex"
                    gap="containerSmall"
                    alignItems="center"
                  >
                    <FIcon
                      group="action"
                      name={privacyIcon}
                      size="12"
                      pressable={false}
                    />
                    <FText appearance="captionReg12" color="textCaption">
                      {privacyText}
                    </FText>
                  </FContainer>
                </FContainer>
              </FContainer>
              {this.commentMoreOptions(comment) && (
                <FDropdown
                  options={this.commentMoreOptions(comment)}
                  split={false}
                  buttonProps={{ appearance: 'tertiary' }}
                  contentWidth="150px"
                  vOn:dropdown={(option) =>
                    this.editDeleteHandler(option, comment)
                  }
                >
                  <FIcon
                    group="action"
                    name="options-horizontal"
                    size="16"
                    color="textCaption"
                  ></FIcon>
                </FDropdown>
              )}
            </FContainer>
            <FContainer
              domPropsInnerHTML={sanitizedHTML}
              class="map-widget-title"
            />
            <FContainer
              display="flex"
              flexWrap="wrap"
              paddingTop="containerLarge"
            >
              {(attachments || []).map((file) =>
                this.attachmentContainer(file)
              )}
            </FContainer>
            {!this.isReplyEditor && (
              <FContainer
                height="16px"
                display="flex"
                alignItems="center"
                gap="containerMedium"
              >
                {isReplyPresent && (
                  <FButton
                    appearance="link"
                    size="small"
                    vOn:click={() => this.showReplie(comment, true)}
                  >
                    View {replyCount} Replies
                  </FButton>
                )}
                {isReplyPresent && (
                  <FContainer
                    height="4px"
                    width="4px"
                    backgroundColor="iconNeutralMedium"
                    borderRadius="full"
                  />
                )}
                <FButton
                  appearance="link"
                  iconGroup="communication"
                  iconName="reply"
                  size="small"
                  iconPosition="prefix"
                  vOn:click={() => this.onReplyClick(comment, true)}
                >
                  Reply
                </FButton>
              </FContainer>
            )}
          </FContainer>
        </FContainer>
      )
    },
    viewAttachment(file) {
      console.log(file, 'kokokok')
    },
    attachmentContainer(file) {
      return (
        <FContainer>
          <FContainer
            display="flex"
            maxWidth="200px"
            height="30px"
            border="solid 1px"
            borderColor="backgroundMidgroundDark"
            borderRadius="high"
            padding="containerMedium"
            vOn:click={() => this.viewAttachment(file)}
          >
            <FContainer
              display="flex"
              gap="containerMedium"
              alignItems="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              <FIcon
                pressable={false}
                group="file-upload-colored"
                name={this.getExtension(file.fileName)}
                size="16"
              ></FIcon>
              <FTooltip placement="top">
                <template slot="title">
                  {' '}
                  <FText>{file.fileName}</FText>
                </template>
                <FContainer
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <FText appearance="captionReg10">{file.fileName}</FText>
                </FContainer>
              </FTooltip>
            </FContainer>
          </FContainer>
        </FContainer>
      )
    },
    getExtension(fileName) {
      let contentArr = fileName.split('.')
      let format = contentArr[contentArr.length - 1]
      if (
        [
          'css',
          'doc',
          'docx',
          'gif',
          'html',
          'jpeg',
          'js',
          'json',
          'mp3',
          'mp4',
          'pdf',
          'png',
          'ppt',
          'pptx',
          'svg',
          'txt',
          'unsupported',
          'webp',
          'xlsx',
          'xml',
          'zip',
        ].includes(format)
      ) {
        return format
      } else if (format == 'pdf') {
        return 'pdf'
      } else if (['jpg', 'jpeg'].includes(format)) {
        return 'png'
      } else if (['docm', 'dot', 'dotx'].includes(format)) {
        return 'docx'
      } else if (['xls', 'xl', 'xll', 'xlm', 'xlsm'].includes(format)) {
        return 'xlsx'
      } else {
        return 'unsupported'
      }
    },
    showReplie(comment, val) {
      this.showReplies = val
      this.commentReplies = comment
      console.log(comment, 'show reply')
    },
    onReplyClick(note, val) {
      this.isReplyEditor = val
      this.replyComment = note
      console.log(note)
    },
  },
  render() {
    let { computedStyleProps, isDefault } = this
    const Container = styled(FContainer)`
      ${computedStyleProps}
    `

    const CommentsContainer = styled(FContainer)`
      ${this.getStyle('inputStyles')};
      .comment-mentions-people,
      .comment-mentions-record {
        color: var(--colors-borderPrimaryDefault);
      }
      overflow: scroll;
    `
    return (
      <Container class="comments-container">
        <FWidgetCard size={this.size}>
          {isDefault || this.newCommand ? (
            <FContainer
              display="flex"
              flexDirection="column"
              height="100%"
              gap="containerXLarge"
              class="animation-open"
            >
              {this.getHeader()}
              {this.getEditor()}
              {this.getFooter()}
            </FContainer>
          ) : (
            <CommentsContainer
              display="flex"
              flexDirection="column"
              height="100%"
              gap="containerXLarge"
            >
              {!this.isReplyEditor ? (
                !this.showReplies ? (
                  <FContainer
                    display="flex"
                    flexDirection="column"
                    gap="containerXLarge"
                    height="100%"
                    class="animation-open-first"
                  >
                    {this.getCommentHeader()}
                    <FContainer height="100%" overflow="scroll">
                      {this.comments.map((comment) =>
                        this.commentContainer(comment)
                      )}
                    </FContainer>
                  </FContainer>
                ) : (
                  <FContainer
                    display="flex"
                    flexDirection="column"
                    gap="containerXLarge"
                    height="100%"
                    class="animation-open"
                  >
                    {this.getCommentRepliesHeader()}
                    <FContainer height="100%" overflow="scroll">
                      {(this.commentReplies.replies || []).map((comment) =>
                        this.commentContainer(comment)
                      )}
                    </FContainer>
                  </FContainer>
                )
              ) : (
                <FContainer
                  display="flex"
                  flexDirection="column"
                  gap="containerXLarge"
                  height="100%"
                  class="animation-open"
                >
                  {this.getReplyHeader()}
                  <FContainer
                    height="100%"
                    overflow="scroll"
                    display="flex"
                    flexDirection="column"
                  >
                    <FContainer>
                      {this.commentContainer(this.replyComment)}
                    </FContainer>
                    <FContainer
                      display="flex"
                      width="100%"
                      height="100%"
                      gap="containerMedium"
                    >
                      <FContainer
                        width="40px"
                        display="flex"
                        justifyContent=" flex-start"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <FAvatar userName={this.userObj.name} />
                        <FDivider
                          height="20px"
                          position="relative"
                          top="-52px"
                          left="-0.5px"
                        />
                      </FContainer>
                      <FContainer
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        gap="containerXLarge"
                      >
                        <FContainer display="flex" flexDirection="column">
                          <FText appearance="headingMed14">
                            {this.userObj.name}
                          </FText>
                          <FText appearance="captionReg12" color="textCaption">
                            Reply to
                          </FText>
                          <FText></FText>
                        </FContainer>
                        {this.getEditor()}
                        {this.getFooter()}
                      </FContainer>
                    </FContainer>
                  </FContainer>
                </FContainer>
              )}
            </CommentsContainer>
          )}
          <CommentMarkdowns
            markdownshow={this.markdownshow}
            vOn:closeMark={() => (this.markdownshow = false)}
          />
        </FWidgetCard>
      </Container>
    )
  },
}
</script>

<style>
.map-widget-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.richtext-content .is-editor-empty:first-child:before {
  content: attr(data-placeholder);
  color: var(--colors-textCaption);
  position: absolute;
}
.richtext-content .tiptap {
  &:focus-visible {
    outline: unset;
  }
}
.richtext-content .comment-mentions-people,
.comment-mentions-record {
  color: var(--colors-borderPrimaryDefault);
}
.ProseMirror {
  padding-bottom: 25px;

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }
}
.rich-text-container {
  p:empty::after {
    content: '\00A0';
  }
}
@keyframes growAnimation {
  from {
    margin-left: 100%;
    width: 300%;
  }

  75% {
    margin-left: 25%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

/* .animation-open {
  animation: growAnimation 1000ms ease-in-out;
} */
.comments-container .animation-open {
  animation: move 400ms 1;
}
.comments-container {
  overflow: hidden;
}

@keyframes move {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
.comments-container .animation-open-first {
  animation: moveReverse 400ms 1;
}
@keyframes moveReverse {
  from {
    transform: translateX(-1000px);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
