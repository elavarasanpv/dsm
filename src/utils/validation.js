export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    Number(value) === -1 ||
    (typeof value === 'object' &&
      !(value instanceof Blob) &&
      Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false
}

export const isDateEmpty = (value) => {
  return isNaN(Date.parse(value)) || isEmpty(Date.parse(value))
}

export const isArray = (value) => {
  return value && value.constructor === Array
}

export const isFunction = (value) => {
  let type = typeof value
  return type === 'function'
}

const FORM_VALIDATION_COMPONENTS = [
  'FInput',
  'FDatePicker',
  'FSelect',
  'FCheckbox',
  'FCheckboxGroup',
  'FRadio',
  'FRadioGroup',
  'FTimePicker',
  'FAttachment',
  'SiteLookup',
  'Lookup',
  'DatePicker',
  'FileUpload',
  'Signature',
]

export const isFormItemComponent = (name) => {
  return FORM_VALIDATION_COMPONENTS.some(
    (componentName) => componentName === name
  )
}

export const isBlurSupported = (name) => {
  return ['FInput'].includes(name)
}

export const isNullOrUndefined = (value) => {
  return value === undefined || value === null
}

export const areValuesEmpty = (obj) => {
  return Object.values(obj).every((value) => {
    if (isNullOrUndefined(value)) {
      return true
    } else if (Array.isArray(value)) {
      return value.length === 0 || value.every((e) => areValuesEmpty(e))
    } else if (typeof value === 'object') {
      return areValuesEmpty(value)
    } else {
      return isEmpty(value)
    }
  })
}
