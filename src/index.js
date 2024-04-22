import theme from './theme-helpers/theme'
import './index.css'
import Vue from 'vue'
import tolgeeMixin from './utils/globals'

Vue.mixin(tolgeeMixin)

export const setTheme = (...args) => theme.useInstance(...args)

export const getTheme = () => theme.getInstance()

// FIcon
export { default as FIcon } from './components/icon/FIcon.vue'
export * from './components/icon/FIcon.vue'
//FButton
export { default as FButton } from './components/button/FButton.vue'
export * from './components/button/FButton.vue'
//FText
export { default as FText } from './components/typography/FText.vue'
export * from './components/typography/FText.vue'
//FInput
export { default as FInput } from './components/input/FInput.vue'
export * from './components/input/FInput.vue'
// FMenuItem
export { default as FMenuItem } from './components/menu-item/FMenuItem.vue'
export * from './components/menu-item/FMenuItem.vue'
// FSelect
export { default as FSelect } from './components/select/FSelect.vue'
export * from './components/select/FSelect.vue'
// FCheckbox
export { default as FCheckbox } from './components/checkbox/FCheckbox.vue'
export * from './components/checkbox/FCheckbox.vue'
// FCheckboxGroup
export { default as FCheckboxGroup } from './components/checkbox-group/FCheckboxGroup.vue'
export * from './components/checkbox-group/FCheckboxGroup.vue'
// FRadio
export { default as FRadio } from './components/radio/FRadio.vue'
export * from './components/radio/FRadio.vue'
// FRadioGroup
export { default as FRadioGroup } from './components/radio-group/FRadioGroup.vue'
export * from './components/radio-group/FRadioGroup.vue'
// FSwitch
export { default as FSwitch } from './components/switch/FSwitch.vue'
export * from './components/switch/FSwitch.vue'
// FPopover
export { default as FPopover } from './components/popover/FPopover.vue'
export * from './components/popover/FPopover.vue'
// FTooltip
export { default as FTooltip } from './components/tooltip/FTooltip.vue'
export * from './components/tooltip/FTooltip.vue'
// FModal
export { default as FModal } from './components/modal/FModal.vue'
export * from './components/modal/FModal.vue'
// FSpinner
export { default as FSpinner } from './components/spinner/FSpinner.vue'
export * from './components/spinner/FSpinner.vue'
// FAttachment
export { default as FAttachment } from './components/attachment/FAttachment.vue'
export * from './components/attachment/FAttachment.vue'
// FSignature
export { default as FSignature } from './components/signature/FSignature.vue'
export * from './components/signature/FSignature.vue'
// FTimePicker
export { default as FTimePicker } from './components/time-picker/FTimePicker.vue'
export * from './components/time-picker/FTimePicker.vue'
// FDatePicker
export { default as FDatePicker } from './components/date-picker/FDatePicker.vue'
export * from './components/date-picker/FDatePicker.vue'
// FRow
export { default as FRow } from './components/row/FRow.vue'
export * from './components/row/FRow.vue'
// FCol
export { default as FCol } from './components/col/FCol.vue'
export * from './components/col/FCol.vue'
// FFormItem
export { default as FFormItem } from './components/form-item/FFormItem.vue'
export * from './components/form-item/FFormItem.vue'
// FForm
export { default as FForm } from './components/form/FForm.vue'
export * from './components/form/FForm.vue'
// FPhoto
export { default as FPhoto } from './components/photo/FPhoto.vue'
export * from './components/photo/FPhoto.vue'
// FDuration
export { default as FDuration } from './components/duration/FDuration.vue'
export * from './components/duration/FDuration.vue'
// FShimmer
export { default as FShimmer } from './components/shimmer/FShimmer.vue'
export * from './components/shimmer/FShimmer.vue'
// FTextArea
export { default as FTextArea } from './components/text-area/FTextArea.vue'
export * from './components/text-area/FTextArea.vue'
// FAttachmentSmall
export { default as FAttachmentSmall } from './components/attachment-small/FAttachmentSmall.vue'
export * from './components/attachment-small/FAttachmentSmall.vue'
// FGridstackLayout
export { default as FGridstackLayout } from './components/gridstack-layout/FGridstackLayout.vue'
export * from './components/gridstack-layout/FGridstackLayout.vue'
// FGridstackSubgrid
export { default as FGridstackSubgrid } from './components/gridstack-subgrid/FGridstackSubgrid.vue'
export * from './components/gridstack-subgrid/FGridstackSubgrid.vue'
// FAccordion
export { default as FAccordion } from './components/accordion/FAccordion.vue'
export * from './components/accordion/FAccordion.vue'
// FTable
export { default as FTable } from './components/table/FTable.vue'
export * from './components/table/FTable.vue'
// FTableCell
export { default as FTableCell } from './components/table-cell/FTableCell.vue'
export * from './components/table-cell/FTableCell.vue'
// FCalendar
export { default as FCalendar } from './components/calendar/FCalendar.vue'
export * from './components/calendar/FCalendar.vue'
// FNotification
export { default as FNotification } from './components/notification/FNotification.vue'
export * from './components/notification/FNotification.vue'
// FToast
export { default as ftoast } from './components/toast/toast.js'
export * from './components/toast/toast.js'

// FAccordionItem
export { default as FAccordionItem } from './components/accordion-item/FAccordionItem.vue'
export * from './components/accordion-item/FAccordionItem.vue'
// FSidebar
export { default as FSidebar } from './components/sidebar/FSidebar.vue'
export * from './components/sidebar/FSidebar.vue'
// FBreadcrumb
export { default as FBreadcrumb } from './components/breadcrumb/FBreadcrumb.vue'
export * from './components/breadcrumb/FBreadcrumb.vue'
// FTags
export { default as FTags } from './components/tags/FTags.vue'
export * from './components/tags/FTags.vue'
// FButtonGroup
export { default as FButtonGroup } from './components/button-group/FButtonGroup.vue'
export * from './components/button-group/FButtonGroup.vue'
// FPageHeader
export { default as FPageHeader } from './components/page-header/FPageHeader.vue'
export * from './components/page-header/FPageHeader.vue'
// FReadingCard
export { default as FReadingCard } from './components/reading-card/FReadingCard.vue'
export * from './components/reading-card/FReadingCard.vue'

// FSteps
export { default as FSteps } from './components/steps/FSteps.vue'
export * from './components/steps/FSteps.vue'
// FContainer
export { default as FContainer } from './components/container/FContainer.vue'
export * from './components/container/FContainer.vue'
// FAvatar
export { default as FAvatar } from './components/avatar/FAvatar.vue'
export * from './components/avatar/FAvatar.vue'
// FGridstackItem
export { default as FGridstackItem } from './components/gridstack-item/FGridstackItem.vue'
export * from './components/gridstack-item/FGridstackItem.vue'
// FPagination
export { default as FPagination } from './components/pagination/FPagination.vue'
export * from './components/pagination/FPagination.vue'
// FRecordDetails
export { default as FRecordDetails } from './components/record-details/FRecordDetails.vue'
export * from './components/record-details/FRecordDetails.vue'
// FTabs
export { default as FTabs } from './components/tabs/FTabs.vue'
export * from './components/tabs/FTabs.vue'
// FTabPane
export { default as FTabPane } from './components/tabs/FTabPane.vue'
export * from './components/tabs/FTabPane.vue'
// FSegmentedControl
export { default as FSegmentedControl } from './components/segmented-control/FSegmentedControl.vue'
export * from './components/segmented-control/FSegmentedControl.vue'
// FDivider
export { default as FDivider } from './components/divider/FDivider.vue'
export * from './components/divider/FDivider.vue'
// FSelectList
export { default as FSelectList } from './components/select-list/FSelectList.vue'
export * from './components/select-list/FSelectList.vue'
// FDropdown
export { default as FDropdown } from './components/dropdown/FDropdown.vue'
export * from './components/dropdown/FDropdown.vue'
// FInlineEdit
export { default as FInlineEdit } from './components/inline-edit/FInlineEdit.vue'
export * from './components/inline-edit/FInlineEdit.vue'
// FCard
export { default as FCard } from './components/card/FCard.vue'
export * from './components/card/FCard.vue'
// FDropdownMenu
export { default as FDropdownMenu } from './components/dropdown-menu/FDropdownMenu.vue'
export * from './components/dropdown-menu/FDropdownMenu.vue'
// FPicker
export { default as FPicker } from './components/picker/FPicker.vue'
export * from './components/picker/FPicker.vue'
// FConfirmMessage
export { default as fDialog } from './components/confirm-message/confirm-message.js'
export * from './components/confirm-message/confirm-message.js'
// FBulkToolbar
export { default as FBulkToolbar } from './components/bulk-toolbar/FBulkToolbar.vue'
export * from './components/bulk-toolbar/FBulkToolbar.vue'
// FEmptyState
export { default as FEmptyState } from './components/empty-state/FEmptyState.vue'
export * from './components/empty-state/FEmptyState.vue'
// FPopoverDetails
export { default as FPopoverDetails } from './components/popover-details/FPopoverDetails.vue'
export * from './components/popover-details/FPopoverDetails.vue'
// FCascadeSelect
export { default as FCascadeSelect } from './components/cascade-select/FCascadeSelect.vue'
export * from './components/cascade-select/FCascadeSelect.vue'
// FTimelineFilter
export { default as FTimelineFilter } from './components/timeline-filter/FTimelineFilter.vue'
export * from './components/timeline-filter/FTimelineFilter.vue'
// FDatePanel
export { default as FDatePanel } from './components/date-panel/FDatePanel.vue'
export * from './components/date-panel/FDatePanel.vue'

//FBanner
export { default as FBanner } from './components/form-header/FBanner.vue'
export * from './components/form-header/FBanner.vue'
// FAccordionSelect
export { default as FAccordionSelect } from './components/accordion-select/FAccordionSelect.vue'
export * from './components/accordion-select/FAccordionSelect.vue'
// FColorSwatch
export { default as FColorSwatch } from './components/color-swatch/FColorSwatch.vue'
export * from './components/color-swatch/FColorSwatch.vue'
// FImageUploader
export { default as FImageUploader } from './components/image-uploader/FImageUploader.vue'
export * from './components/image-uploader/FImageUploader.vue'
// FFilePreview
export { default as FFilePreview } from './components/file-preview/FFilePreview.vue'
export * from './components/file-preview/FFilePreview.vue'
// FTimeline
export { default as FTimeline } from './components/timeline/FTimeline.vue'
export * from './components/timeline/FTimeline.vue'
// FTree
export { default as FTree } from './components/tree/FTree.vue'
export * from './components/tree/FTree.vue'
// FRichtext
export { default as FRichtext } from './components/richtext/FRichtext.vue'
export * from './components/richtext/FRichtext.vue'

export { default as FTimelineView } from './components/timeline-view/FTimelineView.vue'
export * from './components/timeline-view/FTimelineView.vue'
// FProgressBar
export { default as FProgressBar } from './components/progress-bar/FProgressBar.vue'
export * from './components/progress-bar/FProgressBar.vue'
// FBadge
export { default as FBadge } from './components/badge/FBadge.vue'
export * from './components/badge/FBadge.vue'
// FWidgetCard
export { default as FWidgetCard } from './components/widget-card/FWidgetCard.vue'
export * from './components/widget-card/FWidgetCard.vue'

// FAvatarGroup
export { default as FAvatarGroup } from './components/avatar-group/FAvatarGroup.vue'
export * from './components/avatar-group/FAvatarGroup.vue'
// FTableWidget
export { default as FTableWidget } from './components/table-widget/FTableWidget.vue'
export * from './components/table-widget/FTableWidget.vue'
// FSummaryWidget
export { default as FSummaryWidget } from './components/summary-widget/FSummaryWidget.vue'
export * from './components/summary-widget/FSummaryWidget.vue'
// FDataWidget
export { default as FDataWidget } from './components/data-widget/FDataWidget.vue'
export * from './components/data-widget/FDataWidget.vue'
// FTimeWidget
export { default as FTimeWidget } from './components/time-widget/FTimeWidget.vue'
export * from './components/time-widget/FTimeWidget.vue'
// FSearch
export { default as FSearch } from './components/search/FSearch.vue'
export * from './components/search/FSearch.vue'
// FWeatherWidget
export { default as FWeatherWidget } from './components/weather-widget/FWeatherWidget.vue'
export * from './components/weather-widget/FWeatherWidget.vue'
// FAttachmentWidget
export { default as FAttachmentWidget } from './components/attachment-widget/FAttachmentWidget.vue'
export * from './components/attachment-widget/FAttachmentWidget.vue'
// FInsightWidget
export { default as FInsightWidget } from './components/insight-widget/FInsightWidget.vue'
export * from './components/insight-widget/FInsightWidget.vue'
// FContactWidget
export { default as FContactWidget } from './components/contact-widget/FContactWidget.vue'
export * from './components/contact-widget/FContactWidget.vue'
// FMenu
export { default as FMenu } from './components/menu/FMenu.vue'
export * from './components/menu/FMenu.vue'
// FCommentsWidget
export { default as FCommentsWidget } from './components/comments-widget/FCommentsWidget.vue'
export * from './components/comments-widget/FCommentsWidget.vue'
