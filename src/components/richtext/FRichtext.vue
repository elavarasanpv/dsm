<script>
import {
  FContainer,
  FIcon,
  FTooltip,
  FDivider,
  FDropdown,
  FTags,
  FPopover,
  FText,
  FButton,
} from '../../index'
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import History from '@tiptap/extension-history'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import Color from '@tiptap/extension-color'
import BackgroundColor from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'

import FontSize from './extensions/fontsize'
import Link from './extensions/link'
import TableHeader from './extensions/tableHeader'
import Image from './extensions/image'
import TableCell from './extensions/tableCell'
import colors from './extensions/templateColors.js'
import Indent from './extensions/indent'
import { isEmpty } from '../../utils/validation'
import { sanitize } from './utils'
import toolOrder from './toolbar'
import styled from 'vue-emotion'
import dlv from 'dlv'
import getProperty from 'dlv'
const FORMAT_CHAIN_HASH = {
  italic: 'toggleItalic',
  bold: 'toggleBold',
  underline: 'toggleUnderline',
  strike: 'toggleStrike',
  bulletList: 'toggleBulletList',
  orderedList: 'toggleOrderedList',
  blockquote: 'toggleBlockquote',
  'indent-less': 'unsetBlockquote',
  'indent-more': 'setBlockquote',
  line: 'setHorizontalRule',
  heading: 'toggleHeading',
  link: 'setLink',
  unlink: 'unsetLink',
  undo: 'undo',
  redo: 'redo',
  fontfamily: 'setFontFamily',
  textalign: 'setTextAlign',
  addimage: 'setImage',
  table: 'insertTable',
  setColor: 'setColor',
  unsetColor: 'setColor',
  highlight: 'toggleHighlight',
  unsetHighlight: 'unsetHighlight',
}
const FORMAT_COMMAND_HASH = {
  small: 'setFontSize',
  unsetSmall: 'unsetFontSize',
}
const FONT_FAMILY = [
  { label: 'Inter', value: 'Inter', class: 'inter' },
  {
    label: 'Comic Sans',
    value: 'Comic Sans MS, Comic Sans',
    class: 'comic-Sans',
  },
  { label: 'Serif', value: 'serif', class: 'serif' },
  { label: 'Monospace', value: 'monospace', class: 'monospace' },
  { label: 'Cursive', value: 'cursive', class: 'cursive' },
  { label: 'Garamond', value: 'Garamond', class: 'garamond' },
  { label: 'Georgia', value: 'georgia', class: 'georgia' },
  { label: 'Sans-Serif', value: 'sans-serif', class: 'sans-serif' },
  { label: 'Tahoma', value: 'tahoma', class: 'tahoma' },
  { label: 'trebuchet ms', value: 'trebuchet ms', class: 'trebuchet-ms' },
  { label: 'Verdana', value: 'verdana', class: 'verdana' },
  { label: 'Default', value: '' },
]
const TABLE_FORMAT = {
  'Add Column Before': 'addColumnBefore',
  'Add Column After': 'addColumnAfter',
  'Delete Column': 'deleteColumn',
  'Add Row Before': 'addRowBefore',
  'Add Row After': 'addRowAfter',
  'Delete Row': 'deleteRow',
  'Delete Table': 'deleteTable',
  'Merge Cells': 'mergeCells',
  'Split Cell': 'splitCell',
  'Toggle Header Column': 'toggleHeaderColumn',
  'Toggle Header Row': 'toggleHeaderRow',
  'Toggle Header Cell': 'toggleHeaderCell',
  'Merge Or Split': 'mergeOrSplit',
  'Fix Tables': 'fixTables',
}
const SMALL_FONT_SIZE = 12
export default {
  name: 'FRichtext',
  components: {
    EditorContent,
  },
  mixins: [ThemeMixin],
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Enter text here',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    hideBorder: {
      type: Boolean,
      default: false,
    },
    uploadFile: {
      type: Function,
      default: () => {},
    },
    istoolbarPositionBottom: {
      type: Boolean,
      default: false,
    },
    customToolOrder: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    editor: null,
    html: null,
    toolsAvailable: [],
    fontFamilyList: FONT_FAMILY,
    selectedFontFamily: 'Default',
    row: 0,
    col: 0,
    textAlignTools: [
      { label: 'Left', value: 'left', name: 'left-align' },
      { label: 'Center', value: 'center', name: 'justify' },
      { label: 'Right', value: 'right', name: 'right-align' },
    ],
    imageTools: [
      { label: 'Upload Image', value: 'image', name: 'upload' },
      { label: 'By URL', value: 'byUrl', name: 'insert-link' },
    ],
    templateColors: colors,
    selectedBgColor: '',
    selectedTextColor: '',
    startIndex: 0,
    endIndex: 27,
    toolsOrder: [],
    preIndex: 0,
    positionIndex: [0],
    defaultStart: 0,
  }),
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
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
    fontOptions() {
      return [
        {
          label: 'Heading 1',
          level: 1,
          value: '1',
          isActive: (editor) => {
            return editor.isActive('heading', { level: 1 })
          },
          isHeading: true,
        },
        {
          label: 'Heading 2',
          level: 2,
          value: '2',
          isActive: (editor) => {
            return editor.isActive('heading', { level: 2 })
          },
          isHeading: true,
        },
        {
          label: 'Heading 3',
          level: 3,
          value: '3',
          isActive: (editor) => {
            return editor.isActive('heading', { level: 3 })
          },
          isHeading: true,
        },
        {
          label: 'Normal',
          value: '4',
          isActive: (editor) => {
            return editor.isActive('paragraph')
          },
          isHeading: false,
        },
        {
          label: 'Small',
          value: '5',
          isActive: (editor) => {
            let currentElementAttr = this.editor.getAttributes('textStyle')
            let { fontSize } = currentElementAttr || {}
            let currentFontSize = `${SMALL_FONT_SIZE}px`
            return editor.isActive('paragraph') && fontSize === currentFontSize
          },
          isHeading: false,
        },
      ]
    },
    textSize() {
      let { fontOptions, editor } = this || {}
      let currentTextSize = fontOptions[3]
      fontOptions.forEach((option) => {
        let { isActive } = option || {}
        if (!isEmpty(editor) && isActive(editor)) {
          currentTextSize = option
        }
      })
      return currentTextSize
    },
  },
  watch: {
    readOnly(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.editor.setOptions({
          editable: !newVal,
        })
      }
    },
    modelValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        let currentFamily = false
        this.selectedFontFamily = ''
        this.fontFamilyList.forEach((obj) => {
          currentFamily = this.editor.isActive('textStyle', {
            fontFamily: obj.value,
          })
          if (currentFamily) {
            this.selectedFontFamily = obj.label
            return
          }
        })
        if (this.selectedFontFamily === '') {
          this.selectedFontFamily = 'Default'
        }
      }
    },
  },
  mounted() {
    let { $refs } = this
    if (!isEmpty($refs.childRef)) {
      this.$refs.childRef.selected = {
        label: 'Normal',
        value: '4',
        isActive: (editor) => {
          return editor.isActive('paragraph')
        },
        isHeading: false,
      }
    }
    this.sortTools()
    if (!isEmpty(this.positionIndex)) {
      this.endIndex = this.positionIndex[1]
    }
  },
  created() {
    if (!isEmpty(toolOrder)) {
      this.toolsAvailable = toolOrder
    }
    this.init()
    this.arrangeTools()
  },
  methods: {
    init() {
      let { value, readOnly, onUpdate } = this

      this.editor = new Editor({
        content: value || '',
        extensions: this.extensionsList(),
        editable: !readOnly,
        onUpdate,
      })
    },
    arrangeTools() {
      let { customToolOrder, toolsAvailable } = this
      if (!isEmpty(customToolOrder)) {
        let tools = []
        customToolOrder.forEach((custool) => {
          let tool = toolsAvailable.find((tool) => tool.format === custool)
          if (tool) {
            tools.push(tool)
          }
          if (custool === 'separator') {
            tools.push(custool)
          }
        })
        this.toolsOrder = tools
      } else {
        this.toolsOrder = toolsAvailable
      }
    },
    sortTools() {
      let { $refs } = this
      let component = $refs['scrollableDiv']
      let { $el: element } = component || {}
      let parentWidth = element.clientWidth - 24 - 64
      if (this.defaultStart === 0) {
        parentWidth = element.clientWidth - 24 - 32
      }
      let children = this.$refs['toolItems'].$children
      let totalWidth = 0
      let end = 0
      let index = Array.from(children).find((child, index) => {
        if (index >= this.defaultStart) {
          let childWidth = child.$el.clientWidth
          totalWidth = totalWidth + childWidth
          if (parentWidth < totalWidth + (index - this.defaultStart) * 8) {
            end = index - 1
            this.positionIndex.push(index - 1)
            return index - 1
          }
        }
      })
      if (isEmpty(index)) {
        this.endIndex = 27
        this.positionIndex.push(27)
      } else {
        this.defaultStart = end + 1
        this.positionIndex.push(end + 1)
        this.sortTools()
      }
    },
    extensionsList() {
      let { placeholder } = this || {}
      return [
        Document,
        Paragraph,
        Text,
        History,
        Bold,
        Italic,
        Underline,
        Strike,
        ListItem,
        BulletList,
        OrderedList,
        TextStyle,
        FontFamily,
        Gapcursor,
        Blockquote,
        Indent,
        Color.configure({
          types: ['textStyle'],
        }),
        BackgroundColor.configure({
          multicolor: true,
        }),
        HorizontalRule,
        TableHeader,
        TableCell,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        Image,
        Heading.configure({ levels: [1, 2, 3] }),
        FontSize.configure({
          types: ['textStyle'],
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Link.configure({
          HTMLAttributes: {
            class: 'my-custom-class',
          },
          autolink: false,
          linkOnPaste: false,
        }),
        Placeholder.configure({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          placeholder,
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
      ]
    },
    onUpdate({ editor }) {
      let html = editor.getHTML()
      let formatedHtml = `<div class="rich-text-container">${html}</div>`
      let isNotEmpty = !isEmpty(this.htmlToText(html))
      let hasChanged = sanitize(html) !== sanitize(this.html)

      if (isNotEmpty || hasChanged) {
        this.html = formatedHtml
        this.modelValue = isNotEmpty ? sanitize(formatedHtml) : null
        // this.$emit('input', isNotEmpty ? sanitize(formatedHtml) : null)
      }
    },
    htmlToText(html) {
      let doc = new DOMParser().parseFromString(sanitize(html), 'text/html')
      let node = doc.firstChild
      let content = ''
      if (getProperty(node, 'innerText')) {
        content = getProperty(node, 'innerText')
      }
      if (isEmpty(content) && node.querySelector('img') !== null) {
        content = 'img'
      }
      return content
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    getToolBar() {
      let { toolsOrder, isRTL } = this || []
      const ToolBar = styled(FContainer)`
        ${this.getStyle('toolbar')}
      `
      return (
        <ToolBar height="40px" ref="scrollableDiv" overflow="hidden">
          {this.startIndex !== 0 && (
            <FContainer
              height="28px"
              position="absolute"
              left={!isRTL && '13px'}
              right={isRTL && '13px'}
              backgroundColor="backgroundMidgroundSubtle"
              display="flex"
              alignItems="center"
              width="38px"
              justifyContent="flex-end"
              zIndex="1"
            >
              {' '}
              <FButton
                appearance="secondary"
                vOn:click={() => this.scrollDiv(-1)}
                size="small"
                iconButton={true}
                iconGroup="navigation"
                iconName={!isRTL ? 'left' : 'right'}
              ></FButton>
            </FContainer>
          )}
          <FContainer
            display="flex"
            gap="containerLarge"
            alignItems="center"
            marginLeft={
              this.startIndex !== 0 && !isRTL
                ? 'sectionMedium'
                : 'containerNone'
            }
            marginRight={
              this.endIndex !== 27 && !isRTL ? 'sectionMedium' : 'containerNone'
            }
            marginRight={
              this.startIndex !== 0 && isRTL ? 'sectionMedium' : 'containerNone'
            }
            marginLeft={
              this.endIndex !== 27 && isRTL ? 'sectionMedium' : 'containerNone'
            }
            position="relative"
            left="0px"
            ref="toolItems"
          >
            {toolsOrder.map((tool, index) =>
              index >= this.startIndex && index <= this.endIndex
                ? this.toolsContainer(tool)
                : null
            )}
          </FContainer>
          {this.endIndex !== 27 && (
            <FContainer
              height="28px"
              position="absolute"
              right={!isRTL && '13px'}
              left={isRTL && '13px'}
              backgroundColor="backgroundMidgroundSubtle"
              display="flex"
              alignItems="center"
              width="38px"
              justifyContent="flex-start"
              zIndex="1"
            >
              <FButton
                appearance="secondary"
                vOn:click={() => this.scrollDiv(1)}
                size="small"
                iconButton={true}
                iconGroup="navigation"
                iconName={!isRTL ? 'right' : 'left'}
              ></FButton>
            </FContainer>
          )}
        </ToolBar>
      )
    },
    scrollDiv(val) {
      const start = this.positionIndex.indexOf(this.startIndex)
      const end = this.positionIndex.indexOf(this.endIndex)
      if (val === -1) {
        this.startIndex = this.positionIndex[start - 2]
        this.endIndex = this.positionIndex[end - 2]
      } else {
        this.startIndex = this.positionIndex[start + 2]
        this.endIndex = this.positionIndex[end + 2]
      }
    },
    getFontSizeFormater() {
      return (
        <FDropdown
          options={this.fontOptions}
          selectable={true}
          contentWidth="125px"
          ref="childRef"
          vOn:dropdown={(val) => this.setFontSize(val)}
        >
          <FTooltip mouseEnterDelay={0.25}>
            <template slot="title">
              {this.$t('dsm.richtext.size', 'Size')}
            </template>
            <FContainer
              height="28px"
              display="flex"
              alignItems="center"
              gap="containerMedium"
              padding="containerNone containerLarge"
              hover-backgroundColor="backgroundNeutralHovered"
              borderRadius="medium"
              cursor="pointer"
              width="52px"
            >
              <FIcon
                group="text-edit"
                name="font"
                size="16"
                pressable={false}
              />
              <FIcon
                group="text-edit"
                name="chevron-down"
                size="16"
                pressable={false}
              />
            </FContainer>
          </FTooltip>
        </FDropdown>
      )
    },
    getTextAlignFormater() {
      return (
        <FPopover placement="bottom" trigger="clickToOpen">
          <template slot="content">
            <FContainer
              width="50px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {this.textAlignTools.map((position) => {
                return (
                  <FContainer
                    padding="containerLarge"
                    hover-backgroundColor="backgroundAccentBlueSubtle"
                    margin="containerMedium"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius="medium"
                    color={
                      this.editor.isActive({ textAlign: position.value })
                        ? 'backgroundAccentBlueDark'
                        : 'iconNeutralMedium'
                    }
                    vOn:click={() => this.onTextAlign(position)}
                  >
                    <FIcon
                      style="visibility: visible;"
                      group="text-edit"
                      name={position.name}
                      size="16"
                      color="unset"
                      pressable={false}
                    />
                  </FContainer>
                )
              })}
            </FContainer>
          </template>
          <FTooltip mouseEnterDelay={0.25}>
            <template slot="title">
              {this.$t('dsm.richtext.align', 'Align')}
            </template>
            <FContainer
              height="28px"
              display="flex"
              alignItems="center"
              padding="containerNone containerLarge"
              cursor="pointer"
              hover-backgroundColor="backgroundNeutralHovered"
              borderRadius="medium"
              gap="containerMedium"
              width="52px"
            >
              <FIcon
                group="text-edit"
                name="left-align"
                size="16"
                pressable={false}
              />
              <FIcon
                group="text-edit"
                name="chevron-down"
                size="16"
                pressable={false}
              />
            </FContainer>
          </FTooltip>
        </FPopover>
      )
    },
    getFontFamilyFormater() {
      return (
        <FPopover placement="bottom" trigger="clickToOpen">
          <template slot="content">
            <FContainer maxHeight="290px" overflow="auto" width="135px">
              {this.fontFamilyList.map((family) => {
                return (
                  <FContainer
                    fontFamily={family.value}
                    fontSize="14px"
                    padding="containerLarge"
                    hover-backgroundColor="backgroundAccentBlueSubtle"
                    margin="containerMedium"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius="medium"
                    cursor="pointer"
                    backgroundColor={
                      this.selectedFontFamily === family.label
                        ? 'backgroundAccentBlueSubtle'
                        : 'backgroundCanvas'
                    }
                    vOn:click={() => this.selectFamily(family)}
                  >
                    {family.label}
                    {this.selectedFontFamily === family.label && (
                      <FIcon
                        name="check"
                        group="dsm"
                        size="14"
                        color="backgroundAccentBlueDark"
                        pressable={false}
                      />
                    )}
                  </FContainer>
                )
              })}
            </FContainer>
          </template>
          <FTooltip mouseEnterDelay={0.25}>
            <template slot="title">
              {this.$t('dsm.richtext.font', 'Font')}
            </template>
            <FContainer
              height="28px"
              display="flex"
              alignItems="center"
              padding="containerNone containerLarge"
              minWidth="128px"
              cursor="pointer"
            >
              <FTags
                appearance="action"
                text={this.selectedFontFamily}
                style="minWidth:110px;justify-content: space-between;"
              ></FTags>
            </FContainer>
          </FTooltip>
        </FPopover>
      )
    },
    getImageFormater() {
      return (
        <FDropdown
          options={this.imageTools}
          selectable={false}
          contentWidth="150px"
          ref="childRef"
          vOn:dropdown={(val) => this.onOptionsSelect(val)}
        >
          <template slot="menu.image">
            <FContainer display="flex" alignItems="center" gap="containerLarge">
              {' '}
              <FIcon
                group="text-edit"
                name="upload"
                size="16"
                pressable={false}
              />
              {this.$t('dsm.richtext.upload_image', 'Upload Image')}
            </FContainer>
          </template>
          <template slot="menu.byUrl">
            <FContainer display="flex" alignItems="center" gap="containerLarge">
              {' '}
              <FIcon
                group="text-edit"
                name="insert-link"
                size="16"
                pressable={false}
              />
              {this.$t('dsm.richtext.by_url', 'By URL')}
            </FContainer>
          </template>
          <FTooltip mouseEnterDelay={0.25}>
            <template slot="title">
              {this.$t('dsm.richtext.attach_file', 'Attach File')}
            </template>
            <FContainer
              height="28px"
              display="flex"
              alignItems="center"
              gap="containerMedium"
              padding="containerNone containerLarge"
              hover-backgroundColor="backgroundNeutralHovered"
              borderRadius="medium"
              cursor="pointer"
              width="52px"
            >
              <FIcon
                group="text-edit"
                name="image"
                size="16"
                pressable={false}
              />
              <FIcon
                group="text-edit"
                name="chevron-down"
                size="16"
                pressable={false}
              />
            </FContainer>
          </FTooltip>
        </FDropdown>
      )
    },
    onOptionsSelect(command) {
      if (command.value === 'image') {
        this.addPhoto()
      } else if (command.value === 'byUrl') {
        this.addByUrl()
      }
    },
    addByUrl() {
      const url = window.prompt('URL')
      if (url) {
        this.formatContent('addimage', { src: url })
      }
    },
    addPhoto() {
      let input = document.createElement('input')
      input.type = 'file'
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = async () => {
        let files = Array.from(input.files)
        let file = files[0] || {}
        let fileUrl = await this.uploadFile(file)
        this.addImage(fileUrl)
        console.log(file.name, 'formdata')
      }
      input.click()
    },
    addImage(result) {
      this.formatContent('addimage', { src: result })
    },
    getBgColorFormater(format) {
      return (
        <FPopover placement="bottom" trigger="clickToOpen">
          <template slot="content">
            <FContainer padding="containerLarge" width="310px">
              {this.getColorBox(format)}
            </FContainer>
          </template>
          {format === 'highlight' ? (
            <FTooltip mouseEnterDelay={0.25}>
              <template slot="title">
                {this.$t('dsm.richtext.background_color', 'Background color')}
              </template>
              <FContainer
                borderRadius="medium"
                width="28px"
                backgroundColor={
                  this.isActive({ color: this.selectedBgColor })
                    ? 'backgroundNeutralHovered'
                    : ''
                }
              >
                <FIcon group="text-edit" name="textbox-fill" size="16" />
              </FContainer>
            </FTooltip>
          ) : (
            <FTooltip mouseEnterDelay={0.25}>
              <template slot="title">
                {this.$t('dsm.richtext.text_color', 'Text color')}
              </template>
              <FContainer
                borderRadius="medium"
                width="28px"
                backgroundColor={
                  this.isActive({ color: this.selectedTextColor })
                    ? 'backgroundNeutralHovered'
                    : ''
                }
              >
                <FIcon group="text-edit" name="font-color" size="16" />
              </FContainer>
            </FTooltip>
          )}
        </FPopover>
      )
    },
    getColorBox(format) {
      let { templateColors } = this || []
      return (
        <FContainer
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="310px"
          flexWrap="wrap"
        >
          {' '}
          {templateColors.map((color) => {
            return (
              <FContainer
                height="25px"
                width="25px"
                borderRadius="full"
                overflow="hidden"
                margin="containerSmall"
                boxShadow="lightLow01"
                cursor="pointer"
                position="relative"
                vOn:click={() => this.selectedHignlightColor(color, format)}
              >
                <div
                  style={{
                    background: `${color}`,
                    height: '100%',
                    width: '100%',
                  }}
                ></div>
                {this.selectedBgColor === color && format === 'highlight' && (
                  <FContainer position="absolute" top="-2px" left="-2px">
                    <FIcon
                      group="action"
                      name="circle-tick"
                      color="iconNeutralDefault"
                      size="29"
                      pressable={false}
                    />
                  </FContainer>
                )}
                {this.selectedTextColor === color && format === 'setColor' && (
                  <FContainer position="absolute" top="-2px" left="-2px">
                    <FIcon
                      group="action"
                      name="circle-tick"
                      color="iconNeutralDefault"
                      size="29"
                      pressable={false}
                    />
                  </FContainer>
                )}
              </FContainer>
            )
          })}
        </FContainer>
      )
    },
    selectedHignlightColor(color, format) {
      if (format === 'highlight') {
        let { selectedBgColor } = this || {}

        if (color === selectedBgColor) {
          this.selectedBgColor = ''

          this.formatContent('unsetHighlight')
        } else {
          this.selectedBgColor = color
          this.formatContent('highlight', { color })
        }
      } else {
        let { selectedTextColor } = this || {}

        if (color === selectedTextColor) {
          this.selectedTextColor = ''
          this.formatContent('unsetColor')
        } else {
          this.selectedTextColor = color
          this.formatContent('setColor', color)
        }
      }
    },
    getTableFormater() {
      const maxRowCol = 10 // Replace with your desired value

      const items = Array.from({ length: maxRowCol }, (_, i) => i + 1)
      return (
        <FPopover placement="bottom" trigger="clickToOpen">
          <template slot="content">
            <FContainer
              display="flex"
              flexDirection="column"
              alignItems="center"
              padding="containerLarge"
            >
              {items.map((i) => {
                return (
                  <FContainer key={`row-${i}`} display="flex">
                    {items.map((j) => (
                      <FContainer
                        height="15px"
                        width="15px"
                        margin="containerSmall"
                        border="1px solid"
                        borderColor={
                          this.getTableClass(i, j)
                            ? 'borderPrimaryHovered'
                            : 'borderNeutralBaseSubtle'
                        }
                        backgroundColor={
                          this.getTableClass(i, j)
                            ? 'backgroundAccentBlueLight'
                            : 'backgroundMidgroundMedium'
                        }
                        borderRadius="low"
                        cursor="pointer"
                        ref={`${i}-${j}`}
                        class={this.getTableClass(i, j)}
                        vOn:mouseover={() => this.setHoveredCell(i, j)}
                        vOn:click={() => this.setSelectedTable(i, j)}
                      ></FContainer>
                    ))}
                  </FContainer>
                )
              })}
              <FText>
                {this.row}X{this.col}
              </FText>
            </FContainer>
          </template>
          <FTooltip mouseEnterDelay={0.25}>
            <template slot="title">
              {this.$t('dsm.richtext.table', 'Table')}
            </template>

            <FContainer width="28px" height="28px">
              <FIcon group="text-edit" name="table" size="16" />
            </FContainer>
          </FTooltip>
        </FPopover>
      )
    },
    getTableClass(currentRow, currentCol) {
      let { row } = this
      let { col } = this
      return currentRow <= row && currentCol <= col
        ? 'richtext-selectedCell'
        : ''
    },
    setHoveredCell(i, j) {
      this.row = i
      this.col = j
    },
    setSelectedTable(i, j) {
      this.formatContent('table', {
        rows: `${i}`,
        cols: `${j}`,
        withHeaderRow: true,
      })
    },
    selectFamily(key) {
      this.selectedFontFamily = key.label
      const fname = key.value
      if (fname == '') {
        this.editor.chain().focus().unsetFontFamily().run()
      } else {
        this.formatContent('fontfamily', fname)
      }
    },
    onTextAlign(command) {
      this.formatContent('textalign', command.value)
    },
    toolsContainer(tool) {
      if (typeof value !== 'object' && tool === 'separator') {
        return (
          <FContainer padding="containerNone containerMedium">
            <FDivider height="24px" />
          </FContainer>
        )
      } else if (tool.format === 'fontsize') {
        return <FContainer>{this.getFontSizeFormater()}</FContainer>
      } else if (tool.format === 'fontfamily') {
        return <FContainer>{this.getFontFamilyFormater()}</FContainer>
      } else if (tool.format === 'textalign') {
        return <FContainer>{this.getTextAlignFormater()}</FContainer>
      } else if (tool.format === 'table') {
        return <FContainer>{this.getTableFormater()}</FContainer>
      } else if (tool.format === 'addimage') {
        return <FContainer>{this.getImageFormater()}</FContainer>
      } else if (tool.format === 'highlight' || tool.format === 'setColor') {
        return <FContainer>{this.getBgColorFormater(tool.format)}</FContainer>
      } else {
        let { format, content, icon } = tool || {}
        return (
          <FContainer
            borderRadius="medium"
            backgroundColor={
              this.isActive(tool.format) ? 'backgroundNeutralHovered' : ''
            }
            width="28px"
          >
            <FTooltip mouseEnterDelay={0.25}>
              <template slot="title">
                {this.$t(`dsm.richtext.${format}`, `${content}`)}
              </template>
              <FIcon
                vOn:click={() =>
                  tool.format === 'link'
                    ? this.showLinkPrompt()
                    : this.formatContent(format)
                }
                group="text-edit"
                name={icon}
                size="16"
              />
            </FTooltip>
          </FContainer>
        )
      }
    },
    isActive(type, params = null) {
      let { editor } = this || {}
      let { isActive } = editor || {}
      if (!isEmpty(editor) && !isEmpty(isActive)) {
        if (!isEmpty(params)) {
          return (editor || {}).isActive(type, params)
        } else {
          return (editor || {}).isActive(type)
        }
      }
      return false
    },
    formatContent(type, params = null) {
      let formatChainName = FORMAT_CHAIN_HASH[type] || TABLE_FORMAT[type] || {}
      let formatCommandName = FORMAT_COMMAND_HASH[type] || {}
      if (!isEmpty(formatChainName)) {
        if (formatChainName === 'setBlockquote') this.editor.commands.indent()
        else if (formatChainName === 'unsetBlockquote')
          this.editor.commands.outdent()
        else {
          this.editor.chain().focus()[formatChainName](params).run()
        }
      } else if (!isEmpty(formatCommandName)) {
        this.editor.commands[formatCommandName](params)

        this.editor.chain().focus().run()
      }
    },
    showLinkPrompt() {
      let { editor = {} } = this || {}
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      if (url !== null) {
        if (url === '') {
          this.formatContent('unlink')
          return
        } else {
          this.formatContent('link', { href: url })
        }
      }
    },
    setFontSize(option) {
      let { level, isHeading, label } = option || {}
      let { textSize } = this || {}
      if (isHeading) {
        // unset small font size
        this.formatContent('unsetSmall')
        this.formatContent('heading', { level })
      } else {
        let { level } = textSize || {}
        if (label === 'Small') {
          // toggle heading back
          this.formatContent('heading', { level })
          this.editor.commands.setFontSize(SMALL_FONT_SIZE)
        } else if (label === 'Normal') {
          // unset small font size
          this.formatContent('unsetSmall')
          // toggle heading back
          this.formatContent('heading', { level })
        }
      }
      this.selectedFontSize = option.label
    },
  },
  render() {
    let { styleProps, hideBorder } = this
    const Container = styled(FContainer)`
      ${styleProps};
    `
    const Editor = styled(EditorContent)`
      ${this.getStyle('editor')}
      ${this.getStyle('inputStyles')}
    `
    return (
      <Container
        flexDirection="column"
        overflow="hidden"
        position="relative"
        border={hideBorder && 'none'}
      >
        {!this.istoolbarPositionBottom && this.getToolBar()}
        <Editor editor={this.editor} class="richtext-content" />
        {/* <EditorContent editor={this.editor} class="richtext-content" /> */}
        {this.istoolbarPositionBottom && this.getToolBar()}
      </Container>
    )
  },
}
</script>

<style lang="scss">
.richtext-content .tiptap {
  &:focus-visible {
    outline: unset;
  }
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
</style>
